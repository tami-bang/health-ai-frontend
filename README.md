# 🩺 Health AI Frontend

증상 기반 AI 검색 결과를  
사용자가 이해하고 행동할 수 있도록 전달하는  
Next.js 기반 헬스케어 UI

---

## Overview

- AI 검색 결과 → 사용자 이해 → 행동 유도
- 검색 / 요약 / triage 통합 UI
- 상태 기반 렌더링 구조

---

## Core Flow

User Input  
→ API Request  
→ Backend (FastAPI)  
→ Search Result + Triage + Summary  
→ UI Rendering  
→ User Action  

---

## Key Features

### Symptom Search
- 자연어 입력
- /search /search/summary 연동
- 기본 / 요약 검색 분리

---

### Result Rendering
- top_result / results / related_topics 구조화
- AI summary 카드 표시
- null-safe 렌더링

---

### Triage UI
- red / yellow / green 시각화
- triage 메시지 표시
- 행동 유도 구조

---

### Authentication
- signup / login
- access / refresh token
- 보호 라우트

---

### UI State Handling
- loading
- empty
- error
- success

---

## UX Issues (Observed)

- 클릭 시 반응 없음
- 로딩 상태 미표시
- 버튼 피드백 부족
- 결과 대기 중 UX 단절

---

## UX Improvements

- loading 상태 관리
- skeleton UI 적용
- 버튼 disabled 처리
- hover / active 스타일 추가
- 중복 요청 방지

---

## UX Result

- 반응성 개선
- 상태 인지 가능
- UX 흐름 유지
- 사용자 신뢰도 향상

---

## Architecture

app/  
├─ (public)  
├─ (user)  
├─ admin  
├─ layout.tsx  
└─ providers.tsx  

---

lib/  
├─ api/client.ts  
├─ api/search-api.ts  
├─ api/auth-api.ts  
├─ auth/auth-session.ts  
└─ utils/response.ts  

---

components/  
├─ ui  
├─ layout  
├─ auth  
└─ search  

---

## API Mapping

- POST /search  
- POST /search/summary  
- POST /auth/signup  
- POST /auth/login  
- POST /auth/refresh  
- GET /auth/me  

---

## Rendering Strategy

- guidance → triage
- top_result → 대표 결과
- results → 리스트
- related_topics → 연관
- ai_summary → 요약

---

## Tech Stack

Frontend
- Next.js
- TypeScript
- Tailwind CSS

Backend
- FastAPI

State
- Local session storage

---

## Getting Started

git clone https://github.com/tami-bang/health-ai-frontend.git  
cd health-ai-frontend  

npm install  
npm run dev  

http://localhost:3000  

---

## Environment

NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000  

---

## Design Focus

- 상태 기반 UI
- 사용자 행동 중심 UX
- API 대응 구조
- 사용자 / 관리자 분리

---

## What I Built

- AI 검색 UI
- API 연동
- triage 시각화
- 인증 흐름
- 상태 처리 구조

---

## Limitations

- 검색 정확도 → 백엔드 의존
- summary 품질 → fallback 영향
- 일부 인터랙션 추가 개선 필요

---

## Roadmap

- 인터랙션 강화
- loading UX 개선
- 캐싱 적용

---

## Author

GitHub: tami-bang