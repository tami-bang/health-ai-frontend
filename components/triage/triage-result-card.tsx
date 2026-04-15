import Link from 'next/link'
import { AlertTriangle, AlertCircle, Clock, CheckCircle, Heart, Search, RefreshCcw, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TriageLevelBadge } from './triage-level-badge'
import { cn } from '@/lib/utils'
import { TRIAGE_COLORS } from '@/lib/constants/theme'
import { ROUTES } from '@/lib/constants/routes'
import type { TriageResponse } from '@/types/triage'
import type { TriageLevel } from '@/types/search'

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

export function TriageResultCard({ result, onReset }: TriageResultCardProps) {
  const config = TRIAGE_COLORS[result.triage_level]
  const Icon = TRIAGE_ICONS[result.triage_level]
  const isEmergency = result.triage_level === 'emergency'

  return (
    <div className="space-y-6">
      {/* Main Result */}
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
          <p className="text-slate-700 text-base leading-relaxed">
            {result.triage_message}
          </p>

          {isEmergency && (
            <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-4">
              <p className="text-sm font-medium text-red-800">
                If you are experiencing a medical emergency, please call emergency services (911) immediately.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Matched Patterns */}
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
                  <div className="flex items-center justify-between mb-1">
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

      {/* Recommendations */}
      {result.recommendations && result.recommendations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <ArrowRight className="h-4 w-4 shrink-0 text-teal-600 mt-0.5" />
                  {rec}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Follow-up Questions */}
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

      {/* Disclaimer */}
      {result.disclaimer && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
          <p className="text-sm text-amber-800">{result.disclaimer}</p>
        </div>
      )}

      {/* Actions */}
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
