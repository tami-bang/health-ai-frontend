import { extractErrorMessage } from '@/lib/utils/response' // 용도: 서버 에러 메시지 표준 추출

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

const AUTH_REFRESH_ENDPOINT = '/auth/refresh'
const LOGIN_PAGE_PATH = '/login'
const TOKEN_REFRESHED_ERROR_CODE = 'TOKEN_REFRESHED'

interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>
  skipAuthRefresh?: boolean
}

class ApiClient {
  private baseUrl: string
  private accessToken: string | null = null
  private refreshPromise: Promise<boolean> | null = null

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  setAccessToken(token: string | null) {
    this.accessToken = token
  }

  getAccessToken(): string | null {
    return this.accessToken
  }

  private buildUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): string {
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
    const url = new URL(`${this.baseUrl}${normalizedEndpoint}`)

    if (!params) {
      return url.toString()
    }

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined) {
        return
      }

      url.searchParams.append(key, String(value))
    })

    return url.toString()
  }

  private getHeaders(customHeaders?: HeadersInit): HeadersInit {
    const baseHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (this.accessToken) {
      baseHeaders['Authorization'] = `Bearer ${this.accessToken}`
    }

    return {
      ...baseHeaders,
      ...(customHeaders || {}),
    }
  }

  private async parseResponseData<T>(response: Response): Promise<T> {
    const text = await response.text()

    if (!text) {
      return {} as T
    }

    return JSON.parse(text) as T
  }

  private redirectToLogin() {
    if (typeof window === 'undefined') {
      return
    }

    window.location.href = LOGIN_PAGE_PATH
  }

  private async handleUnauthorizedWithRefresh(
    endpoint: string,
    config?: RequestConfig,
  ): Promise<boolean> {
    const shouldSkipRefresh =
      config?.skipAuthRefresh === true || endpoint === AUTH_REFRESH_ENDPOINT

    if (shouldSkipRefresh) {
      return false
    }

    return this.tryRefreshToken()
  }

  private async request<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    endpoint: string,
    data?: unknown,
    config?: RequestConfig,
    isRetry = false,
  ): Promise<T> {
    const url = this.buildUrl(endpoint, config?.params)

    const response = await fetch(url, {
      method,
      headers: this.getHeaders(config?.headers),
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    })

    if (response.ok) {
      return this.parseResponseData<T>(response)
    }

    if (response.status === 401 && !isRetry) {
      const refreshed = await this.handleUnauthorizedWithRefresh(endpoint, config)

      if (refreshed) {
        return this.request<T>(method, endpoint, data, config, true)
      }

      this.redirectToLogin()
      throw new Error('Session expired. Please log in again.')
    }

    const errorData = await response.json().catch(() => ({}))
    throw new Error(extractErrorMessage(errorData))
  }

  private async performRefreshRequest(refreshToken: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}${AUTH_REFRESH_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      })

      if (!response.ok) {
        return false
      }

      const data = await response.json()

      if (!data?.access_token || !data?.refresh_token) {
        return false
      }

      this.accessToken = data.access_token

      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)
      }

      return true
    } catch {
      return false
    }
  }

  private async tryRefreshToken(): Promise<boolean> {
    const refreshToken =
      typeof window !== 'undefined'
        ? localStorage.getItem('refresh_token')
        : null

    if (!refreshToken) {
      return false
    }

    if (!this.refreshPromise) {
      this.refreshPromise = this.performRefreshRequest(refreshToken)
        .catch(() => false)
        .finally(() => {
          this.refreshPromise = null
        })
    }

    return this.refreshPromise
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('GET', endpoint, undefined, config)
  }

  async post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('POST', endpoint, data, config)
  }

  async patch<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('PATCH', endpoint, data, config)
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('DELETE', endpoint, undefined, config)
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
export { TOKEN_REFRESHED_ERROR_CODE }