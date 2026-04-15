'use client'

import { useCallback } from 'react'
import { useAdminStore } from '@/stores/admin-store'
import { adminApi } from '@/lib/api/admin-api'
import type { CreateUserRequest, UpdatePoliciesRequest, AuditLogsFilter } from '@/types/admin'
import type { UserRole, UserStatus } from '@/types/auth'
import { extractErrorMessage } from '@/lib/utils/response'

export function useAdmin() {
  const {
    users,
    usersCount,
    policies,
    auditLogs,
    auditLogsCount,
    isLoadingUsers,
    isLoadingPolicies,
    isLoadingAuditLogs,
    setUsers,
    setPolicies,
    setAuditLogs,
    setLoadingUsers,
    setLoadingPolicies,
    setLoadingAuditLogs,
    updateUser,
  } = useAdminStore()

  // Users
  const fetchUsers = useCallback(
    async (page = 1, limit = 20) => {
      setLoadingUsers(true)
      try {
        const response = await adminApi.getUsers({ page, limit })
        setUsers(response.users, response.count)
        return response
      } catch (err) {
        setLoadingUsers(false)
        throw new Error(extractErrorMessage(err))
      }
    },
    [setUsers, setLoadingUsers]
  )

  const createUser = useCallback(async (data: CreateUserRequest) => {
    const response = await adminApi.createUser(data)
    // Refresh users list
    await fetchUsers()
    return response
  }, [fetchUsers])

  const changeUserRole = useCallback(
    async (userId: string, role: UserRole) => {
      const response = await adminApi.updateUserRole(userId, { role })
      updateUser(userId, { role })
      return response
    },
    [updateUser]
  )

  const changeUserStatus = useCallback(
    async (userId: string, status: UserStatus) => {
      const response = await adminApi.updateUserStatus(userId, { status })
      updateUser(userId, { status })
      return response
    },
    [updateUser]
  )

  // Policies
  const fetchPolicies = useCallback(async () => {
    setLoadingPolicies(true)
    try {
      const response = await adminApi.getPolicies()
      setPolicies(response.policies)
      return response
    } catch (err) {
      setLoadingPolicies(false)
      throw new Error(extractErrorMessage(err))
    }
  }, [setPolicies, setLoadingPolicies])

  const updatePolicies = useCallback(
    async (data: UpdatePoliciesRequest) => {
      const response = await adminApi.updatePolicies(data)
      setPolicies(response.policies)
      return response
    },
    [setPolicies]
  )

  // Audit Logs
  const fetchAuditLogs = useCallback(
    async (filters?: AuditLogsFilter) => {
      setLoadingAuditLogs(true)
      try {
        const response = await adminApi.getAuditLogs(filters)
        setAuditLogs(response.logs, response.count)
        return response
      } catch (err) {
        setLoadingAuditLogs(false)
        throw new Error(extractErrorMessage(err))
      }
    },
    [setAuditLogs, setLoadingAuditLogs]
  )

  return {
    // State
    users,
    usersCount,
    policies,
    auditLogs,
    auditLogsCount,
    isLoadingUsers,
    isLoadingPolicies,
    isLoadingAuditLogs,
    // Actions
    fetchUsers,
    createUser,
    changeUserRole,
    changeUserStatus,
    fetchPolicies,
    updatePolicies,
    fetchAuditLogs,
  }
}
