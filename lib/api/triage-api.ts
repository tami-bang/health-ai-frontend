import { apiClient } from './client' // 용도: 공통 API 클라이언트 사용
import { API_ROUTES } from '@/lib/constants/routes' // 용도: triage API 경로 상수 사용
import type { TriageRequest, TriageResponse } from '@/types/triage' // 용도: triage 요청/응답 타입 사용
import type { TriageLevel } from '@/types/search' // 용도: 프론트 공용 triage level 타입 사용

type BackendTriageLevel = 'red' | 'yellow' | 'green'
type CompatibleTriageLevel = TriageLevel | BackendTriageLevel | string

function normalizeTriageLevel(level: CompatibleTriageLevel | undefined): TriageLevel {
  const normalizedLevel = String(level || '')
    .trim()
    .toLowerCase()

  const levelMap: Record<string, TriageLevel> = {
    emergency: 'emergency',
    urgent: 'urgent',
    moderate: 'moderate',
    low: 'low',
    self_care: 'self_care',
    selfcare: 'self_care',
    red: 'emergency',
    yellow: 'urgent',
    green: 'low',
  }

  return levelMap[normalizedLevel] || 'low'
}

function normalizeTriageResponse(response: TriageResponse): TriageResponse {
  return {
    ...response,
    triage_level: normalizeTriageLevel(response.triage_level),
    matched_patterns: Array.isArray(response.matched_patterns) ? response.matched_patterns : [],
    recommendations: Array.isArray(response.recommendations) ? response.recommendations : [],
    follow_up_questions: Array.isArray(response.follow_up_questions) ? response.follow_up_questions : [],
    disclaimer: response.disclaimer || 'This triage tool provides general guidance only and is not medical advice.',
  }
}

export const triageApi = {
  async submitTriage(data: TriageRequest): Promise<TriageResponse> {
    const response = await apiClient.post<TriageResponse>(API_ROUTES.TRIAGE, data)
    return normalizeTriageResponse(response)
  },
}