
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('admin_session');
  const { pathname } = request.nextUrl;

  // 관리자 권한이 필요한 API 및 페이지 보호
  if (pathname.startsWith('/api/admin/data') && !session) {
    return NextResponse.json({ message: 'Unauthorized access' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/data/:path*'],
};
