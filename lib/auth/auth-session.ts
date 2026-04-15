import type { AuthTokens, User } from '@/types/auth' // 용도: 세션 저장 타입 정의
import { apiClient } from '@/lib/api/client' // 용도: 메모리 access token 동기화

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_KEY = 'auth_user'

const AUTH_PRESENT_COOKIE_KEY = 'auth_present'
const AUTH_ROLE_COOKIE_KEY = 'auth_role'
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

function safelyParseUser(userText: string | null): User | null {
  if (!userText) {
    return null
  }

  try {
    return JSON.parse(userText) as User
  } catch {
    return null
  }
}

function setCookie(
  name: string,
  value: string,
  maxAgeSeconds = COOKIE_MAX_AGE_SECONDS,
) {
  if (!isBrowser()) {
    return
  }

  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; path=/; max-age=${maxAgeSeconds}; samesite=lax`
}

function clearCookie(name: string) {
  if (!isBrowser()) {
    return
  }

  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`
}

function syncAuthCookies(user: User | null) {
  if (!user) {
    clearCookie(AUTH_PRESENT_COOKIE_KEY)
    clearCookie(AUTH_ROLE_COOKIE_KEY)
    return
  }

  setCookie(AUTH_PRESENT_COOKIE_KEY, 'true')
  setCookie(AUTH_ROLE_COOKIE_KEY, user.role)
}

export const authSession = {
  setTokens(tokens: AuthTokens) {
    if (!isBrowser()) {
      return
    }

    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access_token)
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token)
    apiClient.setAccessToken(tokens.access_token)
  },

  getAccessToken(): string | null {
    if (!isBrowser()) {
      return null
    }

    return localStorage.getItem(ACCESS_TOKEN_KEY)
  },

  getRefreshToken(): string | null {
    if (!isBrowser()) {
      return null
    }

    return localStorage.getItem(REFRESH_TOKEN_KEY)
  },

  clearTokens() {
    if (!isBrowser()) {
      return
    }

    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    apiClient.setAccessToken(null)
  },

  setUser(user: User) {
    if (!isBrowser()) {
      return
    }

    localStorage.setItem(USER_KEY, JSON.stringify(user))
    syncAuthCookies(user)
  },

  getUser(): User | null {
    if (!isBrowser()) {
      return null
    }

    return safelyParseUser(localStorage.getItem(USER_KEY))
  },

  clearUser() {
    if (!isBrowser()) {
      return
    }

    localStorage.removeItem(USER_KEY)
    syncAuthCookies(null)
  },

  initializeSession() {
    const accessToken = this.getAccessToken()
    const refreshToken = this.getRefreshToken()
    const user = this.getUser()

    if (accessToken) {
      apiClient.setAccessToken(accessToken)
    } else {
      apiClient.setAccessToken(null)
    }

    if (user) {
      syncAuthCookies(user)
    } else {
      syncAuthCookies(null)
    }

    return {
      accessToken,
      refreshToken,
      user,
    }
  },

  clearSession() {
    this.clearTokens()
    this.clearUser()
  },

  isAuthenticated(): boolean {
    return Boolean(this.getAccessToken())
  },
}