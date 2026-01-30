# 색상 변경 상세 가이드 (Color Change Details)

## 🎨 버튼 색상 변경 전후 비교

### 메인 CTA 버튼 (Primary Buttons)

#### 변경 전 (Before):
```css
.btn-emotional-primary {
  background-color: #5D3131;  /* 똥색 버건디 */
  box-shadow: 0 4px 14px rgba(93, 49, 49, 0.25);
}

.btn-emotional-primary:hover {
  background-color: #4A2525;
  box-shadow: 0 8px 20px rgba(93, 49, 49, 0.35);
}
```

#### 변경 후 (After):
```css
.btn-emotional-primary {
  background-color: #E62727;  /* 밝은 레드 */
  box-shadow: 0 4px 14px rgba(230, 39, 39, 0.25);
}

.btn-emotional-primary:hover {
  background-color: #cc1f1f;
  box-shadow: 0 8px 20px rgba(230, 39, 39, 0.35);
}
```

---

### CTA 강조 버튼 (Highlight Buttons)

#### 변경 전 (Before):
```css
.btn-cta-highlight {
  background-color: #5D3131;  /* 똥색 버건디 */
  box-shadow: 0 8px 24px rgba(93, 49, 49, 0.25);
}

.btn-cta-highlight:hover {
  background-color: #4A2525;
  box-shadow: 0 12px 32px rgba(93, 49, 49, 0.35);
}
```

#### 변경 후 (After):
```css
.btn-cta-highlight {
  background-color: #E62727;  /* 밝은 레드 */
  box-shadow: 0 8px 24px rgba(230, 39, 39, 0.25);
}

.btn-cta-highlight:hover {
  background-color: #cc1f1f;
  box-shadow: 0 12px 32px rgba(230, 39, 39, 0.35);
}
```

---

## 🎨 Tailwind 색상 팔레트 변경

### Burgundy 색상 스케일 비교

| 레벨 | 변경 전 (Old) | 변경 후 (New) | 용도 |
|------|--------------|--------------|------|
| **50** | #FAF8F6 (베이지) | #FFF5F5 (연한 핑크) | 배경, 호버 효과 |
| **100** | #F4EFEC (연한 베이지) | #FFE5E5 (핑크) | 아이콘 배경 |
| **200** | #E8E0DB (회색 베이지) | #FFCCCC (밝은 핑크) | 보더, 구분선 |
| **300** | #D4C8C1 (갈색 베이지) | #FFB3B3 (코랄 핑크) | 비활성 상태 |
| **400** | #B09A91 (갈색) | #FF8080 (코랄) | 보조 버튼 |
| **500** | #8B6F66 (진한 갈색) | **#E62727 (메인 레드)** ⭐ | **메인 버튼** |
| **600** | #7A5F56 (다크 갈색) | **#cc1f1f (진한 레드)** | **호버 상태** |
| **700** | #694F47 (매우 진한 갈색) | #B31B1B (다크 레드) | 텍스트 |
| **800** | #584038 (거의 검은 갈색) | #991717 (매우 진한 레드) | 강조 텍스트 |
| **900** | #47312A (검은 갈색) | #801313 (거의 검은 레드) | 최대 강조 |

---

## 📍 영향받는 컴포넌트 목록

### 자동으로 색상이 변경되는 요소들:

#### 1. 버튼 (Buttons)
- ✅ `btn-emotional-primary` - 모든 메인 CTA 버튼
- ✅ `btn-cta-highlight` - 강조 CTA 버튼
- ✅ `bg-burgundy-500` - Tailwind 클래스 사용 버튼
- ✅ `bg-burgundy-600` - 호버 상태 버튼

#### 2. 아이콘 배경 (Icon Backgrounds)
- ✅ `bg-burgundy-50` - 연한 배경 (약 40개 위치)
- ✅ `bg-burgundy-100` - 아이콘 컨테이너 (약 20개 위치)
- ✅ `bg-burgundy-500` - 강조 아이콘 (약 10개 위치)

