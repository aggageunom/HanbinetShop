# 쇼핑몰 MVP 개발 TODO

## ✅ Phase 1: 기본 인프라 (1주)

- [x] Next.js 프로젝트 셋업
- [x] Supabase 프로젝트 생성 및 테이블 스키마 작성
  - [x] products 테이블 생성
  - [x] cart_items 테이블 생성
  - [x] orders 테이블 생성
  - [x] order_items 테이블 생성
  - [x] 인덱스 및 트리거 설정
- [x] Clerk 연동 (회원가입/로그인)
  - [x] ClerkProvider 설정
  - [x] SyncUserProvider 구현
  - [x] 사용자 동기화 API
- [ ] 기본 레이아웃 및 라우팅
  - [ ] 홈페이지 레이아웃 개선 (쇼핑몰 메인으로 변경)
  - [ ] 네비게이션 바 개선 (상품, 장바구니, 마이페이지 링크 추가)
  - [ ] Footer 컴포넌트 추가
  - [ ] 반응형 디자인 적용

---

## 🛍️ Phase 2: 상품 기능 (1주)

- [ ] 홈페이지 (`app/page.tsx`)

  - [ ] 히어로 섹션 (쇼핑몰 소개)
  - [ ] 인기 상품 카루셀/그리드
  - [ ] 카테고리별 추천 상품 섹션
  - [ ] 반응형 레이아웃

- [ ] 상품 목록 페이지 (`app/products/page.tsx`)

  - [ ] Server Component로 상품 목록 조회 (Supabase)
  - [ ] 상품 카드 컴포넌트 (`components/products/product-card.tsx`)
  - [ ] 무한 스크롤 또는 페이지네이션
  - [ ] 로딩 상태 UI
  - [ ] 에러 핸들링

- [ ] 카테고리 필터링

  - [ ] 카테고리 필터 컴포넌트 (`components/products/category-filter.tsx`)
  - [ ] URL 쿼리 파라미터로 필터링 (예: `/products?category=clothing`)
  - [ ] "전체" 카테고리 옵션
  - [ ] 활성 카테고리 하이라이트

- [ ] 상품 상세 페이지 (`app/products/[id]/page.tsx`)

  - [ ] 동적 라우팅 설정
  - [ ] 상품 상세 정보 표시
  - [ ] 상품 이미지 갤러리 (현재는 이미지 없음, 추후 추가 가능)
  - [ ] 재고 수량 표시
  - [ ] 장바구니 추가 버튼
  - [ ] 수량 선택 UI
  - [ ] "구매하기" 버튼 (장바구니 없이 바로 주문)

- [ ] 어드민 상품 등록 (Supabase 직접)
  - [ ] README에 상품 등록 가이드 작성
  - [ ] 샘플 상품 데이터는 이미 마이그레이션에 포함됨

---

## 🛒 Phase 3: 장바구니 & 주문 (1주)

- [ ] 장바구니 기능

  - [ ] 장바구니 페이지 (`app/cart/page.tsx`)
  - [ ] 장바구니 아이템 컴포넌트 (`components/cart/cart-item.tsx`)
  - [ ] 장바구니 추가 기능 (Server Action 또는 API Route)
    - [ ] `actions/cart/add-to-cart.ts` 또는 `app/api/cart/route.ts`
    - [ ] 중복 상품 처리 (수량 증가)
    - [ ] 재고 확인 로직
  - [ ] 장바구니 조회 기능
    - [ ] `actions/cart/get-cart.ts` 또는 `app/api/cart/route.ts`
    - [ ] clerk_id로 필터링
  - [ ] 장바구니 수량 변경
    - [ ] `actions/cart/update-quantity.ts` 또는 `app/api/cart/[id]/route.ts`
    - [ ] 재고 초과 방지
  - [ ] 장바구니 아이템 삭제
    - [ ] `actions/cart/remove-item.ts` 또는 `app/api/cart/[id]/route.ts`
  - [ ] 장바구니 총액 계산
  - [ ] 빈 장바구니 UI

- [ ] 주문 프로세스 구현

  - [ ] 주문 페이지 (`app/checkout/page.tsx`)
  - [ ] 배송지 정보 입력 폼
    - [ ] react-hook-form + Zod 사용
    - [ ] 폼 검증 (주소, 연락처 등)
  - [ ] 주문 요약 컴포넌트 (`components/checkout/order-summary.tsx`)
  - [ ] 주문 생성 API/Server Action
    - [ ] `actions/orders/create-order.ts` 또는 `app/api/orders/route.ts`
    - [ ] 트랜잭션 처리 (주문 생성 + 주문 아이템 생성)
    - [ ] 재고 차감 로직
    - [ ] 장바구니 비우기 (주문 완료 후)

