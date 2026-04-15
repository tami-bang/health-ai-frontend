import type { TriageLevel } from './search'

export interface TriageRequest {
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
  triage_level: TriageLevel
  triage_message: string
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
