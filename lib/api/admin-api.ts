import { apiClient } from './client'
import { API_ROUTES } from '@/lib/constants/routes'
import type {
  UsersListResponse,
  CreateUserRequest,
  CreateUserResponse,
  UpdateUserRoleRequest,
  UpdateUserStatusRequest,
  PoliciesResponse,
  UpdatePoliciesRequest,
  AuditLogsResponse,
  AuditLogsFilter,
} from '@/types/admin'
import type { User } from '@/types/auth'

export const adminApi = {
  // Users
  getUsers: (params?: { page?: number; limit?: number }) =>
    apiClient.get<UsersListResponse>(API_ROUTES.ADMIN_USERS, { params }),

  createUser: (data: CreateUserRequest) =>
    apiClient.post<CreateUserResponse>(API_ROUTES.ADMIN_USERS, data),

  updateUserRole: (userId: string, data: UpdateUserRoleRequest) =>
    apiClient.patch<User>(`${API_ROUTES.ADMIN_USERS}/${userId}/role`, data),

  updateUserStatus: (userId: string, data: UpdateUserStatusRequest) =>
    apiClient.patch<User>(`${API_ROUTES.ADMIN_USERS}/${userId}/status`, data),

  // Policies
  getPolicies: () =>
    apiClient.get<PoliciesResponse>(API_ROUTES.ADMIN_POLICIES),

  updatePolicies: (data: UpdatePoliciesRequest) =>
    apiClient.patch<PoliciesResponse>(API_ROUTES.ADMIN_POLICIES, data),

  // Audit Logs
  getAuditLogs: (filters?: AuditLogsFilter) =>
    apiClient.get<AuditLogsResponse>(API_ROUTES.ADMIN_AUDIT_LOGS, { params: filters as Record<string, string | number | boolean | undefined> }),
}
