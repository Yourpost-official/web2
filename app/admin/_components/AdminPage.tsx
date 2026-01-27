'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Settings, Bell, Shield, Trash2, Layout, Activity, CreditCard,
  CheckCircle, RefreshCcw, Sparkles, Newspaper, Mail, Download, ChevronLeft, ChevronRight, Briefcase, PieChart, HelpCircle, AlertTriangle, Send
} from 'lucide-react';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TabBtn, CategoryBtn, AdminCard, InputGroup, MarkdownEditor, ToggleGroup, ColorPicker, ServiceControl } from '../../../components/AdminUI';
import { AdminState, ContentItem } from '@/types/admin';

/**
 * 관리자 페이지 메인 컴포넌트
 * 사이트의 전반적인 설정, 콘텐츠(CMS), 보안 로그를 관리합니다.
 */
export default function AdminPage() {
  // --- 상태 관리 (States) ---
  const [adminState, setAdminState] = useState<AdminState>({});
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ id: '', password: '' });
  const [activeTab, setActiveTab] = useState('settings');
  const [editingCategory, setEditingCategory] = useState<string>('brandStory');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });
  const [supabaseError, setSupabaseError] = useState<string | null>(null);

  // 로그 관리용 상태
  const [logs, setLogs] = useState<any[]>([]);
  const [logPage, setLogPage] = useState(1);
  const [logTotalPages, setLogTotalPages] = useState(1);
  const [logStats, setLogStats] = useState<any>(null);

  /**
   * 컴포넌트 마운트 시 데이터 로드를 통해 로그인 상태 확인
   */
  useEffect(() => {
    // httpOnly 쿠키는 JS로 확인 불가하므로, API 호출 성공 여부로 판단
    if (!isLoggedIn) {
      setIsLoggedIn(true);
      fetchAdminData();
    }
  }, []);

  /**
   * 초기 데이터 로드
   */
  const fetchAdminData = async () => {
    try {
      const res = await fetch('/api/admin/cms');
      const contentType = res.headers.get("content-type");
      
      if (res.ok && contentType && contentType.includes("application/json")) {
        const data = await res.json();
        const errorMsg = res.headers.get('x-supabase-error');
        setSupabaseError(errorMsg);
        setAdminState(data);
      }
    } catch (e) {
      // API 호출 실패 시 (401 Unauthorized 등) 로그아웃 처리
      if (isLoggedIn) {
        setIsLoggedIn(false);
      }
      console.error("Failed to fetch admin data");
    }
  };

  /**
   * 로그 데이터 로드 (페이지네이션)
   */
  const fetchLogs = useCallback(async (page: number) => {
    try {
      const res = await fetch(`/api/admin/logs?page=${page}&limit=10`);
      const contentType = res.headers.get("content-type");

      if (res.ok && contentType && contentType.includes("application/json")) {
        const data = await res.json();
        setLogs(data.logs);
        setLogTotalPages(data.pagination.totalPages);
        setLogStats(data.stats);
        setLogPage(page);
      }
    } catch (e) {
      console.error("Failed to fetch logs");
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && activeTab === 'logs') {
      fetchLogs(1);
    }
  }, [isLoggedIn, activeTab, fetchLogs]);

  /**
   * 데이터 저장 (수동 저장)
   */
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // 배너 내용 변경 시점 기록 (프론트엔드에서 '최초 접속' 또는 '내용 변경' 시에만 띄우기 위함)
      const stateToSave = {
        ...adminState,
        banner: {
          ...adminState.banner, // 기존 배너 설정을 그대로 유지하며 병합
          // 현재 시간을 기록하여 버전 관리 (내용이 바뀌었을 때만 사용자에게 다시 노출되도록 트리거 역할)
          lastModified: new Date().toISOString()
        }
      };

      const res = await fetch('/api/admin/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stateToSave),
      });
      if (res.ok) {
        setLastSaved(new Date());
        triggerToast('모든 변경사항이 저장되었습니다.');
        fetchAdminData(); // 저장 후 최신 데이터(DB ID 등) 다시 불러오기
      } else {
        triggerToast('저장에 실패했습니다.', 'error');
      }
    } catch (e) {
      triggerToast('서버 오류가 발생했습니다.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * 알림 토스트 메시지 출력
   */
  const triggerToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: null }), 3000);
  }, []);

  /**
   * 서버 API를 통한 관리자 로그인 처리
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginForm.id, password: loginForm.password }),
      });

      const contentType = response.headers.get("content-type");
      
      if (response.ok && contentType && contentType.includes("application/json")) {
        setIsLoggedIn(true);
        triggerToast('시스템 권한을 획득했습니다.');
        fetchAdminData();
      } else {
        // JSON 응답이 아닐 경우 대비
        const errorData = contentType && contentType.includes("application/json") 
          ? await response.json() 
          : { message: '로그인 서버 응답 오류' };
        triggerToast(errorData.message || '인증 정보가 올바르지 않습니다.', 'error');
      }
    } catch (error) {
      triggerToast('서버 통신 중 오류가 발생했습니다.', 'error');
    }
  };

  /**
   * 로그아웃 처리
   */
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      setIsLoggedIn(false);
      triggerToast('로그아웃 되었습니다.');
    } catch (error) {
      // 실패하더라도 클라이언트 상태는 로그아웃 처리
      setIsLoggedIn(false);
    }
  };

  /**
   * 상태의 특정 필드를 업데이트하는 유틸리티 (불변성 유지)
   */
  const updateField = useCallback((path: string, value: any) => {
    setAdminState((prev: any) => {
      // 얕은 복사 대신 필요한 부분만 깊은 복사 처리 (최적화)
      const newState = { ...prev };
      const keys = path.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let current: any = newState;
      
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        // 해당 키가 없거나 객체가 아니면 빈 객체로 초기화
        if (!current[key] || typeof current[key] !== 'object') current[key] = {};
        current[key] = { ...current[key] }; // 불변성 유지를 위한 얕은 복사
        current = current[key];
      }
      current[keys[keys.length - 1]] = value;
      return newState;
    });
  }, [setAdminState]);

  /**
   * CMS 항목 삭제 처리
   */
  const deleteCMSItem = useCallback((category: string, id: number) => {
    if (!window.confirm('항목을 영구 파기하시겠습니까?')) return;
    setAdminState((prev) => {
      const currentList = (prev.content?.[category as keyof typeof prev.content] as ContentItem[] | undefined) ?? [];
      const updatedList = currentList.filter((item) => item.id !== id);
      return {
        ...prev,
        content: {
          ...prev.content,
          [category]: updatedList
        }
      };
    });
    triggerToast('데이터가 삭제되었습니다.', 'error');
  }, [setAdminState, triggerToast]);

  /**
   * 로그 CSV 다운로드
   */
  const downloadLogs = (days: number) => {
    window.open(`/api/admin/logs?download=true&days=${days}`, '_blank');
  };

  /**
   * 로그 삭제
   */
  const deleteLogs = async (type: 'auto' | 'all') => {
    if (!window.confirm(type === 'auto' ? '30일 지난 로그를 삭제합니까?' : '모든 로그를 삭제합니까?')) return;
    await fetch('/api/admin/logs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type })
    });
    fetchLogs(1);
    triggerToast('로그가 정리되었습니다.');
  };

  // --- 비로그인 상태: 로그인 폼 렌더링 ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FCF9F5] flex items-center justify-center p-6 animate-reveal">
        <div className="bg-white p-14 rounded-[48px] shadow-2xl w-full max-w-md border border-gray-100 text-center">
          <div className="w-20 h-20 bg-burgundy-50 text-burgundy-500 rounded-3xl flex items-center justify-center mx-auto mb-10">
            <Shield size={40} />
          </div>
          <h1 className="text-3xl font-black text-charcoal mb-8 tracking-tighter uppercase italic">Control Panel</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="text" 
              placeholder="ID" 
              className="w-full px-8 py-5 bg-[#FCF9F5] rounded-2xl outline-none font-bold text-charcoal border-2 border-transparent focus:border-charcoal transition-all" 
              value={loginForm.id} 
              onChange={(e) => setLoginForm({ ...loginForm, id: e.target.value })} 
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full px-8 py-5 bg-[#FCF9F5] rounded-2xl outline-none font-bold text-charcoal border-2 border-transparent focus:border-charcoal transition-all" 
              value={loginForm.password} 
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} 
              required
            />
            <button className="w-full bg-charcoal text-white py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl">
              시큐어 접속
            </button>
          </form>
          {toast.type === 'error' && <p className="mt-4 text-red-500 text-xs font-bold">{toast.message}</p>}
        </div>
      </div>
    );
  }

  // --- 로그인 상태: 관리 대시보드 렌더링 ---
  return (
    <div className="min-h-screen bg-[#FCF9F5] p-6 md:p-12 lg:p-20 flex flex-col gap-12 animate-reveal relative pb-40 text-charcoal">
      <Analytics />
      <SpeedInsights />
      {/* 실시간 저장 상태 플로팅 UI */}
      <div className="fixed bottom-10 right-10 z-[100] flex items-center gap-4">
        <button 
          onClick={handleSave}
          className="bg-burgundy-500 text-white px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-burgundy-600 transition-all active:scale-95"
        >
          변경사항 저장하기
        </button>
        <div className={`px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold text-xs bg-white border border-gray-100 transition-all ${isSaving ? 'text-burgundy-500 scale-105' : 'text-gray-400'}`}>
          {isSaving ? <RefreshCcw size={14} className="animate-spin" /> : <CheckCircle size={14} className="text-green-500" />}
          {isSaving ? '데이터 동기화 중...' : `마지막 동기화: ${lastSaved ? lastSaved.toLocaleTimeString() : '-'}`}
        </div>
      </div>

      {/* 상단 네비게이션 및 헤더 */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-3">
          <h2 className="text-5xl font-black tracking-tighter text-charcoal uppercase italic">Admin Panel</h2>
          <div className="flex flex-wrap gap-3">
             <TabBtn active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} label="기본 설정" icon={<Settings size={16}/>} />
             <TabBtn active={activeTab === 'content'} onClick={() => setActiveTab('content')} label="콘텐츠 CMS" icon={<Layout size={16}/>} />
             <TabBtn active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} label="보안 로그" icon={<Activity size={16}/>} />
          </div>
        </div>
        <button 
          onClick={handleLogout} 
          className="text-xs font-black text-gray-400 hover:text-burgundy-500 px-6 py-3 border border-gray-200 rounded-2xl bg-white shadow-sm transition-all hover:border-burgundy-200"
        >
          로그아웃
        </button>
      </header>

      {/* 탭 1: 기본 설정 섹션 */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           <AdminCard title="서비스 및 가격 제어" icon={<CreditCard className="text-burgundy-500"/>}>
              <div className="space-y-6">
                 <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 pl-4">개인 서비스</h4>
                 {/* Nullish coalescing (??) 연산자를 사용하여 undefined일 경우 기본값 제공 */}
                 <ServiceControl label="하루편지" price={adminState.prices?.haru?.price ?? ''} link={adminState.prices?.haru?.link ?? ''} available={adminState.prices?.haru?.available ?? false} onUpdate={(f: any, v: any) => updateField(`prices.haru.${f}`, v)} />
                 <ServiceControl label="하트센드" price={adminState.prices?.heartsend?.price ?? ''} link={adminState.prices?.heartsend?.link ?? ''} available={adminState.prices?.heartsend?.available ?? false} onUpdate={(f: any, v: any) => updateField(`prices.heartsend.${f}`, v)} />
                 
                 <div className="pt-6 border-t border-gray-100 mt-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 pl-4 mb-4">기업 서비스</h4>
                    <div className="bg-[#FCF9F5] p-8 rounded-[40px] space-y-6 border border-gray-50 transition-all hover:border-burgundy-500/10">
                       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                         <span className="text-xl font-black text-charcoal">B2B 솔루션</span>
                         <ToggleGroup label="활성 상태" active={adminState.prices?.b2b?.available ?? false} onToggle={() => updateField('prices.b2b.available', !adminState.prices?.b2b?.available)} />
                       </div>
                       <InputGroup label="문의 이메일" value={adminState.prices?.b2b?.email ?? ''} onChange={(v) => updateField('prices.b2b.email', v)} />
                       <InputGroup label="안내 문구" value={adminState.prices?.b2b?.info ?? ''} onChange={(v) => updateField('prices.b2b.info', v)} />
                    </div>
                 </div>
              </div>
           </AdminCard>

           <AdminCard title="배너 및 팝업 제어" icon={<Bell className="text-burgundy-500"/>}>
              <div className="space-y-8">
                 {/* 상단 띠배너 설정 */}
                 <div className="p-6 bg-[#fdfaf7] rounded-3xl space-y-4">
                   <ToggleGroup label="상단 띠 배너 활성" active={adminState.banner?.showTop ?? false} onToggle={() => updateField('banner.showTop', !adminState.banner?.showTop)} />
                   <InputGroup label="배너 메시지" value={adminState.banner?.top?.message ?? ''} onChange={(v:any) => updateField('banner.top.message', v)} />
                   <InputGroup label="연결 링크" value={adminState.banner?.top?.link ?? ''} onChange={(v:any) => updateField('banner.top.link', v)} />
                   <ColorPicker label="테마 색상" value={adminState.banner?.top?.color} onChange={(c) => updateField('banner.top.color', c)} />
                 </div>

                 {/* 좌측 하단 배너 설정 */}
                 <div className="p-6 bg-[#fdfaf7] rounded-3xl space-y-4">
                   <ToggleGroup label="좌측 하단 배너 활성" active={adminState.banner?.showBottom ?? false} onToggle={() => updateField('banner.showBottom', !(adminState.banner?.showBottom ?? false))} />
                   <InputGroup label="배너 메시지" value={adminState.banner?.bottom?.message ?? ''} onChange={(v:any) => updateField('banner.bottom.message', v)} />
                   <InputGroup label="연결 링크" value={adminState.banner?.bottom?.link ?? ''} onChange={(v:any) => updateField('banner.bottom.link', v)} />
                   <ColorPicker label="테마 색상" value={adminState.banner?.bottom?.color} onChange={(c) => updateField('banner.bottom.color', c)} />
                 </div>

                 {/* 팝업 설정 */}
                 <div className="p-6 bg-[#fdfaf7] rounded-3xl space-y-4">
                   <ToggleGroup label="중앙 팝업 활성" active={adminState.banner?.showPopup ?? false} onToggle={() => updateField('banner.showPopup', !(adminState.banner?.showPopup ?? false))} />
                   <InputGroup label="팝업 제목" value={adminState.banner?.popup?.title ?? ''} onChange={(v:any) => updateField('banner.popup.title', v)} />
                   <InputGroup label="팝업 메시지" value={adminState.banner?.popup?.message ?? ''} onChange={(v:any) => updateField('banner.popup.message', v)} />
                 </div>
                 
                 <div className="pt-8 border-t border-gray-100 mt-8">
                    <ToggleGroup label="쿠키 수집 활성화" active={adminState.cookieSettings?.enabled ?? true} onToggle={() => updateField('cookieSettings.enabled', !adminState.cookieSettings?.enabled)} />
                    <div className="mt-4 p-4 bg-white rounded-2xl border border-gray-100">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">쿠키 안내 표시 빈도</label>
                      <select 
                        className="w-full p-3 bg-[#FCF9F5] rounded-xl font-bold text-sm outline-none"
                        value={adminState.cookieSettings?.mode ?? 'once'}
                        onChange={(e) => updateField('cookieSettings.mode', e.target.value)}
                      >
                        <option value="once">최초 접속 시 1회만 표시 (권장)</option>
                        <option value="always">매 접속마다 표시</option>
                        <option value="none">표시 안 함 (비활성화)</option>
                      </select>
                    </div>
                 </div>
              </div>
           </AdminCard>

           {/* CTA 링크 관리 (전체 너비) */}
           <div className="lg:col-span-2">
              <AdminCard title="CTA 버튼 링크 관리" icon={<Send className="text-burgundy-500"/>}>
                 <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
                       <p className="text-xs font-bold text-blue-700">💡 각 버튼마다 이메일(mailto:) 또는 외부 링크(URL)를 선택할 수 있습니다.</p>
                    </div>

                    {/* 홈페이지 - 제안서 제출하기 버튼 */}
                    <div className="p-6 bg-[#fdfaf7] rounded-3xl space-y-4 border border-gray-100">
                       <h4 className="text-sm font-black text-charcoal flex items-center gap-2">
                          📄 홈페이지 - "제안서 제출하기" 버튼
                       </h4>
                       <div className="flex gap-4">
                          <button
                             type="button"
                             onClick={() => updateField('cta.homeProposal.type', 'email')}
                             className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                                (adminState.cta?.homeProposal?.type ?? 'email') === 'email'
                                   ? 'bg-burgundy-500 text-white shadow-md'
                                   : 'bg-white text-gray-600 border border-gray-200'
                             }`}
                          >
                             📧 이메일
                          </button>
                          <button
                             type="button"
                             onClick={() => updateField('cta.homeProposal.type', 'link')}
                             className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                                (adminState.cta?.homeProposal?.type ?? 'email') === 'link'
                                   ? 'bg-burgundy-500 text-white shadow-md'
                                   : 'bg-white text-gray-600 border border-gray-200'
                             }`}
                          >
                             🔗 링크
                          </button>
                       </div>
                       <InputGroup
                          label={(adminState.cta?.homeProposal?.type ?? 'email') === 'email' ? '이메일 주소' : '링크 URL'}
                          value={adminState.cta?.homeProposal?.value ?? 'biz@yourpost.co.kr'}
                          onChange={(v) => updateField('cta.homeProposal.value', v)}
                       />
                    </div>

                    {/* 홈페이지 - 1:1 온라인 문의 버튼 */}
                    <div className="p-6 bg-[#fdfaf7] rounded-3xl space-y-4 border border-gray-100">
                       <h4 className="text-sm font-black text-charcoal flex items-center gap-2">
                          💬 홈페이지 - "1:1 온라인 문의" 버튼
                       </h4>
                       <div className="flex gap-4">
                          <button
                             type="button"
                             onClick={() => updateField('cta.homeInquiry.type', 'email')}
                             className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                                (adminState.cta?.homeInquiry?.type ?? 'link') === 'email'
                                   ? 'bg-burgundy-500 text-white shadow-md'
                                   : 'bg-white text-gray-600 border border-gray-200'
                             }`}
                          >
                             📧 이메일
                          </button>
                          <button
                             type="button"
                             onClick={() => updateField('cta.homeInquiry.type', 'link')}
                             className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                                (adminState.cta?.homeInquiry?.type ?? 'link') === 'link'
                                   ? 'bg-burgundy-500 text-white shadow-md'
                                   : 'bg-white text-gray-600 border border-gray-200'
                             }`}
                          >
                             🔗 링크
                          </button>
                       </div>
                       <InputGroup
                          label={(adminState.cta?.homeInquiry?.type ?? 'link') === 'email' ? '이메일 주소' : '링크 URL'}
                          value={adminState.cta?.homeInquiry?.value ?? '#'}
                          onChange={(v) => updateField('cta.homeInquiry.value', v)}
                       />
                    </div>

                    {/* 협업 페이지 - 함께하기 버튼 */}
                    <div className="p-6 bg-[#fdfaf7] rounded-3xl space-y-4 border border-gray-100">
                       <h4 className="text-sm font-black text-charcoal flex items-center gap-2">
                          🤝 협업 페이지 - "함께하기" 버튼
                       </h4>
                       <div className="flex gap-4">
                          <button
                             type="button"
                             onClick={() => updateField('cta.collabButton.type', 'email')}
                             className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                                (adminState.cta?.collabButton?.type ?? 'email') === 'email'
                                   ? 'bg-burgundy-500 text-white shadow-md'
                                   : 'bg-white text-gray-600 border border-gray-200'
                             }`}
                          >
                             📧 이메일
                          </button>
                          <button
                             type="button"
                             onClick={() => updateField('cta.collabButton.type', 'link')}
                             className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                                (adminState.cta?.collabButton?.type ?? 'email') === 'link'
                                   ? 'bg-burgundy-500 text-white shadow-md'
                                   : 'bg-white text-gray-600 border border-gray-200'
                             }`}
                          >
                             🔗 링크
                          </button>
                       </div>
                       <InputGroup
                          label={(adminState.cta?.collabButton?.type ?? 'email') === 'email' ? '이메일 주소' : '링크 URL'}
                          value={adminState.cta?.collabButton?.value ?? 'biz@yourpost.co.kr'}
                          onChange={(v) => updateField('cta.collabButton.value', v)}
                       />
                    </div>

                    {/* 푸터 - 말 걸기 / 문의하기 링크 */}
                    <div className="p-6 bg-[#fdfaf7] rounded-3xl space-y-4 border border-gray-100">
                       <h4 className="text-sm font-black text-charcoal flex items-center gap-2">
                          📍 푸터 - "말 걸기 / 문의하기" 링크
                       </h4>
                       <div className="flex gap-4">
                          <button
                             type="button"
                             onClick={() => updateField('cta.footerContact.type', 'email')}
                             className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                                (adminState.cta?.footerContact?.type ?? 'link') === 'email'
                                   ? 'bg-burgundy-500 text-white shadow-md'
                                   : 'bg-white text-gray-600 border border-gray-200'
                             }`}
                          >
                             📧 이메일
                          </button>
                          <button
                             type="button"
                             onClick={() => updateField('cta.footerContact.type', 'link')}
                             className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                                (adminState.cta?.footerContact?.type ?? 'link') === 'link'
                                   ? 'bg-burgundy-500 text-white shadow-md'
                                   : 'bg-white text-gray-600 border border-gray-200'
                             }`}
                          >
                             🔗 링크
                          </button>
                       </div>
                       <InputGroup
                          label={(adminState.cta?.footerContact?.type ?? 'link') === 'email' ? '이메일 주소' : '링크 URL'}
                          value={adminState.cta?.footerContact?.value ?? '#'}
                          onChange={(v) => updateField('cta.footerContact.value', v)}
                       />
                    </div>

                    {/* 이메일 안내 */}
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mt-6">
                       <h5 className="text-xs font-black text-amber-800 mb-2 flex items-center gap-2">
                          <Mail size={14} /> 이메일 사용 시 안내사항
                       </h5>
                       <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
                          <li>이메일 선택 시, 사용자의 기본 메일 클라이언트가 자동으로 열립니다.</li>
                          <li>모바일에서는 Gmail, Outlook 등 설치된 이메일 앱이 실행됩니다.</li>
                          <li>외부 양식(Tally, Google Forms 등)을 사용하려면 '링크'를 선택하세요.</li>
                       </ul>
                    </div>
                 </div>
              </AdminCard>
           </div>
        </div>
      )}

      {/* 탭 2: 콘텐츠 CMS 섹션 */}
      {activeTab === 'content' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
           {/* 카테고리 사이드바 */}
           <div className="lg:col-span-1 space-y-4">
              <CategoryBtn active={editingCategory === 'brandStory'} onClick={() => setEditingCategory('brandStory')} label="브랜드 스토리" icon={<Sparkles size={18}/>} />
              <CategoryBtn active={editingCategory === 'press'} onClick={() => setEditingCategory('press')} label="뉴스룸" icon={<Newspaper size={18}/>} />
              <CategoryBtn active={editingCategory === 'careers'} onClick={() => setEditingCategory('careers')} label="채용 및 협업" icon={<Briefcase size={18}/>} />
              <CategoryBtn active={editingCategory === 'events'} onClick={() => setEditingCategory('events')} label="이벤트" icon={<Mail size={18}/>} />
              <CategoryBtn active={editingCategory === 'faq'} onClick={() => setEditingCategory('faq')} label="자주 묻는 질문 (FAQ)" icon={<HelpCircle size={18}/>} />
           </div>
           
           {/* 카테고리별 상세 편집 영역 */}
           <div className="lg:col-span-3 bg-white p-12 rounded-[60px] shadow-sm border border-gray-100 min-h-[800px]">
              <div className="flex justify-between items-center border-b pb-8 mb-10">
                 <h3 className="text-3xl font-black uppercase text-charcoal">{editingCategory} 관리</h3>
                 <button
                   onClick={() => {
                     const newItem = { id: Date.now(), title: '새 항목', text: '', date: new Date().toISOString().split('T')[0], order: 0 };
                     const currentList = (adminState.content?.[editingCategory as keyof typeof adminState.content] as ContentItem[] | undefined) || [];
                     updateField(`content.${editingCategory}`, [newItem, ...currentList]);
                     triggerToast('새 항목이 추가되었습니다.');
                   }}
                   className="bg-burgundy-500 text-white px-8 py-4 rounded-2xl text-xs font-black shadow-lg hover:bg-burgundy-600 transition-colors"
                 >
                   + 신규 추가
                 </button>
              </div>
              
              <div className="space-y-10">
                 {((adminState.content?.[editingCategory as keyof typeof adminState.content] as ContentItem[] | undefined) ?? []).map((item: any) => (
                   <div key={item.id} className="p-10 bg-[#FCF9F5] rounded-[40px] border border-gray-100 space-y-6 relative group transition-all hover:shadow-md">
                      <button 
                        onClick={() => deleteCMSItem(editingCategory, item.id)} 
                        className="absolute top-10 right-10 text-gray-300 hover:text-red-500 transition-colors"
                        title="항목 삭제"
                        aria-label="항목 삭제" // 접근성: 버튼에 명시적인 라벨 추가
                      >
                        <Trash2 size={24}/>
                      </button>
                      <InputGroup 
                        label="제목" 
                        value={item.title} 
                        onChange={(v: string) => {
                          const newList = ((adminState.content?.[editingCategory as keyof typeof adminState.content] as ContentItem[] | undefined) ?? []).map((i: any) => i.id === item.id ? {...i, title: v} : i);
                          updateField(`content.${editingCategory}`, newList);
                        }} 
                      />
                      <MarkdownEditor 
                        label="내용" 
                        value={item.text || ''} 
                        onChange={(v: string) => {
                           const newList = ((adminState.content?.[editingCategory as keyof typeof adminState.content] as ContentItem[] | undefined) ?? []).map((i: any) => i.id === item.id ? {...i, text: v} : i);
                           updateField(`content.${editingCategory}`, newList);
                        }} 
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputGroup 
                          label="연결 링크" 
                          value={item.link || ''} 
                          onChange={(v: string) => {
                            const newList = ((adminState.content?.[editingCategory as keyof typeof adminState.content] as ContentItem[] | undefined) ?? []).map((i: any) => i.id === item.id ? {...i, link: v} : i);
                            updateField(`content.${editingCategory}`, newList);
                          }} 
                        />
                        <InputGroup 
                          label="버튼 텍스트" 
                          value={item.buttonText || ''} 
                          onChange={(v: string) => {
                            const newList = ((adminState.content?.[editingCategory as keyof typeof adminState.content] as ContentItem[] | undefined) ?? []).map((i: any) => i.id === item.id ? {...i, buttonText: v} : i);
                            updateField(`content.${editingCategory}`, newList);
                          }} 
                        />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* 탭 3: 보안 로그 섹션 */}
      {activeTab === 'logs' && (
        <div className="bg-white p-12 rounded-[60px] border border-gray-100 shadow-sm space-y-10">
          {/* 쿠키 분석 대시보드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-8 bg-[#FCF9F5] rounded-[32px] border border-gray-100 space-y-2">
                <div className="flex items-center gap-3 text-gray-400 font-bold text-xs uppercase tracking-widest">
                   <Activity size={14} /> 총 로그 수
                </div>
                <div className="text-4xl font-black text-charcoal">
                   {logStats?.reduce((acc: number, curr: any) => acc + curr._count.action, 0).toLocaleString() || 0}
                </div>
             </div>
             <div className="p-8 bg-[#FCF9F5] rounded-[32px] border border-gray-100 space-y-2">
                <div className="flex items-center gap-3 text-gray-400 font-bold text-xs uppercase tracking-widest">
                   <CheckCircle size={14} /> 쿠키 동의 완료
                </div>
                <div className="text-4xl font-black text-burgundy-500">
                   {logStats?.find((s: { action: string; _count: { action: number } }) => s.action === 'consent_agree')?._count?.action?.toLocaleString() || 0}
                </div>
             </div>
             <div className="p-8 bg-[#FCF9F5] rounded-[32px] border border-gray-100 space-y-2">
                <div className="flex items-center gap-3 text-gray-400 font-bold text-xs uppercase tracking-widest">
                   <PieChart size={14} /> 페이지 뷰
                </div>
                <div className="text-4xl font-black text-charcoal">
                   {logStats?.find((s: { action: string; _count: { action: number } }) => s.action === 'page_view')?._count?.action?.toLocaleString() || 0}
                </div>
             </div>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-black text-charcoal">실시간 보안 감사 (Full IP Trace)</h3>
            <div className="flex gap-3">
               <button onClick={() => fetchLogs(logPage)} className="p-3 text-gray-400 hover:text-burgundy-500 border border-gray-200 rounded-xl transition-colors" title="로그 새로고침">
                 <RefreshCcw size={16} />
               </button>
               <button onClick={() => deleteLogs('auto')} className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-red-500 border border-gray-200 rounded-xl">
                 30일 지난 로그 삭제
               </button>
               <button onClick={() => downloadLogs(30)} className="flex items-center gap-2 px-6 py-3 bg-charcoal text-white rounded-xl text-xs font-bold hover:bg-black">
                 <Download size={14}/> CSV 다운로드
               </button>
            </div>
          </div>
          
          <div className="overflow-x-auto rounded-[32px] bg-[#FCF9F5]">
            <table className="w-full text-left text-xs">
               <thead>
                  <tr className="text-gray-400 border-b uppercase tracking-widest font-black">
                     <th className="p-6">Timestamp</th>
                     <th className="p-6">IP Address</th>
                     <th className="p-6">Action</th>
                     <th className="p-6">Page</th>
                     <th className="p-6">Consent</th>
                  </tr>
               </thead>
               <tbody>
                  {logs.map((log: any) => (
                     <tr key={log.id} className="border-b border-gray-50/50 hover:bg-white transition-colors">
                        <td className="p-6 font-mono text-gray-400">{new Date(log.createdAt).toLocaleString()}</td>
                        <td className="p-6 font-bold text-charcoal">{log.ip}</td>
                        <td className="p-6 font-bold text-burgundy-500">{log.action}</td>
                        <td className="p-6 text-gray-500 italic">{log.page}</td>
                        <td className="p-6 text-gray-400">{log.consentMarketing ? 'O' : 'X'}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
          </div>
          
          {/* 페이지네이션 */}
          <div className="flex justify-center gap-4 items-center pt-4">
             <button disabled={logPage === 1} onClick={() => fetchLogs(logPage - 1)} className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30" aria-label="이전 페이지"><ChevronLeft size={20}/></button>
             <span className="text-sm font-bold text-gray-500">{logPage} / {logTotalPages}</span>
             <button disabled={logPage === logTotalPages} onClick={() => fetchLogs(logPage + 1)} className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30" aria-label="다음 페이지"><ChevronRight size={20}/></button>
          </div>
        </div>
      )}
    </div>
  );
}
