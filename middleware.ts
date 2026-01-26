import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js 미들웨어
 * 요청이 서버로 도달하기 전에 실행되며, 인증 및 접근 제어를 처리합니다.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /**
   * 관리자 전용 경로 (/admin) 보호 로직
   */
  if (pathname.startsWith('/admin')) {
    // 쿠키 기반 인증 로직 비활성화 (클라이언트 사이드 인증으로 대체)
    // const isAdmin = request.cookies.get('isAdmin');
    
    // if (!isAdmin || isAdmin.value !== 'true') {
    //   return NextResponse.redirect(new URL('/', request.url));
    // }
  }

  // 그 외의 요청은 정상적으로 통과
  return NextResponse.next();
}

/**
 * 미들웨어가 실행될 대상 경로 설정
 */
export const config = {
  // 관리자 경로에 대해서만 미들웨어 활성화
  matcher: [
    '/admin/:path*',
  ],
};
