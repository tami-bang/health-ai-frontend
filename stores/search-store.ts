import { create } from 'zustand'
import type { SearchResponse, SearchState } from '@/types/search'

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
