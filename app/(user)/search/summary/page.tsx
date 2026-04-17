'use client'

import Link from 'next/link' // 용도: 기본 검색 페이지 이동 링크 렌더링
import { ArrowLeft, AlertCircle } from 'lucide-react' // 용도: 뒤로가기 및 에러 아이콘 표시
import { Button } from '@/components/ui/button' // 용도: 상단 이동 버튼 렌더링
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card' // 용도: 검색 폼 카드 UI 사용
import { PageContainer, PageHeader } from '@/components/layout/page-container' // 용도: summary 페이지 공통 레이아웃 사용
import { SymptomSearchForm } from '@/components/search/symptom-search-form' // 용도: summary 포함 검색 폼 렌더링
import { AISummaryCard } from '@/components/search/ai-summary-card' // 용도: AI 요약 카드 렌더링
import { TopResultCard } from '@/components/search/top-result-card' // 용도: 최상위 결과 카드 렌더링
import { SearchResultCard } from '@/components/search/search-result-card' // 용도: 일반 검색 결과 카드 렌더링
import { GuidanceBanner } from '@/components/search/guidance-banner' // 용도: triage 안내 배너 표시
import { QuestionChipList } from '@/components/search/question-chip-list' // 용도: 질문 추천 렌더링
import { SearchResultSkeleton } from '@/components/common/loading-skeleton' // 용도: summary 검색 로딩 상태 표시
import { EmptyState } from '@/components/common/empty-state' // 용도: 초기 empty 상태 표시
import { SectionHeader } from '@/components/common/section-header' // 용도: 각 섹션 제목 렌더링
import { useSearch } from '@/hooks/use-search' // 용도: 검색 전역 상태 사용
import { ROUTES } from '@/lib/constants/routes' // 용도: 페이지 이동 경로 상수 사용

function buildSummaryLoadingMessage(query: string): string {
  const trimmedQuery = query.trim()

  if (!trimmedQuery) {
    return 'Generating AI summary and preparing results...'
  }

  return `"${trimmedQuery}" AI 요약과 결과를 생성하는 중입니다...`
}

export default function SearchSummaryPage() {
  const { lastResponse, isLoading, error, query } = useSearch()
  const loadingMessage = buildSummaryLoadingMessage(query)

  return (
    <PageContainer>
      <PageHeader
        title="AI-Powered Search"
        description="Get comprehensive AI summaries along with your search results"
      >
        <Button variant="ghost" size="sm" asChild>
          <Link href={ROUTES.SEARCH}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Basic Search
          </Link>
        </Button>
      </PageHeader>

      <Card className="mb-8 border-slate-200 shadow-sm transition-shadow duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle>What are you experiencing?</CardTitle>
        </CardHeader>
        <CardContent>
          <SymptomSearchForm defaultIncludeSummary />
        </CardContent>
      </Card>

      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {isLoading && <SearchResultSkeleton loadingText={loadingMessage} />}

      {lastResponse && !isLoading && (
        <div className="space-y-6">
          {lastResponse.guidance && <GuidanceBanner guidance={lastResponse.guidance} />}

          {lastResponse.results_bundle.ai_summary && (
            <section>
              <SectionHeader title="AI Summary" className="mb-4" />
              <AISummaryCard summary={lastResponse.results_bundle.ai_summary} />
            </section>
          )}

          {lastResponse.results_bundle.top_result && (
            <section>
              <SectionHeader title="Best Match" className="mb-4" />
              <TopResultCard result={lastResponse.results_bundle.top_result} />
            </section>
          )}

          {lastResponse.results_bundle.results && lastResponse.results_bundle.results.length > 0 && (
            <section>
              <SectionHeader
                title="Additional Results"
                description={`${lastResponse.results_bundle.results.length} results found`}
                className="mb-4"
              />
              <div className="space-y-3">
                {lastResponse.results_bundle.results.slice(0, 5).map((result) => (
                  <SearchResultCard key={result.id} result={result} />
                ))}
              </div>
            </section>
          )}

          {lastResponse.guidance?.question_suggestions && (
            <section className="border-t border-slate-200 pt-6">
              <QuestionChipList questions={lastResponse.guidance.question_suggestions} />
            </section>
          )}

          <div className="text-center text-xs text-slate-400">
            Query completed in {lastResponse.meta.query_time_ms}ms |{' '}
            {lastResponse.meta.total_results} total results
          </div>
        </div>
      )}

      {!lastResponse && !isLoading && !error && (
        <EmptyState
          title="Start your AI-powered search"
          description="Enter your symptoms above to get an AI-generated summary along with detailed results"
        />
      )}

      <div className="mt-8 rounded-lg bg-slate-50 p-4">
        <p className="text-center text-xs text-slate-500">
          <strong className="text-slate-600">Disclaimer:</strong> AI summaries are generated
          for educational purposes only. They are not intended as medical advice and should
          not replace professional medical consultation.
        </p>
      </div>
    </PageContainer>
  )
}