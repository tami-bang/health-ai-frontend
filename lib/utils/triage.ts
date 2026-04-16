import { TRIAGE_COLORS } from '@/lib/constants/theme' // 용도: triage 색상/라벨 설정 조회
import type { TriageLevel } from '@/types/search' // 용도: 프론트 표준 triage level 타입 사용
import type { ExtendedTriageLevel } from '@/types/triage' // 용도: 백엔드 호환 triage level 타입 사용

export type NormalizedTriageLevel = TriageLevel // 용도: 화면 렌더링용 표준 triage level 타입

function normalizeTriageLevelValue(level: ExtendedTriageLevel | string | null | undefined): string {
  return String(level ?? '').trim().toLowerCase()
}

export function getTriageDisplayLevel(
  level: ExtendedTriageLevel | string | null | undefined
): NormalizedTriageLevel {
  const normalizedLevel = normalizeTriageLevelValue(level)

  const backendToDisplayLevelMap: Record<string, NormalizedTriageLevel> = {
    red: 'emergency',
    yellow: 'urgent',
    green: 'low',
  }

  const displayLevelMap: Record<string, NormalizedTriageLevel> = {
    emergency: 'emergency',
    urgent: 'urgent',
    moderate: 'moderate',
    low: 'low',
    self_care: 'self_care',
    ...backendToDisplayLevelMap,
  }

  return displayLevelMap[normalizedLevel] ?? 'low'
}

export function getTriageConfig(level: ExtendedTriageLevel | string | null | undefined) {
  const displayLevel = getTriageDisplayLevel(level)
  return TRIAGE_COLORS[displayLevel] ?? TRIAGE_COLORS.low
}

export function getTriagePriority(level: ExtendedTriageLevel | string | null | undefined): number {
  const displayLevel = getTriageDisplayLevel(level)

  const priorities: Record<NormalizedTriageLevel, number> = {
    emergency: 5,
    urgent: 4,
    moderate: 3,
    low: 2,
    self_care: 1,
  }

  return priorities[displayLevel]
}

export function isEmergency(level: ExtendedTriageLevel | string | null | undefined): boolean {
  return getTriageDisplayLevel(level) === 'emergency'
}

export function isUrgent(level: ExtendedTriageLevel | string | null | undefined): boolean {
  const displayLevel = getTriageDisplayLevel(level)
  return displayLevel === 'emergency' || displayLevel === 'urgent'
}

export function getTriageIcon(level: ExtendedTriageLevel | string | null | undefined): string {
  const displayLevel = getTriageDisplayLevel(level)

  const icons: Record<NormalizedTriageLevel, string> = {
    emergency: 'AlertTriangle',
    urgent: 'AlertCircle',
    moderate: 'Clock',
    low: 'CheckCircle',
    self_care: 'Heart',
  }

  return icons[displayLevel]
}

export function getTriageRecommendation(level: ExtendedTriageLevel | string | null | undefined): string {
  const displayLevel = getTriageDisplayLevel(level)

  const recommendations: Record<NormalizedTriageLevel, string> = {
    emergency: 'Seek emergency medical care immediately. Call emergency services if needed.',
    urgent: 'Contact a healthcare provider as soon as possible, within 24 hours.',
    moderate: 'Schedule an appointment with your healthcare provider within a few days.',
    low: 'Monitor your symptoms. See a healthcare provider if symptoms worsen.',
    self_care: 'Your symptoms may be managed with self-care. Consult a provider if concerned.',
  }

  return recommendations[displayLevel]
}