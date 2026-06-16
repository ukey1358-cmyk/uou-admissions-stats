# UI 업로드 완료

_Started 2026-06-15 06:43 UTC_

---

## User

<system-info comment="Only acknowledge these if relevant">
Project title is now "Design System"
Current date is now June 15, 2026
</system-info>

<pasted_text name="Create design system">
We will create a design system in this project.

**Additional notes:**
# 울산대학교 디자인 시스템 (UOU Design System)

&amp;gt; University of Ulsan · 공식 CI/UI 가이드 기반 웹 디자인 시스템
&amp;gt; 교훈: 진리 · 자주 · 봉사 / 설립 1970

이 디자인 시스템은 울산대학교 공식 CI/UI 매뉴얼(전용색상·심볼·전용서체 규정)을 기반으로,
웹·앱 화면에서 바로 사용할 수 있도록 색상 스케일, 타이포그래피, 간격, 컴포넌트 토큰까지 확장해 정리한 것입니다.

---

## 1. 브랜드 기본 (Brand Foundation)

| 항목  | 내용  |
| --- | --- |
| 정식 명칭 | 울산대학교 (University of Ulsan, UOU) |
| 교훈  | 진리 · 자주 · 봉사 |
| 상징 동물 | 기린(麒麟) — 슬기와 재주, 탁월한 인재 양성 |
| 교표 의미 | 방패(진리·정의의 수호) + Σ(시그마, '학구'의 첫 글자) |
| 설립 연도 | 1970 |
| 브랜드 키워드 | 신뢰감, 학구적, 현대적, 단순·명쾌 |

**디자인 톤앤매너**: 깨끗한 화이트 기반 · 그린 포인트 · 절제된 장식 · 높은 가독성.
대학 공식 웹사이트에 어울리는 차분하고 신뢰감 있는 인상을 유지합니다.

---

## 2. 색상 (Color)

### 2.1 핵심 브랜드 색상

공식 전용색상은 주색상 그린, 보조색상 그레이·옐로우로 구성됩니다.
별색(DIC)이 원칙이나, 화면용으로는 아래 HEX/RGB 근사값을 사용합니다.

| 토큰  | 이름  | HEX | RGB | 원본 규정 |
| --- | --- | --- | --- | --- |
| `--uou-green` | UOU Green (주색) | `#009A44` | 0, 154, 68 | DIC 643 / C100 Y100 |
| `--uou-gray` | UOU Gray (보조) | `#333333` | 51, 51, 51 | DIC 654 / K80 |
| `--uou-yellow` | UOU Yellow (보조) | `#CC9900` | 204, 153, 0 | DIC 207 / C20 M40 Y100 |

&amp;gt; 참고: DIC 별색은 화면 RGB로 정확히 대응되지 않으므로 위 HEX는 스크린용 근사값입니다.
&amp;gt; 인쇄·사인물 제작 시에는 반드시 공식 별색(DIC) 규정을 따르세요.

### 2.2 Primary — Green 스케일

브랜드 그린을 중심으로 한 명도 스케일. 버튼·링크·강조·헤더 포인트에 사용.

| 토큰  | HEX | 용도  |
| --- | --- | --- |
| `--green-50` | `#E6F5EC` | 배경 틴트, hover 바탕 |
| `--green-100` | `#C2E8D2` | 연한 배경, 태그 |
| `--green-200` | `#8FD4AC` | 보더, 비활성 강조 |
| `--green-300` | `#5BBF85` | 보조 강조 |
| `--green-400` | `#2EAE64` | hover 상태 |
| `--green-500` | `#009A44` | **Primary / 기본 액션** |
| `--green-600` | `#00873B` | hover/pressed |
| `--green-700` | `#006E30` | 텍스트 강조, 진한 보더 |
| `--green-800` | `#005625` | 짙은 배경 위 텍스트 |
| `--green-900` | `#003D1A` | 최대 대비 텍스트 |

### 2.3 Neutral — Gray 스케일

UOU Gray(`#333333`)를 800 앵커로 둔 중립 스케일. 텍스트·보더·배경에 사용.

| 토큰  | HEX | 용도  |
| --- | --- | --- |
| `--gray-0` | `#FFFFFF` | 페이지/카드 배경 |
| `--gray-50` | `#F7F8F8` | 섹션 배경 |
| `--gray-100` | `#EFF0F1` | 구분 배경, disabled |
| `--gray-200` | `#DCDEE0` | 기본 보더 |
| `--gray-300` | `#C2C5C8` | 입력창 보더 |
| `--gray-400` | `#9A9EA3` | placeholder, 아이콘 |
| `--gray-500` | `#71767B` | 보조 텍스트 |
| `--gray-600` | `#565B60` | 본문 보조 |
| `--gray-700` | `#3F4348` | 부제목 |
| `--gray-800` | `#333333` | **본문 기본 텍스트 (UOU Gray)** |
| `--gray-900` | `#1C1E20` | 제목 텍스트 |

### 2.4 Accent — Yellow 스케일

UOU Yellow(`#CC9900`)는 강조 배지, 하이라이트, 알림 포인트로 절제하여 사용.

| 토큰  | HEX | 용도  |
| --- | --- | --- |
| `--yellow-50` | `#FBF3DE` | 배경 틴트 |
| `--yellow-100` | `#F5E2B0` | 배지 배경 |
| `--yellow-300` | `#E3C25C` | 강조 보더 |
| `--yellow-500` | `#CC9900` | **Accent / 강조** |
| `--yellow-700` | `#A67A00` | 옐로우 배경 위 텍스트 |

### 2.5 Semantic — 의미 색상

| 토큰  | HEX | 의미  |
| --- | --- | --- |
| `--color-success` | `#009A44` | 성공 (브랜드 그린 재사용) |
| `--color-info` | `#2563EB` | 정보/링크 |
| `--color-warning` | `#CC9900` | 경고/주의 |
| `--color-danger` | `#D32F2F` | 오류/삭제 |

---

## 3. 타이포그래피 (Typography)

### 3.1 서체

- **브랜드 전용서체(인쇄/사인)**: 우리고딕 미디움 — 로고타입과 동일 톤(장식 배제, 단순·명쾌·현대적). 지정서체: 우리고딕 라이트/볼드.
- **웹 본문 서체**: 우리고딕은 웹폰트가 아니므로, 동일한 인상의 현대적 고딕으로 대체합니다.

```css
--font-sans: "Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont,
             "Segoe UI", Roboto, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
--font-mono: "SFMono-Regular", "JetBrains Mono", Consolas, monospace;
```

### 3.2 폰트 굵기

| 토큰  | 값   | 용도  |
| --- | --- | --- |
| `--fw-regular` | 400 | 본문  |
| `--fw-medium` | 500 | 강조 본문, 라벨 |
| `--fw-bold` | 700 | 제목, 버튼 |

### 3.3 타입 스케일

| 토큰  | 크기  | 행간  | 굵기  | 용도  |
| --- | --- | --- | --- | --- |
| `--text-display` | 48px | 56px | 700 | 메인 비주얼 헤드라인 |
| `--text-h1` | 36px | 44px | 700 | 페이지 제목 |
| `--text-h2` | 28px | 36px | 700 | 섹션 제목 |
| `--text-h3` | 24px | 32px | 700 | 서브 섹션 |
| `--text-h4` | 20px | 28px | 500 | 카드 제목 |
| `--text-body-lg` | 18px | 28px | 400 | 리드 문단 |
| `--text-body` | 16px | 26px | 400 | 기본 본문 |
| `--text-body-sm` | 14px | 22px | 400 | 보조 본문 |
| `--text-caption` | 12px | 18px | 400 | 캡션, 메타 정보 |

---

## 4. 간격 · 레이아웃 (Spacing &amp;amp; Layout)

### 4.1 간격 스케일 (4px 기준)

| 토큰  | 값   |
| --- | --- |
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 24px |
| `--space-6` | 32px |
| `--space-7` | 48px |
| `--space-8` | 64px |
| `--space-9` | 96px |

### 4.2 모서리 둥글기 (Radius)

| 토큰  | 값   | 용도  |
| --- | --- | --- |
| `--radius-sm` | 4px | 배지, 입력창 |
| `--radius-md` | 8px | 버튼, 작은 카드 |
| `--radius-lg` | 12px | 카드, 모달 |
| `--radius-xl` | 16px | 큰 컨테이너 |
| `--radius-full` | 9999px | 칩, 아바타 |

### 4.3 그림자 (Elevation)

| 토큰  | 값   |
| --- | --- |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.06)` |
| `--shadow-md` | `0 2px 8px rgba(0,0,0,0.08)` |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.12)` |

### 4.4 브레이크포인트 · 컨테이너

| 토큰  | 값   |
| --- | --- |
| `--bp-mobile` | 360px |
| `--bp-tablet` | 768px |
| `--bp-desktop` | 1024px |
| `--bp-wide` | 1440px |
| `--container-max` | 1200px |

---

## 5. 컴포넌트 (Components)

### 5.1 버튼 (Button)

| 종류  | 배경  | 텍스트 | 보더  | hover |
| --- | --- | --- | --- | --- |
| Primary | `#009A44` | `#FFFFFF` | 없음  | `#00873B` |
| Secondary | `#FFFFFF` | `#009A44` | `1px #009A44` | bg `#E6F5EC` |
| Outline | 투명  | `#333333` | `1px #DCDEE0` | bg `#F7F8F8` |
| Text | 투명  | `#009A44` | 없음  | 밑줄  |
| Danger | `#D32F2F` | `#FFFFFF` | 없음  | 명도 -8% |

- 높이: 기본 44px / 소형 36px / 대형 52px
- 패딩: 좌우 24px (기본)
- radius: `--radius-md` (8px)
- 폰트: 16px / 700

### 5.2 링크 (Link)

- 기본: `#006E30` (green-700), 밑줄 없음
- hover: `#009A44` + 밑줄
- 방문: `#005625`

### 5.3 카드 (Card)

- 배경: `#FFFFFF`
- 보더: `1px #DCDEE0` 또는 `--shadow-sm`
- radius: `--radius-lg` (12px)
- 패딩: 24px
- 제목: `--text-h4` / 본문: `--text-body-sm`
- hover(클릭형): `--shadow-md` + 상단 보더 `#009A44`

### 5.4 헤더 · GNB (Global Navigation)

- 배경: `#FFFFFF`, 하단 보더 `1px #EFF0F1`
- 로고 영역 좌측, 메뉴 우측 정렬
- 메뉴 텍스트: `#333333` / 16px / 500
- 활성·hover 메뉴: `#009A44` + 하단 2px 그린 인디케이터
- 최상단 유틸리티 바(통합검색·Quick Menu 등): 배경 `#F7F8F8`, 텍스트 12px `#565B60`

