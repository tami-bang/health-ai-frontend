export interface ApiError {
  message: string
  code?: string
  details?: Record<string, string[]>
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: ApiError
}

export interface PaginatedRequest {
  page?: number
  limit?: number
  sort_by?: string
  sort_order?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  total_pages: number
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface SelectOption {
  label: string
  value: string
}

export interface NavigationItem {
  label: string
  href: string
  icon?: string
  roles?: string[]
  children?: NavigationItem[]
}

export interface BreadcrumbItem {
  label: string
  href?: string
}
