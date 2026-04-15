import type { UserRole } from '@/types/auth'
import { ROUTES, PUBLIC_ROUTES, ADMIN_ROUTES, USER_ROUTES } from '@/lib/constants/routes'
import { canAccessAdmin } from '@/lib/constants/roles'

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'))
}

export function isAdminRoute(pathname: string): boolean {
  return pathname.startsWith('/admin')
}

export function isUserRoute(pathname: string): boolean {
  return USER_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'))
}

export function canAccessRoute(pathname: string, role: UserRole | null, isAuthenticated: boolean): boolean {
  // Public routes are always accessible
  if (isPublicRoute(pathname)) {
    return true
  }

  // Must be authenticated for non-public routes
  if (!isAuthenticated || !role) {
    return false
  }

  // Admin routes require admin role
  if (isAdminRoute(pathname)) {
    return canAccessAdmin(role)
  }

  // User routes are accessible to all authenticated users
  if (isUserRoute(pathname)) {
    return true
  }

  return false
}

export function getRedirectPath(role: UserRole | null, isAuthenticated: boolean): string {
  if (!isAuthenticated || !role) {
    return ROUTES.LOGIN
  }

  if (canAccessAdmin(role)) {
    return ROUTES.ADMIN
  }

  return ROUTES.SEARCH
}

export function getDefaultRedirectAfterLogin(role: UserRole): string {
  if (canAccessAdmin(role)) {
    return ROUTES.ADMIN
  }
  return ROUTES.SEARCH
}