- [ ] 주문 테이블 연동
  - [ ] 주문 데이터 검증
  - [ ] 주문 상태 관리 ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')
  - [ ] 주문 ID 생성 및 반환

---

## 💳 Phase 4: 결제 통합 (1주)

- [ ] Toss Payments MCP 연동

  - [ ] Toss Payments MCP 설정 확인
  - [ ] 테스트 결제 키 환경 변수 설정
  - [ ] 결제 위젯 컴포넌트 구현 (`components/payment/toss-payment.tsx`)
  - [ ] 결제 요청 API 구현
    - [ ] `actions/payment/request-payment.ts` 또는 `app/api/payment/request/route.ts`
    - [ ] 결제 금액 검증
    - [ ] 주문 정보 전달

- [ ] 테스트 결제 구현

  - [ ] 결제 페이지 (`app/payment/[orderId]/page.tsx`)
  - [ ] 결제 성공 콜백 처리
    - [ ] `app/api/payment/callback/route.ts`
    - [ ] 주문 상태 업데이트 ('pending' → 'confirmed')
    - [ ] 결제 정보 저장 (필요 시 결제 테이블 추가)
  - [ ] 결제 실패 처리
  - [ ] 결제 취소 처리

- [ ] 결제 완료 후 주문 저장
  - [ ] 결제 성공 시 주문 상태 자동 업데이트
  - [ ] 결제 완료 페이지 (`app/payment/success/page.tsx`)
  - [ ] 주문 번호 표시
  - [ ] 주문 상세 내역 표시

---

## 👤 Phase 5: 마이페이지 (0.5주)

- [ ] 주문 내역 조회

  - [ ] 마이페이지 (`app/my-page/page.tsx`)
  - [ ] 주문 목록 컴포넌트 (`components/my-page/order-list.tsx`)
  - [ ] 주문 조회 API/Server Action
    - [ ] `actions/orders/get-user-orders.ts` 또는 `app/api/orders/route.ts`
    - [ ] clerk_id로 필터링
    - [ ] 최신순 정렬
  - [ ] 주문 상태별 필터링 (전체/대기중/배송중/완료)
  - [ ] 빈 주문 내역 UI

- [ ] 주문 상세 보기
  - [ ] 주문 상세 페이지 (`app/my-page/orders/[orderId]/page.tsx`)
  - [ ] 주문 정보 표시 (주문 번호, 날짜, 상태, 총액)
  - [ ] 주문 상품 목록 표시
  - [ ] 배송지 정보 표시
  - [ ] 주문 취소 기능 (status가 'pending'일 때만)
    - [ ] `actions/orders/cancel-order.ts` 또는 `app/api/orders/[id]/cancel/route.ts`
    - [ ] 재고 복구 로직

---

## 🧪 Phase 6: 테스트 & 배포 (0.5주)

- [ ] 전체 플로우 테스트

  - [ ] 회원가입/로그인 플로우
  - [ ] 상품 조회 및 필터링
  - [ ] 장바구니 추가/수정/삭제
  - [ ] 주문 생성 플로우
  - [ ] 결제 플로우 (테스트 모드)
  - [ ] 주문 내역 조회
  - [ ] 반응형 디자인 테스트 (모바일, 태블릿, 데스크톱)
  - [ ] 에러 케이스 테스트 (재고 부족, 결제 실패 등)

- [ ] 버그 수정

  - [ ] 콘솔 에러 확인 및 수정
  - [ ] 타입 에러 수정
  - [ ] UI/UX 개선사항 반영

- [ ] Vercel 배포
  - [ ] 환경 변수 설정 (.env.example 업데이트)
  - [ ] Vercel 프로젝트 생성 및 연결
  - [ ] Supabase 연결 확인
  - [ ] Clerk 연결 확인
  - [ ] 도메인 설정 (선택)
  - [ ] 배포 후 전체 기능 재테스트

---

## 📝 추가 작업

- [ ] 에러 바운더리 구현
- [ ] 로딩 스켈레톤 UI 추가
- [ ] SEO 최적화 (metadata 설정)
- [ ] 접근성 개선 (ARIA 라벨 등)
- [ ] 성능 최적화 (이미지 최적화, 코드 스플리팅)
- [ ] 로깅 시스템 구축 (핵심 기능에 로그 추가)