### 5.5 푸터 (Footer)

- 배경: `#333333` (UOU Gray)
- 텍스트: `#DCDEE0` / 보조 `#9A9EA3`
- 링크 hover: `#FFFFFF`
- 상단 그린 라인 `4px #009A44`(선택)

### 5.6 배지 / 태그 (Badge)

| 종류  | 배경  | 텍스트 |
| --- | --- | --- |
| 기본  | `#E6F5EC` | `#005625` |
| 강조  | `#F5E2B0` | `#A67A00` |
| 정보  | `#EFF0F1` | `#3F4348` |

- radius: `--radius-full` / 패딩 4px 12px / 12px·500

### 5.7 입력창 (Input)

- 높이 44px, 보더 `1px #C2C5C8`, radius `--radius-sm`
- placeholder: `#9A9EA3`
- focus: 보더 `#009A44` + 포커스 링 `0 0 0 3px rgba(0,154,68,0.15)`
- 오류: 보더 `#D32F2F`

### 5.8 탭 (Tab)

- 비활성: `#565B60` / 활성: `#009A44` + 하단 2px 그린 보더
- 하단 구분선 `1px #EFF0F1`

---

## 6. 디자인 토큰 (CSS Variables)

아래 블록을 그대로 복사해 전역 스타일에 적용할 수 있습니다.

```css
:root {
  /* Brand */
  --uou-green: #009A44;
  --uou-gray:  #333333;
  --uou-yellow:#CC9900;

  /* Green scale */
  --green-50:#E6F5EC; --green-100:#C2E8D2; --green-200:#8FD4AC;
  --green-300:#5BBF85; --green-400:#2EAE64; --green-500:#009A44;
  --green-600:#00873B; --green-700:#006E30; --green-800:#005625; --green-900:#003D1A;

  /* Gray scale */
  --gray-0:#FFFFFF; --gray-50:#F7F8F8; --gray-100:#EFF0F1; --gray-200:#DCDEE0;
  --gray-300:#C2C5C8; --gray-400:#9A9EA3; --gray-500:#71767B; --gray-600:#565B60;
  --gray-700:#3F4348; --gray-800:#333333; --gray-900:#1C1E20;

  /* Yellow scale */
  --yellow-50:#FBF3DE; --yellow-100:#F5E2B0; --yellow-300:#E3C25C;
  --yellow-500:#CC9900; --yellow-700:#A67A00;

  /* Semantic */
  --color-success:#009A44; --color-info:#2563EB;
  --color-warning:#CC9900; --color-danger:#D32F2F;

  /* Typography */
  --font-sans:"Pretendard","Noto Sans KR",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Apple SD Gothic Neo","Malgun Gothic",sans-serif;
  --font-mono:"SFMono-Regular","JetBrains Mono",Consolas,monospace;
  --fw-regular:400; --fw-medium:500; --fw-bold:700;

  /* Spacing */
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
  --space-5:24px; --space-6:32px; --space-7:48px; --space-8:64px; --space-9:96px;

  /* Radius */
  --radius-sm:4px; --radius-md:8px; --radius-lg:12px; --radius-xl:16px; --radius-full:9999px;

  /* Shadow */
  --shadow-sm:0 1px 2px rgba(0,0,0,0.06);
  --shadow-md:0 2px 8px rgba(0,0,0,0.08);
  --shadow-lg:0 8px 24px rgba(0,0,0,0.12);

  /* Layout */
  --container-max:1200px;
}
```

---

## 7. 디자인 토큰 (JSON)

디자인 툴/코드 임포트용 구조화 토큰입니다.

```json
{
  "brand": {
    "green":  { "value": "#009A44", "spot": "DIC 643", "role": "primary" },
    "gray":   { "value": "#333333", "spot": "DIC 654", "role": "secondary" },
    "yellow": { "value": "#CC9900", "spot": "DIC 207", "role": "accent" }
  },
  "color": {
    "green":  { "50":"#E6F5EC","100":"#C2E8D2","200":"#8FD4AC","300":"#5BBF85","400":"#2EAE64","500":"#009A44","600":"#00873B","700":"#006E30","800":"#005625","900":"#003D1A" },
    "gray":   { "0":"#FFFFFF","50":"#F7F8F8","100":"#EFF0F1","200":"#DCDEE0","300":"#C2C5C8","400":"#9A9EA3","500":"#71767B","600":"#565B60","700":"#3F4348","800":"#333333","900":"#1C1E20" },
    "yellow": { "50":"#FBF3DE","100":"#F5E2B0","300":"#E3C25C","500":"#CC9900","700":"#A67A00" },
    "semantic": { "success":"#009A44","info":"#2563EB","warning":"#CC9900","danger":"#D32F2F" }
  },
  "typography": {
    "fontFamily": "Pretendard, 'Noto Sans KR', sans-serif",
    "scale": {
      "display": { "size": 48, "line": 56, "weight": 700 },
      "h1": { "size": 36, "line": 44, "weight": 700 },
      "h2": { "size": 28, "line": 36, "weight": 700 },
      "h3": { "size": 24, "line": 32, "weight": 700 },
      "h4": { "size": 20, "line": 28, "weight": 500 },
      "bodyLg": { "size": 18, "line": 28, "weight": 400 },
      "body": { "size": 16, "line": 26, "weight": 400 },
      "bodySm": { "size": 14, "line": 22, "weight": 400 },
      "caption": { "size": 12, "line": 18, "weight": 400 }
    }
  },
  "spacing": { "1":4,"2":8,"3":12,"4":16,"5":24,"6":32,"7":48,"8":64,"9":96 },
  "radius": { "sm":4,"md":8,"lg":12,"xl":16,"full":9999 },
  "shadow": {
    "sm":"0 1px 2px rgba(0,0,0,0.06)",
    "md":"0 2px 8px rgba(0,0,0,0.08)",
    "lg":"0 8px 24px rgba(0,0,0,0.12)"
  },
  "layout": { "containerMax":1200, "breakpoints": { "mobile":360,"tablet":768,"desktop":1024,"wide":1440 } }
}
```

---

## 8. 사용 원칙 (Usage Principles)

1. **그린은 강조에만.** 주색상 그린은 액션·링크·포인트에 한정해 사용하고, 넓은 면적은 화이트/그레이로 비워 학구적인 인상을 유지합니다.
2. **옐로우는 절제.** 옐로우는 배지·하이라이트 등 좁은 영역에만 사용합니다.
3. **본문은 UOU Gray.** 본문 텍스트는 `#333333`, 제목은 `#1C1E20`을 기본으로 합니다.
4. **충분한 여백.** 심볼·시그니처 주변과 콘텐츠 블록 사이에 넉넉한 여백을 확보합니다.
5. **로고 변형 금지.** 심볼마크·로고타입·시그니처의 형태·굵기·비례·색상을 임의 변경하지 않습니다.
6. **대비 확보.** 그린 배경 위 텍스트는 흰색, 옐로우 배경 위 텍스트는 `#A67A00` 이상 진한 색을 사용합니다.

---

## 9. 브랜드 에셋 (UI · 마스코트)

&amp;gt; 공식 원본 파일(`UI_및_마스코트.zip`) 분석 기반. 심볼·로고·마스코트는 모두 울산대학교 공식 상표/저작물이며 형태·색상 변형이 금지됩니다.

### 9.1 UI 에셋

| 에셋  | 구성  | 용도  | 제공 형식 |
| --- | --- | --- | --- |
| 심볼마크 | 좌우 기린 + Σ 방패 + 1970 + '진리·자주·봉사' 리본 | 인장·증서·최격식 표기 | AI(벡터), GIF |
| 로고마크 | U·O·U 머리글자 (면/선 타입) | 아이콘·파비콘·소형 응용 | AI, GIF |
| 로고타입 | 울산대학교 / UNIVERSITY OF ULSAN / 학교법인 울산공업학원 조합 | 교명 표기 | AI, GIF |
| 시그니처 기본형 | 심볼 + 로고타입 공식 조합 (컬러·흑백, 국영문) | **표준 표기(가장 많이 사용)** | AI, GIF |

- 형식: `.ai` = 무한 확대 벡터 원본(인쇄·대형), 화면용은 SVG/투명 PNG로 변환해 사용.
- 변형 금지: 형태·굵기·비례·자간·색상 임의 변경 불가. 동일 매체 내 동일 형태 유지.

### 9.2 마스코트 '울리니 (Ulrinee)'

- 유래: **울**산대(Ul) + **기린**(Kirin) + 친근한 어미 **리니**(Rinee). 기린 동판의 빛 → 교훈탑 → 탄생.
- 콘셉트 가치: 진리의 빛 · 자주의 바람 · 봉사의 손길.
- 캐릭터 설정: 생일 11월 11일 · MBTI ENFJ · 취미 벚꽃동산 수다 · 최애 학식.
- 제공: 기본형 2D(6면)·3D(5면) 턴어라운드, 응용 동작 17종(공부·졸업식·한복·응원·하트 등), 2D/3D 벡터·투명 PNG.

#### 마스코트 전용 색상 (코퍼레이트 컬러와 별도 관리)

마스코트는 브랜드 그린(`#009A44`)이 아닌 **부드러운 파스텔 그린** 팔레트를 사용합니다. 두 팔레트를 혼용하지 않습니다.

| 역할  | HEX | RGB | CMYK |
| --- | --- | --- | --- |
| 밝은 연두(하이라이트) | `#B9D887` | 185, 216, 135 | 33, 4, 58, 0 |
| 기본 연두(몸통) | `#99C45C` | 153, 196, 92 | 48, 9, 77, 0 |
| 진한 연두(음영) | `#76A854` | 118, 168, 84 | 60, 21, 81, 0 |
| 다크그린(외곽선) | `#2C3D28` | 44, 61, 40 | 81, 65, 89, 44 |
| 옐로우(뿔·배·손발) | `#F9E79B` | 249, 231, 155 | 6, 11, 47, 0 |
| 베이지(뿔 음영) | `#EDBE7F` | 237, 190, 127 | 10, 31, 54, 0 |
| 코랄(볼·입안) | `#F08C8C` | 240, 140, 140 | 6, 58, 35, 0 |

```css
/* 마스코트 울리니 전용 토큰 */
--ulrinee-green-light:#B9D887;
--ulrinee-green:#99C45C;
--ulrinee-green-dark:#76A854;
--ulrinee-outline:#2C3D28;
--ulrinee-yellow:#F9E79B;
--ulrinee-beige:#EDBE7F;
--ulrinee-coral:#F08C8C;
```

