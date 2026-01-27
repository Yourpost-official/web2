import { AdminState } from '@/types/admin';

// 서버 측 데이터 로딩에는 서버 전용 환경 변수를 사용합니다.
// 이는 보안적으로 안전하며, 클라이언트용(NEXT_PUBLIC_) 변수와 역할을 명확히 분리합니다.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function getCMSData(): Promise<AdminState> {
  // 환경변수 검증
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase 환경변수가 설정되지 않았습니다.');
    return {};
  }

  try {
    // Next.js fetch API를 사용하여 캐싱 지원
    // 1시간(3600초) 동안 캐시되며, 'cms-data' 태그로 수동 무효화 가능
    const response = await fetch(
      `${supabaseUrl}/rest/v1/site_settings?id=eq.1&select=data`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 3600, // 1시간 캐싱
          tags: ['cms-data'],
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Supabase fetch failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    // Supabase는 배열을 반환하므로 첫 번째 항목 추출
    if (Array.isArray(result) && result.length > 0) {
      return result[0]?.data ?? {};
    }

    return {};
  } catch (e) {
    console.error('CMS 데이터 로딩 중 오류 발생 (lib/supabase.ts):', e instanceof Error ? e.message : String(e));
    // 오류 발생 시에도 페이지 렌더링이 중단되지 않도록 빈 객체를 반환합니다.
    return {};
  }
}