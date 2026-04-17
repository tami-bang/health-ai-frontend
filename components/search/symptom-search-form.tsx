'use client'

import { useMemo, useState } from 'react' // 용도: 로컬 상태 및 파생 문구 계산
import { Search, Sparkles } from 'lucide-react' // 용도: 검색 및 summary 아이콘 표시
import { Button } from '@/components/ui/button' // 용도: 검색 버튼 렌더링
import { Textarea } from '@/components/ui/textarea' // 용도: 증상 입력 영역 렌더링
import { Switch } from '@/components/ui/switch' // 용도: AI summary 포함 여부 토글
import { Label } from '@/components/ui/label' // 용도: 접근 가능한 라벨 렌더링
import { Spinner } from '@/components/ui/spinner' // 용도: 폼 내부 로딩 배너 아이콘 사용
import { useSearch } from '@/hooks/use-search' // 용도: 검색 상태 및 액션 사용
import { validateSearchQuery } from '@/lib/validators/search-validator' // 용도: 검색어 유효성 검증
import { toast } from 'sonner' // 용도: 실패 토스트 표시

interface SymptomSearchFormProps {
  defaultIncludeSummary?: boolean
}

function getSubmitButtonText(isLoading: boolean, includeSummary: boolean): string {
  if (!isLoading) {
    return 'Search'
  }

  return includeSummary ? 'Generating summary...' : 'Searching...'
}

function getLoadingDescription(includeSummary: boolean): string {
  if (includeSummary) {
    return 'Analyzing symptoms and generating AI summary...'
  }

  return 'Analyzing symptoms and searching health information...'
}

export function SymptomSearchForm({
  defaultIncludeSummary = false,
}: SymptomSearchFormProps) {
  const { search, searchWithSummary, isLoading, query, setQuery } = useSearch()
  const [includeSummary, setIncludeSummary] = useState(defaultIncludeSummary)
  const [error, setError] = useState<string | null>(null)

  const submitButtonText = useMemo(
    () => getSubmitButtonText(isLoading, includeSummary),
    [includeSummary, isLoading],
  )

  const loadingDescription = useMemo(
    () => getLoadingDescription(includeSummary),
    [includeSummary],
  )

  const isSubmitDisabled = isLoading || !query.trim()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const validation = validateSearchQuery(query)
    if (!validation.valid) {
      setError(validation.errors.query)
      return
    }

    try {
      if (includeSummary) {
        await searchWithSummary(query)
        return
      }

      await search(query)
    } catch {
      toast.error('Failed to search. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-busy={isLoading}>
      <div className="space-y-2">
        <Label htmlFor="search-query" className="text-base font-medium">
          Describe your symptoms or health question
        </Label>

        <Textarea
          id="search-query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., I have a headache and fever for the past 2 days..."
          className="min-h-[120px] resize-none text-base transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500/50"
          disabled={isLoading}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        {isLoading && (
          <div className="flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-2">
            <Spinner className="h-4 w-4 text-blue-600" />
            <p className="text-sm text-blue-700">{loadingDescription}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Switch
            id="include-summary"
            checked={includeSummary}
            onCheckedChange={setIncludeSummary}
            disabled={isLoading}
          />
          <Label htmlFor="include-summary" className="cursor-pointer text-sm">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-blue-600" />
              Include AI Summary
            </span>
          </Label>
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          loadingText={submitButtonText}
          disabled={isSubmitDisabled}
          className="min-w-[180px]"
        >
          {!isLoading && <Search className="mr-1 h-4 w-4" />}
          Search
        </Button>
      </div>
    </form>
  )
}