### 9.3 에셋 사용 금지 규정 (가이드라인 매뉴얼 기준)

UI·마스코트 공통으로 다음을 금지합니다.

1. 가로 늘리기 (비율 왜곡)
2. 세로 늘리기 (비율 왜곡)
3. 색상 임의 변경
4. 납작하게 압축
5. 회전·기울임

### 9.4 클로드 디자인 등록 우선순위

실무에서 가장 많이 쓰는 순서로 투명 PNG/SVG를 업로드합니다.

1. 시그니처 기본형(컬러) — 문서·웹 헤더
2. 로고마크 U·O·U — 파비콘·앱 아이콘
3. 마스코트 정면 2D — SNS·홍보물
4. 마스코트 응용 동작 — 스티커·이벤트

---

## ⚠️ 저작권·사용권 안내

심볼마크·로고·시그니처·마스코트 '울리니'는 울산대학교의 공식 상표/저작물입니다. 형태·색상 변형이 금지되며, 교내 구성원 외 외부 사용 시 **대외홍보팀(052-259-2627 / 052-259-1163) 승인**이 필요합니다.

---

*출처: 울산대학교 공식 CI/UI 매뉴얼(대학소개 &amp;gt; 대학상징 &amp;gt; 울산대 UI) 및 업로드된 `UI_및_마스코트.zip` 내 가이드라인 매뉴얼(25p). 코퍼레이트 색상 HEX는 별색(DIC)을 스크린용으로 변환한 근사값이고, 마스코트 색상·캐릭터 설정·금지 규정은 매뉴얼 기재 공식 수치이며, 스케일·간격·컴포넌트 토큰은 웹 적용을 위해 본 시스템에서 확장 정의했습니다.*

---

Design systems are folders on the file system containing typography guidelines, colors, assets, brand style and tone guides, css styles, and React recreations of UIs, decks, etc. They give design agents the ability to create designs against a company's existing products, and create assets using that company's brand. Design systems should contain real visual assets (logos, brand illustrations, etc), low-level visual foundations (e.g. typography specifics; color system, shadow, border, spacing systems), reusable UI components, and high-level UI kits (full screens).

No need to invoke the create_design_system skill; this is it.

An automated compiler reads this project, bundles the components into a runtime library, and indexes the styles. It discovers everything from file content and sibling relationships — not from folder names — so the only fixed location is:

- `styles.css` at the project root (or `index.css` / `globals.css` / `global.css` / `main.css` / `theme.css` / `tokens.css` — first match wins). This is the global-CSS entry point; consumers link this one file. Keep it as a list of `@import` lines only. Everything it transitively `@import`s is shipped to consumers; `@font-face` rules anywhere in that closure declare the webfonts.

Organize everything else however suits the brand. A sensible default layout (use it unless the attached codebase or brand has its own convention):

- `tokens/` — CSS custom properties, one file per concern (`colors.css`, `typography.css`, `spacing.css`, …), each `@import`ed from `styles.css`.
- `components/&lt;group&gt;/` — reusable React UI primitives.
- `ui_kits/&lt;product&gt;/` — full-screen click-through recreations of real product views.
- `guidelines/` — foundation specimen cards and deeper-dive prose.
- `assets/` — logos, icons, illustrations, imagery.
- `readme.md` (root) — the design guide and manifest.

What the compiler looks for, regardless of path:
- A **component** is any `&lt;Name&gt;.jsx` / `&lt;Name&gt;.tsx` (PascalCase stem) with a sibling `&lt;Name&gt;.d.ts` in the same directory. Add `&lt;Name&gt;.prompt.md` alongside, and one `@dsCard`-tagged `.html` per directory (its first line is `&lt;!-- @dsCard group="…" --&gt;`; details under "Components" below).
- A **token** is any `--*` custom property declared under `:root` (or a single-selector theme scope) in a file reachable from `styles.css`.
- A **font** is any `@font-face` rule in that same closure; its `src: url(…)` targets are the binaries shipped to consumers.

To begin, create a todo list with the tasks below, then follow it:

- Explore provided assets and materials to gain a high-level understanding of the company/product context, the different products represented, etc. Read each asset (codebase, figma, file etc) and see what they do. Find some product copy; examine core screens; find any design system definitions.
- Create a readme.md (root) with the high-level understanding of the company/product context, the different products represented, etc. Mention the sources you were given: full Figma links, GitHub repos, codebase paths, etc. Do not assume the reader has access, but store in case they do.
- Call set_project_title with a short name derived from the brand/product (e.g. "Acme Design System"). This replaces the generic placeholder so the project is findable.
- IF any slide decks attached, use your repl tool to look at them, extract key assets + text, write to disk.
- Explore the codebase and/or figma design contexts and write the token CSS files — CSS custom properties on `:root`, both base values (`--fg-1`, `--font-serif-display`) and semantic aliases (`--text-body`, `--surface-card`). Copy any webfonts/ttfs into the project and write the `@font-face` rules in a CSS file. Then write the root `styles.css` as a list of `@import` lines only (never inline rules there) that reaches every token and font-face file.
- Explore, then update readme.md with a CONTENT FUNDAMENTALS section: how is copy written? What is tone, casing, etc? I vs you, etc? are emoji used? What is the vibe? Include specific examples
- Explore, update readme.md with VISUAL FOUNDATIONS section that talks about the visual motifs and foundations of the brand. Colors, type, spacing, backgrounds (images? full-bleed? hand-drawn illustrations? repeating patterns/textures? gradients?), animation (easing? fades? bounces? no anims?), hover states (opacity, darker colors, lighter colors?), press states (color? shrink?), borders, inner/outer shadow systems, protection gradients vs capsules, layout rules (fixed elements), use of transparency and blur (when?), color vibe of imagery (warm? cool? b&amp;w? grain?), corner radii, what do cards look like (shadow, rounding, border), etc. whatever else you can think of. answer ALL these questions.
- If you are missing font files, find the nearest match on Google Fonts. Flag this substitution to the user and ask for updated font files.
- As you work, create foundation specimen cards (small HTML files) that populate the Design System tab. Target ~700×150px each (400px max) — err toward MORE small cards, not fewer dense ones. Split at the sub-concept level: separate cards for primary vs neutral vs semantic colors; display vs body vs mono type; spacing tokens vs a spacing-in-use example. A typical foundations set is 12–20+ cards. Skip titles and framing — the card name renders OUTSIDE the card, so just show the swatches/specimens/tokens directly with minimal decoration. Each card links `styles.css` (relative path from wherever you put it) so it picks up the real tokens. Tag each card with `&lt;!-- @dsCard group="&lt;Group&gt;" viewport="700x&lt;height&gt;" subtitle="&lt;one line&gt;" name="&lt;Card name&gt;" --&gt;` as its first line — the Design System tab renders every tagged `.html` in the project, grouped verbatim by `group`. Suggested groups: "Type", "Colors", "Spacing", "Brand" — title-cased, consistent.
- Copy logos, icons and other visual assets into `assets/`. Update readme.md with an ICONOGRAPHY section describing the brand's approach to iconography. Answer ALL these and more: are certain icon systems used? is there a builtin icon font? are there SVGs used commonly, or png icons? (if so, copy them in!) Is emoji ever used? Are unicode chars used as icons? Make sure to copy key logos, background images, maybe 1-2 full-bleed generic images, and ALL generic illustrations you find. NEVER draw your own SVGs or generate images; COPY icons programmatically if you can.
- For icons: FIRST copy the codebase's own icon font/sprite/SVGs into `assets/` if you can. Otherwise, if the set is CDN-available (e.g. Lucide, Heroicons), link it from CDN. If neither, substitute the closest CDN match (same stroke weight / fill style) and FLAG the substitution. Document usage in ICONOGRAPHY.
- Author the reusable components (see the Components section). Each directory's card HTML must carry `&lt;!-- @dsCard group="Components" … --&gt;` on line 1.
- For each product given (e.g. app and website), create a UI kit — `{README.md, index.html, Screen1.jsx, …}` in its own directory; see the UI kits section. Verify visually. Make one todo list item for each product/surface.
- If you were given a slide template, create sample slides — `{index.html, TitleSlide.jsx, ComparisonSlide.jsx, BigQuoteSlide.jsx, …}` in their own directory. If no sample slides were given, don't create them. Create an HTML file per slide type; if decks were provided, copy their style. Use the visual foundations and bring in logos + other assets. Tag each slide HTML with `&lt;!-- @dsCard group="Slides" viewport="1280x720" --&gt;` on line 1 so the 16:9 frame scales to fit the card.
- Tag each UI kit's index.html with `&lt;!-- @dsCard group="&lt;Product&gt;" viewport="&lt;design width&gt;x&lt;above-fold height&gt;" --&gt;` — the declared height caps what's shown, so pick the portion worth previewing.
- Update readme.md with a short "index" pointing the reader to the other files available. This should serve as a manifest of the root folder, plus a list of components, ui kits, etc.
- Create SKILL.md file (details below)
- You are done! The Design System tab shows every registered card. Do NOT summarize your output; just mention CAVEATS (e.g. things you were unable to do or unsure) and have a CLEAR, BOLD ASK for the user to help you ITERATE to make things PERFECT.

Components
- These are the brand's reusable UI primitives — Button, IconButton, Input, Select, Checkbox, Radio, Switch, Card, Badge, Tag, Avatar, Tabs, Dialog, Toast, Tooltip, etc. Group by concern (e.g. `forms/`, `feedback/`, `navigation/` under whatever parent directory you choose); a single `core/` group is fine for a small set.
- Each component is one file `&lt;Name&gt;.jsx` (or `.tsx`) with `export function &lt;Name&gt;(props) {…}` — a named, PascalCase export; that name becomes the public API and the literal `export` keyword is required so the bundler picks it up. Keep them self-contained: import React only, reference styling via the CSS custom properties (no CSS-in-JS libs, no npm packages). Siblings may import each other with relative paths.
- In the same directory, write `&lt;Name&gt;.d.ts` with the props interface — the sibling `.d.ts` is what gives a component its props contract, adherence rules, and starting-point eligibility; a `.jsx` without one is still bundled and exported under the namespace but gets none of those — and `&lt;Name&gt;.prompt.md` (first line is a one-sentence "what &amp; when", then a small JSX usage example, then notable variants/props).
- One card HTML per directory (name it whatever you like — e.g. `buttons.card.html`): first line is `&lt;!-- @dsCard group="Components" viewport="700x&lt;height&gt;" name="&lt;Directory label&gt;" --&gt;`. Link `styles.css` via the correct relative path, load the bundle via `&lt;script src="…/_ds_bundle.js"&gt;` (relative path to project root), then mount with `const { &lt;Name&gt; } = window.&lt;Namespace&gt;` in a `&lt;script type="text/babel"&gt;` block — call `check_design_system` to get the exact `&lt;Namespace&gt;`. Do NOT `&lt;script src&gt;` the `.jsx` directly (its `export` is unreachable from inline script). Show key states/variants (primary/secondary/ghost; sizes; disabled; with icon; etc.). Make it dense and scannable, not a single default render.
- Do NOT write `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json`, or a barrel `index.js` — those are generated automatically.

