# 🩺 Health AI Search API

증상 기반 자연어 입력을  
의료 정보 검색 + 위험도 판단 + 선택적 AI 요약으로 연결하는  
FastAPI 기반 헬스케어 AI 검색 API

빠른 검색 응답성과 실제 사용자 관점의 안내 품질을 함께 고려해 설계했습니다.

---

## 핵심 한 줄 소개

자연어 증상을 입력하면  
정규화 → 다중 소스 검색 → AI 재정렬 → triage 판단 → 응답 가공까지 수행하는  
Retrieval-first 헬스케어 AI 검색 시스템입니다.

---

## 왜 만들었는가

일반 검색 기반 의료 정보 탐색에는 몇 가지 문제가 있습니다.

- 사용자는 의료 용어 대신 일상 표현으로 증상을 입력함
- 단순 키워드 검색만으로는 원하는 결과가 잘 나오지 않음
- 외부 API 결과 품질이 항상 일정하지 않음
- AI 요약은 편리하지만 응답 속도를 느리게 만들 수 있음

이 프로젝트는 이 문제를 해결하기 위해  
검색 품질, 응답 속도, 사용자 안내를 함께 고려한 구조로 설계되었습니다.

---

## 해결 방식

### 1. Retrieval-first 구조

LLM 중심이 아니라 검색 중심으로 먼저 결과를 확보합니다.

- 빠른 응답
- 기본 결과 안정성 확보
- summary 없이도 동작 가능

### 2. Hybrid Retrieval

여러 검색 소스를 함께 사용해 결과 누락을 줄였습니다.

- Internal knowledge
- External API (MedlinePlus)
- Vector semantic search

### 3. AI Reranking

가져온 결과를 그대로 노출하지 않고  
semantic score와 keyword boost를 반영해 다시 정렬합니다.

### 4. Optional LLM Summary

요약은 항상 실행하지 않고 선택적으로 분리했습니다.

- `/search`: 빠른 검색 중심
- `/search/summary`: 설명력 강화 중심

---

## 핵심 기능

- 자연어 증상 입력 처리
- 증상 정규화
- Hybrid Retrieval
- AI 기반 결과 재정렬
- Triage 위험도 판단
- 다국어 응답 처리
- Optional LLM Summary
- 응답 포맷 표준화

---

## 처리 흐름

    User Query
    → Language Detection
    → Symptom Normalization
    → Hybrid Retrieval
    → AI Reranking
    → Triage Evaluation
    → Response Formatting
    → Optional LLM Summary
    → Final Response

---

## 성능 방향

### /search
빠른 검색 응답에 초점

- 평균 응답 시간: 약 300~600ms

### /search/summary
설명력 보강에 초점

- 평균 응답 시간: 약 1.5~3초

요약 기능을 optional로 분리해  
속도와 정보량을 상황에 맞게 선택할 수 있도록 했습니다.

---

## 이 프로젝트의 포인트

### 검색 품질 개선
- 자연어 증상 입력을 정규화
- 다중 검색 소스로 recall 보완
- AI reranking으로 relevance 개선

### 사용자 안전성 보완
- 단순 검색 결과 제공에서 끝나지 않음
- triage 기반으로 행동 유도 메시지 제공

### 성능 제어 가능
- summary optional 구조
- retrieval-first 기반으로 latency 관리

### 유지보수성 고려
- FastAPI 기반 모듈형 구조
- 서비스 역할 분리
- 응답 포맷 일관성 유지

---

## 기술 스택

### Backend
- FastAPI

### AI / NLP
- scikit-learn
- sentence-transformers

### External Data
- MedlinePlus

### Language Processing
- deep-translator

---

## 프로젝트 구조

    app/
    ├── main.py
    ├── core/
    ├── services/
    ├── data/
    └── schemas.py

---

## Example API

### Request

POST /search/summary

    {
      "query": "코피가 30분째 안 멈춰요",
      "include_summary": true
    }

### Response

    {
      "query": "코피가 30분째 안 멈춰요",
      "meta": {
        "request_id": "uuid",
        "total_results": 3
      },
      "guidance": {
        "triage_level": "urgent",
        "triage_message": "출혈이 지속되고 있습니다.",
        "question_suggestions": [
          "얼마나 자주 발생하나요?",
          "다른 증상도 있나요?"
        ]
      },
      "results_bundle": {
        "top_result": {
          "title": "Nosebleed",
          "snippet": "코피는 다양한 원인으로 발생할 수 있습니다.",
          "url": "https://example.com"
        },
        "results": [],
        "related_topics": [],
        "ai_summary": {
          "summary": "지속적인 코피는 추가 확인이 필요합니다.",
          "key_findings": [
            "출혈 지속",
            "점막 손상 가능성"
          ],
          "recommendations": [
            "코 압박",
            "의료기관 방문"
          ],
          "disclaimer": "의학적 진단이 아닙니다."
        }
      }
    }

---

## 한계와 개선 방향

현재 구조는 다음과 같은 한계를 전제로 설계했습니다.

- 일부 자연어 표현은 정규화가 완벽하지 않을 수 있음
- 외부 API 품질과 응답 시간에 영향을 받을 수 있음
- summary 사용 시 latency가 증가할 수 있음

이를 개선하기 위해 앞으로 다음을 확장할 계획입니다.

- 검색 recall 개선
- 외부 API 캐싱 고도화
- domain-specific 모델 적용
- RAG 구조 고도화
- latency 최적화

---

## What I Built

- End-to-End healthcare search pipeline
- Hybrid Retrieval 구조
- AI Reranking 로직
- Triage 기반 사용자 안내 흐름
- Optional LLM Summary 구조
- FastAPI 기반 서비스화

---

## Author

- GitHub: https://github.com/tami-bang