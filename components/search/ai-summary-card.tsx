import { Sparkles, AlertCircle } from 'lucide-react' // 용도: 아이콘
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card' // 용도: UI 카드
import type { AISummary } from '@/types/search' // 용도: 타입 정의

interface AISummaryCardProps {
  summary?: AISummary | null
}

// summary 존재 여부 체크

function isValidSummary(summary?: AISummary | null): summary is AISummary {
  return !!summary && typeof summary.summary === 'string'
}

// key findings 존재 여부

function hasKeyFindings(summary: AISummary): boolean {
  return Array.isArray(summary.key_findings) && summary.key_findings.length > 0
}

// recommendations 존재 여부

function hasRecommendations(summary: AISummary): boolean {
  return Array.isArray(summary.recommendations) && summary.recommendations.length > 0
}

export function AISummaryCard({ summary }: AISummaryCardProps) {
  // 핵심: 타입 가드로 안전 확보
  if (!isValidSummary(summary)) return null

  return (
    <Card className="border-teal-200 bg-teal-50/50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-teal-100 p-1.5">
            <Sparkles className="h-4 w-4 text-teal-600" />
          </div>
          <CardTitle className="text-lg">AI Summary</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* summary */}
        <p className="text-sm text-slate-700">
          {summary.summary}
        </p>

        {/* key findings */}
        {hasKeyFindings(summary) && (
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-2">
              Key Findings
            </h4>
            <ul className="space-y-1">
              {summary.key_findings!.map((finding, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-500" />
                  {finding}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* recommendations */}
        {hasRecommendations(summary) && (
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-2">
              Recommendations
            </h4>
            <ul className="space-y-1">
              {summary.recommendations!.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-500" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* disclaimer */}
        {summary.disclaimer && (
          <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-3">
            <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
            <p className="text-xs text-amber-800">
              {summary.disclaimer}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}