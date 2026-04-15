import { ROUTES } from './routes'
import type { UserRole } from '@/types/auth'

export interface NavItem {
  label: string
  href: string
  icon: string
  roles?: UserRole[]
  description?: string
}

export const PUBLIC_NAV: NavItem[] = [
  {
    label: 'Home',
    href: ROUTES.HOME,
    icon: 'Home',
    description: 'Welcome to HealthAI',
  },
  {
    label: 'Login',
    href: ROUTES.LOGIN,
    icon: 'LogIn',
    description: 'Sign in to your account',
  },
  {
    label: 'Sign Up',
    href: ROUTES.SIGNUP,
    icon: 'UserPlus',
    description: 'Create a new account',
  },
]

export const USER_NAV: NavItem[] = [
  {
    label: 'Search',
    href: ROUTES.SEARCH,
    icon: 'Search',
    description: 'Search health information',
  },
  {
    label: 'AI Summary',
    href: ROUTES.SEARCH_SUMMARY,
    icon: 'Sparkles',
    description: 'AI-powered health summaries',
  },
  {
    label: 'Triage',
    href: ROUTES.TRIAGE,
    icon: 'Stethoscope',
    description: 'Symptom assessment',
  },
  {
    label: 'My Profile',
    href: ROUTES.ME,
    icon: 'User',
    description: 'Manage your account',
  },
]

export const ADMIN_NAV: NavItem[] = [
  {
    label: 'Dashboard',
    href: ROUTES.ADMIN,
    icon: 'LayoutDashboard',
    roles: ['operator', 'admin', 'superuser'],
    description: 'Admin overview',
  },
  {
    label: 'Users',
    href: ROUTES.ADMIN_USERS,
    icon: 'Users',
    roles: ['operator', 'admin', 'superuser'],
    description: 'Manage users',
  },
  {
    label: 'Policies',
    href: ROUTES.ADMIN_POLICIES,
    icon: 'Settings',
    roles: ['operator', 'admin', 'superuser'],
    description: 'System policies',
  },
  {
    label: 'Audit Logs',
    href: ROUTES.ADMIN_AUDIT_LOGS,
    icon: 'FileText',
    roles: ['operator', 'admin', 'superuser'],
    description: 'Activity logs',
  },
  {
    label: 'My Profile',
    href: ROUTES.ADMIN_PROFILE,
    icon: 'User',
    roles: ['operator', 'admin', 'superuser'],
    description: 'Manage your account',
  },
]

export const getNavForRole = (role: UserRole | null, isAuthenticated: boolean): NavItem[] => {
  if (!isAuthenticated || !role) {
    return PUBLIC_NAV
  }

  if (['operator', 'admin', 'superuser'].includes(role)) {
    return ADMIN_NAV.filter((item) => !item.roles || item.roles.includes(role))
  }

  return USER_NAV
}
