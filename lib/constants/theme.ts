import type { TriageLevel } from '@/types/search'
import type { UserStatus } from '@/types/auth'
import type { AuditAction } from '@/types/admin'

// Design system colors from requirements
export const COLORS = {
  primary: '#2563EB',
  primarySoft: '#DBEAFE',
  tealAccent: '#0F766E',
  mintSoft: '#CCFBF1',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceAlt: '#F1F5F9',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  border: '#E2E8F0',
  success: '#16A34A',
  warning: '#D97706',
  danger: '#DC2626',
  info: '#0284C7',
} as const

// Triage level colors
export const TRIAGE_COLORS: Record<TriageLevel, { bg: string; text: string; border: string; label: string }> = {
  emergency: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-300',
    label: 'Emergency',
  },
  urgent: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    border: 'border-orange-300',
    label: 'Urgent',
  },
  moderate: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-300',
    label: 'Moderate',
  },
  low: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300',
    label: 'Low Priority',
  },
  self_care: {
    bg: 'bg-teal-100',
    text: 'text-teal-800',
    border: 'border-teal-300',
    label: 'Self Care',
  },
}

// User status colors
export const STATUS_COLORS: Record<UserStatus, { bg: string; text: string; dot: string }> = {
  active: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    dot: 'bg-green-500',
  },
  inactive: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    dot: 'bg-gray-500',
  },
  suspended: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    dot: 'bg-red-500',
  },
  pending: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    dot: 'bg-yellow-500',
  },
}

// Audit action colors
export const AUDIT_ACTION_COLORS: Record<string, { bg: string; text: string }> = {
  'user.login': { bg: 'bg-blue-100', text: 'text-blue-800' },
  'user.logout': { bg: 'bg-gray-100', text: 'text-gray-800' },
  'user.signup': { bg: 'bg-green-100', text: 'text-green-800' },
  'user.password_change': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  'user.profile_update': { bg: 'bg-purple-100', text: 'text-purple-800' },
  'admin.user_create': { bg: 'bg-teal-100', text: 'text-teal-800' },
  'admin.user_role_change': { bg: 'bg-orange-100', text: 'text-orange-800' },
  'admin.user_status_change': { bg: 'bg-pink-100', text: 'text-pink-800' },
  'admin.policy_update': { bg: 'bg-indigo-100', text: 'text-indigo-800' },
  'search.query': { bg: 'bg-cyan-100', text: 'text-cyan-800' },
  'triage.request': { bg: 'bg-emerald-100', text: 'text-emerald-800' },
}

export const getAuditActionColor = (action: AuditAction) => {
  return AUDIT_ACTION_COLORS[action] || { bg: 'bg-gray-100', text: 'text-gray-800' }
}

// Role badge colors
export const ROLE_COLORS: Record<string, { bg: string; text: string }> = {
  member: { bg: 'bg-gray-100', text: 'text-gray-800' },
  operator: { bg: 'bg-blue-100', text: 'text-blue-800' },
  admin: { bg: 'bg-purple-100', text: 'text-purple-800' },
  superuser: { bg: 'bg-red-100', text: 'text-red-800' },
}
