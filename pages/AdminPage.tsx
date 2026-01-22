
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
  Activity, Database, ShieldCheck, Download, Trash, RefreshCcw, HardDrive
} from 'lucide-react';

export default function AdminPage({ adminState, setAdminState }: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ id: '', password: '' });
  const [activeTab, setActiveTab] = useState('settings');
  const [editingCategory, setEditingCategory] = useState<string>('brandStory');
  
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [logFilterRange, setLogFilterRange] = useState<1 | 7 | 30>(30);
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });

  // Status Feedback
  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      setLastSaved(new Date());
      setIsSaving(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [adminState]);

  const triggerToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: null }), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.id === adminState.auth.id && loginForm.password === adminState.auth.password) {
      setIsLoggedIn(true);
      triggerToast('관리자 인증에 성공하였습니다.');
    } else {
      triggerToast('비밀번호가 일치하지 않습니다.', 'error');
    }
  };

  const updateField = (path: string, value: any) => {
    setAdminState((prev: any) => {
      const newState = { ...prev };
      const keys = path.split('.');
      let current: any = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  const deleteCMSItem = (category: string, id: number) => {
    if (!window.confirm('항목을 삭제하시겠습니까? 데이터베이스에서 영구 제거됩니다.')) return;
    setAdminState((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        [category]: prev.content[category].filter((item: any) => item.id !== id)
      }
    }));
    triggerToast('삭제가 완료되었습니다.', 'error');
  };

  const exportLogsToCSV = (days: number) => {
    const now = Date.now();
    const rangeMs = days * 24 * 60 * 60 * 1000;
    const logs = (adminState.cookieLogs || []).filter((l: any) => (now - l.timestamp) <= rangeMs);
    
    if (logs.length === 0) {
      triggerToast('데이터가 없습니다.', 'error');
      return;
    }

    const headers = ["ID", "Time", "IP", "Action", "Page", "Device", "Consent"];
    const rows = logs.map((l: any) => [l.id, l.date, l.ip, l.action, l.page, l.deviceType, l.consent]);
    const csvContent = "\uFEFF" + [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Yourpost_Log_${days}Days_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    triggerToast(`${logs.length}건의 데이터를 내보냈습니다.`);
  };

  const analytics = useMemo(() => {
    const logs = adminState.cookieLogs || [];
    const total = logs.length;
    const browsers = logs.reduce((acc: any, curr: any) => {
      const b = curr.browser.includes('Chrome') ? 'Chrome' : curr.browser.includes('Safari') ? 'Safari' : 'Other';
      acc[b] = (acc[b] || 0) + 1;
      return acc;
    }, {});
    return { total, browsers };
  }, [adminState.cookieLogs]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-6">
        <div className="bg-white p-14 rounded-[48px] shadow-2xl w-full max-w-md border border-gray-100 text-center">
          <div className="w-20 h-20 bg-burgundy-50 text-burgundy-500 rounded-3xl flex items-center justify-center mx-auto mb-10"><Shield size={40} /></div>
          <h1 className="text-3xl font-black text-charcoal mb-8 tracking-tighter uppercase italic">Control Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" placeholder="ID" className="w-full px-8 py-5 bg-surface rounded-2xl outline-none font-bold text-charcoal" value={loginForm.id} onChange={(e) => setLoginForm({ ...loginForm, id: e.target.value })} />
            <input type="password" placeholder="Password" className="w-full px-8 py-5 bg-surface rounded-2xl outline-none font-bold text-charcoal" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
            <button className="w-full bg-charcoal text-white py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl active:scale-95">시큐어 채널 접속</button>
          </form>
          <p className="mt-8 text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">System Admin Credentials Required</p>
        </div>
      </div>
    );
  }

  const currentCategoryList = (adminState.content[editingCategory] || []).sort((a: any, b: any) => a.order - b.order);

  return (
    <div className="min-h-screen bg-surface p-6 md:p-12 lg:p-20 flex flex-col gap-12 animate-reveal relative pb-40">
      {/* Visual State Indicators */}
      <div className="fixed bottom-10 right-10 z-[100] flex items-center gap-4">
        <div className={`px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold text-xs bg-white border border-gray-100 ${isSaving ? 'text-burgundy-500 animate-pulse' : 'text-gray-400'}`}>
          {isSaving ? <RefreshCcw size={14} className="animate-spin" /> : <CheckCircle size={14} className="text-green-500" />}
          {isSaving ? 'Synchronizing...' : `Last Saved: ${lastSaved?.toLocaleTimeString()}`}
        </div>
      </div>

      {/* Global Toast */}
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
             <TabBtn active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} label="데이터 로그" icon={<Activity size={16}/>} />
          </div>
        </div>
        <button onClick={() => setIsLoggedIn(false)} className="text-xs font-black text-gray-400 hover:text-burgundy-500 px-6 py-3 border border-gray-200 rounded-2xl bg-white shadow-sm transition-all">로그아웃</button>
      </header>

      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           <AdminCard title="서비스 및 자산 관리" icon={<CreditCard className="text-burgundy-500"/>}>
              <div className="space-y-8">
                 <ServiceControl label="하루편지" price={adminState.prices.haru.price} link={adminState.prices.haru.link} available={adminState.prices.haru.available} onUpdate={(f: any, v: any) => updateField(`prices.haru.${f}`, v)} />
                 <ServiceControl label="하트센드" price={adminState.prices.heartsend.price} link={adminState.prices.heartsend.link} available={adminState.prices.heartsend.available} onUpdate={(f: any, v: any) => updateField(`prices.heartsend.${f}`, v)} />
                 <div className="border-t pt-8">
                   <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Global Download Assets</h4>
                   <InputGroup label="협업 제안서 PDF" value={adminState.assets.proposalLink} onChange={(v:any) => updateField('assets.proposalLink', v)} icon={<FileDown size={14}/>} />
                 </div>
              </div>
           </AdminCard>
           <AdminCard title="공지/배너 제어" icon={<Bell className="text-burgundy-500"/>}>
              <div className="space-y-8">
                 <ToggleGroup label="띠 배너 활성" active={adminState.banner.showTop} onToggle={() => updateField('banner.showTop', !adminState.banner.showTop)} />
                 <TextArea label="배너 메시지" value={adminState.banner.top.message} onChange={(v:any) => updateField('banner.top.message', v)} />
                 <div className="border-t pt-8">
                    <ToggleGroup label="메인 팝업 활성" active={adminState.banner.showPopup} onToggle={() => updateField('banner.showPopup', !adminState.banner.showPopup)} />
                    <InputGroup label="팝업 타이틀" value={adminState.banner.popup.title} onChange={(v:any) => updateField('banner.popup.title', v)} />
                    <TextArea label="팝업 본문" value={adminState.banner.popup.message} onChange={(v:any) => updateField('banner.popup.message', v)} />
                 </div>
              </div>
           </AdminCard>
        </div>
      )}

      {activeTab === 'content' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
           <div className="lg:col-span-1 space-y-4">
              <CategoryBtn active={editingCategory === 'brandStory'} onClick={() => setEditingCategory('brandStory')} label="브랜드 스토리" icon={<Sparkles size={18}/>} />
              <CategoryBtn active={editingCategory === 'press'} onClick={() => setEditingCategory('press')} label="뉴스룸" icon={<Newspaper size={18}/>} />
              <CategoryBtn active={editingCategory === 'ir'} onClick={() => setEditingCategory('ir')} label="IR / 경영" icon={<TrendingUp size={18}/>} />
              <CategoryBtn active={editingCategory === 'careers'} onClick={() => setEditingCategory('careers')} label="채용 / 협업" icon={<UserPlus size={18}/>} />
              <CategoryBtn active={editingCategory === 'events'} onClick={() => setEditingCategory('events')} label="이벤트" icon={<Mail size={18}/>} />
           </div>
           <div className="lg:col-span-3 bg-white p-12 rounded-[60px] shadow-sm border border-gray-100 min-h-[800px]">
              <div className="flex justify-between items-center border-b pb-8 mb-10">
                 <h3 className="text-3xl font-black uppercase text-charcoal">{editingCategory} 관리</h3>
                 <button onClick={() => {
                   const newItem = { id: Date.now(), title: '새 항목', text: '', date: new Date().toISOString().split('T')[0], order: 0 };
                   updateField(`content.${editingCategory}`, [newItem, ...adminState.content[editingCategory]]);
                   triggerToast('신규 항목이 추가되었습니다.');
                 }} className="bg-burgundy-500 text-white px-8 py-4 rounded-2xl text-xs font-black hover:bg-burgundy-600 shadow-lg">+ 신규 추가</button>
              </div>
              <div className="space-y-10">
                 {currentCategoryList.map((item: any) => (
                   <div key={item.id} className="p-10 bg-surface rounded-[40px] border border-gray-100 space-y-6 relative group">
                      <button onClick={() => deleteCMSItem(editingCategory, item.id)} className="absolute top-10 right-10 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={24}/></button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InputGroup label="타이틀" value={item.title} onChange={(v:any) => {
                          const newList = adminState.content[editingCategory].map((i:any) => i.id === item.id ? {...i, title: v} : i);
                          updateField(`content.${editingCategory}`, newList);
                        }} />
                        <InputGroup label="메타(날짜/상태)" value={item.date} onChange={(v:any) => {
                          const newList = adminState.content[editingCategory].map((i:any) => i.id === item.id ? {...i, date: v} : i);
                          updateField(`content.${editingCategory}`, newList);
                        }} />
                      </div>
                      <TextArea label="콘텐츠 본문" value={item.text} onChange={(v:any) => {
                         const newList = adminState.content[editingCategory].map((i:any) => i.id === item.id ? {...i, text: v} : i);
                         updateField(`content.${editingCategory}`, newList);
                      }} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InputGroup label="이미지 URL" value={item.image} icon={<ImageIcon size={14}/>} onChange={(v:any) => {
                           const newList = adminState.content[editingCategory].map((i:any) => i.id === item.id ? {...i, image: v} : i);
                           updateField(`content.${editingCategory}`, newList);
                        }} />
                        <InputGroup label="링크" value={item.link} icon={<LinkIcon size={14}/>} onChange={(v:any) => {
                           const newList = adminState.content[editingCategory].map((i:any) => i.id === item.id ? {...i, link: v} : i);
                           updateField(`content.${editingCategory}`, newList);
                        }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="space-y-12 animate-reveal">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard label="누적 감사 로그" value={analytics.total} unit="건" icon={<Database/>} color="text-burgundy-500" />
              <StatCard label="데이터 거버넌스" value="30" unit="일" icon={<ShieldCheck/>} color="text-charcoal" />
              <StatCard label="자동 파기 활성" value="100" unit="%" icon={<HardDrive/>} color="text-green-600" />
           </div>

           <div className="bg-white p-12 rounded-[60px] border border-gray-100 shadow-sm space-y-10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                 <h3 className="text-2xl font-black text-charcoal">보안 로그 (IP & Action)</h3>
                 <div className="flex gap-4">
                    <select 
                      className="px-6 py-3 bg-surface rounded-xl text-xs font-bold outline-none border border-gray-100"
                      value={logFilterRange}
                      onChange={(e) => setLogFilterRange(Number(e.target.value) as any)}
                    >
                       <option value={1}>최근 1일</option>
                       <option value={7}>최근 7일</option>
                       <option value={30}>최근 30일</option>
                    </select>
                    <button onClick={() => exportLogsToCSV(logFilterRange)} className="flex items-center gap-2 bg-charcoal text-white px-6 py-3 rounded-xl text-xs font-black hover:bg-black transition-all">
                       <Download size={14}/> CSV 추출
                    </button>
                 </div>
              </div>

              <div className="overflow-x-auto rounded-[32px] bg-surface">
                <table className="w-full text-left text-[11px]">
                   <thead>
                      <tr className="text-gray-400 border-b uppercase tracking-widest font-black">
                         <th className="p-6">Timestamp</th>
                         <th className="p-6">IP Address</th>
                         <th className="p-6">Action</th>
                         <th className="p-6">Page</th>
                         <th className="p-6">Meta</th>
                      </tr>
                   </thead>
                   <tbody>
                      {(adminState.cookieLogs || []).slice(0, 100).map((log: any) => (
                         <tr key={log.id} className="border-b border-gray-50/50 hover:bg-white transition-colors">
                            <td className="p-6 font-mono text-gray-400">{log.date}</td>
                            <td className="p-6 font-bold text-charcoal">{log.ip}</td>
                            <td className="p-6 font-bold text-burgundy-500">{log.action}</td>
                            <td className="p-6 text-gray-500">{log.page}</td>
                            <td className="p-6"><button onClick={() => setSelectedLog(log)} className="text-[9px] font-black uppercase text-gray-300 hover:text-charcoal"><Eye size={12}/></button></td>
                         </tr>
                      ))}
                   </tbody>
                </table>
              </div>
           </div>
        </div>
      )}

      {selectedLog && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-6" onClick={() => setSelectedLog(null)}>
          <div className="bg-white p-12 rounded-[60px] max-w-lg w-full text-charcoal space-y-10 animate-reveal" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start border-b pb-6">
              <h4 className="text-2xl font-black text-burgundy-500 tracking-tighter uppercase italic">Log Trace</h4>
              <button onClick={() => setSelectedLog(null)} className="text-gray-300 hover:text-charcoal transition-colors"><X size={24}/></button>
            </div>
            <div className="grid grid-cols-2 gap-8 text-xs font-medium">
              <MetaItem label="Browser Info" value={selectedLog.browser} />
              <MetaItem label="OS / Platform" value={selectedLog.os} />
              <MetaItem label="Device Type" value={selectedLog.deviceType} />
              <MetaItem label="Consent" value={selectedLog.consent} />
              <div className="col-span-2 space-y-2">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full IP Address</p>
                 <p className="font-mono text-sm bg-charcoal text-white p-5 rounded-2xl tracking-tighter">{selectedLog.ip}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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
       <div className="flex justify-between items-center"><span className="text-xl font-black text-charcoal">{label}</span><ToggleGroup label="Status" active={available} onToggle={() => onUpdate('available', !available)} /></div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><InputGroup label="Price" value={price} onChange={(v:any) => onUpdate('price', v)} /><InputGroup label="Apply Link" value={link} onChange={(v:any) => onUpdate('link', v)} /></div>
    </div>
  );
}
function MetaItem({ label, value }: any) {
  return (
    <div className="space-y-1"><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p><p className="font-bold break-all leading-relaxed text-charcoal">{value}</p></div>
  );
}
