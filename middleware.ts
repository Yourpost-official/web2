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
    // API에서 설정한 'isAdmin' 쿠키 확인
    const isAdmin = request.cookies.get('isAdmin');
    
    // 쿠키가 없거나 값이 'true'가 아니면 접근 차단
    if (!isAdmin || isAdmin.value !== 'true') {
      // 보안을 위해 관리자 페이지 접근 시 권한이 없으면 메인 페이지로 강제 리다이렉트
      return NextResponse.redirect(new URL('/', request.url));
    }
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
