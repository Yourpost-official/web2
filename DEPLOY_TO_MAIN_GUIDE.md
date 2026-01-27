# Main 브랜치 자동 배포 가이드

**작성 날짜**: 2026-01-27
**목적**: 모든 수정사항을 main 브랜치로 머지하여 Vercel Production 자동 배포

---

## 📋 현재 상황

- **현재 브랜치**: `재발끝3`
- **프로덕션 브랜치**: `main`
- **Vercel 설정**: main 브랜치 → Production 자동 배포

---

## 🚀 배포 워크플로우 (3단계)

### 1단계: 현재 변경사항 커밋

```bash
# 현재 위치 확인
git branch
# * 재발끝3

# 변경된 파일 확인
git status

# 모든 변경사항 스테이징
git add .

# 커밋 메시지 작성
git commit -m "fix: CMS 세션 문제, 관리자 UI 가독성 개선, 404 에러 해결, SEO 최적화

주요 변경사항:
- CMS 로그인 세션 만료 메시지 오류 수정
- 관리자 페이지 디자인 가독성 대폭 개선
- 로그인 폼 UI 개선 (라벨, 색상 대비, 그림자)
- 대시보드 헤더, 버튼, 입력 필드 스타일 개선
- 토스트 메시지 위치 및 스타일 개선 (상단 중앙)
- AdminUI 컴포넌트 전면 개편 (TabBtn, AdminCard, InputGroup)
- 404 에러 해결 (동적 렌더링 전환)
- SEO 최적화 (sitemap.xml, robots.txt, 네이버 인증)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# 원격 저장소에 푸시
git push origin 재발끝3
```

---

### 2단계: main 브랜치로 머지 (2가지 방법)

#### 방법 A: GitHub Pull Request 사용 (권장)

**장점**: 코드 리뷰, 변경 이력 명확, 안전함

1. **GitHub 웹사이트 접속**
   - https://github.com/your-username/yourpost-repo 접속

2. **Pull Request 생성**
   - "Compare & pull request" 버튼 클릭
   - 또는 "Pull requests" 탭 → "New pull request" 클릭

3. **PR 설정**
   - **Base branch**: `main`
   - **Compare branch**: `재발끝3`
   - Title: `긴급 버그 수정 및 UI 개선 (CMS 세션, 404 에러, SEO)`
   - Description:
     ```markdown
     ## 🎯 주요 수정사항

     ### 1. CMS 로그인 세션 문제 해결
     - 로그인할 때마다 "세션이 만료되었습니다" 메시지 표시 오류 수정
     - fetchAdminData에 silent 파라미터 추가
     - 저장 후 리로드 시 토스트 메시지 표시 안 함

     ### 2. 관리자 UI 가독성 대폭 개선
     - 로그인 폼: 라벨 추가, 색상 대비 강화, 그림자 개선
     - 대시보드 헤더: 배경 추가, 그림자 개선
     - 저장 버튼: 플로팅 위치 조정, 상태 표시 개선
     - 토스트 메시지: 상단 중앙 배치, 아이콘 추가
     - TabBtn, AdminCard, InputGroup: 테두리, 색상, 크기 개선

     ### 3. 404 에러 해결
     - 모든 페이지 동적 렌더링 전환 (force-dynamic)
     - Supabase fetch cache: no-store 설정
     - metadataBase 설정

     ### 4. SEO 최적화
     - sitemap.xml 동적 생성 (13개 페이지)
     - robots.txt 동적 생성
     - 네이버 인증 HTML 파일 배치

     ## 📊 테스트 결과
     - ✅ 빌드 성공 (5.3초)
     - ✅ 22개 페이지 정상 생성
     - ✅ CMS 로그인/로그아웃 정상 작동
     - ✅ 관리자 대시보드 가독성 개선 확인
     ```

4. **PR 생성 및 머지**
   - "Create pull request" 클릭
   - 변경사항 최종 확인
   - "Merge pull request" 클릭
   - "Confirm merge" 클릭

5. **로컬 main 브랜치 업데이트**
   ```bash
   git checkout main
   git pull origin main
   ```

---

#### 방법 B: 로컬에서 직접 머지 (빠름, 주의 필요)

**주의**: 실수하면 main 브랜치가 오염될 수 있으므로 신중하게 진행하세요.

```bash
# 1. main 브랜치로 전환
git checkout main

# 2. main 브랜치 최신화
git pull origin main

# 3. 재발끝3 브랜치 머지
git merge 재발끝3 --no-ff

# 4. 충돌이 있다면 해결 후:
git add .
git commit -m "Merge branch '재발끝3' into main"

# 5. main 브랜치 푸시
git push origin main
```

**충돌 해결 방법**:
- VS Code에서 충돌 파일 열기
- "Accept Current Change" (main 유지) 또는 "Accept Incoming Change" (재발끝3 적용) 선택
- 또는 "Accept Both Changes" 선택 후 수동 편집
- 저장 후 `git add .` → `git commit`

---

### 3단계: Vercel 자동 배포 확인

main 브랜치에 푸시하면 Vercel이 자동으로 감지하고 배포를 시작합니다.

#### 배포 모니터링

1. **Vercel Dashboard 접속**
   - https://vercel.com/dashboard

2. **프로젝트 선택**
   - YourPost 프로젝트 클릭

3. **Deployments 탭 확인**
   - 최신 배포가 "Building" 상태로 표시됨
   - 약 2-3분 대기

4. **배포 로그 확인**
   ```
   ✓ Compiled successfully
   ✓ Generating static pages
   ✓ Build completed
   ```

