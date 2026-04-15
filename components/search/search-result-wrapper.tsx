import type { SearchResponse } from '@/types/search' // 용도: 응답 타입
import { AISummaryCard } from './ai-summary-card' // 용도: summary 카드

interface Props {
  data: SearchResponse
}

function extractAISummary(data: SearchResponse) {
  return data?.results_bundle?.ai_summary ?? null
}

export function SearchResultWrapper({ data }: Props) {
  const summary = extractAISummary(data)

  return (
    <div className="space-y-6">
      {/* summary 안전 렌더 */}
      <AISummaryCard summary={summary} />

      {/* 기존 결과 영역은 그대로 유지 */}
    </div>
  )
}