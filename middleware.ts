import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

/**
 * Next.js 미들웨어
 * 요청이 서버로 도달하기 전에 실행되며, 인증 및 접근 제어를 처리합니다.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /**
   * 관리자 전용 경로 보호 로직
   * /admin 페이지는 로그인 폼이 있으므로 허용
   * API 엔드포인트만 JWT 토큰으로 보호
   */
  if (pathname.startsWith('/api/admin')) {
    const token = request.cookies.get('admin_session')?.value;

    if (!token) {
      console.log('[Middleware] API 토큰 없음 - 401 Unauthorized');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'your-secure-jwt-secret-key-change-this'
      );

      await jwtVerify(token, secret);
      console.log('[Middleware] JWT 검증 성공');
    } catch (error) {
      console.log('[Middleware] JWT 검증 실패 - 401 Unauthorized');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // 그 외의 요청은 정상적으로 통과
  return NextResponse.next();
}

/**
 * 미들웨어가 실행될 대상 경로 설정
 */
export const config = {
  // 관리자 API에 대해서만 미들웨어 활성화 (로그인 제외)
  matcher: [
    '/api/admin/cms',
    '/api/admin/logs',
    '/api/admin/data',
  ],
};
