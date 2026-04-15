import type { UserRole, UserStatus } from '@/types/auth'

export const ROLES: Record<UserRole, { label: string; level: number; description: string }> = {
  member: {
    label: 'Member',
    level: 1,
    description: 'Basic user with access to search and triage features',
  },
  operator: {
    label: 'Operator',
    level: 2,
    description: 'Can view admin dashboard and user information',
  },
  admin: {
    label: 'Admin',
    level: 3,
    description: 'Can manage users, roles, and policies',
  },
  superuser: {
    label: 'Superuser',
    level: 4,
    description: 'Full system access with all permissions',
  },
}

export const ROLE_OPTIONS: Array<{ label: string; value: UserRole }> = [
  { label: 'Member', value: 'member' },
  { label: 'Operator', value: 'operator' },
  { label: 'Admin', value: 'admin' },
  { label: 'Superuser', value: 'superuser' },
]

export const STATUS_OPTIONS: Array<{ label: string; value: UserStatus }> = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Suspended', value: 'suspended' },
  { label: 'Pending', value: 'pending' },
]

export const canAccessAdmin = (role: UserRole): boolean => {
  return ['operator', 'admin', 'superuser'].includes(role)
}

export const canManageUsers = (role: UserRole): boolean => {
  return ['admin', 'superuser'].includes(role)
}

export const canEditPolicies = (role: UserRole): boolean => {
  return ['admin', 'superuser'].includes(role)
}

export const canCreateUsers = (role: UserRole): boolean => {
  return ['admin', 'superuser'].includes(role)
}

export const canChangeRole = (actorRole: UserRole, targetRole: UserRole): boolean => {
  const actorLevel = ROLES[actorRole].level
  const targetLevel = ROLES[targetRole].level
  return actorLevel > targetLevel
}

export const getAssignableRoles = (actorRole: UserRole): UserRole[] => {
  const actorLevel = ROLES[actorRole].level
  return (Object.keys(ROLES) as UserRole[]).filter(
    (role) => ROLES[role].level < actorLevel
  )
}
