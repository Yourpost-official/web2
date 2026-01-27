# 🔐 YourPost 보안 가이드

## 목차
1. [환경변수 설정](#환경변수-설정)
2. [JWT 인증 시스템](#jwt-인증-시스템)
3. [Rate Limiting](#rate-limiting)
4. [IP 익명화 (GDPR/PIPA 준수)](#ip-익명화)
5. [보안 체크리스트](#보안-체크리스트)
6. [문제 해결](#문제-해결)

---

## 환경변수 설정

### 필수 환경변수

YourPost는 다음 환경변수를 **Vercel Dashboard**에서 관리합니다.

#### 1. Supabase 연결

```bash
# Supabase 프로젝트 URL
SUPABASE_URL=https://your-project.supabase.co

# Supabase Service Role Key (서버 전용, RLS 우회)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 클라이언트용 공개 키
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**보안 주의사항**:
- `SUPABASE_SERVICE_ROLE_KEY`는 **절대 클라이언트에 노출하지 말 것**
- 이 키는 RLS(Row Level Security)를 우회하므로 서버 API에서만 사용
- `NEXT_PUBLIC_` 접두사가 붙은 변수만 클라이언트 접근 가능

---

#### 2. 관리자 인증

```bash
# 관리자 계정 아이디
ADMIN_USERNAME=your_admin_id

# 관리자 비밀번호 (강력한 비밀번호 필수!)
ADMIN_PASSWORD=ComplexP@ssw0rd!2024
```

**비밀번호 요구사항**:
- 최소 12자 이상
- 대문자, 소문자, 숫자, 특수문자 포함
- 사전에 없는 단어 조합
- 예시: `YP#2024!SecureAdmin$Pass`

**권장사항**:
- 비밀번호 관리자(1Password, Bitwarden 등) 사용
- 정기적으로 비밀번호 변경 (3개월마다)
- 절대 Git 커밋에 포함하지 말 것 (.env.local은 .gitignore에 포함됨)

---

#### 3. JWT Secret Key

```bash
# JWT 토큰 서명 키 (최소 32자 이상!)
JWT_SECRET=super-secret-jwt-key-minimum-32-characters-long-random-string-here
```

**생성 방법**:

```bash
# Node.js로 안전한 랜덤 키 생성
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 또는 OpenSSL 사용
openssl rand -hex 32
```

**보안 주의사항**:
- **Production 환경에서는 절대 기본값 사용 금지**
- 최소 32자 이상의 랜덤 문자열 필수
- 이 키가 노출되면 모든 JWT 토큰이 위조 가능
- 키를 변경하면 모든 기존 세션이 무효화됨

---

### Vercel Dashboard 설정 방법

1. **Vercel Dashboard 접속**
   - https://vercel.com/dashboard
   - 프로젝트 선택 (YourPost)

2. **환경변수 추가**
   - Settings → Environment Variables
   - 각 변수를 다음과 같이 추가:
     - **Key**: 환경변수 이름 (예: `JWT_SECRET`)
     - **Value**: 환경변수 값
     - **Environment**: Production, Preview, Development 선택

3. **적용 범위 선택**
   - **Production**: 실제 서비스 (yourpost.co.kr)
   - **Preview**: Pull Request 미리보기
   - **Development**: 로컬 개발 (`vercel dev` 사용 시)

4. **재배포**
   - 환경변수 추가/수정 후 **반드시 재배포** 필요
   - Deployments → Redeploy

---

### 로컬 개발 설정

**`.env.local` 파일 생성** (루트 디렉토리):

```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=TestPassword123!

# JWT
JWT_SECRET=local-development-secret-key-for-testing-only-minimum-32-chars
```

**주의**: `.env.local`은 Git에 커밋되지 않음 (.gitignore 설정됨)

---

## JWT 인증 시스템

### 개요

YourPost는 **JWT(JSON Web Token)** 기반 인증을 사용합니다.

**특징**:
- **HttpOnly 쿠키**: JavaScript로 접근 불가 (XSS 방지)
- **HS256 알고리즘**: HMAC-SHA256 서명
- **2시간 유효기간**: 자동 만료
- **SameSite=lax**: CSRF 공격 방지

---

### 인증 흐름

```
1. 사용자: 아이디/비밀번호 입력
   ↓
2. POST /api/admin/login
   ├─ Rate Limiting 체크 (1분/5회)
   ├─ 환경변수와 비교 검증
   └─ JWT 토큰 생성
   ↓
3. Set-Cookie: admin_session=<JWT>
   ├─ HttpOnly: true (JavaScript 접근 불가)
   ├─ Secure: true (HTTPS만 허용, Production)
   ├─ SameSite: lax (CSRF 방지)
   └─ Max-Age: 7200 (2시간)
   ↓
4. 클라이언트: isLoggedIn = true
   ↓
5. 이후 API 호출 시 쿠키 자동 포함
   ↓
6. 미들웨어/API: JWT 검증
   └─ 실패 시 → 홈으로 리다이렉트
```

---

### 코드 구조

#### 세션 생성 (`lib/auth.ts`)

```typescript
export async function createSession() {
  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback-secret'
  );

  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('2h')
    .sign(secret);

  cookies().set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7200, // 2시간
  });
}
```

#### 세션 검증 (`lib/auth.ts`)

```typescript
export async function verifySession(): Promise<boolean> {
  const token = cookies().get('admin_session')?.value;

  if (!token) return false;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}
```

#### 미들웨어 보호 (`middleware.ts`)

```typescript
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_session')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
    } catch {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}
```

---

## Rate Limiting

### 개요

**Brute Force 공격 방어**를 위해 IP 기반 Rate Limiting을 구현했습니다.

**제한 규칙**:
- **1분당 5회** 로그인 시도
- IP 주소별로 독립적으로 제한
- 메모리 기반 저장소 (Redis로 확장 가능)

---

### 구현 코드 (`lib/rate-limit.ts`)

```typescript
interface RateLimitStore {
  [key: string]: {
    count: number;
    resetAt: number;
  };
}

const store: RateLimitStore = {};

export function rateLimit(ip: string): { success: boolean; remaining: number } {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1분
  const maxAttempts = 5;

  // 새로운 IP 또는 윈도우가 만료된 경우
  if (!store[ip] || store[ip].resetAt < now) {
    store[ip] = {
      count: 1,
      resetAt: now + windowMs,
    };
    return { success: true, remaining: maxAttempts - 1 };
  }

  // 제한 초과 확인
  if (store[ip].count >= maxAttempts) {
    return { success: false, remaining: 0 };
  }

  // 시도 횟수 증가
  store[ip].count++;
  return { success: true, remaining: maxAttempts - store[ip].count };
}
```

---

### 적용 예시 (`app/api/admin/login/route.ts`)

```typescript
import { rateLimit } from '@/lib/rate-limit';
import { extractIP } from '@/lib/ip-utils';

export async function POST(request: Request) {
  const ip = extractIP(request.headers);

  const rateLimitResult = rateLimit(ip);
  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        message: '로그인 시도가 너무 많습니다. 1분 후 다시 시도해주세요.',
        error: 'RATE_LIMIT_EXCEEDED',
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'Retry-After': '60',
        },
      }
    );
  }

  // ... 기존 로그인 로직
}
```

---

### 확장 (Redis 사용)

**현재**: 메모리 기반 (Vercel Serverless 환경에서 각 인스턴스별 독립)

**향후**: Vercel KV (Redis) 사용 시 전역 Rate Limiting 가능

```typescript
import { kv } from '@vercel/kv';

export async function rateLimit(ip: string) {
  const key = `ratelimit:${ip}`;
  const count = await kv.incr(key);

  if (count === 1) {
    await kv.expire(key, 60); // 1분 TTL
  }

  return { success: count <= 5, remaining: Math.max(0, 5 - count) };
}
```

---

## IP 익명화

### 개요

**GDPR**(EU 일반 데이터 보호 규정) 및 **한국 개인정보보호법** 준수를 위해 IP 주소를 익명화합니다.

**처리 방식**:
- **IPv4**: 마지막 옥텟 제거 (192.168.1.100 → 192.168.1.0)
- **IPv6**: 마지막 80비트 제거 (2001:0db8:85a3::8a2e:0370:7334 → 2001:0db8::)

---

### 구현 코드 (`lib/ip-utils.ts`)

```typescript
export function anonymizeIP(ip: string): string {
  if (!ip || ip === 'unknown') return 'unknown';

  // IPv4 처리
  if (ip.includes('.')) {
    const parts = ip.split('.');
    if (parts.length === 4) {
      parts[3] = '0';
      return parts.join('.');
    }
  }

  // IPv6 처리
  if (ip.includes(':')) {
    const parts = ip.split(':');
    if (parts.length >= 4) {
      return parts.slice(0, 4).join(':') + '::';
    }
  }

  return ip;
}

export function extractIP(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIP = headers.get('x-real-ip');
  if (realIP) return realIP.trim();

  return 'unknown';
}
```

---

### 적용 위치

1. **로그인 API** (`app/api/admin/login/route.ts`)
   ```typescript
   const ip = extractIP(request.headers);
   console.log(`[Login] IP: ${ip}`); // Rate limiting용 (익명화 불필요)
   ```

2. **로그 저장 API** (`app/api/admin/logs/route.ts`)
   ```typescript
   const ip = anonymizeIP(extractIP(request.headers));
   await supabase.from('access_logs').insert([{ ip, ... }]);
   ```

3. **추적 API** (`app/api/track/route.ts`)
   ```typescript
   const ip = anonymizeIP(extractIP(request.headers));
   await supabase.from('access_logs').insert([{ ip, ... }]);
   ```

---

## 보안 체크리스트

### 배포 전 확인사항

- [ ] **환경변수 설정 완료**
  - [ ] `JWT_SECRET` 32자 이상 랜덤 문자열
  - [ ] `ADMIN_PASSWORD` 강력한 비밀번호 (12자 이상)
  - [ ] `SUPABASE_SERVICE_ROLE_KEY` 서버 전용 키만 사용
  - [ ] Vercel Dashboard에 모든 변수 등록

- [ ] **인증 시스템 테스트**
  - [ ] 로그인 성공 시 JWT 쿠키 발급 확인
  - [ ] 로그아웃 시 쿠키 삭제 확인
  - [ ] `/admin` 경로 미들웨어 보호 확인
  - [ ] 잘못된 비밀번호 시 401 응답 확인

- [ ] **Rate Limiting 테스트**
  - [ ] 1분 내 6회 이상 로그인 시도 시 429 응답
  - [ ] 1분 경과 후 재시도 가능 확인
  - [ ] `X-RateLimit-Remaining` 헤더 확인

- [ ] **IP 익명화 확인**
  - [ ] Supabase Dashboard → `access_logs` 테이블 확인
  - [ ] IP 주소가 `192.168.1.0` 형태로 저장되는지 확인
  - [ ] `unknown` 값도 정상 처리되는지 확인

- [ ] **HTTPS 설정**
  - [ ] Production 환경에서 `Secure` 쿠키 플래그 활성화
  - [ ] HTTP → HTTPS 자동 리다이렉트 확인

- [ ] **헤더 보안**
  - [ ] `X-Frame-Options: DENY` (클릭재킹 방지)
  - [ ] `X-Content-Type-Options: nosniff`
  - [ ] `Strict-Transport-Security` (HSTS)

---

### 정기 점검 항목 (월 1회)

- [ ] 관리자 비밀번호 변경 (3개월마다)
- [ ] Supabase 접근 로그 확인
- [ ] Rate Limiting 통계 확인 (공격 시도 여부)
- [ ] JWT Secret 키 순환 (6개월마다)
- [ ] 의존성 보안 업데이트 (`npm audit`)

---

## 문제 해결

### 1. 로그인이 안 됨

**증상**: 올바른 아이디/비밀번호 입력했지만 401 Unauthorized

**원인 및 해결**:

1. **환경변수 미설정**
   ```bash
   # Vercel Dashboard 확인
   Settings → Environment Variables
   # ADMIN_USERNAME, ADMIN_PASSWORD 확인
   ```

2. **환경변수 캐싱**
   ```bash
   # Vercel에서 재배포 필요
   Deployments → Redeploy
   ```

3. **로컬 환경변수 미설정**
   ```bash
   # .env.local 파일 생성 확인
   cat .env.local
   ```

---

### 2. Rate Limiting 오작동

**증상**: 첫 로그인 시도부터 429 에러

**원인 및 해결**:

1. **메모리 초기화 안 됨** (Serverless 콜드 스타트)
   ```bash
   # 1분 대기 후 재시도
   ```

2. **공유 IP 주소** (회사/학교 네트워크)
   ```bash
   # Redis 기반 Rate Limiting으로 업그레이드 권장
   ```

3. **Rate Limit 리셋** (개발 환경)
   ```typescript
   import { resetRateLimit } from '@/lib/rate-limit';
   resetRateLimit('192.168.1.0');
   ```

---

### 3. JWT 검증 실패

**증상**: 로그인 후 `/admin` 접근 시 홈으로 리다이렉트

**원인 및 해결**:

1. **JWT_SECRET 불일치**
   ```bash
   # Vercel과 로컬 환경의 JWT_SECRET이 다름
   # → Vercel 환경변수 확인 후 로컬 .env.local 동기화
   ```

2. **토큰 만료** (2시간 경과)
   ```bash
   # 재로그인 필요
   ```

3. **쿠키 SameSite 정책**
   ```bash
   # Chrome DevTools → Application → Cookies 확인
   # SameSite=lax 설정 확인
   ```

---

### 4. IP 주소가 'unknown'으로 저장됨

**증상**: Supabase `access_logs`에서 IP가 'unknown'

**원인 및 해결**:

1. **로컬 개발 환경**
   ```bash
   # localhost에서는 IP 추출 불가 (정상)
   ```

2. **Vercel Proxy 미설정**
   ```bash
   # Vercel은 자동으로 X-Forwarded-For 헤더 제공 (정상)
   ```

3. **VPN/프록시 사용**
   ```bash
   # VPN 비활성화 후 테스트
   ```

---

### 5. 환경변수가 적용 안 됨

**증상**: `process.env.JWT_SECRET`이 undefined

**원인 및 해결**:

1. **클라이언트 컴포넌트에서 접근**
   ```typescript
   // ❌ 잘못된 예시 (클라이언트 컴포넌트)
   'use client';
   console.log(process.env.JWT_SECRET); // undefined

   // ✅ 올바른 예시 (서버 컴포넌트/API)
   // app/api/... 또는 Server Component에서만 접근
   ```

2. **NEXT_PUBLIC_ 접두사 누락**
   ```bash
   # 클라이언트에서 접근 필요한 변수는 NEXT_PUBLIC_ 추가
   NEXT_PUBLIC_SUPABASE_URL=...
   ```

3. **Vercel 재배포 필요**
   ```bash
   # 환경변수 추가/수정 후 반드시 재배포
   ```

---

## 추가 보안 권장사항

### 1. CAPTCHA 추가 (선택)

Brute Force 공격 추가 방어:

```bash
npm install @hcaptcha/react-hcaptcha
```

```typescript
// 로그인 폼에 hCaptcha 추가
<HCaptcha
  sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
  onVerify={handleCaptcha}
/>
```

---

### 2. 관리자 작업 감사 로깅

관리자의 모든 CMS 수정 기록:

```typescript
// app/api/admin/cms/route.ts
await supabase.from('admin_audit_logs').insert([{
  admin_ip: anonymizeIP(extractIP(request.headers)),
  action: 'CMS_UPDATE',
  details: JSON.stringify(body),
  timestamp: new Date().toISOString(),
}]);
```

---

### 3. 2FA (Two-Factor Authentication)

추가 인증 계층:

- Google Authenticator
- SMS OTP
- 이메일 인증 코드

---

### 4. 보안 헤더 추가

`next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },
};
```

---

## 연락처

**보안 이슈 발견 시**:
- 이메일: security@yourpost.co.kr
- GitHub Issues (Private Security Advisory)

**긴급 보안 사고**:
- 즉시 환경변수 변경 (JWT_SECRET, ADMIN_PASSWORD)
- Vercel에서 즉시 재배포
- Supabase에서 의심스러운 접근 로그 확인

---

**마지막 업데이트**: 2026-01-27
**작성자**: Claude (YourPost 보안 강화 프로젝트)
