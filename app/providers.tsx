'use client'

import { useEffect } from 'react' // 용도: 앱 최초 실행 시 세션 초기화
import { authSession } from '@/lib/auth/auth-session' // 용도: 토큰 → apiClient 동기화

export default function AppProviders({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    authSession.initializeSession()
  }, [])

  return <>{children}</>
}