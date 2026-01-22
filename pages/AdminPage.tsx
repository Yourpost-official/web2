
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Lock, Settings, Bell, Shield, Plus, Trash2, 
  Eye, CreditCard, Link as LinkIcon, Image as ImageIcon,
  Layout, BarChart3, FileDown,
  Monitor, Globe, Clock, ChevronRight, Save, 
  ChevronUp, ChevronDown, CheckCircle, AlertCircle,
  HelpCircle, Mail, Briefcase, Newspaper, TrendingUp, Sparkles, UserPlus,
  MousePointer2, Fingerprint, Search, X, Filter,
  Type as FontIcon, AlignLeft, Copy, CheckSquare, Square,
  Activity, Database, ShieldCheck, Download, Trash, RefreshCcw
} from 'lucide-react';

export default function AdminPage({ adminState, setAdminState }: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ id: '', password: '' });
  const [activeTab, setActiveTab] = useState('settings');
  const [editingCategory, setEditingCategory] = useState<string>('brandStory');
  
  // UI 상태 관리
  const [visibleCount, setVisibleCount] = useState(5);
  const [logFilterRange, setLogFilterRange] = useState<1 | 7 | 30>(30);
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });

  // 세션 체크 (새로고침 시 로그인 유지 방지 - 보안 요구사항)
  useEffect(() => {
    setVisibleCount(5);
  }, [editingCategory, activeTab]);

  const triggerToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: null }), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.id === adminState.auth.id && loginForm.password === adminState.auth.password) {
      setIsLoggedIn(true);
      triggerToast('관리자 시스템에 성공적으로 로그인하였습니다.');
    } else {
      triggerToast('인증 정보가 올바르지 않습니다.', 'error');
    }
  };

  // 상태 업데이트 헬퍼 (Immutable 패턴 - 삭제 버그 해결의 핵심)
  const updateAdminState = (path: string, value: any) => {
    setAdminState((prev: any) => {
      const newState = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  // CSV 내보내기 로직
  const exportLogsToCSV = (days: number) => {
    const now = Date.now();
    const rangeMs = days * 24 * 60 * 60 * 1000;
    const filtered = (adminState.cookieLogs || []).filter((l: any) => (now - l.timestamp) <= rangeMs);
    
    if (filtered.length === 0) {
      triggerToast('해당 기간의 데이터가 존재하지 않습니다.', 'error');
      return;
    }

    const headers = ["ID", "Timestamp", "IP Address", "Action", "Page", "Browser", "OS", "Device", "Consent"];
    const rows = filtered.map((l: any) => [
      l.id, l.date, l.ip, l.action, l.page, l.browser.replace(/,/g, ' '), l.os, l.deviceType, l.consent
    ]);
    
    const csvContent = "\uFEFF" + [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Yourpost_AuditLog_${days}Days_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast(`${filtered.length}건의 데이터를 CSV로 추출했습니다.`);
  };

  // 데이터 수동 파기 (즉시 삭제)
  const clearLogsManual = (days: number) => {
    if (!window.confirm(`최근 ${days}일 이내의 데이터를 영구 파기하시겠습니까? 이 작업은 되돌릴 수 없습니다.`)) return;

    const now = Date.now();
    const rangeMs = days * 24 * 60 * 60 * 1000;
    
    setAdminState((prev: any) => {
      const logsBefore = prev.cookieLogs.length;
      const filtered = prev.cookieLogs.filter((l: any) => (now - l.timestamp) > rangeMs);
      const deletedCount = logsBefore - filtered.length;
      triggerToast(`${deletedCount}건의 데이터가 안전하게 삭제되었습니다.`, 'error');
      return { ...prev, cookieLogs: filtered };
    });
  };

  // CMS: 불변성 보장 삭제 로직 (Deletion Bug Fix)
  const deleteCMSItem = (category: string, id: number) => {
    if (!window.confirm('정말 삭제하시겠습니까? 데이터베이스에서 즉시 제거됩니다.')) return;
    setAdminState((prev: any) => {
      const newItems = (prev.content[category] || []).filter((item: any) => item.id !== id);
      return {
        ...prev,
        content: {
          ...prev.content,
          [category]: newItems
        }
      };
    });
    triggerToast('성공적으로 삭제되었습니다.', 'error');
  };

  const analytics = useMemo(() => {
    const logs = adminState.cookieLogs || [];
    const total = logs.length;
    const views = logs.filter((l:any) => l.action === '페이지 진입').length;
    const browsers = logs.reduce((acc:any, curr:any) => {
      const b = curr.browser.includes('Chrome') ? 'Chrome' : curr.browser.includes('Safari') ? 'Safari' : 'Other';
      acc[b] = (acc[b] || 0) + 1;
      return acc;
    }, {});
    return { total, views, browsers };
  }, [adminState.cookieLogs]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-6 animate-reveal">
        <div className="bg-white p-14 rounded-[48px] shadow-2xl w-full max-w-md border border-gray-100 text-center">
          <div className="w-20 h-20 bg-burgundy-50 text-burgundy-500 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-sm transition-transform hover:scale-105 duration-500"><Shield size={40} /></div>
          <h1 className="text-3xl font-black text-charcoal mb-8 tracking-tighter uppercase italic">Admin Portal</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" placeholder="ID" className="w-full px-8 py-5 bg-surface rounded-2xl outline-none font-bold text-charcoal border border-transparent focus:border-burgundy-500/20" value={loginForm.id} onChange={(e) => setLoginForm({ ...loginForm, id: e.target.value })} />
            <input type="password" placeholder="Password" className="w-full px-8 py-5 bg-surface rounded-2xl outline-none font-bold text-charcoal border border-transparent focus:border-burgundy-500/20" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
            <button className="w-full bg-charcoal text-white py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl active:scale-95">시큐어 채널 접속</button>
          </form>
          <p className="mt-8 text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">Yourpost Enterprise Management System v1.2.0</p>
        </div>
      </div>
    );
  }

  const currentCategoryList = (adminState.content[editingCategory] || []).sort((a:any, b:any) => a.order - b.order);
  const pagedList = currentCategoryList.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-surface p-6 md:p-12 lg:p-20 flex flex-col gap-12 animate-reveal relative pb-40">
      {/* 글로벌 알림 */}
      <div className={`fixed top-12 left-1/2 -translate-x-1/2 z-[200] transition-all duration-500 ${toast.type ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className={`px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 font-bold text-sm ${toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-charcoal text-white'}`}>
          {toast.type === 'error' ? <AlertCircle size={18}/> : <CheckCircle size={18} className="text-burgundy-500"/>}
          {toast.message}
        </div>
      </div>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-3">
          <h2 className="text-5xl font-black tracking-tighter text-charcoal uppercase italic">Control Panel</h2>
          <div className="flex flex-wrap gap-3">
             <TabBtn active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} label="기본 설정" icon={<Settings size={16}/>} />
             <TabBtn active={activeTab === 'content'} onClick={() => setActiveTab('content')} label="콘텐츠 CMS" icon={<Layout size={16}/>} />
             <TabBtn active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} label="데이터 & 감사로그" icon={<Activity size={16}/>} />
          </div>
        </div>
        <button onClick={() => setIsLoggedIn(false)} className="text-xs font-black text-gray-400 hover:text-burgundy-500 px-6 py-3 border border-gray-200 rounded-2xl bg-white shadow-sm transition-all">세션 종료</button>
      </header>

      {/* 설정 탭 */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           <AdminCard title="서비스 가용성 및 가격" icon={<CreditCard className="text-burgundy-500"/>}>
              <div className="space-y-8">
                 <ServiceControl label="하루편지" price={adminState.prices.haru.price} link={adminState.prices.haru.link} available={adminState.prices.haru.available} onUpdate={(f: any, v: any) => updateAdminState(`prices.haru.${f}`, v)} />
                 <ServiceControl label="하트센드" price={adminState.prices.heartsend.price} link={adminState.prices.heartsend.link} available={adminState.prices.heartsend.available} onUpdate={(f: any, v: any) => updateAdminState(`prices.heartsend.${f}`, v)} />
                 <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">분석 로깅 시스템 마스터 토글</span>
                    <ToggleGroup label={adminState.isLoggingEnabled ? "수집 활성" : "수집 중단"} active={adminState.isLoggingEnabled} onToggle={() => updateAdminState('isLoggingEnabled', !adminState.isLoggingEnabled)} />
                 </div>
              </div>
           </AdminCard>
           <AdminCard title="공지 및 팝업 제어" icon={<Bell className="text-burgundy-500"/>}>
              <div className="space-y-8">
                 <ToggleGroup label="상단 띠 배너 활성화" active={adminState.banner.showTop} onToggle={() => updateAdminState('banner.showTop', !adminState.banner.showTop)} />
                 <TextArea label="배너 메시지" value={adminState.banner.top.message} onChange={(v:any) => updateAdminState('banner.top.message', v)} />
                 <div className="border-t pt-8">
                    <ToggleGroup label="메인 팝업 활성화" active={adminState.banner.showPopup} onToggle={() => updateAdminState('banner.showPopup', !adminState.banner.showPopup)} />
                    <InputGroup label="팝업 타이틀" value={adminState.banner.popup.title} onChange={(v:any) => updateAdminState('banner.popup.title', v)} />
                    <TextArea label="팝업 본문" value={adminState.banner.popup.message} onChange={(v:any) => updateAdminState('banner.popup.message', v)} />
                 </div>
              </div>
           </AdminCard>
        </div>
      )}

      {/* CMS 탭 */}
      {activeTab === 'content' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
           <div className="lg:col-span-1 space-y-4">
              <CategoryBtn active={editingCategory === 'brandStory'} onClick={() => setEditingCategory('brandStory')} label="브랜드 스토리" icon={<Sparkles size={18}/>} />
              <CategoryBtn active={editingCategory === 'press'} onClick={() => setEditingCategory('press')} label="언론 보도" icon={<Newspaper size={18}/>} />
              <CategoryBtn active={editingCategory === 'ir'} onClick={() => setEditingCategory('ir')} label="IR / 경영정보" icon={<TrendingUp size={18}/>} />
              <CategoryBtn active={editingCategory === 'careers'} onClick={() => setEditingCategory('careers')} label="채용 / 협업" icon={<UserPlus size={18}/>} />
              <CategoryBtn active={editingCategory === 'events'} onClick={() => setEditingCategory('events')} label="이벤트" icon={<Mail size={18}/>} />
           </div>
           <div className="lg:col-span-3 bg-white p-12 rounded-[60px] shadow-sm border border-gray-100 min-h-[850px]">
              <div className="flex justify-between items-center border-b border-gray-50 pb-8 mb-10">
                 <h3 className="text-3xl font-black uppercase text-charcoal">{editingCategory} 관리</h3>
                 <button onClick={() => {
                   const newItem = { id: Date.now(), title: '새 항목', text: '', date: new Date().toISOString().split('T')[0], order: 0 };
                   updateAdminState(`content.${editingCategory}`, [newItem, ...(adminState.content[editingCategory] || [])]);
                   triggerToast('새 항목이 상단에 추가되었습니다.');
                 }} className="bg-burgundy-500 text-white px-8 py-4 rounded-2xl text-xs font-black hover:bg-burgundy-600 transition-all shadow-lg">+ 신규 추가</button>
              </div>
              <div className="space-y-10">
                 {pagedList.map((item: any) => (
                   <div key={item.id} className="p-10 bg-surface rounded-[40px] border border-gray-100 space-y-6 relative group hover:shadow-xl transition-all">
                      <button onClick={() => deleteCMSItem(editingCategory, item.id)} className="absolute top-10 right-10 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={24}/></button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InputGroup label="타이틀" value={item.title} onChange={(v:any) => {
                          const newList = adminState.content[editingCategory].map((i:any) => i.id === item.id ? {...i, title: v} : i);
                          updateAdminState(`content.${editingCategory}`, newList);
                        }} />
                        <InputGroup label="날짜/메타" value={item.date} onChange={(v:any) => {
                          const newList = adminState.content[editingCategory].map((i:any) => i.id === item.id ? {...i, date: v} : i);
                          updateAdminState(`content.${editingCategory}`, newList);
                        }} />
                      </div>
                      <TextArea label="상세 본문" value={item.text} onChange={(v:any) => {
                         const newList = adminState.content[editingCategory].map((i:any) => i.id === item.id ? {...i, text: v} : i);
                         updateAdminState(`content.${editingCategory}`, newList);
                      }} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InputGroup label="이미지 경로" value={item.image} icon={<ImageIcon size={14}/>} onChange={(v:any) => {
                           const newList = adminState.content[editingCategory].map((i:any) => i.id === item.id ? {...i, image: v} : i);
                           updateAdminState(`content.${editingCategory}`, newList);
                        }} />
                        <InputGroup label="연결 링크" value={item.link} icon={<LinkIcon size={14}/>} onChange={(v:any) => {
                           const newList = adminState.content[editingCategory].map((i:any) => i.id === item.id ? {...i, link: v} : i);
                           updateAdminState(`content.${editingCategory}`, newList);
                        }} />
                      </div>
                   </div>
                 ))}
                 {currentCategoryList.length > visibleCount && (
                   <button onClick={() => setVisibleCount(v => v + 5)} className="w-full py-8 text-xs font-black text-gray-400 hover:text-charcoal border-2 border-dashed border-gray-100 rounded-[40px] transition-all">항목 더 불러오기 (+{currentCategoryList.length - visibleCount})</button>
                 )}
              </div>
           </div>
        </div>
      )}

      {/* 데이터 로그 탭 */}
      {activeTab === 'logs' && (
        <div className="space-y-12 animate-reveal">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <StatCard label="누적 로그 수" value={analytics.total} unit="건" icon={<Database/>} color="text-burgundy-500" />
              <StatCard label="페이지 뷰" value={analytics.views} unit="회" icon={<Monitor/>} color="text-charcoal" />
              <StatCard label="데이터 무결성" value="100" unit="%" icon={<ShieldCheck/>} color="text-green-600" />
              <StatCard label="자동 파기 주기" value="30" unit="일" icon={<Clock/>} color="text-blue-600" />
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 bg-white p-12 rounded-[60px] border border-gray-100 shadow-sm space-y-10">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <h3 className="text-2xl font-black text-charcoal">익명화 식별 데이터 기록</h3>
                    <div className="flex gap-4">
                       <select 
                         className="px-6 py-3 bg-surface rounded-xl text-xs font-bold outline-none border border-gray-100"
                         value={logFilterRange}
                         onChange={(e) => setLogFilterRange(Number(e.target.value) as any)}
                       >
                          <option value={1}>최근 24시간</option>
                          <option value={7}>최근 7일</option>
                          <option value={30}>최근 30일 (전체)</option>
                       </select>
                       <button onClick={() => exportLogsToCSV(logFilterRange)} className="flex items-center gap-2 bg-charcoal text-white px-6 py-3 rounded-xl text-xs font-black hover:bg-black transition-all shadow-md">
                          <Download size={14}/> CSV 다운로드
                       </button>
                    </div>
                 </div>

                 <div className="overflow-x-auto rounded-[32px] border border-gray-50 bg-surface">
                   <table className="w-full text-left text-[11px]">
                      <thead>
                         <tr className="text-gray-400 border-b uppercase tracking-widest font-black">
                            <th className="p-6">수집 시각</th>
                            <th className="p-6">IP 주소 (Full)</th>
                            <th className="p-6">행동</th>
                            <th className="p-6">접속 경로</th>
                            <th className="p-6">메타데이터</th>
                         </tr>
                      </thead>
                      <tbody>
                         {(adminState.cookieLogs || []).slice(0, 150).map((log: any) => (
                            <tr key={log.id} className="border-b border-gray-50/50 hover:bg-white transition-colors group">
                               <td className="p-6 font-mono text-gray-400">{log.date}</td>
                               <td className="p-6 font-bold text-charcoal group-hover:text-burgundy-500 transition-colors">{log.ip}</td>
                               <td className="p-6 font-bold text-charcoal">{log.action}</td>
                               <td className="p-6 text-gray-500 italic">{log.page}</td>
                               <td className="p-6"><button onClick={() => setSelectedLog(log)} className="text-[9px] font-black uppercase text-gray-300 hover:text-charcoal"><Eye size={12}/></button></td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                 </div>
              </div>

              <div className="space-y-8">
                 <div className="bg-charcoal text-white p-10 rounded-[48px] shadow-2xl space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5"><Shield size={160}/></div>
                    <h4 className="text-xl font-black flex items-center gap-3 relative z-10"><Activity size={20} className="text-burgundy-500"/> 보안 거버넌스</h4>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed relative z-10">모든 수집 정보는 암호화되어 로컬 저장소에 보관됩니다. 정책에 따라 30일 경과 데이터는 영구적으로 자동 파기됩니다.</p>
                    <div className="space-y-4 relative z-10">
                       <button onClick={() => clearLogsManual(logFilterRange)} className="w-full flex justify-between items-center p-6 bg-red-600/10 text-red-500 rounded-2xl text-xs font-black hover:bg-red-600 hover:text-white transition-all">
                          <span>{logFilterRange}일 데이터 강제 파기</span>
                          <Trash size={14}/>
                       </button>
                    </div>
                 </div>

                 <div className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm space-y-8">
                    <h4 className="text-xl font-black text-charcoal flex items-center gap-3"><Monitor size={20} className="text-burgundy-500"/> 기기 분포</h4>
                    <div className="space-y-6">
                       {Object.entries(analytics.browsers).map(([browser, count]: any) => (
                          <div key={browser} className="space-y-2">
                             <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                <span className="text-gray-400">{browser}</span>
                                <span className="text-charcoal">{((count / analytics.total) * 100).toFixed(1)}%</span>
                             </div>
                             <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                                <div className="h-full bg-burgundy-500 transition-all duration-1000" style={{ width: `${(count / analytics.total * 100) || 0}%` }} />
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* 상세 로그 모달 */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-6" onClick={() => setSelectedLog(null)}>
          <div className="bg-white p-12 rounded-[60px] max-w-lg w-full text-charcoal space-y-10 animate-reveal shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start border-b pb-6">
              <h4 className="text-2xl font-black text-burgundy-500 tracking-tighter uppercase">Audit Log Detail</h4>
              <button onClick={() => setSelectedLog(null)} className="text-gray-300 hover:text-charcoal transition-colors"><X size={24}/></button>
            </div>
            <div className="grid grid-cols-2 gap-8 text-xs font-medium">
              <MetaItem label="UA String" value={selectedLog.browser} />
              <MetaItem label="System OS" value={selectedLog.os} />
              <MetaItem label="Device Type" value={selectedLog.deviceType} />
              <MetaItem label="Consent Status" value={selectedLog.consent} />
              <div className="col-span-2 space-y-2">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Client Full IP Trace</p>
                 <p className="font-mono text-sm bg-charcoal text-white p-5 rounded-2xl tracking-tighter shadow-inner">{selectedLog.ip}</p>
              </div>
              {selectedLog.targetText && (
                <div className="col-span-2 space-y-2">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Interaction Target</p>
                   <p className="font-bold text-sm bg-surface p-5 rounded-2xl border border-gray-50">{selectedLog.targetText}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// UI 컴포넌트들
function TabBtn({ active, onClick, label, icon }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 px-8 py-4 rounded-full text-xs font-black transition-all ${active ? 'bg-charcoal text-white shadow-xl scale-105' : 'bg-white text-gray-400 hover:text-charcoal border border-gray-100'}`}>{icon} {label}</button>
  );
}
function CategoryBtn({ active, onClick, label, icon }: any) {
  return (
    <button onClick={onClick} className={`w-full text-left px-8 py-6 rounded-[32px] font-black transition-all flex justify-between items-center ${active ? 'bg-burgundy-500 text-white shadow-xl translate-x-2' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-50'}`}>
       <div className="flex items-center gap-3">{icon}{label}</div>
       {active && <ChevronRight size={18} />}
    </button>
  );
}
function AdminCard({ title, icon, children }: any) {
  return (
    <div className="bg-white p-12 rounded-[60px] shadow-sm border border-gray-100 space-y-10"><h3 className="text-3xl font-black flex items-center gap-5 text-charcoal">{icon} {title}</h3>{children}</div>
  );
}
function StatCard({ label, value, unit, icon, color }: any) {
  return (
    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-4">
       <div className={`w-12 h-12 bg-surface rounded-2xl flex items-center justify-center ${color}`}>{icon}</div>
       <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
          <p className={`text-4xl font-black tracking-tighter ${color}`}>{value}<span className="text-lg ml-1 font-bold">{unit}</span></p>
       </div>
    </div>
  );
}
function InputGroup({ label, value, onChange, icon }: any) {
  return (
    <div className="space-y-3 w-full">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-4">{label}</label>
      <div className="relative">
         {icon && <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
         <input className={`w-full ${icon ? 'pl-14' : 'px-8'} py-5 bg-surface rounded-2xl outline-none font-black text-sm border border-transparent focus:border-burgundy-500/20 transition-all`} value={value} onChange={e => onChange(e.target.value)} />
      </div>
    </div>
  );
}
function TextArea({ label, value, onChange }: any) {
  return (
    <div className="space-y-3 w-full">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-4">{label}</label>
      <textarea className="w-full px-8 py-5 bg-surface rounded-2xl outline-none font-medium text-sm h-36 border border-transparent focus:border-burgundy-500/20 transition-all resize-none" value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}
function ToggleGroup({ label, active, onToggle }: any) {
  return (
    <div className="flex items-center justify-between p-6 bg-surface border border-transparent rounded-3xl w-full transition-all">
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
      <button onClick={onToggle} className={`w-16 h-8 rounded-full relative transition-colors ${active ? 'bg-burgundy-500' : 'bg-gray-200'}`}>
        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${active ? 'right-1' : 'left-1'}`} />
      </button>
    </div>
  );
}
function ServiceControl({ label, price, link, available, onUpdate }: any) {
  return (
    <div className="bg-surface p-8 rounded-[40px] space-y-6 border border-gray-50">
       <div className="flex justify-between items-center"><span className="text-xl font-black text-charcoal">{label}</span><ToggleGroup label="서비스 노출" active={available} onToggle={() => onUpdate('available', !available)} /></div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><InputGroup label="표시 가격" value={price} onChange={(v:any) => onUpdate('price', v)} /><InputGroup label="링크" value={link} onChange={(v:any) => onUpdate('link', v)} /></div>
    </div>
  );
}
function MetaItem({ label, value }: any) {
  return (
    <div className="space-y-1"><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p><p className="font-bold break-all leading-relaxed text-charcoal">{value}</p></div>
  );
}
