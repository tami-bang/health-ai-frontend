// /types/search.ts

export interface SearchRequest {
  query: string
  include_summary?: boolean
  filters?: SearchFilters
}

export interface SearchFilters {
  category?: string
  severity?: string
  age_group?: string
}

export interface SearchMeta {
  request_id: string
  query_time_ms: number
  total_results: number
}

export interface SearchGuidance {
  triage_level: TriageLevel
  triage_message: string
  question_suggestions: string[]
}

export type TriageLevel =
  | 'emergency'
  | 'urgent'
  | 'moderate'
  | 'low'
  | 'self_care'

export interface SearchResult {
  id: string
  title: string
  snippet: string
  category: string
  relevance_score: number
  source?: string
  url?: string
}

export interface TopResult extends SearchResult {
  detailed_content?: string
  key_points?: string[]
  related_conditions?: string[]
}

export interface RelatedTopic {
  id: string
  title: string
  description: string
}

export interface AISummary {
  summary: string
  key_findings?: string[]
  recommendations?: string[]
  disclaimer?: string
}

export interface ResultsBundle {
  top_result: TopResult | null
  results: SearchResult[]
  related_topics: RelatedTopic[]
  ai_summary?: AISummary | null
}

export interface SearchResponse {
  query: string
  meta: SearchMeta
  guidance: SearchGuidance
  results_bundle: ResultsBundle
}

export type SearchMode = 'search' | 'summary'

export interface SearchState {
  query: string
  lastResponse: SearchResponse | null
  isLoading: boolean
  error: string | null
  activeMode?: SearchMode | null
}