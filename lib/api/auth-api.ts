import { apiClient } from './client' // 용도: 공통 API 클라이언트 사용
import { API_ROUTES } from '@/lib/constants/routes' // 용도: API 경로 상수 사용
import { authSession } from '@/lib/auth/auth-session' // 용도: refresh token 조회
import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
  ForgotIdRequest,
  ForgotIdResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  MeResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  SignupRequest,
  SignupResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '@/types/auth' // 용도: auth 요청/응답 타입 정의

function validateTokenResponse(data: LoginResponse): LoginResponse {
  if (!data.access_token || !data.refresh_token) {
    throw new Error(
      '백엔드 로그인 응답에 access_token / refresh_token 이 없습니다. auth 설정을 확인하세요.',
    )
  }

  return data
}

export const authApi = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(API_ROUTES.LOGIN, data, {
      skipAuthRefresh: true,
    })

    return validateTokenResponse(response)
  },

  signup(data: SignupRequest) {
    return apiClient.post<SignupResponse>(API_ROUTES.SIGNUP, data, {
      skipAuthRefresh: true,
    })
  },

  async refresh(refreshToken: string): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      API_ROUTES.REFRESH,
      { refresh_token: refreshToken },
      { skipAuthRefresh: true },
    )

    return validateTokenResponse(response)
  },

  async logout(): Promise<{ message?: string }> {
    const refreshToken = authSession.getRefreshToken()

    if (!refreshToken) {
      return { message: 'No refresh token found.' }
    }

    return apiClient.post<{ message?: string }>(
      API_ROUTES.LOGOUT,
      { refresh_token: refreshToken },
      { skipAuthRefresh: true },
    )
  },

  logoutAll() {
    return apiClient.post<{ message?: string }>(API_ROUTES.LOGOUT_ALL)
  },

  getMe() {
    return apiClient.get<MeResponse>(API_ROUTES.ME)
  },

  updateMe(data: UpdateProfileRequest) {
    return apiClient.patch<UpdateProfileResponse>(API_ROUTES.ME, data)
  },

  changePassword(data: ChangePasswordRequest) {
    return apiClient.post<ChangePasswordResponse>(API_ROUTES.CHANGE_PASSWORD, data)
  },

  forgotId(data: ForgotIdRequest) {
    return apiClient.post<ForgotIdResponse>(API_ROUTES.FORGOT_ID, data, {
      skipAuthRefresh: true,
    })
  },

  forgotPassword(data: ForgotPasswordRequest) {
    return apiClient.post<ForgotPasswordResponse>(API_ROUTES.FORGOT_PASSWORD, data, {
      skipAuthRefresh: true,
    })
  },

  resetPassword(data: ResetPasswordRequest) {
    return apiClient.post<ResetPasswordResponse>(API_ROUTES.RESET_PASSWORD, data, {
      skipAuthRefresh: true,
    })
  },

  verifyEmail(token: string) {
    return apiClient.post<{ message?: string }>(
      API_ROUTES.VERIFY_EMAIL,
      { token },
      { skipAuthRefresh: true },
    )
  },

  resendVerification(email: string) {
    return apiClient.post<{ message?: string }>(
      API_ROUTES.RESEND_VERIFICATION,
      { email },
      { skipAuthRefresh: true },
    )
  },
}