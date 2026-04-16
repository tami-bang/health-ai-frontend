import type { TriageLevel } from './search' // 용도: 기존 검색 공용 triage level 타입 재사용

export type BackendTriageLevel = 'red' | 'yellow' | 'green' // 용도: 백엔드 triage 레벨 호환
export type ExtendedTriageLevel = TriageLevel | BackendTriageLevel // 용도: 프론트/백엔드 혼합 triage 레벨 허용

export interface TriageRequest {
  query?: string
  symptoms: string[]
  duration?: string
  severity?: number
  age?: number
  additional_info?: string
}

export interface TriagePattern {
  pattern_id: string
  pattern_name: string
  confidence: number
  description: string
}

export interface TriageResponse {
  query: string
  detected_language: string
  triage_level: ExtendedTriageLevel
  triage_message: string
  triage_score: number
  matched_patterns: TriagePattern[]
  recommendations: string[]
  follow_up_questions: string[]
  disclaimer: string
}

export interface TriageState {
  lastResponse: TriageResponse | null
  isLoading: boolean
  error: string | null
}