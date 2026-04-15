// lib/constants/routes.ts

// =====================================
// 라우트 정의 (UI 경로)
// =====================================

export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_ID: '/forgot-id',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email', // 확장 포인트: 이메일 인증 페이지

  // User routes
  SEARCH: '/search',
  SEARCH_SUMMARY: '/search/summary',
  TRIAGE: '/triage',
  ME: '/me',

  // Admin routes
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_USERS_CREATE: '/admin/users/create',
  ADMIN_POLICIES: '/admin/policies',
  ADMIN_AUDIT_LOGS: '/admin/audit-logs',
  ADMIN_PROFILE: '/admin/profile',
} as const

// =====================================
// 라우트 그룹 (접근 제어용)
// =====================================

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
  ROUTES.FORGOT_ID,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
  ROUTES.VERIFY_EMAIL,
] as const

export const USER_ROUTES = [
  ROUTES.SEARCH,
  ROUTES.SEARCH_SUMMARY,
  ROUTES.TRIAGE,
  ROUTES.ME,
] as const

export const ADMIN_ROUTES = [
  ROUTES.ADMIN,
  ROUTES.ADMIN_USERS,
  ROUTES.ADMIN_USERS_CREATE,
  ROUTES.ADMIN_POLICIES,
  ROUTES.ADMIN_AUDIT_LOGS,
  ROUTES.ADMIN_PROFILE,
] as const

// =====================================
// API 엔드포인트 (백엔드 기준)
// =====================================

export const API_ROUTES = {
  // Auth
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  REFRESH: '/auth/refresh',
  LOGOUT: '/auth/logout',
  LOGOUT_ALL: '/auth/logout-all',
  ME: '/auth/me',
  CHANGE_PASSWORD: '/auth/change-password',
  FORGOT_ID: '/auth/forgot-id',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  RESEND_VERIFICATION: '/auth/resend-verification',

  // User
  SEARCH: '/search',
  SEARCH_SUMMARY: '/search/summary',
  TRIAGE: '/triage',

  // Admin
  ADMIN_USERS: '/admin/users',
  ADMIN_POLICIES: '/admin/policies',
  ADMIN_AUDIT_LOGS: '/admin/audit-logs',
} as const

// =====================================
// ROLE 기반 리다이렉트
// =====================================

/**
 * 왜 분리했냐:
 * - 로그인 이후 분기 로직을 여기서 통제
 * - 역할 추가 시 여기만 수정
 */
export const ROLE_REDIRECT_ROUTES = {
  superuser: ROUTES.ADMIN,
  admin: ROUTES.ADMIN,
  operator: ROUTES.ADMIN,
  member: ROUTES.SEARCH,
} as const