import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 관리자 전용 경로 보호
  if (pathname.startsWith('/admin')) {
    const session = request.cookies.get('admin_session');
    
    if (!session || session.value !== 'authenticated_token_v1') {
      // 세션이 없으면 메인 페이지로 리다이렉트
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // 정적 자산, API, 파비콘 등을 제외한 관리자 경로만 매칭
  matcher: [
    '/admin',
    '/admin/((?!_next|favicon.ico|.*\\..*).*)',
  ],
};
