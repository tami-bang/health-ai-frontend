'use client'

import { useState } from 'react' // 용도: 로그인 폼 상태 관리
import Link from 'next/link' // 용도: 인증 관련 페이지 이동
import { Eye, EyeOff } from 'lucide-react' // 용도: 비밀번호 표시 토글 아이콘
import { Button } from '@/components/ui/button' // 용도: 공통 버튼 UI
import { Input } from '@/components/ui/input' // 용도: 공통 입력 UI
import { Label } from '@/components/ui/label' // 용도: 입력 라벨 UI
import { Spinner } from '@/components/ui/spinner' // 용도: 로딩 표시 UI
import { useAuth } from '@/hooks/use-auth' // 용도: 로그인 액션 호출
import { validateLogin } from '@/lib/validators/auth-validator' // 용도: 로그인 입력값 검증
import { ROUTES } from '@/lib/constants/routes' // 용도: 인증 관련 라우트 상수
import { extractErrorMessage } from '@/lib/utils/response' // 용도: 에러 메시지 표준 추출
import { toast } from 'sonner' // 용도: 사용자 피드백 토스트 표시

type LoginFormErrorState = {
  login_id?: string
  password?: string
}

export function LoginForm() {
  const { login, isLoading } = useAuth()
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<LoginFormErrorState>({})

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrors({})

    const validation = validateLogin(loginId, password)

    if (!validation.valid) {
      setErrors({
        login_id: validation.errors.username || validation.errors.login_id,
        password: validation.errors.password,
      })
      return
    }

    try {
      await login({
        login_id: loginId.trim(),
        password,
      })
      toast.success('Welcome back!')
    } catch (error) {
      toast.error(extractErrorMessage(error))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login_id">Login ID or Email</Label>
        <Input
          id="login_id"
          type="text"
          value={loginId}
          onChange={(event) => setLoginId(event.target.value)}
          placeholder="Enter your username or email"
          disabled={isLoading}
          aria-invalid={!!errors.login_id}
        />
        {errors.login_id ? (
          <p className="text-sm text-red-600">{errors.login_id}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href={ROUTES.FORGOT_PASSWORD}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            disabled={isLoading}
            aria-invalid={!!errors.password}
            className="pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword((previous) => !previous)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {errors.password ? (
          <p className="text-sm text-red-600">{errors.password}</p>
        ) : null}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Spinner className="mr-2" /> : null}
        Sign In
      </Button>

      <div className="text-center text-sm text-slate-500">
        <Link href={ROUTES.FORGOT_ID} className="text-blue-600 hover:text-blue-800">
          Forgot your username?
        </Link>
      </div>

      <div className="text-center text-sm text-slate-500">
        Don&apos;t have an account?{' '}
        <Link href={ROUTES.SIGNUP} className="text-blue-600 hover:text-blue-800">
          Sign up
        </Link>
      </div>
    </form>
  )
}