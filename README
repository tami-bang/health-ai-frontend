# Health AI Frontend

Symptom-based AI search interface built with Next.js  
Designed to deliver AI results, triage guidance, and user-centered healthcare UX

---

## Overview

health-ai-frontend는 Next.js 기반 헬스케어 AI 검색 서비스의 프론트엔드입니다.

검색 → AI 결과 → 응급도 판단 → 사용자 행동 유도까지  
전체 사용자 경험을 연결하는 인터페이스를 구현했습니다.

단순 UI 구현이 아니라  
AI 시스템의 결과를 사용자에게 이해 가능한 형태로 전달하는 것을 목표로 설계되었습니다.

---

## Key Features

### Symptom Search
- 자연어 기반 증상 입력
- FastAPI /search API 연동

### AI Result Visualization
- 검색 결과, 요약, 관련 정보 구조화 표시
- 사용자 이해 중심 UI 설계

### Triage Guidance
- red / yellow / green 응급도 시각화
- 사용자 행동 유도 메시지 제공

### Multilingual UI
- 한글 / 영어 자동 지원

### Authentication
- 회원가입 / 로그인 / 토큰 기반 인증
- 클라이언트 상태 관리

### Admin Interface
- 사용자 관리
- 서비스 운영 UI

---

## User Flow

User Input  
→ Frontend (Next.js)  
→ Backend API (FastAPI)  
→ AI Result + Triage  
→ UI Rendering  

AI 결과를 단순 출력하는 것이 아니라  
사용자가 이해하고 행동할 수 있도록 전달하는 구조로 설계했습니다.

---

## Architecture

app/  
├─ (public) — 비로그인 화면  
├─ (user) — 사용자 검색 UI  
├─ admin — 관리자 UI  
├─ layout.tsx — 공통 레이아웃  

lib/  
├─ api/client.ts — API 통신  
├─ auth-session.ts — 인증 상태 관리  

components/  
├─ ui — 공통 UI  
├─ layout — 레이아웃  

---

## Tech Stack

- Next.js  
- TypeScript  
- Tailwind CSS  
- FastAPI  

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

## What I Built

- AI 검색 UI 및 API 연동  
- 결과 + triage 시각화 구조 설계  
- 인증 시스템 구현 (signup / login / token)  
- 사용자 / 관리자 화면 분리  

단순 UI 구현이 아니라  
AI 기반 서비스의 프론트엔드 전체 흐름을 설계하고 구현했습니다.

---

## Improvements

- UI/UX 개선 (사용자 흐름 최적화)  
- API 캐싱 및 성능 개선  
- 모바일 대응 강화  

---

## Author

https://github.com/tami-bang
