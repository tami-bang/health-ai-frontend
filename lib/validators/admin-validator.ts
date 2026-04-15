import type { ValidationResult } from './auth-validator'
import type { UserRole } from '@/types/auth'

export function validateCreateUser(
  username: string,
  email: string,
  password: string,
  role: UserRole
): ValidationResult {
  const errors: Record<string, string> = {}

  if (!username.trim()) {
    errors.username = 'Username is required'
  } else if (username.length < 3) {
    errors.username = 'Username must be at least 3 characters'
  } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.username = 'Username can only contain letters, numbers, and underscores'
  }

  if (!email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Invalid email format'
  }

  if (!password) {
    errors.password = 'Password is required'
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  }

  if (!role) {
    errors.role = 'Role is required'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}