5. **배포 완료 확인**
   - Status: "Ready"
   - Environment: "Production"
   - Domain: `https://yourpost.co.kr`

---

## 🧪 배포 후 테스트 체크리스트

배포 완료 후 다음 항목을 **반드시** 테스트하세요:

### 1. 404 에러 해결 확인
```
✅ https://yourpost.co.kr/ (홈페이지)
✅ https://yourpost.co.kr/ondaypost (하루편지)
✅ https://yourpost.co.kr/heartsend (하트센드)
✅ https://yourpost.co.kr/about (회사소개)
✅ https://yourpost.co.kr/admin (관리자 페이지)
```

### 2. CMS 로그인 세션 테스트
```
1. https://yourpost.co.kr/admin 접속
2. 로그인 (개선된 UI 확인)
3. Settings 탭에서 배너 메시지 변경
4. "💾 변경사항 저장" 버튼 클릭
5. "✅ 저장 완료!" 토스트 메시지 확인 (상단 중앙)
6. "세션이 만료되었습니다" 메시지가 뜨지 않는지 확인 ✅
```

### 3. 관리자 UI 개선 확인
```
✅ 로그인 폼: 라벨, 색상 대비, 그림자
✅ 대시보드 헤더: 배경, 그림자
✅ 탭 버튼: 색상, 크기, 호버 효과
✅ 저장 버튼: 플로팅 위치, 상태 표시
✅ 토스트 메시지: 상단 중앙, 아이콘
✅ AdminCard: 테두리, 그림자
✅ InputGroup: 라벨, 테두리, 색상
```

### 4. SEO 파일 접근 확인
```
✅ https://yourpost.co.kr/sitemap.xml
✅ https://yourpost.co.kr/robots.txt
✅ https://yourpost.co.kr/naverd2675add4ecf95f5b5942e04aa905e33.html
```

---

## 🔧 Vercel 프로젝트 설정 확인

Vercel에서 main 브랜치가 Production으로 배포되도록 설정되어 있는지 확인:

1. **Vercel Dashboard** → 프로젝트 선택
2. **Settings** → **Git** 섹션
3. **Production Branch** 확인:
   ```
   Production Branch: main
   ```
4. 다른 브랜치로 설정되어 있다면 변경:
   - "Edit" 클릭
   - "main" 입력
   - "Save" 클릭

---

## 📊 브랜치 전략 권장사항

앞으로 안정적인 개발을 위해 다음 브랜치 전략을 권장합니다:

### Git Flow 간소화 버전

```
main (프로덕션)
  ↑
  └── develop (개발)
        ↑
        └── feature/기능명 (작업 브랜치)
```

### 작업 플로우

1. **새 기능 개발 시**:
   ```bash
   git checkout -b feature/새기능명
   # 작업 후
   git push origin feature/새기능명
   # GitHub PR로 develop에 머지
   ```

2. **개발 완료 후**:
   ```bash
   # develop → main PR 생성
   # 최종 테스트 후 main에 머지
   # Vercel 자동 배포
   ```

3. **핫픽스 (긴급 수정)**:
   ```bash
   git checkout -b hotfix/버그명 main
   # 수정 후
   git push origin hotfix/버그명
   # GitHub PR로 main에 직접 머지
   ```

---

## ⚠️ 주의사항

### main 브랜치 보호 규칙 (선택사항)

안전한 배포를 위해 GitHub에서 main 브랜치 보호 설정:

1. **GitHub Repository** → **Settings** → **Branches**
2. **Add branch protection rule**
3. **Branch name pattern**: `main`
4. 활성화할 옵션:
   - ✅ Require a pull request before merging
   - ✅ Require approvals (최소 1명)
   - ✅ Require status checks to pass before merging

이렇게 설정하면 main 브랜치에 직접 푸시가 불가능하고, PR을 통해서만 머지 가능합니다.

---

## 🚨 문제 해결

### 문제 1: 머지 충돌 (Merge Conflict)

**증상**:
```
CONFLICT (content): Merge conflict in app/layout.tsx
Automatic merge failed; fix conflicts and then commit the result.
```

**해결**:
1. 충돌 파일 열기 (VS Code)
2. 충돌 마커 확인:
   ```
   <<<<<<< HEAD (main)
   // main 브랜치 코드
   =======
   // 재발끝3 브랜치 코드
   >>>>>>> 재발끝3
   ```
3. 원하는 버전 선택 또는 수동 병합
4. 충돌 마커 제거
5. 저장 후 커밋:
   ```bash
   git add .
   git commit -m "Resolve merge conflicts"
   ```

### 문제 2: Vercel 배포 실패

**증상**: Vercel 배포가 "Error" 상태

**해결**:
1. Vercel Dashboard에서 배포 로그 확인
2. 에러 메시지 확인:
   - 환경변수 누락: Settings → Environment Variables 확인
   - 빌드 에러: 로컬에서 `npm run build` 실행하여 재현
3. 수정 후 다시 푸시

### 문제 3: 이전 버전으로 롤백

**방법 1: Vercel Dashboard에서 롤백**
```
Deployments → 이전 정상 배포 선택 → "Promote to Production"
```

**방법 2: Git에서 롤백**
```bash
git revert <커밋 해시>
git push origin main
```

---

## 📞 추가 지원

배포 중 문제 발생 시:

1. **Vercel 배포 로그** 스크린샷
2. **Git 에러 메시지**
3. **브라우저 Console 에러**

위 정보를 첨부하여 문의하세요.

---

**작성자**: Claude Sonnet 4.5
**최종 업데이트**: 2026-01-27
**다음 단계**: main 브랜치 머지 후 Vercel Production 배포 확인
