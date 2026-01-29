# 관리자 페이지 "저장에 실패했습니다" 오류 해결 가이드

**문제**: 관리자 페이지에서 변경사항 저장 시 "저장에 실패했습니다" 에러 발생

**작성 날짜**: 2026-01-27

---

## 🎯 문제 진단 체크리스트

아래 단계를 **순서대로** 진행하세요.

---

## 1단계: Supabase 테이블 확인

### ✅ 테이블이 생성되었는지 확인

1. **Supabase Dashboard 접속**
   - https://supabase.com/dashboard 로그인
   - YourPost 프로젝트 선택

2. **Table Editor 확인**
   - 왼쪽 메뉴: **Table Editor** 클릭
   - 다음 테이블들이 보이는지 확인:
     - ✅ `site_settings` 테이블
     - ✅ `access_logs` 테이블

3. **site_settings 데이터 확인**
   - `site_settings` 테이블 클릭
   - **id = 1** 레코드가 있는지 확인
   - `data` 컬럼에 JSON 데이터가 있는지 확인

### ❌ 테이블이 없다면?

**SQL Editor에서 실행** (일부만 실행):

```sql
-- 기존 트리거/정책 삭제 후 재생성
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
DROP POLICY IF EXISTS "site_settings_read_policy" ON site_settings;
DROP POLICY IF EXISTS "site_settings_write_policy" ON site_settings;
DROP POLICY IF EXISTS "access_logs_insert_policy" ON access_logs;
DROP POLICY IF EXISTS "access_logs_select_policy" ON access_logs;

-- 테이블 생성
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 기본 데이터 삽입
INSERT INTO site_settings (id, data)
VALUES (1, '{
  "prices": {
    "haru": {"price": "9,900원", "available": true},
    "heartsend": {"price": "49,000원", "available": true},
    "b2b": {"price": "문의", "available": true}
  },
  "banner": {
    "showTop": false,
    "message": "",
    "color": "burgundy",
    "link": ""
  },
  "cookieSettings": {
    "enabled": true,
    "mode": "once"
  },
  "cta": {
    "mainContactEmail": "biz@yourpost.co.kr",
    "additionalInquiryLink": "https://tally.so/r/yourpost"
  },
  "content": {
    "brandStory": [],
    "press": [],
    "careers": [],
    "events": [],
    "faq": [],
    "ir": []
  }
}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 트리거 생성
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON site_settings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- RLS 정책
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "site_settings_read_policy"
ON site_settings FOR SELECT
USING (true);

CREATE POLICY "site_settings_write_policy"
ON site_settings FOR ALL
USING (false);

-- access_logs 테이블
CREATE TABLE IF NOT EXISTS access_logs (
  id BIGSERIAL PRIMARY KEY,
  ip VARCHAR(45) NOT NULL,
  action VARCHAR(50) NOT NULL,
  page VARCHAR(255),
  user_agent TEXT,
  consent_marketing BOOLEAN DEFAULT false,
  consent_analytics BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_access_logs_created_at ON access_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_access_logs_action ON access_logs(action);
CREATE INDEX IF NOT EXISTS idx_access_logs_ip ON access_logs(ip);

ALTER TABLE access_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "access_logs_insert_policy"
ON access_logs FOR INSERT
WITH CHECK (true);

CREATE POLICY "access_logs_select_policy"
ON access_logs FOR SELECT
USING (false);
```

---

## 2단계: Supabase 환경변수 확인

### ✅ Supabase Dashboard에서 API 키 가져오기

1. **Supabase Dashboard** → 프로젝트 선택
2. **Settings** (왼쪽 하단 톱니바퀴 아이콘) → **API**

3. **다음 값들을 복사**:

   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: `eyJhbGci...` (긴 문자열)
   - **service_role key**: `eyJhbGci...` (Show 버튼 클릭 후 복사) ⚠️ **매우 중요!**

---

## 3단계: 로컬 환경변수 설정 (로컬에서 테스트하는 경우)

### ✅ .env.local 파일 생성

프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고 아래 내용을 붙여넣으세요:

```env
# Supabase 설정 (위에서 복사한 값으로 교체)
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...

# JWT 인증 (32자 이상 랜덤 문자열)
JWT_SECRET=your-32-character-secret-key-here-change-this

# 관리자 계정 (원하는 값으로 변경)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

⚠️ **주의사항**:
- `SUPABASE_SERVICE_ROLE_KEY`는 절대 GitHub에 커밋하지 마세요!
- `.env.local`은 `.gitignore`에 이미 포함되어 있습니다.

### ✅ 로컬 서버 재시작

```bash
# 서버 중지 (Ctrl + C)
# 서버 재시작
npm run dev
```

---

## 4단계: Vercel 환경변수 설정 (Production 배포)

### ✅ Vercel Dashboard에서 환경변수 추가

1. **Vercel Dashboard 접속**
   - https://vercel.com/dashboard
   - YourPost 프로젝트 선택

2. **Settings** → **Environment Variables**

3. **다음 변수들을 추가** (하나씩):

   | Name | Value | Environment |
   |------|-------|-------------|
   | `SUPABASE_URL` | `https://xxxxxxxxxxxxx.supabase.co` | Production, Preview, Development |
   | `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGci...` (service_role key) | Production, Preview, Development |
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxxxxxxxxxx.supabase.co` | Production, Preview, Development |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...` (anon key) | Production, Preview, Development |
   | `JWT_SECRET` | `your-32-character-secret-key` | Production, Preview, Development |
   | `ADMIN_USERNAME` | `admin` (원하는 값) | Production, Preview, Development |
   | `ADMIN_PASSWORD` | `your-secure-password` | Production, Preview, Development |

