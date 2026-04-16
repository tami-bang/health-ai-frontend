import Link from 'next/link' // 용도: 페이지 이동 링크 렌더링
import { AlertTriangle, AlertCircle, Clock, CheckCircle, Heart, Search, RefreshCcw, ArrowRight } from 'lucide-react' // 용도: triage 결과 상태별 아이콘 렌더링
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card' // 용도: 카드 UI 구성
import { Button } from '@/components/ui/button' // 용도: 액션 버튼 UI
import { TriageLevelBadge } from './triage-level-badge' // 용도: triage 레벨 배지 렌더링
import { cn } from '@/lib/utils' // 용도: className 병합
import { ROUTES } from '@/lib/constants/routes' // 용도: 검색 페이지 경로 참조
import { getTriageConfig, getTriageDisplayLevel, isEmergency } from '@/lib/utils/triage' // 용도: triage level 정규화 및 안전 스타일 조회
import type { TriageResponse } from '@/types/triage' // 용도: triage 응답 타입 사용
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

export function TriageResultCard({ result, onReset }: TriageResultCardProps) {
  const { config, Icon, emergency } = getResultCardConfig(result.triage_level)

  return (
    <div className="space-y-6">
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

        <CardContent className="pt-4">
          <p className="text-base leading-relaxed text-slate-700">
            {result.triage_message}
          </p>

          {emergency && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-800">
                If you are experiencing a medical emergency, please call emergency services (911) immediately.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {result.matched_patterns && result.matched_patterns.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Matched Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.matched_patterns.map((pattern) => (
                <div
                  key={pattern.pattern_id}
                  className="rounded-lg bg-slate-50 p-3"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium text-slate-900">
                      {pattern.pattern_name}
                    </span>
                    <span className="text-xs text-slate-500">
                      {Math.round(pattern.confidence * 100)}% match
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{pattern.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {result.recommendations && result.recommendations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                  {rec}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {result.follow_up_questions && result.follow_up_questions.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Follow-up Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.follow_up_questions.map((question, index) => (
                <li key={index} className="text-sm text-slate-600">
                  {index + 1}. {question}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {result.disclaimer && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-800">{result.disclaimer}</p>
        </div>
      )}

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