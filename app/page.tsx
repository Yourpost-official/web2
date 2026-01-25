import { createClient } from '@supabase/supabase-js';
import Home from './_components/Home';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TopBanner from '../components/TopBanner';
import Popup from '../components/Popup';
import { AdminState } from './types/admin';

// Supabase 클라이언트 초기화 (Server Side)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

// CMS 데이터 페칭 함수 (Server Side)
async function getCMSData(): Promise<AdminState> {
  if (!supabase) return {};
  
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('data')
      .order('id', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('CMS Fetch Error:', error.message);
      return {};
    }
    return data?.data ?? {};
  } catch (e) {
    console.error('CMS Fetch Exception:', e);
    return {};
  }
}

// 순수 Server Component
export default async function Page() {
  const adminState = await getCMSData();

  return (
    <div className="flex flex-col min-h-screen bg-cream text-charcoal">
      {/* 상단 배너 */}
      {adminState?.banner?.showTop && adminState?.banner?.top && (
        <TopBanner type={adminState.banner.top.type} message={adminState.banner.top.message} />
      )}

      {/* 헤더 */}
      <Header />

      <main className="flex-grow animate-reveal">
        {/* 홈 UI (Client Component) */}
        <Home adminState={adminState} />
      </main>

      {/* 팝업 */}
      {adminState?.banner?.showPopup && adminState?.banner?.popup && (
        <Popup title={adminState.banner.popup.title} message={adminState.banner.popup.message} />
      )}

      {/* 푸터 */}
      <Footer adminState={adminState} />
    </div>
  );
}