import { NextResponse } from 'next/server';
import { createSession } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';
import { extractIP } from '@/lib/ip-utils';

/**
 * 관리자 로그인 API 엔드포인트
 * POST 요청을 통해 아이디와 비밀번호를 검증하고 인증 쿠키를 발급합니다.
 * Rate Limiting: 1분당 5회 제한 (Brute Force 공격 방지)
 */
export async function POST(request: Request) {
  try {
    // IP 주소 추출
    const ip = extractIP(request.headers);

    // Rate Limiting 체크
    const rateLimitResult = rateLimit(ip);
    if (!rateLimitResult.success) {
      console.warn(`[Login] Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        {
          message: '로그인 시도가 너무 많습니다. 1분 후 다시 시도해주세요.',
          error: 'RATE_LIMIT_EXCEEDED',
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'Retry-After': '60',
          },
        }
      );
    }

    // 요청 본문에서 아이디와 비밀번호 추출
    const { username, password } = await request.json();

    // Vercel 환경 변수에서 관리자 정보 로드 (보안을 위해 서버 측에서만 접근)
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // 환경 변수가 설정되지 않았을 경우에 대한 방어 코드
    if (!adminUsername || !adminPassword) {
      console.error('관리자 환경 변수가 설정되지 않았습니다.');
      return NextResponse.json(
        { message: '서버 설정 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 아이디 및 비밀번호 검증
    if (username === adminUsername && password === adminPassword) {
      // JWT 세션 생성
      await createSession();

      console.log(`[Login] 성공 - IP: ${ip}`);
      return NextResponse.json(
        { message: '로그인에 성공했습니다.' },
        {
          headers: {
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
          },
        }
      );
    } else {
      // 인증 실패 시 401 Unauthorized 반환
      console.warn(`[Login] 실패 - IP: ${ip}`);
      return NextResponse.json(
        { message: '아이디 또는 비밀번호가 올바르지 않습니다.' },
        {
          status: 401,
          headers: {
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
          },
        }
      );
    }
  } catch (error) {
    // 예기치 못한 에러 처리
    console.error('로그인 처리 중 오류 발생:', error);
    return NextResponse.json(
      { message: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
