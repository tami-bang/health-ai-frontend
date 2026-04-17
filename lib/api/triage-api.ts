import { apiClient } from './client' // 용도: 공통 API 클라이언트 사용
import { API_ROUTES } from '@/lib/constants/routes' // 용도: triage API 경로 상수 사용
import type {
  TriageMatchedRule,
  TriagePattern,
  TriageRequest,
  TriageResponse,
  TriageRiskFactor,
  TriageScoreBreakdown,
} from '@/types/triage' // 용도: triage 요청/응답 및 확장 타입 사용
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

function isPatternObject(value: unknown): value is TriagePattern {
  if (!value || typeof value !== 'object') {
    return false
  }

  const pattern = value as Record<string, unknown>
  return typeof pattern.pattern_name === 'string'
}

function buildPatternFromString(value: string, index: number): TriagePattern {
  const trimmedValue = String(value || '').trim()
  const patternId = trimmedValue
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return {
    pattern_id: patternId ? `triage-${patternId}` : `triage-pattern-${index + 1}`,
    pattern_name: trimmedValue,
    confidence: 0.5,
    description: `Matched triage signal: ${trimmedValue}`,
  }
}

function normalizeMatchedPatterns(value: unknown): TriagePattern[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((item, index) => {
      if (typeof item === 'string') {
        return buildPatternFromString(item, index)
      }

      if (isPatternObject(item)) {
        return {
          pattern_id: String(item.pattern_id || `triage-pattern-${index + 1}`),
          pattern_name: String(item.pattern_name || ''),
          confidence: Number(item.confidence || 0),
          description: String(item.description || ''),
        }
      }

      return null
    })
    .filter((item): item is TriagePattern => Boolean(item && item.pattern_name))
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((item) => String(item || '').trim())
    .filter((item) => Boolean(item))
}

function normalizeMatchedRuleDetails(value: unknown): TriageMatchedRule[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return null
      }

      const detail = item as Record<string, unknown>
      return {
        group_name: String(detail.group_name || ''),
        pattern: String(detail.pattern || ''),
        score: Number(detail.score || 0),
        source_language: detail.source_language ? String(detail.source_language) : undefined,
      }
    })
    .filter((item): item is TriageMatchedRule => Boolean(item && item.group_name && item.pattern))
}

function normalizeRiskFactors(value: unknown): TriageRiskFactor[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return null
      }

      const factor = item as Record<string, unknown>
      return {
        factor_id: String(factor.factor_id || ''),
        label: String(factor.label || ''),
        score: Number(factor.score || 0),
        category: (String(factor.category || 'other') as TriageRiskFactor['category']),
      }
    })
    .filter((item): item is TriageRiskFactor => Boolean(item && item.factor_id && item.label))
}

function normalizeScoreBreakdown(value: unknown): TriageScoreBreakdown | undefined {
  if (!value || typeof value !== 'object') {
    return undefined
  }

  const breakdown = value as Record<string, unknown>
  return {
    base_score: Number(breakdown.base_score || 0),
    adjustment_score: Number(breakdown.adjustment_score || 0),
    total_score: Number(breakdown.total_score || 0),
  }
}

function normalizeTriageResponse(response: TriageResponse): TriageResponse {
  return {
    ...response,
    triage_level: normalizeTriageLevel(response.triage_level),
    matched_patterns: normalizeMatchedPatterns(response.matched_patterns),
    recommendations: normalizeStringArray(response.recommendations),
    follow_up_questions: normalizeStringArray(response.follow_up_questions),
    matched_rule_names: normalizeStringArray(response.matched_rule_names),
    matched_rule_details: normalizeMatchedRuleDetails(response.matched_rule_details),
    risk_factors: normalizeRiskFactors(response.risk_factors),
    score_breakdown: normalizeScoreBreakdown(response.score_breakdown),
    disclaimer:
      response.disclaimer || 'This triage tool provides general guidance only and is not medical advice.',
    duration: response.duration || undefined,
    severity: typeof response.severity === 'number' ? response.severity : undefined,
    age: typeof response.age === 'number' ? response.age : undefined,
    additional_info: response.additional_info ?? undefined,
    debug: response.debug && typeof response.debug === 'object' ? response.debug : undefined,
  }
}

export const triageApi = {
  async submitTriage(data: TriageRequest): Promise<TriageResponse> {
    const response = await apiClient.post<TriageResponse>(API_ROUTES.TRIAGE, data)
    return normalizeTriageResponse(response)
  },
}