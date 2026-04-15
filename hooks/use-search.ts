'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchStore } from '@/stores/search-store'
import { searchApi } from '@/lib/api/search-api'
import { ROUTES } from '@/lib/constants/routes'
import type { SearchRequest } from '@/types/search'
import { extractErrorMessage } from '@/lib/utils/response'

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
      setQuery(searchQuery)
      setLoading(true)
      setError(null)

      try {
        const request: SearchRequest = { query: searchQuery }
        const response = includeSummary
          ? await searchApi.searchWithSummary(request)
          : await searchApi.search(request)

        setResponse(response)

        // Navigate to appropriate page based on summary toggle
        if (includeSummary) {
          router.push(ROUTES.SEARCH_SUMMARY)
        }

        return response
      } catch (err) {
        const message = extractErrorMessage(err)
        setError(message)
        throw err
      }
    },
    [router, setQuery, setLoading, setError, setResponse]
  )

  const searchWithSummary = useCallback(
    async (searchQuery: string) => {
      return search(searchQuery, true)
    },
    [search]
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
