import Link from 'next/link' // 용도: 페이지 이동 링크 렌더링
import {
  AlertTriangle,
  AlertCircle,
  Clock,
  CheckCircle,
  Heart,
  Search,
  RefreshCcw,
  ArrowRight,
} from 'lucide-react' // 용도: triage 결과 상태별 아이콘 렌더링
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card' // 용도: 카드 UI 구성
import { Button } from '@/components/ui/button' // 용도: 액션 버튼 UI
import { TriageLevelBadge } from './triage-level-badge' // 용도: triage 레벨 배지 렌더링
import { cn } from '@/lib/utils' // 용도: className 병합
import { ROUTES } from '@/lib/constants/routes' // 용도: 검색 페이지 경로 참조
import {
  getTriageConfig,
  getTriageDisplayLevel,
  isEmergency,
} from '@/lib/utils/triage' // 용도: triage level 정규화 및 안전 스타일 조회
import type {
  TriagePattern,
  TriageResponse,
} from '@/types/triage' // 용도: triage 응답 및 패턴 타입 사용
import type { TriageLevel } from '@/types/search' // 용도: 정규화된 프론트 triage level 타입 사용

interface TriageResultCardProps {
  result: TriageResponse
  onReset: () => void
}

const TRIAGE_ICONS: Record<TriageLevel, typeof AlertTriangle> = {
  emergency: AlertTriangle,
  urgent: AlertCircle,
  moderate: Clock,
  low: CheckCircle,
  self_care: Heart,
}

function getResultCardConfig(triageLevel: TriageResponse['triage_level']) {
  const displayLevel = getTriageDisplayLevel(triageLevel)
  const config = getTriageConfig(triageLevel)
  const Icon = TRIAGE_ICONS[displayLevel]

  return {
    displayLevel,
    config,
    Icon,
    emergency: isEmergency(triageLevel),
  }
}

function buildSafePatterns(patterns: TriageResponse['matched_patterns']): TriagePattern[] {
  if (!Array.isArray(patterns)) {
    return []
  }

  return patterns.filter((pattern) => Boolean(pattern?.pattern_name))
}

function buildSafeRecommendations(recommendations: TriageResponse['recommendations']): string[] {
  if (!Array.isArray(recommendations)) {
    return []
  }

  return recommendations.filter((item) => Boolean(item))
}

function buildAssessmentContextItems(result: TriageResponse): Array<{ label: string; value: string }> {
  const contextItems: Array<{ label: string; value: string }> = []

  if (result.duration) {
    contextItems.push({
      label: 'Duration',
      value: result.duration,
    })
  }

  if (typeof result.severity === 'number') {
    contextItems.push({
      label: 'Severity',
      value: `${result.severity}/10`,
    })
  }

  if (typeof result.age === 'number') {
    contextItems.push({
      label: 'Age',
      value: String(result.age),
    })
  }

  return contextItems
}

/**
 * 🔥 핵심 추가: 사용자용 판단 근거 생성
 */
function buildReasonItems(patterns: TriagePattern[], contextItems: Array<{ label: string; value: string }>) {
  const reasons: string[] = []

  patterns.forEach((pattern) => {
    reasons.push(`${pattern.pattern_name} 증상이 감지되었습니다`)
  })

  contextItems.forEach((item) => {
    if (item.label === 'Duration') {
      reasons.push(`증상이 ${item.value} 지속되었습니다`)
    }
    if (item.label === 'Severity') {
      reasons.push(`증상 강도가 ${item.value} 수준입니다`)
    }
  })

  return reasons
}

function renderEmergencyNotice(emergency: boolean) {
  if (!emergency) {
    return null
  }

  return (
    <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
      <p className="text-sm font-medium text-red-800">
        If you are experiencing a medical emergency, please call emergency services immediately.
      </p>
    </div>
  )
}

/**
 * 🔥 기존 Matched Patterns → 사용자용 “판단 근거” 카드로 변경
 */
function renderReasons(reasons: string[]) {
  if (reasons.length === 0) {
    return null
  }

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Why this result?</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-slate-700">
          {reasons.map((reason, index) => (
            <li key={`${reason}-${index}`} className="flex gap-2">
              <ArrowRight className="h-4 w-4 text-teal-600 mt-0.5" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function renderRecommendations(recommendations: string[]) {
  if (recommendations.length === 0) {
    return null
  }

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">What should you do?</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {recommendations.map((recommendation, index) => (
            <li key={`${recommendation}-${index}`} className="flex items-start gap-2 text-sm text-slate-700">
              <ArrowRight className="mt-0.5 h-4 w-4 text-teal-600" />
              <span>{recommendation}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function renderAssessmentContext(contextItems: Array<{ label: string; value: string }>) {
  if (contextItems.length === 0) {
    return null
  }

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Assessment Context</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {contextItems.map((item) => (
            <div
              key={`${item.label}-${item.value}`}
              className="grid gap-1 rounded-lg bg-slate-50 p-3 sm:grid-cols-[140px_1fr]"
            >
              <span className="text-sm font-medium text-slate-900">{item.label}</span>
              <span className="text-sm break-words text-slate-600">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function renderDisclaimer(disclaimer: string | undefined) {
  if (!disclaimer) {
    return null
  }

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
      <p className="text-sm text-amber-800">{disclaimer}</p>
    </div>
  )
}

export function TriageResultCard({ result, onReset }: TriageResultCardProps) {
  const { config, Icon, emergency } = getResultCardConfig(result.triage_level)

  const matchedPatterns = buildSafePatterns(result.matched_patterns)
  const recommendations = buildSafeRecommendations(result.recommendations)
  const contextItems = buildAssessmentContextItems(result)

  // 핵심
  const reasons = buildReasonItems(matchedPatterns, contextItems)

  return (
    <div className="space-y-6">
      {/* 1. 결과 */}
      <Card className={cn('border-2', config.border)}>
        <CardHeader className={cn('pb-4', config.bg)}>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white p-2 shadow-sm">
              <Icon className={cn('h-6 w-6', config.text)} />
            </div>

            <div>
              <TriageLevelBadge level={result.triage_level} size="lg" />
              <CardTitle className={cn('mt-1 text-xl', config.text)}>
                Assessment Result
              </CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-4">
          <p className="text-base text-slate-700">{result.triage_message}</p>

          <div className="flex gap-2 text-sm text-slate-500">
            <span className="bg-slate-100 px-2 py-1 rounded">Score: {result.triage_score}</span>
            <span className="bg-slate-100 px-2 py-1 rounded">Language: {result.detected_language}</span>
          </div>

          {renderEmergencyNotice(emergency)}
        </CardContent>
      </Card>

      {/* 2. 이유 */}
      {renderReasons(reasons)}

      {/* 3. 행동 */}
      {renderRecommendations(recommendations)}

      {/* 4. 보조정보 */}
      {renderAssessmentContext(contextItems)}

      {/* 5. 안내 */}
      {renderDisclaimer(result.disclaimer)}

      {/* CTA */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button variant="outline" onClick={onReset}>
          <RefreshCcw className="mr-2 h-4 w-4" />
          New Assessment
        </Button>

        <Button asChild>
          <Link href={ROUTES.SEARCH}>
            <Search className="mr-2 h-4 w-4" />
            Search for More Information
          </Link>
        </Button>
      </div>
    </div>
  )
}