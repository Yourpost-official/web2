'use client';

import React, { useState, useEffect } from 'react';
import { Lock, Settings, Bell, CheckCircle, LogOut, Users, TrendingUp, Handshake, FileText, Database, Plus, Trash2, Shield, Eye, X } from 'lucide-react';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState({ haru: true, heartsend: true });
  const [noticeMessage, setNoticeMessage] = useState('원활한 우편 배송 관리를 위해 서버 점검이 예정되어 있습니다.');
  const [showToast, setShowToast] = useState(false);
  const [selectedCookie, setSelectedCookie] = useState<any>(null);

  // 로그인 상태 및 데이터 로드
  const fetchAdminData = async () => {
    const res = await fetch('/api/admin/data');
    if (res.ok) {
      const result = await res.json();
      setData(result);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        await fetchAdminData();
      } else {
        setError('인증 정보가 올바르지 않습니다.');
      }
    } catch (err) {
      setError('서버 통신 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    setIsLoggedIn(false);
    setData(null);
  };

  const handleDelete = async (category: string, id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`/api/admin/data?category=${category}&id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await fetchAdminData();
        triggerToast();
      } else {
        alert('삭제에 실패했습니다.');
      }
    } catch (err) {
      console.error('Deletion error:', err);
    }
  };

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
        <div className="bg-white p-10 rounded-[40px] shadow-2xl w-full max-w-md text-center border border-gray-100">
          <div className="w-20 h-20 bg-[#FDF2F2] text-[#8B2E2E] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-[#111111]">Operational Control</h1>
          <p className="text-sm text-gray-400 mb-8">관리자 비밀번호를 입력하여 접근을 허용하십시오.</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              placeholder="Enter Admin Password" 
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#8B2E2E]/20 text-center tracking-widest font-bold text-[#111111]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
            <button 
              disabled={isLoading}
              className="w-full bg-[#8B2E2E] text-white py-5 rounded-2xl font-bold hover:bg-[#7A2828] transition-all disabled:opacity-50"
            >
              {isLoading ? '인증 중...' : '패널 접속'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 lg:p-20 font-sans relative">
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${showToast ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="bg-[#111111] text-white px-8 py-4 rounded-full flex items-center gap-3 shadow-2xl">
          <CheckCircle size={18} className="text-green-500" />
          <span className="text-sm font-bold">변경사항이 저장되었습니다.</span>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto space-y-12 animate-reveal">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-[#8B2E2E] font-bold text-xs uppercase tracking-widest bg-[#FDF2F2] px-3 py-1 rounded-full">
              <Shield size={12} /> Secure Session Active
            </div>
            <h2 className="text-5xl font-black tracking-tighter text-[#111111]">Dashboard</h2>
          </div>
          <button onClick={handleLogout} className="px-6 py-3 bg-white rounded-xl text-xs font-bold text-gray-400 hover:text-[#8B2E2E] border border-gray-100 flex items-center gap-2 shadow-sm transition-all">
            <LogOut size={16} /> 로그아웃
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
              <h3 className="font-bold text-xl flex items-center gap-2 text-[#111111]"><Database size={20} className="text-[#8B2E2E]" /> 가용성 설정</h3>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl">
                    <span className="font-bold text-sm text-[#111111]">하루편지 활성화</span>
                    <button onClick={() => {setStatus({...status, haru: !status.haru}); triggerToast();}} className={`w-12 h-6 rounded-full relative transition-colors ${status.haru ? 'bg-[#8B2E2E]' : 'bg-gray-200'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${status.haru ? 'right-1' : 'left-1'}`} />
                    </button>
                 </div>
                 <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl">
                    <span className="font-bold text-sm text-[#111111]">하트센드 활성화</span>
                    <button onClick={() => {setStatus({...status, heartsend: !status.heartsend}); triggerToast();}} className={`w-12 h-6 rounded-full relative transition-colors ${status.heartsend ? 'bg-[#8B2E2E]' : 'bg-gray-200'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${status.heartsend ? 'right-1' : 'left-1'}`} />
                    </button>
                 </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
              <h3 className="font-bold text-xl flex items-center gap-2 text-[#111111]"><Bell size={20} className="text-[#8B2E2E]" /> 공지 팝업</h3>
              <textarea 
                className="w-full h-32 px-5 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-medium border border-transparent focus:border-[#8B2E2E]/20 text-[#111111]"
                value={noticeMessage}
                onChange={(e) => setNoticeMessage(e.target.value)}
              />
              <button onClick={triggerToast} className="w-full bg-[#111111] text-white py-4 rounded-2xl font-bold text-sm hover:bg-black transition-all">공지 업데이트</button>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-[48px] border border-gray-100 shadow-sm space-y-12">
            <h3 className="font-bold text-2xl flex items-center gap-3 text-[#111111]"><FileText size={24} className="text-[#8B2E2E]" /> 게시물 제어</h3>
            {data && (
              <div className="space-y-10">
                <Section title="채용 공고" items={data.posts.careers} category="careers" icon={<Users size={18}/>} onDelete={handleDelete} />
                <Section title="IR 자료" items={data.posts.ir} category="ir" icon={<TrendingUp size={18}/>} onDelete={handleDelete} />
              </div>
            )}
          </div>

          <div className="lg:col-span-3 bg-[#111111] text-white p-10 rounded-[48px] shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-10">
              <h3 className="font-bold text-3xl flex items-center gap-3 tracking-tighter">
                <Shield size={28} className="text-[#8B2E2E]" /> 보안 감사 로그 (쿠키 동의)
              </h3>
              <div className="overflow-x-auto rounded-3xl border border-white/5 bg-white/5">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-gray-500 text-[10px] border-b border-white/10 uppercase tracking-widest">
                      <th className="py-4 px-6 font-black">Timestamp</th>
                      <th className="py-4 px-6 font-black">Type</th>
                      <th className="py-4 px-6 font-black">IP Address</th>
                      <th className="py-4 px-6 font-black">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.cookieLogs.map((log: any) => (
                      <tr key={log.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-5 px-6 text-gray-400 font-mono text-xs">{log.date}</td>
                        <td className="py-5 px-6 font-bold">{log.action}</td>
                        <td className="py-5 px-6 font-mono text-xs text-gray-500">{log.ip}</td>
                        <td className="py-5 px-6">
                           <button onClick={() => setSelectedCookie(log)} className="text-[#8B2E2E] hover:text-white transition-colors flex items-center gap-2 font-bold text-xs"><Eye size={14}/> Metadata</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedCookie && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-6" onClick={() => setSelectedCookie(null)}>
          <div className="bg-[#111111] border border-white/10 p-10 rounded-[48px] max-w-lg w-full text-white space-y-8 animate-reveal" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <h4 className="text-2xl font-bold text-[#8B2E2E]">Client Metadata</h4>
              <button onClick={() => setSelectedCookie(null)} className="text-gray-500 hover:text-white"><X size={24}/></button>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div><p className="text-gray-500 mb-1">Browser</p><p className="font-mono">{selectedCookie.browser}</p></div>
              <div><p className="text-gray-500 mb-1">OS</p><p className="font-mono">{selectedCookie.os}</p></div>
              <div><p className="text-gray-500 mb-1">Device</p><p className="font-mono">{selectedCookie.device}</p></div>
              <div><p className="text-gray-500 mb-1">Region</p><p className="font-mono">{selectedCookie.location}</p></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, items, category, icon, onDelete }: any) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#111111] font-bold">
          <div className="text-[#8B2E2E]">{icon}</div>
          <span>{title}</span>
        </div>
        <button className="text-xs font-bold text-gray-400 hover:text-[#8B2E2E] flex items-center gap-1"><Plus size={14}/> Add New</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item: any) => (
          <div key={item.id} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex justify-between items-center group">
             <div className="space-y-1">
               <p className="text-sm font-bold text-[#111111]">{item.title}</p>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.status}</p>
             </div>
             <button 
                onClick={() => onDelete(category, item.id)}
                className="text-gray-200 group-hover:text-red-500 transition-colors"
              >
                <Trash2 size={16}/>
              </button>
          </div>
        ))}
      </div>
    </div>
  );
}