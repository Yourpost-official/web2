import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// JWT 비밀키 설정 (환경변수가 없으면 폴백 키 사용 - 프로덕션에서는 반드시 환경변수 설정 필요)
const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secure-jwt-secret-key-change-this');
const ALG = 'HS256';
const COOKIE_NAME = 'admin_session';

/**
 * 관리자 세션 생성 (로그인)
 */
export async function createSession() {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime('2h') // 2시간 유효
    .sign(SECRET_KEY);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7200, // 2시간
  });
}

/**
 * 관리자 세션 검증 (API 보호)
 */
export async function verifySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY, { algorithms: [ALG] });
    return payload.role === 'admin';
  } catch (error) {
    return false;
  }
}

/**
 * 관리자 세션 삭제 (로그아웃)
 */
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}