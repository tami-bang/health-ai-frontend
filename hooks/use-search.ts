'use client'

import { useCallback } from 'react' // 용도: 검색 핸들러 메모이제이션
import { useRouter } from 'next/navigation' // 용도: summary 검색 후 페이지 이동
import { useSearchStore } from '@/stores/search-store' // 용도: 검색 전역 상태 관리
import { searchApi } from '@/lib/api/search-api' // 용도: 검색 API 호출
import { ROUTES } from '@/lib/constants/routes' // 용도: 검색 결과 라우트 상수 사용
import type { SearchRequest } from '@/types/search' // 용도: 검색 요청 타입 사용
import { extractErrorMessage } from '@/lib/utils/response' // 용도: 에러 메시지 표준화

export function useSearch() {
  const router = useRouter()
  const {
    query,
    lastResponse,
    isLoading,
    error,
    setQuery,
    setResponse,
    setLoading,
    setError,
    reset,
  } = useSearchStore()

  const search = useCallback(
    async (searchQuery: string, includeSummary = false) => {
      const trimmedQuery = searchQuery.trim()

      setQuery(trimmedQuery)
      setError(null)
      setResponse(null)
      setLoading(true)

      try {
        const request: SearchRequest = {
          query: trimmedQuery,
          include_summary: includeSummary,
        }

        const response = includeSummary
          ? await searchApi.searchWithSummary(request)
          : await searchApi.search(request)

        setResponse(response)

        if (includeSummary) {
          router.push(ROUTES.SEARCH_SUMMARY)
        }

        return response
      } catch (err) {
        const message = extractErrorMessage(err)
        setError(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [router, setError, setLoading, setQuery, setResponse],
  )

  const searchWithSummary = useCallback(
    async (searchQuery: string) => {
      return search(searchQuery, true)
    },
    [search],
  )

  const clearSearch = useCallback(() => {
    reset()
  }, [reset])

  return {
    query,
    lastResponse,
    isLoading,
    error,
    search,
    searchWithSummary,
    clearSearch,
    setQuery,
  }
}