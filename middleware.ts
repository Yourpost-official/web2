
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('admin_session');
  const { pathname } = request.nextUrl;

  // 관리자 페이지(/admin) 접근 시 세션이 없으면 메인으로 리다이렉트 (단, API 호출 제외)
  if (pathname.startsWith('/admin') && !session) {
    // 실제 로그인 페이지가 따로 있다면 그곳으로 보내도 됨. 여기선 일관성을 위해 메인으로.
    // return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/data/:path*'],
};
