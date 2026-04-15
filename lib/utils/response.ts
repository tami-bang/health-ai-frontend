import type { ApiError } from '@/types/common'

export function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'object' && error !== null) {
    const apiError = error as ApiError
    if (apiError.message) {
      return apiError.message
    }
    if (apiError.details) {
      const firstDetail = Object.values(apiError.details)[0]
      if (Array.isArray(firstDetail) && firstDetail.length > 0) {
        return firstDetail[0]
      }
    }
  }

  if (typeof error === 'string') {
    return error
  }

  return 'An unexpected error occurred'
}

export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes('Network Error') ||
      error.message.includes('Failed to fetch') ||
      error.message.includes('ERR_NETWORK')
    )
  }
  return false
}

export function isAuthError(status?: number): boolean {
  return status === 401 || status === 403
}

export function handleApiError(error: unknown): never {
  const message = extractErrorMessage(error)
  throw new Error(message)
}
