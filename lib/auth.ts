import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const ALG = 'HS256';
const COOKIE_NAME = 'admin_session';

// JWT 비밀키를 런타임에 가져오는 함수 (빌드 타임 에러 방지)
function getSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      // 프로덕션에서는 기본값 사용 (Vercel 환경변수가 런타임에 설정됨)
      console.warn('JWT_SECRET not found, using fallback');
      return new TextEncoder().encode('your-secure-jwt-secret-key-change-this-in-production');
    }
    // 개발 환경 기본값
    return new TextEncoder().encode('your-secure-jwt-secret-key-change-this');
  }

  return new TextEncoder().encode(secret);
}

/**
 * 관리자 세션 생성 (로그인)
 */
export async function createSession() {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime('2h') // 2시간 유효
    .sign(getSecretKey());

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
    const { payload } = await jwtVerify(token, getSecretKey(), { algorithms: [ALG] });
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