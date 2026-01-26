import { createClient } from '@supabase/supabase-js';
import { AdminState } from '@/types/admin';

// 서버 측 데이터 로딩에는 서버 전용 환경 변수를 사용해야 합니다.
// 이는 보안적으로 안전하며, 클라이언트용(NEXT_PUBLIC_) 변수와 역할을 명확히 분리합니다.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Supabase 클라이언트가 초기화되지 않았을 경우를 대비한 에러 핸들링 추가
if (!supabaseUrl || !supabaseKey) {
  // 이 로그는 빌드 시 또는 서버 측 렌더링 시 서버 콘솔에 표시됩니다.
  console.error("Supabase 서버 환경 변수(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)가 설정되지 않았습니다.");
}
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

export async function getCMSData(): Promise<AdminState> {
  // 클라이언트 초기화에 실패하면 페이지가 완전히 깨지는 것을 방지하고 빈 데이터를 반환합니다.
  if (!supabase) return {};
  
  try {
    // API 라우트와 일관성을 맞추고 안정성을 높이기 위해 쿼리를 수정합니다.
    // .eq('id', 1): 항상 동일한 설정 행을 대상으로 작업합니다.
    // .maybeSingle(): 대상 행이 없어도 오류를 발생시키지 않고 null을 반환하여 더 안전합니다.
    const { data, error } = await supabase
      .from('site_settings')
      .select('data')
      .eq('id', 1)
      .maybeSingle();

    if (error) throw error;
    // 데이터가 없거나(null), data 필드가 없는 경우 빈 객체를 반환합니다.
    return data?.data ?? {};
  } catch (e) {
    console.error('CMS 데이터 로딩 중 오류 발생 (lib/supabase.ts):', e instanceof Error ? e.message : String(e));
    // 오류 발생 시에도 페이지 렌더링이 중단되지 않도록 빈 객체를 반환합니다.
    return {};
  }
}