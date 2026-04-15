import { NextRequest } from 'next/server' // 용도: 미들웨어 요청 객체
import { NextResponse } from 'next/server' // 용도: 미들웨어 응답 객체
import {
  ADMIN_ROUTES,
  PUBLIC_ROUTES,
  ROLE_REDIRECT_ROUTES,
  ROUTES,
  USER_ROUTES,
} from '@/lib/constants/routes' // 용도: 라우트/권한 규칙 참조

const AUTH_PRESENT_COOKIE_KEY = 'auth_present'
const AUTH_ROLE_COOKIE_KEY = 'auth_role'

const AUTH_ENTRY_ROUTES = [ROUTES.LOGIN, ROUTES.SIGNUP] as const

function isExactOrNestedPath(pathname: string, route: string): boolean {
  if (route === '/') {
    return pathname === route
  }

  return pathname === route || pathname.startsWith(`${route}/`)
}

function matchesRouteGroup(pathname: string, routes: readonly string[]): boolean {
  return routes.some((route) => isExactOrNestedPath(pathname, route))
}

function getRoleRedirectPath(role?: string): string {
  if (!role) {
    return ROUTES.LOGIN
  }

  return (
    ROLE_REDIRECT_ROUTES[role as keyof typeof ROLE_REDIRECT_ROUTES] ??
    ROUTES.SEARCH
  )
}

function isAdminRole(role?: string): boolean {
  return role === 'superuser' || role === 'admin' || role === 'operator'
}

function isAuthEntryRoute(pathname: string): boolean {
  return AUTH_ENTRY_ROUTES.some((route) => pathname === route)
}

function shouldSkipMiddleware(pathname: string): boolean {
  return (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/icons') ||
    pathname.startsWith('/api')
  )
}

function buildRedirectResponse(request: NextRequest, targetPath: string) {
  const redirectUrl = new URL(targetPath, request.url)
  return NextResponse.redirect(redirectUrl)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (shouldSkipMiddleware(pathname)) {
    return NextResponse.next()
  }

  const isPublicRoute = matchesRouteGroup(pathname, PUBLIC_ROUTES)
  const isUserRoute = matchesRouteGroup(pathname, USER_ROUTES)
  const isAdminRoute = matchesRouteGroup(pathname, ADMIN_ROUTES)

  const authPresent = request.cookies.get(AUTH_PRESENT_COOKIE_KEY)?.value === 'true'
  const authRole = request.cookies.get(AUTH_ROLE_COOKIE_KEY)?.value

  // 로그인된 사용자가 로그인/회원가입 진입 페이지 접근 시 역할별 홈으로 이동
  if (authPresent && isAuthEntryRoute(pathname)) {
    return buildRedirectResponse(request, getRoleRedirectPath(authRole))
  }

  // 비로그인 사용자가 보호 페이지 접근 시 로그인으로 이동
  if (!authPresent && (isUserRoute || isAdminRoute)) {
    return buildRedirectResponse(request, ROUTES.LOGIN)
  }

  // 일반 회원이 관리자 영역 접근 시 사용자 홈으로 이동
  if (authPresent && isAdminRoute && !isAdminRole(authRole)) {
    return buildRedirectResponse(request, ROUTES.SEARCH)
  }

  // 관리자 계열 사용자를 관리자 홈으로 강제할지 여부
  // 확장 포인트:
  // - 관리자가 search/triage도 사용 가능해야 하면 이 블록 제거
  if (authPresent && isUserRoute && isAdminRole(authRole)) {
    return buildRedirectResponse(request, ROUTES.ADMIN)
  }

  if (isPublicRoute) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.*\\..*).*)'],
}