
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    // 환경 변수가 설정되지 않은 경우 보안을 위해 접근 차단
    if (!adminPassword) {
      return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
    }

    if (password === adminPassword) {
      const response = NextResponse.json({ success: true, message: 'Logged in successfully' });
      
      // HttpOnly 쿠키 설정: 클라이언트 JS에서 접근 불가, HTTPS 필수
      response.cookies.set('admin_session', 'authenticated_token_v1', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 2, // 2시간 세션
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_session');
  return response;
}
