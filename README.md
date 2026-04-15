# Health AI Frontend

증상 기반 AI 검색 결과를 사용자에게 이해 가능하고 행동 가능한 형태로 전달하는  
Next.js 기반 헬스케어 AI 검색 서비스 프론트엔드

Symptom-based healthcare AI search interface built with Next.js  
Designed to deliver AI results, triage guidance, and user-centered healthcare UX

---

## Overview

`health-ai-frontend`는 Next.js 기반 헬스케어 AI 검색 서비스의 프론트엔드입니다.

단순히 검색 결과를 보여주는 화면이 아니라,  
사용자의 자연어 증상 입력을 기반으로 검색 결과, AI 요약, 응급도 판단, 후속 행동 유도까지  
하나의 사용자 경험 흐름으로 연결하는 것을 목표로 설계했습니다.

This project is not just a search UI.  
It is designed to turn AI search results into a clear, usable healthcare experience through structured result visualization, triage guidance, and action-oriented UX.

---

## Problem & Solution

### Problem

- 의료 검색 결과는 일반 사용자에게 이해하기 어려움
- 단순 결과 나열만으로는 사용자가 무엇을 해야 할지 판단하기 어려움
- AI/검색 API 응답 구조가 복잡하면 프론트에서 UX 품질이 떨어지기 쉬움
- 인증, 사용자 상태, 결과 상태까지 함께 다뤄야 실제 서비스처럼 동작 가능

### Solution

- 증상 입력 → 결과 → triage → 후속 행동까지 이어지는 UX 흐름 설계
- 검색 결과, top result, AI summary, related topics를 구조화해 시각화
- triage 결과를 색상/메시지 중심으로 전달해 이해 비용 감소
- null / empty / loading / error 상태까지 고려한 안정적인 렌더링 구조 적용
- 인증, 사용자 화면, 관리자 화면을 분리해 실제 서비스형 프론트엔드 구조 구현

---

## Key Features

### Symptom Search
- 자연어 기반 증상 입력
- FastAPI `/search`, `/search/summary` API 연동
- 기본 검색 / AI 요약 검색 분리 지원

### AI Result Visualization
- top result / results / related topics 구조화 표시
- AI summary 카드 기반 요약 정보 제공
- 사용자 이해 중심 결과 UI 설계

### Triage Guidance
- red / yellow / green 응급도 시각화
- triage 메시지 및 질문 제안 표시
- 사용자 행동 유도형 인터페이스 구성

### Authentication
- 회원가입 / 로그인 / 토큰 기반 인증
- access token / refresh token 기반 세션 처리
- 보호 라우트와 사용자 상태 기반 화면 분기

### Admin Interface
- 관리자 전용 화면 분리
- 사용자 / 운영 관점 UI 구조 반영

### UI State Handling
- loading 상태 처리
- empty state 처리
- error state 처리
- summary null / 결과 없음 케이스 대응

---

## User Flow

User Input  
→ Frontend (Next.js)  
→ Backend API (FastAPI)  
→ Search Result + Triage + Summary  
→ Structured UI Rendering  
→ User Understanding & Next Action  

이 프로젝트는 AI 결과를 단순 출력하는 것이 아니라,  
사용자가 결과를 이해하고 다음 행동을 판단할 수 있도록 전달하는 흐름을 중심으로 설계했습니다.

---

## Frontend Architecture

### App Router Structure

app/  
├─ (public) — 비로그인 화면  
├─ (user) — 사용자 검색 / triage / profile 화면  
├─ admin — 관리자 화면  
├─ layout.tsx — 전역 레이아웃  
└─ providers.tsx — 전역 상태/세션 초기화  

### Core Client Structure

lib/  
├─ api/client.ts — 공통 API 요청 처리  
├─ api/auth-api.ts — 인증 API 연동  
├─ api/search-api.ts — 검색 API 연동  
├─ auth/auth-session.ts — 세션 및 토큰 저장/복원  
├─ constants/routes.ts — 라우트 상수  
└─ utils/response.ts — 에러 메시지 표준화  

### UI Component Structure

components/  
├─ ui — 공통 UI 컴포넌트  
├─ layout — 헤더 / 사이드바 / 공통 레이아웃  
├─ auth — 로그인 / 회원가입 / 프로필 관련 UI  
└─ search — 검색 결과 / AI summary / triage 관련 UI  

---

## API Integration

### Connected Backend Endpoints

- `POST /search`  
  기본 증상 검색

- `POST /search/summary`  
  AI 요약 포함 검색

- `POST /auth/signup`  
  회원가입

- `POST /auth/login`  
  로그인

- `POST /auth/refresh`  
  토큰 갱신

- `GET /auth/me`  
  현재 사용자 조회

### Rendering Strategy

프론트는 백엔드 응답을 다음 구조 기준으로 렌더링합니다.

- `guidance` → triage / question suggestions
- `results_bundle.top_result` → 대표 결과
- `results_bundle.results` → 일반 검색 결과 리스트
- `results_bundle.related_topics` → 연관 주제
- `results_bundle.ai_summary` → AI 요약

또한 summary가 없거나 결과가 없는 경우에도 화면이 깨지지 않도록 null-safe 렌더링 구조를 적용했습니다.

---

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS

### Backend Integration
- FastAPI

### State / Session
- Local session storage
- Token-based auth flow

---

## Getting Started

git clone https://github.com/tami-bang/health-ai-frontend.git  
cd health-ai-frontend  

npm install  
npm run dev  

http://localhost:3000

---

## Environment

`.env.local`

NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000

---

## Design Focus

- AI 결과를 사람이 이해할 수 있는 UI로 전달하는 구조
- 검색 결과 + triage + 행동 유도를 연결하는 사용자 흐름 설계
- API 응답 변화에 대응 가능한 확장형 렌더링 구조
- 사용자 / 관리자 UI 분리를 고려한 서비스형 구조
- loading / empty / error / summary null 상태까지 고려한 안정성 확보

---

## What I Built

- 증상 기반 AI 검색 UI 및 FastAPI API 연동
- 결과 / summary / triage 구조화 렌더링 설계
- 인증 시스템 구현 (signup / login / token handling)
- 사용자 / 관리자 화면 분리
- null-safe summary 렌더링 및 검색 상태 처리 구조 구현

단순한 화면 구현이 아니라,  
AI 기반 서비스가 실제 사용자 경험으로 동작하도록 프론트엔드 전체 흐름을 설계하고 구현했습니다.

---

## Improvements

- 모바일 반응형 UX 강화
- 검색 결과 캐싱 및 성능 최적화
- summary / triage 시각화 개선
- 관리자 운영 UI 고도화

---

## Author

https://github.com/tami-bang