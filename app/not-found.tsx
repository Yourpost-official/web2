import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FCF9F5] text-center px-6 space-y-8 animate-reveal">
      <div className="w-24 h-24 bg-burgundy-50 text-burgundy-500 rounded-[32px] flex items-center justify-center shadow-sm">
        <AlertCircle size={48} strokeWidth={1.5} />
      </div>
      
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-black text-charcoal tracking-tighter">
          길을 잃으셨나요?
        </h1>
        <p className="text-body-medium max-w-md mx-auto">
          요청하신 페이지를 찾을 수 없습니다.(404)<br/>
          삭제되었거나 주소가 변경되었을 수 있습니다.
        </p>
      </div>

      <Link 
        href="/" 
        className="btn-emotional-primary flex items-center gap-2 shadow-xl"
      >
        <Home size={18} /> 홈으로 돌아가기
      </Link>
    </div>
  );
}