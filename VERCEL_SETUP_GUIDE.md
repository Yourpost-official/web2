# Vercel 환경변수 설정 가이드

## 📋 목차
1. [Supabase 프로젝트 생성](#1-supabase-프로젝트-생성)
2. [데이터베이스 스키마 설정](#2-데이터베이스-스키마-설정)
3. [환경변수 수집](#3-환경변수-수집)
4. [Vercel 환경변수 설정](#4-vercel-환경변수-설정)
5. [배포 및 테스트](#5-배포-및-테스트)
6. [문제 해결](#6-문제-해결)

---

## 1. Supabase 프로젝트 생성

### 1.1 Supabase 계정 생성
1. https://supabase.com 접속
2. "Start your project" 클릭
3. GitHub 계정으로 로그인

### 1.2 새 프로젝트 생성
1. Dashboard에서 "New Project" 클릭
2. 다음 정보 입력:
   - **Name**: `yourpost-production` (또는 원하는 이름)
   - **Database Password**: 강력한 비밀번호 생성 (저장 필수!)
   - **Region**: `Northeast Asia (Seoul)` 선택 (한국 서버)
   - **Pricing Plan**: Free 또는 Pro 선택
3. "Create new project" 클릭
4. 프로젝트 생성 완료까지 대기 (약 2분)

---

## 2. 데이터베이스 스키마 설정

### 2.1 SQL Editor 접근
1. Supabase Dashboard에서 좌측 메뉴의 **"SQL Editor"** 클릭
2. "+ New query" 버튼 클릭

### 2.2 스키마 실행
1. 프로젝트 루트의 `supabase-schema.sql` 파일 내용을 복사
2. SQL Editor에 붙여넣기
3. 우측 하단의 **"Run"** 버튼 클릭
4. 성공 메시지 확인: ✓ Success. No rows returned

### 2.3 데이터 확인
1. 좌측 메뉴의 **"Table Editor"** 클릭
2. 다음 테이블이 생성되었는지 확인:
   - `site_settings` (1개 행)
   - `access_logs` (0개 행)

---

## 3. 환경변수 수집

### 3.1 Supabase API Keys 확인
1. Supabase Dashboard에서 좌측 메뉴의 **"Settings"** (⚙️) 클릭
2. "API" 섹션 선택
3. 다음 값들을 메모장에 복사:

#### Project URL
```
https://xxxxxxxxxxxxx.supabase.co
```
- 예시: `https://abcdefghijklmnop.supabase.co`

#### anon public (공개 키)
```
eyJhbGci...
```
- 클라이언트 사이드에서 사용 (보안상 안전)
- 약 150자 길이의 JWT 토큰

#### service_role secret (비밀 키) ⚠️ 절대 노출 금지
```
eyJhbGci...
```
- 서버 사이드에서 사용 (RLS 우회 가능)
- 약 150자 길이의 JWT 토큰
- **주의**: 이 키는 절대 GitHub에 커밋하거나 클라이언트에 노출하지 마세요!

---

### 3.2 관리자 계정 설정
다음 값들을 직접 생성하세요:

#### ADMIN_USERNAME
```
admin
```
- 관리자 아이디 (원하는 값으로 변경 가능)

#### ADMIN_PASSWORD
```
YourSecurePassword123!
```
- 강력한 비밀번호 사용 (최소 12자, 대소문자/숫자/특수문자 포함)
- 예시: `YourPost2024!SecureAdmin`

#### JWT_SECRET
```bash
# 랜덤 32자 이상 문자열 생성 (Mac/Linux)
openssl rand -base64 32

# Windows PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```
- 생성 예시: `a7B9c3D1e5F7g9H1i3J5k7L9m1N3o5P7`
- 최소 32자 이상의 랜덤 문자열

---

## 4. Vercel 환경변수 설정

### 4.1 Vercel Dashboard 접속
1. https://vercel.com 로그인
2. YourPost 프로젝트 선택
3. 상단 메뉴에서 **"Settings"** 클릭
4. 좌측 메뉴에서 **"Environment Variables"** 선택

### 4.2 환경변수 추가
다음 환경변수들을 하나씩 추가하세요.

#### Add Environment Variable 버튼 클릭 후 입력:

---

#### 1. SUPABASE_URL
```
Name: SUPABASE_URL
Value: https://xxxxxxxxxxxxx.supabase.co
Environments: ✓ Production ✓ Preview ✓ Development
```

---

#### 2. SUPABASE_SERVICE_ROLE_KEY
```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGci... (service_role secret 전체)
Environments: ✓ Production ✓ Preview ✓ Development
```

---

#### 3. NEXT_PUBLIC_SUPABASE_URL
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://xxxxxxxxxxxxx.supabase.co
Environments: ✓ Production ✓ Preview ✓ Development
```

---

#### 4. NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGci... (anon public 전체)
Environments: ✓ Production ✓ Preview ✓ Development
```

---

#### 5. ADMIN_USERNAME
```
Name: ADMIN_USERNAME
Value: admin
Environments: ✓ Production ✓ Preview ✓ Development
```

---

#### 6. ADMIN_PASSWORD
```
Name: ADMIN_PASSWORD
Value: YourSecurePassword123!
Environments: ✓ Production ✓ Preview ✓ Development
```

---

#### 7. JWT_SECRET
```
Name: JWT_SECRET
Value: a7B9c3D1e5F7g9H1i3J5k7L9m1N3o5P7 (32자 이상)
Environments: ✓ Production ✓ Preview ✓ Development
```

---

### 4.3 환경변수 확인
모든 환경변수가 추가되었는지 확인:
- 총 7개 환경변수
- 각 변수마다 Production/Preview/Development 모두 체크

---

## 5. 배포 및 테스트

### 5.1 재배포 트리거
1. Vercel Dashboard → Deployments 탭
2. 최신 배포 선택 → "Redeploy" 버튼 클릭
3. "Redeploy with current Build Cache" 선택
4. 배포 완료 대기 (약 2-3분)

### 5.2 배포 성공 확인
1. 배포 로그에서 다음 메시지 확인:
   ```
   ✓ Compiled successfully
   ✓ Generating static pages
   ✓ Build completed
   ```

2. 에러가 없는지 확인:
   - ❌ "JWT_SECRET is not defined" → JWT_SECRET 확인
   - ❌ "Supabase fetch failed" → SUPABASE_URL 확인

### 5.3 프로덕션 테스트

#### 5.3.1 홈페이지 접속
1. https://yourpost.co.kr 접속
2. 페이지가 정상적으로 로드되는지 확인

#### 5.3.2 관리자 페이지 테스트
1. https://yourpost.co.kr/admin 접속
2. 설정한 ADMIN_USERNAME과 ADMIN_PASSWORD로 로그인
3. 로그인 성공 확인

#### 5.3.3 CMS 기능 테스트
1. 관리자 대시보드에서 "Settings" 탭 클릭
2. 배너 메시지 변경: "테스트 배너"
3. "💾 변경사항 저장" 버튼 클릭
4. 성공 메시지 확인: "✅ 저장 완료!"
5. 새 탭에서 https://yourpost.co.kr 열어서 배너가 표시되는지 확인

#### 5.3.4 로그 수집 테스트
1. 관리자 대시보드에서 "Logs" 탭 클릭
2. 접근 로그가 표시되는지 확인
3. IP, 페이지, 시간 등이 올바르게 기록되는지 확인

---

## 6. 문제 해결

### 6.1 CMS 데이터가 로드되지 않음

#### 증상
- 홈페이지에 FAQ가 표시되지 않음
- 배너 설정이 반영되지 않음

#### 해결 방법
1. Supabase Dashboard → Table Editor → site_settings 테이블 확인
2. id=1 레코드가 있는지 확인
3. 없다면 SQL Editor에서 다시 실행:
   ```sql
   INSERT INTO site_settings (id, data)
   VALUES (1, '{}'::jsonb)
   ON CONFLICT (id) DO NOTHING;
   ```

---

### 6.2 관리자 로그인 실패

#### 증상
- "로그인 실패" 메시지 표시
- 401 Unauthorized 에러

#### 해결 방법
1. Vercel Dashboard → Settings → Environment Variables 확인
2. ADMIN_USERNAME, ADMIN_PASSWORD가 올바른지 확인
3. JWT_SECRET이 32자 이상인지 확인
4. 환경변수 수정 후 반드시 **Redeploy** 실행

---

### 6.3 Supabase 연결 실패

#### 증상
- "Database configuration missing" 에러
- "Supabase fetch failed: 401" 에러

#### 해결 방법
1. Supabase Dashboard → Settings → API 확인
2. Project URL이 `https://`로 시작하는지 확인
3. service_role key가 완전히 복사되었는지 확인 (약 150자)
4. Vercel 환경변수에 공백이 없는지 확인
5. 재배포 실행

---

### 6.4 RLS (Row Level Security) 에러

#### 증상
- "new row violates row-level security policy" 에러

#### 해결 방법
1. Supabase Dashboard → SQL Editor
2. 다음 쿼리 실행하여 RLS 정책 확인:
   ```sql
   SELECT * FROM pg_policies WHERE tablename IN ('site_settings', 'access_logs');
   ```
3. 정책이 없다면 `supabase-schema.sql` 다시 실행

---

### 6.5 빌드 에러

#### 증상
- Vercel 배포 중 "Build failed" 에러

#### 해결 방법
1. Vercel 배포 로그에서 에러 메시지 확인
2. 주요 에러 패턴:
   ```
   Error: JWT_SECRET environment variable is not set
   ```
   → JWT_SECRET 환경변수 추가 후 재배포

   ```
   TypeError: Cannot read property 'data' of undefined
   ```
   → Supabase site_settings 테이블에 데이터 추가

---

### 6.6 쿠키 동의 저장 안 됨

#### 증상
- 쿠키 팝업에서 동의해도 DB에 기록되지 않음

#### 해결 방법
1. 브라우저 개발자 도구 → Network 탭 확인
2. `/api/track` 요청이 200 OK인지 확인
3. Supabase Dashboard → Table Editor → access_logs 확인
4. 데이터가 없다면:
   ```sql
   -- RLS 정책 확인
   SELECT * FROM pg_policies WHERE tablename = 'access_logs';

   -- INSERT 정책이 없다면 추가
   CREATE POLICY "access_logs_insert_policy"
   ON access_logs FOR INSERT
   WITH CHECK (true);
   ```

---

## 7. 보안 체크리스트

배포 전 다음 사항을 확인하세요:

- [ ] SUPABASE_SERVICE_ROLE_KEY가 GitHub에 커밋되지 않았는지 확인
- [ ] JWT_SECRET이 32자 이상의 랜덤 문자열인지 확인
- [ ] ADMIN_PASSWORD가 강력한 비밀번호인지 확인 (12자 이상, 복잡)
- [ ] .env 파일이 .gitignore에 포함되어 있는지 확인
- [ ] NEXT_PUBLIC_* 변수만 클라이언트에 노출되는지 확인
- [ ] Supabase RLS 정책이 올바르게 설정되었는지 확인

---

## 8. 유지보수

### 8.1 정기 작업

#### 로그 정리 (매월)
```sql
-- 30일 이상 된 로그 삭제
DELETE FROM access_logs WHERE created_at < NOW() - INTERVAL '30 days';
```

#### 데이터 백업 (매주)
```sql
-- CMS 데이터 백업
SELECT data::text FROM site_settings WHERE id = 1;
```

### 8.2 모니터링

#### Vercel Analytics
- Dashboard → Analytics에서 트래픽 확인

#### Supabase Logs
- Dashboard → Logs에서 데이터베이스 에러 확인

---

## 9. 추가 리소스

- **Supabase 공식 문서**: https://supabase.com/docs
- **Next.js 환경변수 가이드**: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
- **Vercel 환경변수 문서**: https://vercel.com/docs/projects/environment-variables

---

## 10. 문의

설정 중 문제가 발생하면:
1. Vercel 배포 로그 스크린샷
2. Supabase 에러 메시지
3. 브라우저 개발자 도구 Console 에러

위 정보를 첨부하여 문의해주세요.

---

**마지막 업데이트**: 2026-01-27
