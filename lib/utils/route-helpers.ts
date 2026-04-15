// lib/utils/route-helpers.ts

import { ROLE_REDIRECT_ROUTES } from '@/lib/constants/routes' // 역할별 리다이렉트
import { ROUTES } from '@/lib/constants/routes' // 기본 라우트

/**
 * 역할 기반 리다이렉트 경로 반환
 * - role 추가 시 routes.ts만 수정하면 동작
 */
export function getRedirectPathByRole(role?: string): string {
  if (!role) {
    return ROUTES.LOGIN
  }

  return ROLE_REDIRECT_ROUTES[
    role as keyof typeof ROLE_REDIRECT_ROUTES
  ] ?? ROUTES.SEARCH
}