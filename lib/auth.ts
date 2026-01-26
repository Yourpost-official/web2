import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// JWT 비밀키 설정 (환경변수가 없으면 폴백 키 사용 - 프로덕션에서는 반드시 환경변수 설정 필요)
function getJwtSecretKey(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET environment variable is not set in production.');
    } else {
      // 개발 환경에서는 경고를 표시하고 기본 키 사용
      console.warn(
        'Warning: The JWT_SECRET environment variable is not set. Using a default, insecure key for development purposes only.'
      );
      return 'your-secure-jwt-secret-key-change-this';
    }
  }
  return secret;
}
const SECRET_KEY = new TextEncoder().encode(getJwtSecretKey());
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