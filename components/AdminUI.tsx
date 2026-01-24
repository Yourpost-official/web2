import React, { useRef } from 'react';
import { 
  ChevronRight, Bold, Italic, Heading2, List, Link as LinkIcon, Image as ImageIcon 
} from 'lucide-react';

// --- UI 컴포넌트 분리 ---

/**
 * 탭 메뉴 버튼
 */
interface TabBtnProps {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}
export function TabBtn({ active, onClick, label, icon }: TabBtnProps) {
  return (
    <button 
      onClick={onClick} 
      className={`flex items-center gap-3 px-8 py-4 rounded-full text-xs font-black transition-all ${active ? 'bg-charcoal text-white shadow-xl' : 'bg-white text-gray-400 border border-gray-100 hover:border-charcoal/20'}`}
    >
      {icon} {label}
    </button>
  );
}

/**
 * 카테고리 선택 버튼
 */
export function CategoryBtn({ active, onClick, label, icon }: TabBtnProps) {
  return (
    <button 
      onClick={onClick} 
      className={`w-full text-left px-8 py-6 rounded-[32px] font-black transition-all flex justify-between items-center ${active ? 'bg-burgundy-500 text-white shadow-xl translate-x-2' : 'bg-white text-gray-500 border border-gray-50 hover:bg-gray-50'}`}
    >
       <div className="flex items-center gap-3">{icon}{label}</div>
       {active && <ChevronRight size={18} />}
    </button>
  );
}

/**
 * 관리 섹션 카드 컨테이너
 */
interface AdminCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}
export function AdminCard({ title, icon, children }: AdminCardProps) {
  return (
    <div className="bg-white p-12 rounded-[60px] shadow-sm border border-gray-100 space-y-10">
      <h3 className="text-3xl font-black flex items-center gap-5 text-charcoal">{icon} {title}</h3>
      {children}
    </div>
  );
}

/**
 * 공통 입력 필드 (Input)
 */
interface InputGroupProps {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
}
export function InputGroup({ label, value, onChange }: InputGroupProps) {
  return (
    <div className="space-y-3 w-full text-left">
      <label className="text-xs font-black uppercase tracking-widest text-gray-400 pl-4">{label}</label>
      <input 
        aria-label={label || "입력 필드"} 
        className="w-full px-8 py-5 bg-[#FCF9F5] rounded-2xl outline-none font-black text-sm border-2 border-transparent focus:border-burgundy-500/20 transition-all text-charcoal" 
        value={value} 
        onChange={e => onChange(e.target.value)} 
      />
    </div>
  );
}

/**
 * 마크다운 에디터
 */
export function MarkdownEditor({ label, value, onChange }: InputGroupProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const insertTag = (tag: string) => {
    const textarea = textareaRef.current;
    const textValue = String(value);
    if (!textarea) {
      onChange(textValue + tag);
      return;
    }
    const { selectionStart, selectionEnd } = textarea;
    const textBefore = textValue.substring(0, selectionStart);
    const selectedText = textValue.substring(selectionStart, selectionEnd);
    const textAfter = textValue.substring(selectionEnd);

    const [startTag, endTag] = tag.split('{{text}}');

    onChange(`${textBefore}${startTag}${selectedText || ''}${endTag || ''}${textAfter}`);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = textBefore.length + startTag.length + (selectedText || '').length;
    }, 0);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      insertTag(`!${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3 w-full text-left">
      <div className="flex justify-between items-end px-4">
        <label className="text-xs font-black uppercase tracking-widest text-gray-400">{label}</label>
        <div className="flex flex-wrap gap-2 text-gray-500">
           <button type="button" onClick={() => insertTag('**{{text}}**')} className="p-1 hover:bg-gray-200 rounded" title="Bold"><Bold size={14}/></button>
           <button type="button" onClick={() => insertTag('*{{text}}*')} className="p-1 hover:bg-gray-200 rounded" title="Italic"><Italic size={14}/></button>
           <button type="button" onClick={() => insertTag('## {{text}}')} className="p-1 hover:bg-gray-200 rounded" title="Heading"><Heading2 size={14}/></button>
           <button type="button" onClick={() => insertTag('\n- {{text}}')} className="p-1 hover:bg-gray-200 rounded" title="List"><List size={14}/></button>
           <button type="button" onClick={() => {
             const url = window.prompt('링크 주소를 입력하세요');
             if(url) insertTag(`링크 텍스트`);
           }} className="p-1 hover:bg-gray-200 rounded" title="Link"><LinkIcon size={14}/></button>
           <button type="button" onClick={() => fileInputRef.current?.click()} className="p-1 hover:bg-gray-200 rounded" title="Image Upload">
             <ImageIcon size={14}/>
           </button>
           <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
        </div>
      </div>
      <textarea 
        ref={textareaRef}
        aria-label={label || "에디터"}
        className="w-full px-8 py-5 bg-[#FCF9F5] rounded-2xl outline-none font-medium text-sm h-60 border-2 border-transparent focus:border-burgundy-500/20 resize-none transition-all text-charcoal font-mono leading-relaxed" 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        placeholder="마크다운 문법 사용 가능 (예: **강조**)"
      />
    </div>
  );
}

/**
 * 토글 스위치
 */
interface ToggleGroupProps {
  label: string;
  active: boolean;
  onToggle: () => void;
}
export function ToggleGroup({ label, active, onToggle }: ToggleGroupProps) {
  return (
    <div className="flex items-center justify-between p-6 bg-[#FCF9F5] rounded-3xl w-full">
      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{label}</span>
      <button 
        type="button"
        onClick={onToggle} 
        className={`w-16 h-8 rounded-full relative transition-colors ${active ? 'bg-burgundy-500' : 'bg-gray-200'}`}
      >
        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${active ? 'right-1' : 'left-1'}`} />
      </button>
    </div>
  );
}

/**
 * 색상 선택기
 */
interface ColorPickerProps {
  label: string;
  value?: string;
  onChange: (color: string) => void;
}
export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const colors = [
    { id: 'burgundy', class: 'bg-[#8B2E2E]' },
    { id: 'charcoal', class: 'bg-[#2D2D2D]' },
    { id: 'blue', class: 'bg-blue-500' },
    { id: 'green', class: 'bg-green-500' },
    { id: 'orange', class: 'bg-orange-500' }
  ];
  
  return (
    <div className="space-y-3">
      <label className="text-xs font-black uppercase tracking-widest text-gray-400 pl-4">{label}</label>
      <div className="flex gap-3 px-4">
        {colors.map((color) => (
          <button
            type="button"
            key={color.id}
            onClick={() => onChange(color.id)}
            className={`w-8 h-8 rounded-full border-2 transition-transform ${color.class} ${value === color.id ? 'border-black scale-110' : 'border-transparent'}`}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * 서비스 제어
 */
interface ServiceControlProps {
  label: string;
  price: string;
  link: string;
  available: boolean;
  onUpdate: (field: string, value: any) => void;
}
export function ServiceControl({ label, price, link, available, onUpdate }: ServiceControlProps) {
  return (
    <div className="bg-[#FCF9F5] p-8 rounded-[40px] space-y-6 border border-gray-50 transition-all hover:border-burgundy-500/10">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <span className="text-xl font-black text-charcoal">{label}</span>
         <ToggleGroup label="활성 상태" active={available} onToggle={() => onUpdate('available', !available)} />
       </div>
       <InputGroup label="표시 가격" value={price} onChange={(v) => onUpdate('price', v)} />
       <InputGroup label="신청 링크" value={link} onChange={(v) => onUpdate('link', v)} />
    </div>
  );
}