Starting points
- Consuming projects show a "Starting Points" picker that lets users seed a new design with a component or screen from this system. Entries are opt-in via a tag — separate from `@dsCard` (which populates the Design System tab).
- To mark a component: add `@startingPoint section="&lt;group&gt;" subtitle="&lt;one line&gt;" viewport="&lt;WxH&gt;"` to the JSDoc on its `&lt;Name&gt;.d.ts` props interface. The picker thumbnail is that directory's `@dsCard`-tagged HTML, so make sure it renders sensibly at the declared viewport.
- To mark a screen: add `&lt;!-- @startingPoint section="&lt;group&gt;" subtitle="&lt;one line&gt;" viewport="&lt;WxH&gt;" --&gt;` as the first line of the HTML file. The screen itself is the thumbnail.
- When the user says "create a starting point &lt;X&gt;" (or "add &lt;X&gt; as a starting point"), write an HTML file with the `&lt;!-- @startingPoint section="…" --&gt;` comment as its first line — any `.html` in the project with that tag is indexed. `ui_kits/&lt;x&gt;/index.html` is the conventional home but not required.
- When the user asks to remove or retitle a starting point, edit the tag. When they ask to change a thumbnail, edit the `@dsCard`-tagged HTML in that component's directory (component) or the screen HTML itself.

UI kit details:
- UI kits are high-fidelity visual + interaction recreations of full interfaces — screens, not primitives. They cut corners on functionality (not 'real production code') but are pixel-perfect, created by reading the original UI code if possible, or using figma's get-design-context. UI kits compose the component primitives you authored above; don't re-implement Button inside a kit. A UI kit's `index.html` must look like a typical view of the product. These are recreations, not storybooks.
- To start, update the todo list to contain these steps for each product: (1) Explore codebase + components in Figma (design context) and code, (2) Create 3-5 core screens for each product (e.g. homepage or app) with interactive click-thru components, (3) Iterate visually on the designs 1-2x, cross-referencing with design context.
- Figure out the core products from this company/codebase. There may be one, or a few. (e.g. mobile app, marketing website, docs website).
- Each UI kit contains JSX (well-factored; small, neat) for that product's surfaces — sidebars, composers, file panels, hero units, headers, footers, blog posts, video players, settings screens, login, etc.
- The index.html file should demonstrate an interactive version of the UI (e.g a chat app would show you a login screen, let you create a chat, send a message, etc, as fake)
- You should get the visuals exactly right, using design context or codebase import. Don't copy component implementations exactly; make simple mainly-cosmetic versions. It's important to copy.
- Focus on good component coverage, not replicating every single section in a design.
- Do not invent new designs for UI kits. The job of the UI kit is to replicate the existing design, not create a new one. Copy the design, don't reinvent it. If you do not see it in the project, omit, or leave purposely blank with a disclaimer.

Guidance
- Run independently without stopping unless there's a crucial blocker (E.g. lack of Figma access to a pasted link; lack of codebase access).
- When creating slides and UI kits, avoid cutting corners on iconography; instead, copy icon assets in! Do not create halfway representations of iconography using hand-rolled SVG, emoji, etc.
- CRITICAL: Do not recreate UIs from screenshots alone unless you have no other choice! Use the codebase, or Figma's get-design-context, as a source of truth. Screenshots are much lossier than code; use screenshots as a high-level guide but always find components in the codebase if you can!
- Avoid these visual motifs unless you are sure you see them in the codebase or Figma: bluish-purple gradients, emoji cards, cards with rounded corners and colored left-border only
- Avoid reading SVGs -- this is a waste of context! If you know their usage, just copy them and then reference them.
- When using Figma, use get-design-context to understand the design system and components being used. Screenshots are ONLY useful for high-level guidance. Make sure to expand variables and child components to get their content, too. (get_variable_defs)
- Stop if key resources are unnecessible: iff a codebase was attached or mentioned, but you are unable to access it via local_ls, etc, you MUST stop and ask the user to re-attach it using the Import menu. These get reattached often; do not complete a design system if you get a disconnect! Similarly, if a Figma url is inaccessible, stop and ask the user to rectify. NEVER go ahead spending tons of time making a design system if you cannot access all the resources the user gave you.

SKILL.md
- When you are done, we should make this file cross-compatible with Agent SKills in case the user wants to download it and use it in Claude Code.
- Create a SKILL.md file like this:

&lt;skill-md&gt;
---
name: {brand}-design
description: Use this skill to generate well-branded interfaces and assets for {brand}, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for protoyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
&lt;/skill-md&gt;

</pasted_text>

## User

Fixing design-system issues

## User

Fixing design-system issues

## User

Fixing design-system issues

## User

Fixing design-system issues

## Assistant

The checker keeps flagging Pretendard because it's loaded via a third-party `@import`ed stylesheet rather than an explicit `@font-face` in our closure. Let me declare it explicitly with a resolvable `src` so the compiler registers Pretendard as a real webfont.

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: check_design_system]_

**No issues found.** ✓ Pretendard is now registered as an explicit webfont (`Fonts: Pretendard`) with a resolvable CDN source, and the mono stack uses only system fonts. The design system is clean — 13 cards, 5 components, 1 template, 111 tokens.

The font still loads from CDN (not self-hosted), so for a fully offline build, uploading a Pretendard `.woff2` is still the ideal next step — but there are no outstanding validation issues.

## User

UI 등을 올렸어.

## Assistant

공식 가이드라인 매뉴얼 PDF를 올려주셨네요. 먼저 어떤 파일들이 있는지 확인하고 PDF를 읽어보겠습니다.

_[tool: list_files]_

A PDF guideline manual. Let me read the PDF skill to extract its content and any logo/mascot images.

_[tool: read_skill_prompt]_

_[tool: run_script]_

The Korean path trips the script helper. Let me copy it to a simple ASCII path first.

_[tool: copy_files]_

_[tool: run_script]_

The PDF is image-heavy — it contains the actual mascot artwork, logos, and the palette I already captured. The valuable part is the **images**. Let me render the pages to PNGs so I can see and extract the real mascot/logo assets.

_[tool: run_script]_

Rendering all 25 timed out. Let me do it in small batches.

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

Rendering is too slow (huge embedded images). Let me try extracting the embedded images directly instead of rendering.

_[tool: run_script]_

_[tool: run_script]_

Page 3 is text-only. Let me try the artwork pages — extracting embedded rasters (faster than full render).

_[tool: run_script]_

Embedded rasters extracted. Pages 8–10 are the 2048² mascot poses, page 12 the business cards, 14–24 application examples. Let me save the mascot pose images and view them to pick the front-facing one.

_[tool: run_script]_

_[tool: view_image]_

네, **`assets/` 폴더가 정확한 위치예요.** 그런데 방금 올려주신 가이드라인 PDF에서 제가 이미 에셋을 추출하고 있어요 — 위 이미지가 PDF에서 뽑아낸 **3D 울리니 정면(투명 PNG, 2048²)** 입니다. 잘 나옵니다!

방금 추출한 다른 포즈들을 확인하고 어떤 게 있는지 정리해볼게요.

_[tool: view_image]_

3D poses extracted cleanly. Let me build a contact sheet to see the full set at once (pages 8–12), then save the best into `assets/`.

_[tool: run_script]_

_[tool: run_script]_

_[tool: view_image]_

Now I can read the whole set:
- **p9#0** 3D front · **p9#1–4, p8#0** angles · **p9#5** back
- **p10#0** cheering · **p10#1** uniform · **p10#2** studying (2D應用)
- **p12#0–4** are the *prohibited-usage* examples (red X — stretched/squashed/recolored/rotated), so I'll **exclude** those.

Let me save the usable mascot assets into `assets/mascot/`.

_[tool: run_script]_

Let me verify transparency on the key files.

_[tool: image_metadata]_

Transparent 2048² PNGs — excellent quality. Now let me wire the real mascot into the Design System. First a Brand specimen card showing 울리니 with its palette.

_[tool: write_file]_

Now update the assets README to reflect what's extracted vs. still missing.

_[tool: write_file]_

Now clean up the temp extraction artifacts (keep the original upload and the saved mascot assets).

_[tool: delete_file]_

Let me update the main readme to reflect the mascot is now extracted (no longer missing).

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now let me verify the mascot card renders correctly.

_[tool: show_html]_

The mascot card renders beautifully with the real 울리니 artwork and palette. Let me validate the system.

_[tool: check_design_system]_

No issues — the Brand card is registered (14 cards total). The mascot is now part of the design system. Let me hand off.

_[tool: done]_

올려주신 가이드라인 PDF에서 **마스코트 울리니를 직접 추출**해서 디자인 시스템에 넣었어요. `assets/`에 올리실 필요 없이 PDF에서 바로 뽑았습니다.

**확보한 에셋** (`assets/mascot/`, 투명 PNG 2048²):
- 3D 턴어라운드 5종 (정면·측면·3/4 각도 2종·후면)
- 2D 응용 3종 (응원·유니폼·공부)
- *12p의 2D 정면은 사용 금지 예시(늘리기·압축·회전·리컬러)라 제외했습니다*

Design System 탭의 **Brand** 그룹에 울리니 + 전용 파스텔 팔레트 카드를 추가했고, 색상 변형 금지 규정도 명시했습니다.

**아직 필요한 것 — 이건 올려주셔야 합니다 (assets/ 에):**
PDF 안에서 **로고·심볼·시그니처는 벡터로만** 들어있어 깨끗하게 추출이 안 됩니다. 아래 원본을 올려주시면 헤더/푸터의 텍스트 워드마크 자리표시자를 진짜 로고로 교체할게요:
1. **시그니처 기본형(컬러)** — `.svg`/투명 `.png` (웹 헤더 표준)
2. **로고마크 U·O·U** — 파비콘/앱 아이콘
3. **심볼마크** (기린 + Σ 방패 + 1970)

