import type { User, UserRole, UserStatus } from './auth'

export interface UsersListResponse {
  count: number
  users: User[]
}

export interface CreateUserRequest {
  username: string
  email: string
  password: string
  role: UserRole
}

export interface CreateUserResponse {
  user: User
}

export interface UpdateUserRoleRequest {
  role: UserRole
}

export interface UpdateUserStatusRequest {
  status: UserStatus
}

export interface Policy {
  id: string
  key: string
  value: string | number | boolean
  type: 'boolean' | 'string' | 'number'
  label: string
  description: string
  category: string
}

export interface PoliciesResponse {
  policies: Policy[]
}

export interface UpdatePoliciesRequest {
  policies: Array<{
    key: string
    value: string | number | boolean
  }>
}

export type AuditAction = 
  | 'user.login'
  | 'user.logout'
  | 'user.signup'
  | 'user.password_change'
  | 'user.profile_update'
  | 'admin.user_create'
  | 'admin.user_role_change'
  | 'admin.user_status_change'
  | 'admin.policy_update'
  | 'search.query'
  | 'triage.request'

export interface AuditLog {
  id: string
  action: AuditAction
  actor_username: string
  target_id?: string
  detail: string
  created_at: string
}

export interface AuditLogsResponse {
  count: number
  logs: AuditLog[]
}

export interface AuditLogsFilter {
  action?: AuditAction
  actor_username?: string
  start_date?: string
  end_date?: string
  page?: number
  limit?: number
}

export interface AdminState {
  users: User[]
  usersCount: number
  policies: Policy[]
  auditLogs: AuditLog[]
  auditLogsCount: number
  isLoadingUsers: boolean
  isLoadingPolicies: boolean
  isLoadingAuditLogs: boolean
}

export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalSearches: number
  totalTriages: number
  recentUsers: User[]
  recentLogs: AuditLog[]
}
