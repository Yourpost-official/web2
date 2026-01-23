
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 관리자 전용 API 보호
  if (pathname.startsWith('/api/admin/data')) {
    const session = request.cookies.get('admin_session');
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized: Session missing' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/data/:path*'],
};
