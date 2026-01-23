import React, { useState, useEffect } from 'react';
import { 
  Settings, Bell, Shield, Trash2, Layout, Activity, CreditCard, 
  CheckCircle, RefreshCcw, ChevronRight, Sparkles, Newspaper, Mail
} from 'lucide-react';

export default function AdminPage({ adminState, setAdminState }: any) {
  const state = adminState || {};
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ id: '', password: '' });
  const [activeTab, setActiveTab] = useState('settings');
  const [editingCategory, setEditingCategory] = useState<string>('brandStory');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });

  useEffect(() => {
    if (isLoggedIn) {
      setIsSaving(true);
      const timer = setTimeout(() => {
        setLastSaved(new Date());
        setIsSaving(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [adminState, isLoggedIn]);

  const triggerToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: null }), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 로컬 상태 기반 인증
    if (loginForm.id === state.auth?.id && loginForm.password === state.auth?.password) {
      setIsLoggedIn(true);
      // 세션 쿠키 설정 (미들웨어용)
      document.cookie = "admin_session=authenticated_token_v1; path=/; max-age=7200";
      triggerToast('시스템 권한을 획득했습니다.');
    } else {
      triggerToast('인증 정보가 올바르지 않습니다.', 'error');
    }
  };

  const updateField = (path: string, value: any) => {
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

  const deleteCMSItem = (category: string, id: number) => {
    if (!window.confirm('항목을 영구 파기하시겠습니까?')) return;
    setAdminState((prev: any) => {
      const currentList = prev.content[category] || [];
      const updatedList = currentList.filter((item: any) => item.id !== id);
      return {
        ...prev,
        content: {
          ...prev.content,
          [category]: updatedList
        }
      };
    });
    triggerToast('데이터가 삭제되었습니다.', 'error');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FCF9F5] flex items-center justify-center p-6 animate-reveal">
        <div className="bg-white p-14 rounded-[48px] shadow-2xl w-full max-w-md border border-gray-100 text-center">
          <div className="w-20 h-20 bg-burgundy-50 text-burgundy-500 rounded-3xl flex items-center justify-center mx-auto mb-10"><Shield size={40} /></div>
          <h1 className="text-3xl font-black text-charcoal mb-8 tracking-tighter uppercase italic">Control Panel</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" placeholder="ID" className="w-full px-8 py-5 bg-[#FCF9F5] rounded-2xl outline-none font-bold text-charcoal" value={loginForm.id} onChange={(e) => setLoginForm({ ...loginForm, id: e.target.value })} />
            <input type="password" placeholder="Password" className="w-full px-8 py-5 bg-[#FCF9F5] rounded-2xl outline-none font-bold text-charcoal" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
            <button className="w-full bg-charcoal text-white py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl">시큐어 접속</button>
          </form>
          {toast.type === 'error' && <p className="mt-4 text-red-500 text-xs font-bold">{toast.message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF9F5] p-6 md:p-12 lg:p-20 flex flex-col gap-12 animate-reveal relative pb-40">
      <div className="fixed bottom-10 right-10 z-[100] flex items-center gap-4">
        <div className={`px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold text-xs bg-white border border-gray-100 ${isSaving ? 'text-burgundy-500' : 'text-gray-400'}`}>
          {isSaving ? <RefreshCcw size={14} className="animate-spin" /> : <CheckCircle size={14} className="text-green-500" />}
          {isSaving ? '데이터 동기화 중...' : `마지막 동기화: ${lastSaved?.toLocaleTimeString()}`}
        </div>
      </div>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-3">
          <h2 className="text-5xl font-black tracking-tighter text-charcoal uppercase italic">Admin Panel</h2>
          <div className="flex flex-wrap gap-3">
             <TabBtn active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} label="기본 설정" icon={<Settings size={16}/>} />
             <TabBtn active={activeTab === 'content'} onClick={() => setActiveTab('content')} label="콘텐츠 CMS" icon={<Layout size={16}/>} />
             <TabBtn active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} label="보안 로그" icon={<Activity size={16}/>} />
          </div>
        </div>
        <button onClick={() => {
          setIsLoggedIn(false);
          document.cookie = "admin_session=; path=/; max-age=0";
        }} className="text-xs font-black text-gray-400 hover:text-burgundy-500 px-6 py-3 border border-gray-200 rounded-2xl bg-white shadow-sm transition-all">로그아웃</button>
      </header>

      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           <AdminCard title="서비스 및 가격 제어" icon={<CreditCard className="text-burgundy-500"/>}>
              <div className="space-y-8">
                 <ServiceControl label="하루편지" price={state.prices?.haru?.price} link={state.prices?.haru?.link} available={state.prices?.haru?.available} onUpdate={(f: any, v: any) => updateField(`prices.haru.${f}`, v)} />
                 <ServiceControl label="하트센드" price={state.prices?.heartsend?.price} link={state.prices?.heartsend?.link} available={state.prices?.heartsend?.available} onUpdate={(f: any, v: any) => updateField(`prices.heartsend.${f}`, v)} />
              </div>
           </AdminCard>
           <AdminCard title="배너 및 팝업 제어" icon={<Bell className="text-burgundy-500"/>}>
              <div className="space-y-8">
                 <ToggleGroup label="띠 배너 활성" active={state.banner?.showTop} onToggle={() => updateField('banner.showTop', !state.banner?.showTop)} />
                 <TextArea label="배너 메시지" value={state.banner?.top?.message} onChange={(v:any) => updateField('banner.top.message', v)} />
              </div>
           </AdminCard>
        </div>
      )}

      {activeTab === 'content' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
           <div className="lg:col-span-1 space-y-4">
              <CategoryBtn active={editingCategory === 'brandStory'} onClick={() => setEditingCategory('brandStory')} label="브랜드 스토리" icon={<Sparkles size={18}/>} />
              <CategoryBtn active={editingCategory === 'press'} onClick={() => setEditingCategory('press')} label="뉴스룸" icon={<Newspaper size={18}/>} />
              <CategoryBtn active={editingCategory === 'events'} onClick={() => setEditingCategory('events')} label="이벤트" icon={<Mail size={18}/>} />
           </div>
           <div className="lg:col-span-3 bg-white p-12 rounded-[60px] shadow-sm border border-gray-100 min-h-[800px]">
              <div className="flex justify-between items-center border-b pb-8 mb-10">
                 <h3 className="text-3xl font-black uppercase text-charcoal">{editingCategory} 관리</h3>
                 <button onClick={() => {
                   const newItem = { id: Date.now(), title: '새 항목', text: '', date: new Date().toISOString().split('T')[0], order: 0 };
                   updateField(`content.${editingCategory}`, [newItem, ...(state.content?.[editingCategory] || [])]);
                   triggerToast('새 항목이 추가되었습니다.');
                 }} className="bg-burgundy-500 text-white px-8 py-4 rounded-2xl text-xs font-black shadow-lg">+ 신규 추가</button>
              </div>
              <div className="space-y-10">
                 {(state.content?.[editingCategory] || []).map((item: any) => (
                   <div key={item.id} className="p-10 bg-[#FCF9F5] rounded-[40px] border border-gray-100 space-y-6 relative group">
                      <button onClick={() => deleteCMSItem(editingCategory, item.id)} className="absolute top-10 right-10 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={24}/></button>
                      <InputGroup label="타이틀" value={item.title} onChange={(v:any) => {
                        const newList = state.content[editingCategory].map((i:any) => i.id === item.id ? {...i, title: v} : i);
                        updateField(`content.${editingCategory}`, newList);
                      }} />
                      <TextArea label="상세 본문" value={item.text} onChange={(v:any) => {
                         const newList = state.content[editingCategory].map((i:any) => i.id === item.id ? {...i, text: v} : i);
                         updateField(`content.${editingCategory}`, newList);
                      }} />
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-white p-12 rounded-[60px] border border-gray-100 shadow-sm space-y-10">
          <h3 className="text-2xl font-black text-charcoal">실시간 보안 감사 (Full IP Trace)</h3>
          <div className="overflow-x-auto rounded-[32px] bg-[#FCF9F5]">
            <table className="w-full text-left text-[11px]">
               <thead>
                  <tr className="text-gray-400 border-b uppercase tracking-widest font-black">
                     <th className="p-6">Timestamp</th>
                     <th className="p-6">IP Address</th>
                     <th className="p-6">Action</th>
                     <th className="p-6">Page</th>
                  </tr>
               </thead>
               <tbody>
                  {(state.cookieLogs || []).slice(0, 100).map((log: any) => (
                     <tr key={log.id} className="border-b border-gray-50/50 hover:bg-white transition-colors">
                        <td className="p-6 font-mono text-gray-400">{log.date}</td>
                        <td className="p-6 font-bold text-charcoal">{log.ip}</td>
                        <td className="p-6 font-bold text-burgundy-500">{log.action}</td>
                        <td className="p-6 text-gray-500 italic">{log.page}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function TabBtn({ active, onClick, label, icon }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 px-8 py-4 rounded-full text-xs font-black transition-all ${active ? 'bg-charcoal text-white shadow-xl' : 'bg-white text-gray-400 border border-gray-100'}`}>{icon} {label}</button>
  );
}
function CategoryBtn({ active, onClick, label, icon }: any) {
  return (
    <button onClick={onClick} className={`w-full text-left px-8 py-6 rounded-[32px] font-black transition-all flex justify-between items-center ${active ? 'bg-burgundy-500 text-white shadow-xl translate-x-2' : 'bg-white text-gray-500 border border-gray-50'}`}>
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
function InputGroup({ label, value, onChange }: any) {
  return (
    <div className="space-y-3 w-full">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-4">{label}</label>
      <input className="w-full px-8 py-5 bg-[#FCF9F5] rounded-2xl outline-none font-black text-sm border border-transparent focus:border-burgundy-500/20" value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}
function TextArea({ label, value, onChange }: any) {
  return (
    <div className="space-y-3 w-full">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-4">{label}</label>
      <textarea className="w-full px-8 py-5 bg-[#FCF9F5] rounded-2xl outline-none font-medium text-sm h-36 border border-transparent focus:border-burgundy-500/20 resize-none" value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}
function ToggleGroup({ label, active, onToggle }: any) {
  return (
    <div className="flex items-center justify-between p-6 bg-[#FCF9F5] rounded-3xl w-full">
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
      <button onClick={onToggle} className={`w-16 h-8 rounded-full relative transition-colors ${active ? 'bg-burgundy-500' : 'bg-gray-200'}`}>
        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${active ? 'right-1' : 'left-1'}`} />
      </button>
    </div>
  );
}
function ServiceControl({ label, price, link, available, onUpdate }: any) {
  return (
    <div className="bg-[#FCF9F5] p-8 rounded-[40px] space-y-6 border border-gray-50">
       <div className="flex justify-between items-center"><span className="text-xl font-black text-charcoal">{label}</span><ToggleGroup label="활성 상태" active={available} onToggle={() => onUpdate('available', !available)} /></div>
       <InputGroup label="표시 가격" value={price} onChange={(v:any) => onUpdate('price', v)} />
       <InputGroup label="신청 링크" value={link} onChange={(v:any) => onUpdate('link', v)} />
    </div>
  );
}
