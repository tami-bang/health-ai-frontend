'use client'

import { AlertCircle } from 'lucide-react' // 용도: 에러 상태 아이콘 표시
import { PageContainer, PageHeader } from '@/components/layout/page-container' // 용도: 검색 페이지 공통 레이아웃 사용
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card' // 용도: 검색 영역 카드 UI 사용
import { SymptomSearchForm } from '@/components/search/symptom-search-form' // 용도: 증상 검색 폼 렌더링
import { TopResultCard } from '@/components/search/top-result-card' // 용도: 최상위 검색 결과 카드 렌더링
import { SearchResultCard } from '@/components/search/search-result-card' // 용도: 일반 검색 결과 카드 렌더링
import { GuidanceBanner } from '@/components/search/guidance-banner' // 용도: triage 안내 배너 표시
import { QuestionChipList } from '@/components/search/question-chip-list' // 용도: 후속 질문 추천 표시
import { SearchResultSkeleton } from '@/components/common/loading-skeleton' // 용도: 검색 결과 로딩 상태 렌더링
import { EmptyState } from '@/components/common/empty-state' // 용도: 초기 빈 상태 표시
import { SectionHeader } from '@/components/common/section-header' // 용도: 검색 결과 섹션 헤더 표시
import { useSearch } from '@/hooks/use-search' // 용도: 검색 전역 상태 사용

function buildLoadingMessage(query: string): string {
  const trimmedQuery = query.trim()

  if (!trimmedQuery) {
    return 'Searching and preparing results...'
  }

  return `"${trimmedQuery}" 관련 건강 정보를 찾는 중입니다...`
}

export default function SearchPage() {
  const { lastResponse, isLoading, error, query } = useSearch()
  const loadingMessage = buildLoadingMessage(query)

  return (
    <PageContainer>
      <PageHeader
        title="Symptom Search"
        description="Search our health database to find information about your symptoms"
      />

      <Card className="mb-8 border-slate-200 shadow-sm transition-shadow duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle>What are you experiencing?</CardTitle>
        </CardHeader>
        <CardContent>
          <SymptomSearchForm />
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

          {lastResponse.results_bundle.top_result && (
            <section>
              <SectionHeader title="Best Match" className="mb-4" />
              <TopResultCard result={lastResponse.results_bundle.top_result} />
            </section>
          )}

          {lastResponse.results_bundle.results && lastResponse.results_bundle.results.length > 0 && (
            <section>
              <SectionHeader
                title="Related Results"
                description={`${lastResponse.results_bundle.results.length} results found`}
                className="mb-4"
              />
              <div className="space-y-3">
                {lastResponse.results_bundle.results.map((result) => (
                  <SearchResultCard key={result.id} result={result} />
                ))}
              </div>
            </section>
          )}

          {lastResponse.results_bundle.related_topics &&
            lastResponse.results_bundle.related_topics.length > 0 && (
              <section>
                <SectionHeader title="Related Topics" className="mb-4" />
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {lastResponse.results_bundle.related_topics.map((topic) => (
                    <Card
                      key={topic.id}
                      className="border-slate-200 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md"
                    >
                      <CardContent className="pt-4">
                        <h4 className="font-medium text-slate-900">{topic.title}</h4>
                        <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                          {topic.description}
                        </p>
                      </CardContent>
                    </Card>
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
          title="Start your search"
          description="Enter your symptoms or health question above to get started"
        />
      )}

      <div className="mt-8 rounded-lg bg-slate-50 p-4">
        <p className="text-center text-xs text-slate-500">
          <strong className="text-slate-600">Disclaimer:</strong> This information is for
          educational purposes only and is not intended as medical advice. Always consult
          a healthcare professional for medical concerns.
        </p>
      </div>
    </PageContainer>
  )
}