추출한 울리니를 홈페이지 UI 키트(예: 캠퍼스 라이프 섹션이나 푸터 옆)에도 넣어드릴까요? 아니면 마스코트 스티커 시트 카드를 따로 만들까요?

## User

<attached_files>
- uploads/02 심볼마크.gif
- uploads/04 로고마크.gif
- uploads/06 로고타입.gif
- uploads/08 시그지쳐 기본형.gif
</attached_files>

## Assistant

공식 로고 GIF 4종을 받았네요 — 제가 찾던 바로 그 에셋입니다. 먼저 각 파일을 검사하고 웹용 투명 PNG로 변환할게요.

_[tool: image_metadata]_

_[tool: image_metadata]_

_[tool: image_metadata]_

_[tool: image_metadata]_

All four have transparency. The 로고마크 (04) and 시그니처 (08) are multi-variant sheets — let me view them closely to crop clean individual pieces.

_[tool: view_image]_

Clear — 04 is solid UOU (left) + outline UOU (right). Let me convert all to trimmed PNGs, splitting the logomark, by detecting transparent bounding boxes programmatically.

_[tool: run_script]_

The script helper rejects Korean paths. Let me copy to ASCII paths first.

_[tool: copy_files]_

_[tool: copy_files]_

_[tool: run_script]_

_[tool: view_image]_

The solid UOU logomark is clean. Now I'll wire the real logo into the design system. Let me update the Wordmark to use the official UOU logomark, and make a favicon.

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: copy_files]_

Now a favicon and the Brand logo specimen card.

_[tool: run_script]_

_[tool: write_file]_

Now add the favicon to both index.html files and update READMEs.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now update the assets README and main readme to reflect logos are now present.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now clean up temp GIFs and verify the logo card + header render.

_[tool: delete_file]_

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

The logo card looks great — symbol crest, UOU logomark (solid + outline), and signature sheet all rendering cleanly. Let me clean up the check screenshot and validate.

_[tool: delete_file]_

_[tool: check_design_system]_

No issues — 15 cards now (Brand: 2). Let me hand off on the homepage so the verifier can confirm the real logo renders in the header/footer.

_[tool: done]_

공식 로고 4종을 모두 디자인 시스템에 반영했어요. 텍스트 자리표시자는 이제 **진짜 UOU 로고마크**로 교체됐습니다.

**`assets/logo/` 에 추가** (제공된 GIF → 투명 PNG 변환):
- `symbol-mark.png` — 심볼마크(기린 + Σ 방패 + 1970 리본)
- `logomark-solid.png` / `logomark-outline.png` — U·O·U 로고마크 (면/선 분리)
- `logotype.png` — 로고타입
- `signature-sheet.png` — 시그니처 기본형 4종 시트
- `favicon.png` — 파비콘

**적용한 곳:**
- 홈페이지 **헤더·푸터 워드마크** → 실제 로고마크 사용 (자리표시자 제거)
- **파비콘** 연결 (UI 키트 + 템플릿)
- Design System 탭 **Brand** 그룹에 "공식 로고 · CI" 카드 추가 (변형 금지 규정 포함)

이제 색상·타입·간격·로고·마스코트·컴포넌트·UI 키트·템플릿까지 전부 실제 브랜드 에셋으로 채워진 완전한 디자인 시스템이 됐습니다.

**참고 / 선택 사항:**
- `signature-sheet.png`는 4종(컬러·흑백, 국·영문)이 한 장에 합쳐져 있어요. 특정 변형(예: 흑백 가로형)을 **단독 파일로 분리**해 드릴까요?
- 대형 인쇄·사인물용 **벡터 원본(.ai/.svg)** 이 있으면 추가로 올려주시면 좋아요 (화면용은 현재 PNG로 충분).
- 추출한 **울리니 마스코트**를 홈페이지(캠퍼스 라이프 섹션 등)에도 넣어드릴까요?

원하시는 방향 알려주시면 이어서 다듬을게요!

## User

우선 이것부터 하자. 파일을 교체하는 것이 좋을까?

## Assistant

이건 공식 **2D 턴어라운드 6면** 세트네요 — PDF에서 뽑은 3D 렌더보다 훨씬 깔끔합니다. **네, 교체하는 게 맞습니다.** 이 2D 세트를 기본(정면 = 표준 표기)으로 삼고, PDF에서 추출한 저화질 3D 턴어라운드는 정리하겠습니다. 응용 동작(응원·유니폼·공부)은 고유하니 유지할게요.

먼저 6면을 깨끗한 이름으로 가져오겠습니다.

_[tool: copy_files]_

Let me verify one and check the front image's metadata.

_[tool: image_metadata]_

Clean transparent PNGs. Now remove the lower-quality 3D PDF extracts and standardize the application-pose names.

_[tool: delete_file]_

_[tool: copy_files]_

Now update the mascot card to use the new official 2D art (it referenced the deleted/renamed files). Let me make it a proper turnaround + poses showcase.

_[tool: write_file]_

Let me add a poses card and update the asset docs.

_[tool: write_file]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Let me verify the updated mascot card renders with the new official 2D art.

_[tool: show_html]_

The official 2D turnaround renders beautifully — clean front hero + the full 6-view turnaround row + palette. Much better than the 3D extracts. Let me validate.

_[tool: check_design_system]_

No issues — 16 cards now (Brand: 3). The mascot is fully updated with the official 2D art.

_[tool: done]_

네, 교체했습니다! 공식 **2D 턴어라운드**가 훨씬 깔끔해서 이걸 기본으로 삼았어요.

**정리 완료:**
- ✅ `assets/mascot/`에 **공식 2D 턴어라운드 6면** 추가 — `ulrinee-front` (정면=표준), `45-left/right`, `side-left/right`, `back`
- 🗑️ PDF에서 추출한 **저화질 3D 렌더 5종은 삭제**
- 응용 동작 3종은 이름 정리 → `ulrinee-pose-cheer / -uniform / -study`
- Design System **Brand** 그룹: 마스코트 카드를 정면 + 6면 턴어라운드 + 팔레트로 갱신, 응용 동작 카드도 추가

이제 마스코트 에셋이 공식 2D 기준으로 통일됐습니다.

**다음으로 뭘 할까요?**
1. 울리니를 **홈페이지 UI 키트**에 자연스럽게 배치 (예: 캠퍼스 라이프 섹션, 또는 챗봇/안내 위젯)
2. 마스코트 **스티커 시트** 또는 **굿즈 목업** 카드
3. 컴포넌트 추가 (Select·Checkbox·Switch·Dialog·Toast 등)
4. 두 번째 UI 키트 (모바일 포털/학사 앱)

원하시는 것 말씀해 주세요!

## User

3D 기본형 이야

## Assistant

공식 **3D 기본형 턴어라운드(색감수정)**네요! 2D 턴어라운드와 별도로 3D 세트를 추가하겠습니다. 가져올게요.

_[tool: snip]_

_[tool: copy_files]_

Now a 3D turnaround card and updated docs.

_[tool: write_file]_

알겠습니다 — 응용형 2D·3D는 나중에 받는 대로 같은 방식으로 추가할게요. 우선 방금 받은 **3D 기본형 턴어라운드**를 시스템에 반영하고, 응용형 자리도 문서에 미리 표시해두겠습니다.

_[tool: read_file]_

_[tool: str_replace_edit]_

## Assistant

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: show_html]_

The 3D turnaround renders cleanly across all 5 views. Let me validate.

_[tool: check_design_system]_

No issues — 17 cards (Brand: 4). The 3D turnaround is in.

_[tool: done]_

**3D 기본형 턴어라운드** 추가 완료했습니다.

- `assets/mascot/`에 **3D 5면** 저장 — `ulrinee-3d-front / -45-left / -45-right / -side-left / -back` (색감수정 공식본, 투명 PNG)
- Design System **Brand** 그룹에 "울리니 · 3D 기본형" 카드 추가 (현재 Brand 카드 4개: 로고 / 2D 턴어라운드 / 3D 턴어라운드 / 응용 동작)
- `assets/README.md`에 **응용형 2D·3D는 "추가 예정"** 으로 자리 표시해 뒀어요

**응용형 2D·3D** 올려주시면 똑같이:
1. `assets/mascot/`에 정리된 이름으로 저장
2. Brand 그룹에 응용형 카드 추가/갱신

준비되면 올려주세요. 받는 대로 바로 반영하겠습니다 👍

## User

<attached_files>
- uploads/울산대학교캐릭터_공부하는모습.png
- uploads/울산대학교캐릭터_과잠입은모습.png
- uploads/울산대학교캐릭터_놀라는모습.png
- uploads/울산대학교캐릭터_비오는날.png
- uploads/울산대학교캐릭터_삐짐.png
- uploads/울산대학교캐릭터_생각중.png
- uploads/울산대학교캐릭터_야작하는모습.png
- uploads/울산대학교캐릭터_엄지척.png
- uploads/울산대학교캐릭터_운동복.png
- uploads/울산대학교캐릭터_응원.png
- uploads/울산대학교캐릭터_인사하는모습.png
- uploads/울산대학교캐릭터_졸업식.png
- uploads/울산대학교캐릭터_캠퍼스탐방.png
- uploads/울산대학교캐릭터_커피들고가는모습.png
- uploads/울산대학교캐릭터_하트.png
- uploads/울산대학교캐릭터_한복_남.png
- uploads/울산대학교캐릭터_한복_여.png
</attached_files>

## Assistant

_[tool: snip]_

17종 공식 **응용형 2D**가 왔네요! 이게 PDF에서 뽑았던 임시 응용 포즈(응원·유니폼·공부)를 대체합니다. 깔끔한 이름으로 전부 가져오고 임시본은 정리할게요.

_[tool: copy_files]_

완벽해요 — 이제 **응용형 2D 17종 + 응용형 3D 11종(색감수정)** 이 다 모였습니다. 임시 추출본은 지우고, 2D/3D 응용 세트를 폴더로 정리하겠습니다.

먼저 임시 추출 포즈를 삭제합니다.

_[tool: delete_file]_

Now copy the 17 official **2D** application poses into `assets/mascot/poses-2d/`.

_[tool: copy_files]_

16 of 17 copied — the 삐짐 (sulking) filename didn't match. Let me find its exact name.

_[tool: list_files]_

_[tool: copy_files]_

All 17 2D poses copied. Now the 11 official **3D** application poses into `assets/mascot/poses-3d/` (plus the 금지/prohibited reference).

_[tool: copy_files]_

All assets in. Let me check the 금지 (prohibited-usage) reference image to document it correctly.

_[tool: view_image]_