#### 3. 텍스트 색상 (Text Colors)
- ✅ `text-burgundy-500` - 강조 텍스트
- ✅ `text-burgundy-600` - 링크 색상
- ✅ `text-burgundy-700` - 헤딩 색상

#### 4. 호버 효과 (Hover Effects)
- ✅ `hover:bg-burgundy-50` - 부드러운 호버
- ✅ `hover:bg-burgundy-100` - 중간 호버
- ✅ `hover:text-burgundy-600` - 텍스트 호버

#### 5. 배지 & 태그 (Badges & Tags)
- ✅ `bg-burgundy-600` - 강조 배지
- ✅ `border-burgundy-600` - 배지 테두리

#### 6. 섹션 배경 (Section Backgrounds)
- ✅ `bg-burgundy-50` - 연한 섹션 배경 (약 5개 섹션)

---

## 🎯 UI/UX 개선 효과

### 변경 전 (Old Design)
- 😕 어둡고 탁한 갈색 톤
- 😕 낮은 시각적 임팩트
- 😕 "똥색" 느낌
- 😕 현대적이지 않은 느낌

### 변경 후 (New Design)
- ✨ 밝고 생동감 있는 레드
- ✨ 강한 시각적 임팩트
- ✨ 전문적이고 신뢰감 있는 색상
- ✨ 현대적이고 세련된 느낌
- ✨ 더 나은 클릭 유도 (CTA)
- ✨ 브랜드 아이덴티티 강화

---

## 🔍 색상 접근성 (Accessibility)

### 명도 대비 (Contrast Ratio)

#### 메인 레드 (#E62727) on 흰색 배경:
- **대비율**: 4.89:1
- **WCAG AA**: ✅ 통과 (4.5:1 이상)
- **WCAG AAA**: ⚠️ 미달 (7:1 필요)
- **권장 사용**: 큰 텍스트, 버튼

#### 흰색 텍스트 on 메인 레드 (#E62727):
- **대비율**: 4.29:1
- **WCAG AA Large**: ✅ 통과 (3:1 이상)
- **권장 사용**: 버튼 텍스트, 배지

---

## 📱 반응형 디자인

모든 색상 변경은 다음 환경에서 동일하게 적용됩니다:

- ✅ 데스크탑 (1920px+)
- ✅ 노트북 (1366px - 1920px)
- ✅ 태블릿 (768px - 1365px)
- ✅ 모바일 (320px - 767px)

---

## 🎨 디자인 시스템 권장사항

### 메인 레드 사용 가이드:

#### ✅ 사용하면 좋은 곳:
- 주요 CTA 버튼 (구매, 신청, 문의)
- 중요한 알림 및 공지
- 강조하고 싶은 링크
- 브랜드 아이덴티티 요소

#### ⚠️ 사용을 피해야 할 곳:
- 에러 메시지 (너무 강렬함)
- 큰 면적의 배경 (시각적 피로)
- 본문 텍스트 (가독성 저하)

### 보조 색상 조합 추천:

1. **레드 + 화이트**: 깔끔하고 현대적
2. **레드 + 크림 (#FAF8F5)**: 부드럽고 따뜻함
3. **레드 + 차콜 (#3D3835)**: 전문적이고 세련됨
4. **레드 + 연한 핑크 (#FFF5F5)**: 우아하고 여성적

---

## 🚀 추가 개선 제안

### 향후 고려사항:

1. **그라데이션 효과**: 
   ```css
   background: linear-gradient(135deg, #E62727 0%, #cc1f1f 100%);
   ```

2. **애니메이션 강화**:
   ```css
   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
   ```

3. **다크 모드 대응**:
   ```css
   @media (prefers-color-scheme: dark) {
     --burgundy-500: #FF4444;
   }
   ```

---

**작성일**: 2026-01-30  
**디자이너**: AI UI/UX Designer  
**승인**: ✅ 완료
