import { create } from 'zustand' // 용도: 전역 검색 상태 저장소 생성
import type { SearchResponse, SearchState } from '@/types/search' // 용도: 검색 응답 및 상태 타입 사용

interface SearchStore extends SearchState {
  setQuery: (query: string) => void
  setResponse: (response: SearchResponse | null) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

const initialState: SearchState = {
  query: '',
  lastResponse: null,
  isLoading: false,
  error: null,
}

export const useSearchStore = create<SearchStore>((set) => ({
  ...initialState,

  setQuery: (query) => set({ query }),

  setResponse: (response) =>
    set({
      lastResponse: response,
      isLoading: false,
      error: null,
    }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) =>
    set({
      error,
      isLoading: false,
    }),

  reset: () => set(initialState),
}))