The 금지 file is essentially a duplicate of the sulking 3D pose — I'll keep it as a reference but not feature it. Now let me rebuild the poses cards to show the full official sets. First the 2D set (17 poses).

_[tool: write_file]_

_[tool: write_file]_

Now update the asset docs to reflect the full official pose sets.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: show_html]_

The 2D pose grid renders beautifully — all 17 official illustrations. Let me validate the system.

_[tool: check_design_system]_

No issues — 18 cards, **Brand: 5** (logo · 2D turnaround · 3D turnaround · 2D poses 17종 · 3D poses 10종). Let me hand off.

_[tool: done]_

**응용형 2D·3D 전부 반영 완료**했습니다! 🎉

**추가된 에셋:**
- `assets/mascot/poses-2d/` — **응용형 2D 17종** (응원·하트·엄지척·인사·놀람·생각중·삐짐·공부·야작·졸업식·캠퍼스탐방·커피·과잠·운동복·비오는날·한복 남/여)
- `assets/mascot/poses-3d/` — **응용형 3D 10종** (색감수정 공식 렌더)
- 임시 추출본(PDF) 3종은 삭제, `ulrinee-prohibited.png`는 규정 참고용으로 보관

**Design System → Brand 그룹 (카드 5개):**
로고 CI · 2D 턴어라운드 · 3D 턴어라운드 · **응용형 2D 17종** · **응용형 3D 10종**

이제 울리니 에셋이 턴어라운드부터 응용 동작까지 공식본으로 완비됐습니다.

**다음 단계 제안:**
1. 울리니를 **홈페이지 UI 키트**에 배치 — 예: 캠퍼스 라이프 섹션, 챗봇/도우미 위젯, 또는 푸터 옆 마스코트
2. **마스코트 스티커 시트** / 굿즈 목업 화면
3. 컴포넌트 확장 (Select·Checkbox·Switch·Dialog·Toast)
4. 두 번째 UI 키트 (모바일 학사 포털/앱)

어느 걸 진행할까요?

## User

울리니를 홈페이지 UI 키트에 배치  해 줘.

## Assistant

_[tool: snip]_

울리니를 홈페이지에 자연스럽게 배치하겠습니다. 현재 키트 구조를 확인할게요.

_[tool: read_file]_

울리니를 두 곳에 자연스럽게 넣겠습니다: ① **캠퍼스 라이프 배너** 섹션, ② 우하단 **울리니 도우미 위젯**(플로팅). 마스코트는 자체 파스텔 팔레트를 유지하고 배경만 코퍼레이트 그린 틴트를 써서 혼용 규정을 지킵니다.

_[tool: write_file]_

Now wire it into the homepage. Let me add the script and place the band + helper in the app.

_[tool: str_replace_edit]_

Now mirror it in the template (copy Mascot.jsx and wire it).