4. **저장 후 재배포**

   ⚠️ **중요**: 환경변수를 추가한 후 반드시 재배포해야 적용됩니다!

   - **Deployments** 탭 클릭
   - 최근 배포 선택 → 오른쪽 ... 메뉴 → **Redeploy**
   - 또는 Git에 새로운 커밋을 푸시하여 자동 배포

---

## 5단계: 브라우저 Console 에러 확인

### ✅ 정확한 에러 메시지 확인

1. **관리자 페이지 접속**
   - 로컬: `http://localhost:3000/admin`
   - Production: `https://yourpost.co.kr/admin`

2. **브라우저 개발자 도구 열기**
   - Windows: `F12` 또는 `Ctrl + Shift + I`
   - Mac: `Cmd + Option + I`

3. **Console 탭 선택**

4. **저장 버튼 클릭**

5. **에러 메시지 확인**

### 📊 에러 유형별 해결책

#### 에러 1: "Supabase 환경변수가 설정되지 않았습니다"

**원인**: 환경변수가 설정되지 않았거나 서버 재시작이 필요합니다.

**해결**:
- 로컬: `.env.local` 파일 확인 → `npm run dev` 재시작
- Production: Vercel 환경변수 확인 → 재배포

#### 에러 2: "Failed to fetch" 또는 "Network Error"

**원인**: Supabase URL이 잘못되었거나 네트워크 문제입니다.

**해결**:
- Supabase Dashboard에서 Project URL을 다시 확인
- `SUPABASE_URL`이 `https://`로 시작하는지 확인
- Supabase 프로젝트가 활성 상태인지 확인

#### 에러 3: "401 Unauthorized" 또는 "403 Forbidden"

**원인**: Service Role Key가 잘못되었습니다.

**해결**:
- Supabase Dashboard → Settings → API
- **service_role** key를 다시 복사 (Show 버튼 클릭)
- `SUPABASE_SERVICE_ROLE_KEY` 환경변수 업데이트
- 서버 재시작 또는 재배포

#### 에러 4: "relation 'site_settings' does not exist"

**원인**: 테이블이 생성되지 않았습니다.

**해결**:
- 1단계로 돌아가서 테이블 생성 SQL을 다시 실행

---

## 6단계: 저장 기능 테스트

### ✅ 정상 작동 확인

1. **관리자 페이지 로그인**
   - 아이디/비밀번호 입력 (`ADMIN_USERNAME`, `ADMIN_PASSWORD`)

2. **Settings 탭에서 배너 메시지 변경**
   - 예: "신규 서비스 런칭!" 입력

3. **"💾 변경사항 저장" 버튼 클릭**

4. **성공 메시지 확인**
   - 화면 상단 중앙에 "✅ 저장 완료!" 토스트 표시
   - "최근 저장: 방금 전" 텍스트 업데이트

5. **Supabase에서 데이터 확인**
   - Supabase Dashboard → Table Editor → `site_settings`
   - `data` 컬럼의 JSON에서 변경된 값 확인

---

## 🔧 추가 문제 해결

### 문제: "세션이 만료되었습니다" 메시지가 계속 뜸

**해결**: 이미 수정되었습니다. 최신 코드에서는 저장 후 리로드 시 이 메시지가 표시되지 않습니다.

### 문제: Vercel에서 빌드 실패

**원인**: 환경변수가 빌드 시점에 없어서 발생합니다.

**해결**:
- Vercel 환경변수에서 **Development** 체크박스도 선택
- `JWT_SECRET` 등 필수 환경변수가 모두 설정되어 있는지 확인

### 문제: 로그인 후 바로 로그아웃됨

**원인**: JWT_SECRET이 설정되지 않았거나 잘못되었습니다.

**해결**:
- `JWT_SECRET` 환경변수 확인
- 32자 이상의 랜덤 문자열로 설정
- 서버 재시작 또는 재배포

---

## 📊 최종 체크리스트

저장 기능이 정상 작동하려면 다음 모든 항목이 ✅여야 합니다:

### Supabase 설정
- [ ] `site_settings` 테이블 생성됨
- [ ] `access_logs` 테이블 생성됨
- [ ] `site_settings` 테이블에 id=1 레코드 존재
- [ ] RLS 정책 활성화됨

### 환경변수 (로컬)
- [ ] `.env.local` 파일 생성됨
- [ ] `SUPABASE_URL` 설정됨
- [ ] `SUPABASE_SERVICE_ROLE_KEY` 설정됨 (service_role key 사용!)
- [ ] `JWT_SECRET` 설정됨 (32자 이상)
- [ ] `ADMIN_USERNAME`, `ADMIN_PASSWORD` 설정됨

### 환경변수 (Vercel)
- [ ] Vercel 환경변수 7개 모두 추가됨
- [ ] Environment: Production, Preview, Development 모두 체크됨
- [ ] 환경변수 추가 후 재배포 완료

### 기능 테스트
- [ ] 로그인 성공
- [ ] Settings 탭 데이터 로딩 성공
- [ ] 저장 버튼 클릭 시 "✅ 저장 완료!" 메시지 표시
- [ ] Supabase Table Editor에서 데이터 변경 확인됨

---

## 🚨 그래도 안 된다면?

다음 정보를 제공해주세요:

1. **브라우저 Console 에러 메시지** (F12 → Console 탭)
2. **Vercel 배포 로그** (실패한 경우)
3. **Supabase Table Editor 스크린샷** (site_settings 테이블)
4. **어느 단계에서 막혔는지** (1-6단계 중)

---

**작성자**: Claude Sonnet 4.5
**최종 업데이트**: 2026-01-27
**다음 단계**: 위 체크리스트를 순서대로 진행하여 저장 기능 활성화
