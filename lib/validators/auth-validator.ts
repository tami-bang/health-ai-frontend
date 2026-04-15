export interface ValidationResult {
  valid: boolean
  errors: Record<string, string>
}

export function validateLogin(username: string, password: string): ValidationResult {
  const errors: Record<string, string> = {}

  if (!username.trim()) {
    errors.username = 'Username is required'
  }

  if (!password) {
    errors.password = 'Password is required'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateSignup(
  username: string,
  email: string,
  password: string,
  passwordConfirm: string
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

  if (password !== passwordConfirm) {
    errors.passwordConfirm = 'Passwords do not match'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateEmail(email: string): ValidationResult {
  const errors: Record<string, string> = {}

  if (!email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Invalid email format'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validatePassword(
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
): ValidationResult {
  const errors: Record<string, string> = {}

  if (!currentPassword) {
    errors.currentPassword = 'Current password is required'
  }

  if (!newPassword) {
    errors.newPassword = 'New password is required'
  } else if (newPassword.length < 8) {
    errors.newPassword = 'Password must be at least 8 characters'
  }

  if (newPassword !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateResetPassword(
  token: string,
  password: string,
  passwordConfirm: string
): ValidationResult {
  const errors: Record<string, string> = {}

  if (!token) {
    errors.token = 'Reset token is missing'
  }

  if (!password) {
    errors.password = 'Password is required'
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = 'Passwords do not match'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}
