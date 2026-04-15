export type UserRole = 'superuser' | 'admin' | 'operator' | 'member'

export interface User {
  user_id: string
  username: string
  email: string
  full_name: string
  role: UserRole
  is_active: boolean
  is_email_verified: boolean
  created_at?: string | null
  updated_at?: string | null
  last_login_at?: string | null
}

export interface BaseMessageResponse {
  message: string
}

export interface AuthTokens {
  access_token: string
  refresh_token: string
}

export interface LoginRequest {
  login_id: string
  password: string
}

export interface LoginResponse extends BaseMessageResponse {
  user: User
  token_type: 'bearer' | string
  access_token?: string
  refresh_token?: string
}

export interface SignupRequest {
  username: string
  email: string
  password: string
  confirm_password: string
  full_name?: string | null
}

export interface VerificationInfo extends BaseMessageResponse {
  verification_token?: string
}

export interface SignupResponse extends BaseMessageResponse {
  user: User
  verification?: VerificationInfo
}

export interface ForgotIdRequest {
  email: string
}

export interface ForgotIdResponse extends BaseMessageResponse {
  masked_username?: string
}

export interface ForgotPasswordRequest {
  login_id: string
}

export interface ForgotPasswordResponse extends BaseMessageResponse {
  reset_token?: string
}

export interface ResetPasswordRequest {
  token: string
  new_password: string
  confirm_password: string
}

export interface ResetPasswordResponse extends BaseMessageResponse {}

export interface ChangePasswordRequest {
  current_password: string
  new_password: string
  confirm_password: string
}

export interface ChangePasswordResponse extends BaseMessageResponse {}

export interface UpdateProfileRequest {
  full_name?: string | null
}

export interface UpdateProfileResponse extends BaseMessageResponse {
  user: User
}

export interface MeResponse {
  user: User
}

export interface LogoutResponse extends Partial<BaseMessageResponse> {}

export interface VerifyEmailResponse extends BaseMessageResponse {
  user?: User
}

export interface ResendVerificationResponse extends BaseMessageResponse {
  verification_token?: string
}