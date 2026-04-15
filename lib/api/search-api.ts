import { apiClient } from './client'
import { API_ROUTES } from '@/lib/constants/routes'
import type { SearchRequest, SearchResponse } from '@/types/search'

export const searchApi = {
  search: (data: SearchRequest) =>
    apiClient.post<SearchResponse>(API_ROUTES.SEARCH, data),

  searchWithSummary: (data: SearchRequest) =>
    apiClient.post<SearchResponse>(API_ROUTES.SEARCH_SUMMARY, {
      ...data,
      include_summary: true,
    }),
}
