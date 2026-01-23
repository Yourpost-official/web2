import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * 관리자 로그인 API 엔드포인트
 * POST 요청을 통해 아이디와 비밀번호를 검증하고 인증 쿠키를 발급합니다.
 */
export async function POST(request: Request) {
  try {
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
      // Next.js 15+ 에서는 cookies() 가 Promise를 반환하므로 await가 필요합니다.
      const cookieStore = await cookies();
      
      // 보안 쿠키 설정: 클라이언트 자바스크립트에서 접근 불가(httpOnly), HTTPS 전용(secure)
      cookieStore.set('isAdmin', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 2, // 2시간 동안 유지
      });

      return NextResponse.json({ message: '로그인에 성공했습니다.' });
    } else {
      // 인증 실패 시 401 Unauthorized 반환
      return NextResponse.json(
        { message: '아이디 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
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
