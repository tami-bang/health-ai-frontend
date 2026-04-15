import { create } from 'zustand'
import type { User, AuthState } from '@/types/auth'
import { authSession } from '@/lib/auth/auth-session'

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void
  setTokens: (accessToken: string | null, refreshToken: string | null) => void
  setLoading: (isLoading: boolean) => void
  logout: () => void
  initialize: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setTokens: (accessToken, refreshToken) =>
    set({
      accessToken,
      refreshToken,
      isAuthenticated: !!accessToken,
    }),

  setLoading: (isLoading) => set({ isLoading }),

  logout: () => {
    authSession.clearSession()
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    })
  },

  initialize: () => {
    const session = authSession.initializeSession()
    set({
      user: session.user,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      isAuthenticated: !!session.accessToken && !!session.user,
      isLoading: false,
    })
  },
}))
