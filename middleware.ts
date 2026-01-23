import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 오직 관리자 페이지와 관리자 전용 API만 감시
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin/data')) {
    const session = request.cookies.get('admin_session');
    
    if (!session || session.value !== 'authenticated_token_v1') {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
      // 세션 없을 시 메인으로 리다이렉트
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // 메인 페이지, _next 자산, public 파일 등을 가로채지 않도록 matcher를 엄격히 제한
  matcher: [
    '/admin/:path*',
    '/api/admin/data/:path*',
  ],
};