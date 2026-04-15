'use client'

import { useCallback, useEffect, useMemo, useState } from 'react' // 용도: auth 상태 및 액션 관리
import { useRouter } from 'next/navigation' // 용도: 로그인/회원가입 후 페이지 이동
import { authApi } from '@/lib/api/auth-api' // 용도: auth API 호출
import { authSession } from '@/lib/auth/auth-session' // 용도: 로컬 세션 동기화
import { ROLE_REDIRECT_ROUTES, ROUTES } from '@/lib/constants/routes' // 용도: 라우트 및 역할별 이동 경로 참조
import type { LoginRequest, UpdateProfileRequest, User } from '@/types/auth' // 용도: auth 도메인 타입 사용

type SignupRequest = {
  username: string
  email: string
  password: string
  confirm_password: string
  full_name?: string
}

type UseAuthResult = {
  user: User | null
  isLoading: boolean
  isInitialized: boolean
  isAuthenticated: boolean
  login: (payload: LoginRequest) => Promise<void>
  signup: (payload: SignupRequest) => Promise<void>
  logout: () => Promise<void>
  refreshMe: () => Promise<User | null>
  updateProfile: (payload: UpdateProfileRequest) => Promise<User>
}

function getRedirectPathByRole(user: User | null): string {
  if (!user?.role) {
    return ROUTES.LOGIN
  }

  return (
    ROLE_REDIRECT_ROUTES[user.role as keyof typeof ROLE_REDIRECT_ROUTES] ??
    ROUTES.SEARCH
  )
}

export function useAuth(): UseAuthResult {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const syncSessionUser = useCallback((nextUser: User | null) => {
    setUser(nextUser)

    if (nextUser) {
      authSession.setUser(nextUser)
      return
    }

    authSession.clearUser()
  }, [])

  const clearAuthState = useCallback(() => {
    authSession.clearSession()
    setUser(null)
  }, [])

  const initializeAuth = useCallback(async () => {
    const session = authSession.initializeSession()

    if (!session.accessToken) {
      clearAuthState()
      setIsInitialized(true)
      return
    }

    if (session.user) {
      setUser(session.user)
    }

    try {
      const meResponse = await authApi.getMe()
      syncSessionUser(meResponse.user)
    } catch {
      clearAuthState()
    } finally {
      setIsInitialized(true)
    }
  }, [clearAuthState, syncSessionUser])

  useEffect(() => {
    void initializeAuth()
  }, [initializeAuth])

  const login = useCallback(
    async (payload: LoginRequest) => {
      setIsLoading(true)

      try {
        const response = await authApi.login(payload)

        authSession.setTokens({
          access_token: response.access_token!,
          refresh_token: response.refresh_token!,
        })

        syncSessionUser(response.user)
        router.push(getRedirectPathByRole(response.user))
      } finally {
        setIsLoading(false)
      }
    },
    [router, syncSessionUser],
  )

  const signup = useCallback(async (payload: SignupRequest) => {
    setIsLoading(true)

    try {
      await authApi.signup(payload)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setIsLoading(true)

    try {
      await authApi.logout()
    } finally {
      clearAuthState()
      router.push(ROUTES.LOGIN)
      setIsLoading(false)
    }
  }, [clearAuthState, router])

  const refreshMe = useCallback(async (): Promise<User | null> => {
    try {
      const response = await authApi.getMe()
      syncSessionUser(response.user)
      return response.user
    } catch {
      clearAuthState()
      return null
    }
  }, [clearAuthState, syncSessionUser])

  const updateProfile = useCallback(
    async (payload: UpdateProfileRequest): Promise<User> => {
      setIsLoading(true)

      try {
        const response = await authApi.updateMe(payload)
        syncSessionUser(response.user)
        return response.user
      } finally {
        setIsLoading(false)
      }
    },
    [syncSessionUser],
  )

  const isAuthenticated = useMemo(() => {
    return Boolean(user && authSession.isAuthenticated())
  }, [user])

  return {
    user,
    isLoading,
    isInitialized,
    isAuthenticated,
    login,
    signup,
    logout,
    refreshMe,
    updateProfile,
  }
}