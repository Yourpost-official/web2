import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * 관리자 로그아웃 API 엔드포인트
 * POST 요청 시 인증 쿠키를 삭제합니다.
 */
export async function POST() {
  const cookieStore = cookies();
  
  // isAdmin 쿠키 삭제 (만료 시간을 과거로 설정)
  cookieStore.set('isAdmin', '', {
    path: '/',
    maxAge: 0,
  });

  return NextResponse.json({ message: '로그아웃 되었습니다.' });
}