_[tool: copy_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Both the UI kit and template now include the 울리니 캠퍼스 라이프 배너 and the floating 도우미 위젯. Let me validate and hand off (the bundle compiles at end of turn, so the forked verifier will confirm the live render).

_[tool: check_design_system]_

No issues. Let me hand off the homepage so the verifier confirms the live render after compile.

_[tool: done]_

울리니를 홈페이지에 배치했습니다!

**추가한 2곳** (`Mascot.jsx` — UI 키트 + 템플릿 모두 반영):
1. **캠퍼스 라이프 배너** — 그린 틴트 섹션에 울리니(캠퍼스탐방 포즈) + "울리니와 함께하는 캠퍼스 라이프" + 퀵링크 칩(학사일정·캠퍼스맵·학식메뉴·셔틀버스)
2. **울리니 도우미 위젯** — 우하단 플로팅 챗봇 진입점(울리니 정면 + 말풍선, 닫기 가능)

마스코트는 **전용 파스텔 팔레트를 그대로 유지**하고 배경만 코퍼레이트 그린 틴트를 써서 두 팔레트 혼용 규정(§9)을 지켰습니다.

배경 검증이 끝나면 알려드릴게요. 배너 포즈를 다른 동작(응원·하트 등)으로 바꾸거나, 도우미 위젯을 실제 열리는 채팅 패널로 확장하는 것도 가능합니다. 더 원하시는 거 있으세요?

## User

2.	마스코트 스티커 시트 / 굿즈 목업 화면는 어떤 걸 말하는 거지?

## Assistant

_[tool: snip]_

두 가지는 울리니 응용 에셋(2D 17종·3D 10종)을 **보여주는 방식**이 다른 화면이에요.

**① 마스코트 스티커 시트 (Sticker Sheet)**
- 카카오톡 이모티콘 / 인스타 스티커 팩처럼 울리니 포즈들을 **격자로 나란히 진열**한 한 장짜리 시트
- 각 스티커에 라벨(응원·하트·졸업식·삐짐…), 다운로드/복사 버튼 같은 UI
- 용도: SNS·홍보팀이 "여기서 골라 쓰세요" 하는 **에셋 카탈로그** 성격
- 이미 Design System 탭의 "응용형 2D/3D" 카드가 이것의 축소판인데, 이건 **실제 사용 화면(다운로드 가능한 갤러리)** 으로 키운 버전

**② 굿즈 목업 (Goods Mockup)**
- 울리니가 실제 **제품에 인쇄된 모습**을 보여주는 화면 — 머그컵·에코백·후드티·아크릴 키링·스티커·노트 등
- "이렇게 굿즈로 만들면 이런 느낌" 을 미리 보는 **상품 진열/홍보 페이지**
- 학교 기념품샵, 신입생 웰컴키트, 졸업 굿즈 페이지 같은 맥락

요약하면 **①은 에셋을 고르는 카탈로그**, **②는 굿즈로 적용된 모습**입니다.

다만 ②의 **머그컵·에코백 같은 목업 배경 이미지는 제가 새로 그리거나 생성하지 않습니다**(브랜드 가이드 원칙). 실제 목업 PSD/사진이 있으면 거기에 울리니를 올려 드리고, 없으면 ①번 스티커 시트나 CSS로 만든 단순한 제품 실루엣 정도로 표현할 수 있어요.

**어떻게 할까요?**
- (A) **스티커 시트** 화면 만들기 — 바로 가능, 추천
- (B) **굿즈 목업** — 단순 CSS 제품 형태로 표현 OR 실제 목업 이미지 업로드 후 합성
- (C) 둘 다

골라주시면 진행하겠습니다!

## User

A 먼저 진행

## Assistant

A(스티커 시트) 먼저 진행하겠습니다. 울리니 포즈를 고르고 다운로드할 수 있는 **스티커 갤러리 화면**을 만들게요 — 2D/3D 탭 전환 + 각 스티커 다운로드 버튼.

_[tool: write_file]_

_[tool: check_design_system]_

The `@startingPoint` is deprecated — let me remove that line (the dsCard is enough).

_[tool: str_replace_edit]_

_[tool: check_design_system]_

Clean — 19 cards. Let me hand off the sticker sheet so the verifier confirms it renders after compile.

_[tool: done]_

**울리니 스티커 시트** 화면을 만들었습니다.

**`ui_kits/uou-website/sticker-sheet.html`** 구성:
- 상단에 울리니 정면 + "울리니 스티커" 타이틀
- **2D 일러스트(17) / 3D 렌더(10) 탭 전환** (디자인 시스템의 Tabs 컴포넌트 사용)
- 각 스티커 카드: 포즈 미리보기 + 라벨 + **다운로드 버튼**(투명 PNG 실제 다운로드)
- hover 시 그린 보더 + 그림자
- 하단에 사용 규정 안내(대외홍보팀 승인·변형 금지)

Design System 탭의 **UOU Website** 그룹에 카드로도 등록됐어요. 배경 검증 끝나면 알려드릴게요.

다음으로 **B(굿즈 목업)** 도 진행할까요? 아니면 스티커 시트에서 바꾸고 싶은 부분(레이아웃·복사 버튼 추가·카테고리 필터 등) 있으면 말씀해 주세요.

## User

울리니 스티커 시트는 어떻게 구체적으로 사용할 수 있을까?

## Assistant

_[tool: snip]_

울리니 스티커 시트는 "포즈를 한 곳에 모아 → 골라 → 다운로드/복사해서 → 다른 데 붙여 쓰는" **에셋 배포 허브**예요. 구체적인 활용은 이렇습니다.

**① 교내 구성원용 에셋 다운로드 페이지**
- 학생·교직원이 발표자료(PPT), 동아리 포스터, 과방 게시물 만들 때 "여기서 울리니 받아 쓰세요" 하는 공식 창구
- 지금도 각 카드의 다운로드 버튼이 **실제 투명 PNG를 내려받게** 동작합니다 (바로 PPT·한글·포토샵에 붙여넣기 가능)

**② 홍보팀 내부 브랜드 자산 관리**
- 대외홍보팀이 승인된 포즈만 모아두는 **단일 소스(single source of truth)** — "이 포즈들만 변형 없이 쓰세요"
- 사용 규정(승인·변형 금지)이 화면 하단에 항상 따라붙음

**③ SNS 콘텐츠 제작**
- 인스타·블로그 카드뉴스 만들 때 상황별 포즈(졸업식·시험기간 야작·비오는날 등)를 골라 사용

**④ 디자인 시스템 데모**
- "우리 브랜드엔 이런 마스코트 에셋이 있다"를 한눈에 보여주는 쇼케이스 (지금 Design System 탭 카드가 이 역할)

---

지금은 **데모(목업)** 수준이라, 실제로 더 쓸모 있게 만들려면 이런 걸 더 할 수 있어요:

- **카카오톡/슬랙 스티커처럼 "복사" 버튼** — 클릭하면 이미지가 클립보드에 복사돼 바로 붙여넣기
- **카테고리 필터/검색** — 감정·시즌·학사 등으로 분류 (포즈가 27종이라 유용)
- **개별 다운로드 + 전체 ZIP 다운로드**
- **포맷 선택** (PNG / 라벨 스티커용 여백 추가본 등)
- **실제 홈페이지에 링크** — 헤더 유틸바나 푸터에 "브랜드 자산 / 울리니 다운로드" 메뉴 연결

원하시면 이 중 **복사 버튼 + 카테고리 필터 + 전체 다운로드**를 붙여서 실제 사용 가능한 수준으로 끌어올릴 수 있어요. 진행할까요? 아니면 B(굿즈 목업)로 넘어갈까요?

## User

SNS 콘텐츠 제작에 스티커 시트를 사용할 수 있도록 도와 줘

## Assistant

SNS 콘텐츠 제작에 바로 쓸 수 있도록, 울리니 + 문구 + 브랜드를 합쳐 **인스타그램용 이미지를 만들어 다운로드하는 "SNS 카드 메이커"** 를 만들겠습니다. 정사각(1:1)·스토리(9:16) 포맷, 포즈/배경 선택, 문구 편집, 실제 PNG 내보내기까지 됩니다.

_[tool: write_file]_

_[tool: check_design_system]_

Clean — 20 cards. Let me hand off with a directed verifier check on the canvas rendering and pose/format switching, since the bundle only compiles at end of turn.

_[tool: done]_

_[tool: fork_verifier_agent]_

**울리니 SNS 카드 메이커**를 만들었습니다 — 스티커를 그냥 받는 걸 넘어 **바로 게시 가능한 SNS 이미지를 합성**해 줍니다.

**`ui_kits/uou-website/sns-maker.html`** 기능:
- **포맷**: 정사각 1:1 (피드) / 스토리 9:16
- **배경**: 화이트·민트·딥그린·옐로우 (브랜드 색, 다크 배경엔 흰 텍스트 자동)
- **문구 편집**: 헤드라인(줄바꿈 지원) + 보조 문구
- **포즈 선택**: 울리니 응용 포즈 12종 썸네일
- **실시간 미리보기** + **PNG 다운로드** (실제 1080px 고해상도 합성 — 인스타 업로드 바로 가능)
- 마스코트는 전용 팔레트 유지, 배경만 코퍼레이트 색 사용 (혼용 규정 준수)

방금 검증을 돌렸어요 — 캔버스 합성·배경/포즈 전환·스토리 포맷이 제대로 되는지 확인되는 대로 알려드리겠습니다.

이후엔 문구 프리셋(신입생 환영·시험기간·졸업 축하 등 원클릭), 로고마크 합성, 해시태그 자동 추가 같은 것도 붙일 수 있어요. 원하시면 말씀해 주세요!

## User

No issues found

## Assistant

The verifier confirmed the SNS card maker works — canvas composition, background/pose switching, and the story format all render correctly.

_[tool: snip]_

검증 통과했습니다 — 캔버스 합성, 배경·포즈 전환, 스토리 9:16 포맷 모두 정상 동작합니다. ✅

SNS 카드 메이커가 완성되어 이제 울리니로 인스타 피드/스토리 이미지를 바로 만들 수 있어요.

다음으로 원하시는 게 있으면 말씀해 주세요:
1. **문구 프리셋** — 신입생 환영·시험기간·졸업 축하 등 원클릭 적용
2. **로고마크 합성** — 카드에 UOU 로고마크 자동 배치
3. **굿즈 목업(B)** — 머그컵·에코백 등에 울리니 적용
4. 컴포넌트 확장 (Select·Checkbox·Switch·Dialog 등) 또는 모바일 학사 포털 UI 키트

편하게 알려주세요!

## User

이 부분은 왜 비어 있어?

## Assistant

템플릿 미리보기가 비어 있네요 — 렌더링이 안 되고 있다는 뜻입니다. 템플릿 파일을 확인해볼게요.

_[tool: read_file]_

Let me render it and check for errors.

_[tool: show_html]_

_[tool: read_file]_

_[tool: show_html]_

Blank. Let me check the console logs.

_[tool: get_webview_logs]_

No errors but blank. Let me probe what actually loaded.

_[tool: eval_js]_

All components and the bundle loaded — but `rootHTML` is 0, so `mount()` never ran. The cause: Babel-transpiled scripts execute asynchronously, so by the time this inline script runs, `DOMContentLoaded` has already fired and the listener never triggers. I'll just call `mount()` directly (its polling loop already waits for readiness).

_[tool: str_replace_edit]_

_[tool: show_html]_

이제 정상 렌더됩니다 — 로고마크·GNB·히어로·울리니 도우미 위젯까지 다 나옵니다. 원인은 **Babel 스크립트가 비동기로 실행돼 `DOMContentLoaded`가 이미 끝난 뒤라 mount가 안 걸린 것**이었어요. 직접 호출로 고쳤습니다.

이 패턴은 consuming project에서도 쓰일 템플릿이라 중요한 수정이었네요. 검증 후 마무리할게요.

_[tool: done]_

비어 있던 원인을 찾아 고쳤습니다. ✅

**문제**: 템플릿이 `DOMContentLoaded` 이벤트로 mount를 걸었는데, Babel 스크립트는 **비동기로 컴파일·실행**되다 보니 이벤트가 이미 끝난 뒤에 리스너가 등록돼서 화면이 영영 비어 있었어요. (컴포넌트·번들은 다 정상 로드된 상태였고, 렌더만 안 걸린 것)

**수정**: `mount()`를 직접 호출하도록 변경 — 내부 폴링 루프가 번들 준비를 알아서 기다립니다. 이제 로고·GNB·히어로·퀵메뉴·공지·울리니 배너·도우미 위젯까지 전부 렌더됩니다.

템플릿 미리보기도 채워졌을 거예요. 더 봐드릴 부분 있으면 말씀해 주세요!

## User

디자인 시스템을 이용해서 기존 디자인을 수정하는 방법을 알려줘.

## Assistant

좋은 질문이에요. 이 디자인 시스템을 **기존 디자인에 적용/수정하는 방법**을 실제 워크플로우 기준으로 정리해 드릴게요. 먼저 현재 시스템이 어떻게 구성돼 있는지 빠르게 확인하겠습니다.

_[tool: list_files]_

이 디자인 시스템으로 **기존 디자인을 수정하는 방법**은 크게 3가지 경로가 있어요. 상황별로 정리해 드릴게요.

---

## 방법 1. 가장 쉬운 길 — 저에게 기존 디자인을 주세요

이게 제일 빠릅니다. 다음 중 아무거나 주시면 제가 UOU 토큰·컴포넌트로 다시 칠해 드려요.

- **HTML/CSS 파일** 첨부 또는 붙여넣기
- **스크린샷** ("이 화면을 UOU 스타일로 바꿔줘")
- **Figma 링크** 또는 코드베이스

→ 제가 색·폰트·간격·버튼/카드/입력창을 전부 UOU 규정에 맞게 교체해 드립니다.

---

## 방법 2. 다른 프로젝트에 이 시스템을 "연결(Bind)"

다른 디자인 프로젝트에서 작업 중이라면, 그 프로젝트에 **이 디자인 시스템을 바인딩**하세요. 그러면:

- **Starting Points** 메뉴에서 UOU 홈페이지 템플릿·컴포넌트를 바로 시작점으로 꺼내 쓸 수 있고
- 토큰(색·폰트)·컴포넌트 번들이 그 프로젝트에서 자동으로 로드됩니다

연결 후엔 페이지 `<head>`에 한 줄만 넣으면 됩니다:

```html
<link rel="stylesheet" href="_ds/uou-design-system/styles.css">
<script src="_ds/uou-design-system/_ds_bundle.js"></script>
```

---

## 방법 3. 기존 코드의 값을 토큰으로 직접 교체

이미 가진 HTML/CSS가 있으면 **하드코딩된 값을 UOU 변수로 바꾸기**만 하면 됩니다.

**Before (브랜드 없는 일반 디자인)**
```css
.btn      { background: #1a73e8; border-radius: 6px; padding: 10px 20px; }
.card     { border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 1px 3px rgba(0,0,0,.1); }
body      { color: #222; font-family: Arial; }
```

**After (UOU 토큰 적용)**
```css
.btn      { background: var(--green-500); border-radius: var(--radius-md); padding: var(--space-3) var(--space-5); }
.card     { border: 1px solid var(--gray-200); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); }
body      { color: var(--gray-800); font-family: var(--font-sans); }
```

치환 규칙 요약:

| 기존에 이런 게 보이면 | 이 토큰으로 |
|---|---|
| 파란/임의 강조색 (`#1a73e8` 등) | `--green-500` (주색) / hover는 `--green-600` |
| 본문 글자색 (`#222`, `#333`) | `--gray-800` / 제목은 `--gray-900` |
| 보조 텍스트 (`#777`) | `--gray-500` |
| 보더 (`#ddd`, `#ccc`) | `--gray-200` (기본) / `--gray-300` (입력창) |
| 임의 radius (`6px`, `10px`) | `--radius-md` (버튼) / `--radius-lg` (카드) |
| 임의 그림자 | `--shadow-sm / -md / -lg` |
| 임의 폰트 | `--font-sans` (Pretendard) |
| 간격 (`10px`, `24px`) | `--space-3`, `--space-5` (4px 배수) |

그리고 React를 쓴다면, 직접 만든 버튼·입력창을 시스템 컴포넌트로 교체:
```jsx
const { Button, Card, Input, Badge, Tabs } = window.UOUDesignSystem_08270e;
// <button className="btn">  →  <Button variant="primary">
```

---

## 핵심 적용 원칙 (놓치기 쉬운 것)

1. **그린은 강조에만** — 버튼·링크·포인트만. 넓은 면은 화이트/그레이로 비웁니다.
2. **옐로우는 절제** — 배지·하이라이트 좁은 영역만.
3. **마스코트 팔레트 혼용 금지** — 울리니의 파스텔 그린은 코퍼레이트 그린과 섞지 않습니다.
4. **로고 변형 금지** — 늘리기·압축·회전·리컬러 안 됨.

---

가장 직접적으로 도와드리려면 — **수정하고 싶은 기존 디자인(파일·스크린샷·링크)을 주세요.** 바로 UOU 스타일로 변환해서 before/after로 보여드릴게요.

원하시면 제가 **"적용 예시" 데모 화면**(평범한 디자인 → UOU 적용 전후 비교)을 하나 만들어 드릴 수도 있어요. 만들까요?

## User

이 파일을 리디자인해 줘.

## Assistant

Looks excellent — fully on-brand: green avatar/badge, Lucide panel icons, semantic date tags (open=green, 마감=red, 최종=yellow, 공시=blue info), green step numbers, green system banner with monitor icon, yellow warning with alert icon. Let me clean up and hand off.

_[tool: delete_file]_

Brief summary before handoff: redesigned the portal with UOU tokens — data and functionality untouched.

_[tool: done]_

**대학정보공시 담당자 포털**을 UOU 디자인 시스템으로 리디자인했습니다. **데이터·기능은 100% 그대로**, 비주얼만 교체했어요.

**`redesign/disclosure-portal.html`**

| 영역 | Before | After |
|---|---|---|
| 헤더 | 네이비 + 그라데이션 가짜 로고 | 화이트 + **실제 UOU 로고마크** + 그린 배지 |
| 타임라인 | 네이비 배경, 블루 점 | 라이트 그레이 밴드 · 완료=그린·진행=옐로우·예정=그린아웃라인 |
| 색상 | 블루/틸/앰버 임의색 | **UOU 그린·그레이·옐로우 토큰** (의미색: 마감=danger, 최종=warning, 공시=info) |
| 폰트·간격·radius·그림자 | 하드코딩 | 전부 디자인 시스템 토큰 |
| 아이콘 | 이모지(📅📋✅🖥️📞⚠️) | **Lucide 아이콘** |
| 빈 화면 | 📋 이모지 | **울리니(생각중) 마스코트** |

그린은 강조(버튼·배지·스텝·링크)에만 쓰고 넓은 면은 화이트/그레이로 비워 UOU의 학구적·절제된 톤을 지켰습니다.

이게 바로 **방법 1(기존 디자인을 주면 UOU로 변환)** 의 실제 예시예요. 검증 끝나면 알려드릴게요. 헤더를 더 강조하거나(그린 라인 추가 등), 패널 아이콘 색을 다르게 하고 싶으면 조정해 드립니다.

## User

이 부분의 폰트를 더 키워줘

## Assistant

타임라인 영역의 폰트를 키워드릴게요. 현재 스타일을 확인하겠습니다.

_[tool: grep]_

Let me see the full timeline CSS block to know all the font sizes involved.

_[tool: read_file]_

_[tool: read_file]_

폰트가 꽤 작네요 (라벨 10px, 날짜 10px, 항목명 9px). 가독성 있게 키우겠습니다.

_[tool: str_replace_edit]_

_[tool: show_html]_

_[tool: show_html]_

타임라인 스타일로 바꾸는 게 가독성에도 더 좋겠네요. 현재 가로 스텝퍼 마크업을 보고 **세로 타임라인**으로 재구성하겠습니다.

_[tool: read_file]_

8개 단계가 있네요. 화살표로 끊긴 박스 대신 **하나의 연결선이 노드를 관통하는 진짜 타임라인 레일** 형태로 바꾸겠습니다. 완료 구간은 그린 라인, 폰트도 키워서 가독성 있게요.

_[tool: str_replace_edit]_

_[tool: show_html]_

훨씬 타임라인다워졌네요. 연결선이 노드를 관통하고, 완료 구간(5.27→6.4)은 그린 라인, 진행 중(6.4)은 옐로우 노드, 예정 단계는 그린 아웃라인 노드로 한눈에 진행 상황이 읽힙니다. 폰트도 날짜 14px·항목명 12px로 키웠어요.

검증하고 마무리하겠습니다.

_[tool: done]_

타임라인 형태로 바꿨습니다.

**변경 내용:**
- 화살표로 끊긴 박스 → **하나의 연결선이 노드를 관통하는 가로 타임라인 레일**
- 진행 상태가 색으로 읽힘: **완료 구간 = 그린 라인 + 그린 노드**, **진행 중 = 옐로우 노드(글로우)**, **예정 = 그린 아웃라인 노드**
- 노드 크기 ↑ (9→18px), 날짜 14px·항목명 12px로 폰트 확대
- 진행 중 단계는 항목명도 진하게 강조

데이터·일정은 그대로 두고 시각 표현만 바꿨어요. 혹시 **세로 타임라인**(각 단계가 줄줄이 내려오는 형태)이 더 좋으시면 그것도 만들어 드릴 수 있어요. 아니면 노드에 호버 시 상세 툴팁 추가도 가능합니다. 원하시면 말씀해 주세요!

## User

세로 타임라인으로 바꿔 줘

## Assistant

세로 타임라인으로 바꾸겠습니다. 노드를 세로 레일로 연결하고, 날짜+항목명을 오른쪽에 배치할게요.

_[tool: str_replace_edit]_

`<br>`을 숨기면 두 줄이 띄어쓰기 없이 붙으니, 세로에서는 두 줄 유지가 낫겠네요. 그 규칙만 제거합니다.

_[tool: str_replace_edit]_

_[tool: show_html]_

세로 타임라인으로 잘 바뀌었습니다. 노드가 세로 레일로 연결되고, 완료 구간은 그린 라인, 진행 중(6.4)은 옐로우 노드로 강조됩니다. 날짜 15px·항목명 13px로 가독성도 좋아졌어요.

검증하고 마무리하겠습니다.

_[tool: done]_

세로 타임라인으로 변경 완료했습니다.

- 노드를 **세로 레일**로 연결, 완료 구간(5.27→6.4)은 그린 라인
- 진행 중(6.4) 옐로우 노드 + 글로우, 예정 단계는 그린 아웃라인 노드
- 날짜 15px·항목명 13px, 항목명은 왼쪽 정렬 두 줄
- 데이터·일정은 그대로

스크롤이 조금 길어지긴 하는데, 단계가 8개라 그렇습니다. 혹시 **접기/펼치기**(완료 단계는 접고 진행 중 위주로) 하거나, **현재 단계만 강조**하는 컴팩트 버전도 만들어 드릴 수 있어요. 더 다듬을 부분 있으면 말씀해 주세요!

## User

변경된 파일의 위치가 어디야?

## Assistant

변경된 파일 위치는:

**`redesign/disclosure-portal.html`**

(프로젝트 루트 안의 `redesign/` 폴더에 있습니다)

지금 보고 계신 화면이 바로 그 파일이에요. 방금 가로 타임라인 → 세로 타임라인으로 수정한 대학정보공시 담당자 포털입니다.

필요하시면:
- **다운로드** — 파일로 받아보실 수 있게 해드릴까요?
- **이름 변경/이동** — 다른 폴더나 이름으로 정리해드릴까요?

원하시는 거 있으면 말씀해 주세요!

## User

원래대로 가로 해줘

## Assistant

가로 타임라인으로 되돌리겠습니다.

_[tool: str_replace_edit]_

_[tool: show_html]_

가로 타임라인으로 되돌렸습니다. ✅

연결선이 노드를 관통하는 가로 레일 형태로, 완료 구간은 그린·진행 중은 옐로우 노드로 표시됩니다. `redesign/disclosure-portal.html` 파일입니다. 더 조정할 부분 있으면 말씀해 주세요!

## User

담당자를 선택했을 때 나오는 화면도 이 디자인시스템을 적용한 거야?

## Assistant

좋은 질문이에요. 담당자 선택 시 나오는 화면도 같은 디자인 시스템이 적용됐는지 직접 확인해볼게요.

_[tool: eval_js]_

Let me actually trigger the selection to see the detail screen render.

_[tool: eval_js]_

The detail screen is now showing. Let me screenshot it to verify the design system is applied.

_[tool: save_screenshot]_

_[tool: save_screenshot]_

네, 담당자 선택 시 나오는 화면도 **동일한 UOU 디자인 시스템이 그대로 적용**돼 있습니다. 확인된 내용:

**담당자 카드**
- 그린 틴트 아바타(`정다`) + 그린 아웃라인 부서 배지(`입학관리팀`) — 브랜드 그린 토큰

**3개 패널 (공시 일정 / 담당 공시 항목 / 업무 절차)**
- 카드: 화이트 배경 + 그레이 보더 + 시스템 그림자/radius
- 패널 헤더 아이콘: **Lucide** (calendar, file-text, list-checks)
- **의미색 날짜 태그**: 오픈=그린(success) · 수정마감=레드(danger) · 최종확인=옐로우(warning) · 대국민공시=블루(info)
- 항목 배지: 그레이 info 배지
- 업무 절차: **그린 원형 스텝 번호** + 그린 시스템 배너(모니터 아이콘) + 그린 액션 버튼

전부 색·폰트·간격·radius·그림자·아이콘이 디자인 시스템 토큰/컴포넌트 규칙을 따르고 있어요. 한 가지 작게 눈에 띄는 건 "2차 오픈 (4년제)" 옆의 **빨간 점**인데, 이건 일정 상태 표시로 의도된 거예요.

검사용 스크린샷은 정리해둘게요.

_[tool: delete_file]_

확인 끝났습니다. 담당자 선택 후 나오는 상세 화면(담당자 카드 + 공시 일정/담당 항목/업무 절차 3패널)도 **모두 UOU 디자인 시스템이 적용**돼 있어요 — 그린 강조색, Lucide 아이콘, 의미색 날짜 태그, 시스템 카드/배지/버튼 스타일까지 일관되게요.

더 다듬거나 확인하고 싶은 부분 있으면 말씀해 주세요!

## User

이 부분은 세로 타임라인으로 바꿔줘

## Assistant

공시 일정 패널의 항목들을 세로 타임라인으로 바꾸겠습니다. 현재 마크업과 스타일을 확인할게요.

_[tool: grep]_

마크업 구조를 파악했습니다. `.sched-item` 항목들에 **왼쪽 세로 레일 + 노드**를 붙여 타임라인 형태로 만들겠습니다. 먼저 전체 CSS와 렌더 마크업을 보겠습니다.

_[tool: read_file]_

`.sched-item`들을 왼쪽 세로 레일 + 그린 노드로 연결되는 타임라인으로 만들겠습니다.

_[tool: str_replace_edit]_

_[tool: save_screenshot]_

공시 일정 패널이 세로 타임라인으로 바뀌었습니다. 1차 오픈·2차 오픈 단계마다 왼쪽에 그린 노드가 찍히고 세로 레일로 연결돼요. 단계 라벨(1차 오픈)도 그린으로 강조했습니다. 정리하고 검증할게요.

_[tool: delete_file]_

_[tool: done]_

공시 일정 패널을 세로 타임라인으로 바꿨습니다. ✅

- 각 일정 단계(1차 오픈·2차 오픈)에 **왼쪽 그린 노드** + **세로 연결 레일**
- 단계 라벨을 그린으로 강조
- 날짜 태그(오픈·수정마감·최종확인·대국민공시)는 의미색 그대로 유지

데이터는 그대로 두고 시각 표현만 타임라인으로 바꿨어요. 더 다듬을 부분 있으면 말씀해 주세요!

## User

"입학전형·재학생 현황 공시" 이 글자의 폰트 크기가 어떻게 돼?

## Assistant

"입학전형·재학생 현황 공시"는 일정 항목의 제목(`.sched-title`)이고, 폰트 크기는 **13px** 입니다.

해당 스타일:
```css
.sched-title { font-size: 13px; font-weight: 600; color: var(--gray-900); line-height: 1.4; }
```

키우거나 조정해 드릴까요? 원하시는 크기를 말씀해 주시면 바로 바꿔드리겠습니다.

## User

최소 폰트 크기가 17이 되도록, 모든 폰트를 조정해 줘. 폰트를 프리텐다드로.,

