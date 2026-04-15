import type { TriageLevel } from '@/types/search'
import { TRIAGE_COLORS } from '@/lib/constants/theme'

export function getTriageConfig(level: TriageLevel) {
  return TRIAGE_COLORS[level] || TRIAGE_COLORS.low
}

export function getTriagePriority(level: TriageLevel): number {
  const priorities: Record<TriageLevel, number> = {
    emergency: 5,
    urgent: 4,
    moderate: 3,
    low: 2,
    self_care: 1,
  }
  return priorities[level] || 0
}

export function isEmergency(level: TriageLevel): boolean {
  return level === 'emergency'
}

export function isUrgent(level: TriageLevel): boolean {
  return level === 'emergency' || level === 'urgent'
}

export function getTriageIcon(level: TriageLevel): string {
  const icons: Record<TriageLevel, string> = {
    emergency: 'AlertTriangle',
    urgent: 'AlertCircle',
    moderate: 'Clock',
    low: 'CheckCircle',
    self_care: 'Heart',
  }
  return icons[level] || 'Info'
}

export function getTriageRecommendation(level: TriageLevel): string {
  const recommendations: Record<TriageLevel, string> = {
    emergency: 'Seek emergency medical care immediately. Call emergency services if needed.',
    urgent: 'Contact a healthcare provider as soon as possible, within 24 hours.',
    moderate: 'Schedule an appointment with your healthcare provider within a few days.',
    low: 'Monitor your symptoms. See a healthcare provider if symptoms worsen.',
    self_care: 'Your symptoms may be managed with self-care. Consult a provider if concerned.',
  }
  return recommendations[level] || ''
}
