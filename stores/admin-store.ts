import { create } from 'zustand'
import type { AdminState } from '@/types/admin'
import type { User } from '@/types/auth'
import type { Policy, AuditLog } from '@/types/admin'

interface AdminStore extends AdminState {
  setUsers: (users: User[], count: number) => void
  setPolicies: (policies: Policy[]) => void
  setAuditLogs: (logs: AuditLog[], count: number) => void
  setLoadingUsers: (isLoading: boolean) => void
  setLoadingPolicies: (isLoading: boolean) => void
  setLoadingAuditLogs: (isLoading: boolean) => void
  updateUser: (userId: string, updates: Partial<User>) => void
  reset: () => void
}

const initialState: AdminState = {
  users: [],
  usersCount: 0,
  policies: [],
  auditLogs: [],
  auditLogsCount: 0,
  isLoadingUsers: false,
  isLoadingPolicies: false,
  isLoadingAuditLogs: false,
}

export const useAdminStore = create<AdminStore>((set) => ({
  ...initialState,

  setUsers: (users, count) =>
    set({
      users,
      usersCount: count,
      isLoadingUsers: false,
    }),

  setPolicies: (policies) =>
    set({
      policies,
      isLoadingPolicies: false,
    }),

  setAuditLogs: (logs, count) =>
    set({
      auditLogs: logs,
      auditLogsCount: count,
      isLoadingAuditLogs: false,
    }),

  setLoadingUsers: (isLoading) => set({ isLoadingUsers: isLoading }),
  setLoadingPolicies: (isLoading) => set({ isLoadingPolicies: isLoading }),
  setLoadingAuditLogs: (isLoading) => set({ isLoadingAuditLogs: isLoading }),

  updateUser: (userId, updates) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, ...updates } : user
      ),
    })),

  reset: () => set(initialState),
}))
