'use client'

import { AlertCircle } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/layout/page-container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SymptomSearchForm } from '@/components/search/symptom-search-form'
import { TopResultCard } from '@/components/search/top-result-card'
import { SearchResultCard } from '@/components/search/search-result-card'
import { GuidanceBanner } from '@/components/search/guidance-banner'
import { QuestionChipList } from '@/components/search/question-chip-list'
import { SearchResultSkeleton } from '@/components/common/loading-skeleton'
import { EmptyState } from '@/components/common/empty-state'
import { SectionHeader } from '@/components/common/section-header'
import { useSearch } from '@/hooks/use-search'

export default function SearchPage() {
  const { lastResponse, isLoading, error } = useSearch()

  return (
    <PageContainer>
      <PageHeader
        title="Symptom Search"
        description="Search our health database to find information about your symptoms"
      />

      {/* Search Form */}
      <Card className="border-slate-200 mb-8">
        <CardHeader>
          <CardTitle>What are you experiencing?</CardTitle>
        </CardHeader>
        <CardContent>
          <SymptomSearchForm />
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

          {/* Related Topics */}
          {lastResponse.results_bundle.related_topics && lastResponse.results_bundle.related_topics.length > 0 && (
            <section>
              <SectionHeader title="Related Topics" className="mb-4" />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {lastResponse.results_bundle.related_topics.map((topic) => (
                  <Card key={topic.id} className="border-slate-200">
                    <CardContent className="pt-4">
                      <h4 className="font-medium text-slate-900">{topic.title}</h4>
                      <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                        {topic.description}
                      </p>
                    </CardContent>
                  </Card>
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
          title="Start your search"
          description="Enter your symptoms or health question above to get started"
        />
      )}

      {/* Disclaimer */}
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
