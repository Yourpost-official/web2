/**
 * Rate Limiter - IP 기반 로그인 시도 제한
 * 1분당 5회 제한
 *
 * 메모리 기반 저장소 사용 (Vercel Serverless 환경에서 각 인스턴스별 독립)
 * 향후 Redis (Vercel KV) 로 확장 가능
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetAt: number;
  };
}

const store: RateLimitStore = {};

// 메모리 정리 (5분마다 만료된 항목 제거)
setInterval(() => {
  const now = Date.now();
  for (const key in store) {
    if (store[key].resetAt < now) {
      delete store[key];
    }
  }
}, 5 * 60 * 1000);

/**
 * Rate Limiting 확인 함수
 * @param ip - 클라이언트 IP 주소
 * @returns {success: boolean, remaining: number} - 성공 여부 및 남은 시도 횟수
 */
export function rateLimit(ip: string): { success: boolean; remaining: number } {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1분
  const maxAttempts = 5;

  // 새로운 IP 또는 윈도우가 만료된 경우
  if (!store[ip] || store[ip].resetAt < now) {
    store[ip] = {
      count: 1,
      resetAt: now + windowMs,
    };
    return { success: true, remaining: maxAttempts - 1 };
  }

  // 제한 초과 확인
  if (store[ip].count >= maxAttempts) {
    return { success: false, remaining: 0 };
  }

  // 시도 횟수 증가
  store[ip].count++;
  return { success: true, remaining: maxAttempts - store[ip].count };
}

/**
 * Rate Limit 리셋 (테스트용)
 * @param ip - 리셋할 IP 주소
 */
export function resetRateLimit(ip: string): void {
  delete store[ip];
}
