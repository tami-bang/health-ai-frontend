'use client'

import Link from 'next/link'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageContainer, PageHeader } from '@/components/layout/page-container'
import { SymptomSearchForm } from '@/components/search/symptom-search-form'
import { AISummaryCard } from '@/components/search/ai-summary-card'
import { TopResultCard } from '@/components/search/top-result-card'
import { SearchResultCard } from '@/components/search/search-result-card'
import { GuidanceBanner } from '@/components/search/guidance-banner'
import { QuestionChipList } from '@/components/search/question-chip-list'
import { SearchResultSkeleton } from '@/components/common/loading-skeleton'
import { EmptyState } from '@/components/common/empty-state'
import { SectionHeader } from '@/components/common/section-header'
import { useSearch } from '@/hooks/use-search'
import { ROUTES } from '@/lib/constants/routes'

export default function SearchSummaryPage() {
  const { lastResponse, isLoading, error } = useSearch()

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

      {/* Search Form */}
      <Card className="border-slate-200 mb-8">
        <CardHeader>
          <CardTitle>What are you experiencing?</CardTitle>
        </CardHeader>
        <CardContent>
          <SymptomSearchForm defaultIncludeSummary />
        </CardContent>
      </Card>

      {/* Error State */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && <SearchResultSkeleton />}

      {/* Results */}
      {lastResponse && !isLoading && (
        <div className="space-y-6">
          {/* Guidance Banner */}
          {lastResponse.guidance && (
            <GuidanceBanner guidance={lastResponse.guidance} />
          )}

          {/* AI Summary - Featured */}
          {lastResponse.results_bundle.ai_summary && (
            <section>
              <SectionHeader title="AI Summary" className="mb-4" />
              <AISummaryCard summary={lastResponse.results_bundle.ai_summary} />
            </section>
          )}

          {/* Top Result */}
          {lastResponse.results_bundle.top_result && (
            <section>
              <SectionHeader title="Best Match" className="mb-4" />
              <TopResultCard result={lastResponse.results_bundle.top_result} />
            </section>
          )}

          {/* Other Results */}
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

          {/* Question Suggestions */}
          {lastResponse.guidance?.question_suggestions && (
            <section className="border-t border-slate-200 pt-6">
              <QuestionChipList questions={lastResponse.guidance.question_suggestions} />
            </section>
          )}

          {/* Results Meta */}
          <div className="text-center text-xs text-slate-400">
            Query completed in {lastResponse.meta.query_time_ms}ms |
            {lastResponse.meta.total_results} total results
          </div>
        </div>
      )}

      {/* Empty State */}
      {!lastResponse && !isLoading && !error && (
        <EmptyState
          title="Start your AI-powered search"
          description="Enter your symptoms above to get an AI-generated summary along with detailed results"
        />
      )}

      {/* Disclaimer */}
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
