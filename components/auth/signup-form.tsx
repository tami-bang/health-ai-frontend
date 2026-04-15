'use client'

import { useState } from 'react' // 용도: 회원가입 폼 상태 관리
import Link from 'next/link' // 용도: 로그인 페이지 이동 링크
import { useRouter } from 'next/navigation' // 용도: 회원가입 완료 후 페이지 이동
import { Eye, EyeOff } from 'lucide-react' // 용도: 비밀번호 표시 토글 아이콘
import { Button } from '@/components/ui/button' // 용도: 제출 버튼 UI
import { Input } from '@/components/ui/input' // 용도: 입력 필드 UI
import { Label } from '@/components/ui/label' // 용도: 입력 라벨 UI
import { Spinner } from '@/components/ui/spinner' // 용도: 로딩 상태 표시
import { useAuth } from '@/hooks/use-auth' // 용도: 회원가입 액션 호출
import { validateSignup } from '@/lib/validators/auth-validator' // 용도: 회원가입 입력값 검증
import { ROUTES } from '@/lib/constants/routes' // 용도: 공통 라우트 참조
import { extractErrorMessage } from '@/lib/utils/response' // 용도: API 에러 메시지 추출
import { toast } from 'sonner' // 용도: 사용자 알림 표시

interface SignupFormProps {
  signupEnabled?: boolean
}

export function SignupForm({ signupEnabled = true }: SignupFormProps) {
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})

    const validation = validateSignup(username, email, password, passwordConfirm)
    if (!validation.valid) {
      setErrors(validation.errors)
      return
    }

    try {
      await signup({
        username: username.trim(),
        email: email.trim(),
        password,
        confirm_password: passwordConfirm,
        full_name: '',
      })

      toast.success('Account created successfully.')
      router.push(ROUTES.LOGIN)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message || 'Failed to create account.')
    }
  }

  if (!signupEnabled) {
    return (
      <div className="rounded-lg bg-slate-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-slate-900">
          Registration Currently Closed
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          New account registration is currently managed by administrators.
          Please contact your organization administrator to request an account.
        </p>
        <Link
          href={ROUTES.LOGIN}
          className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-800"
        >
          Back to Sign In
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choose a username"
          disabled={isLoading}
          aria-invalid={!!errors.username}
        />
        {errors.username && (
          <p className="text-sm text-red-600">{errors.username}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={isLoading}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            disabled={isLoading}
            aria-invalid={!!errors.password}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="passwordConfirm">Confirm Password</Label>
        <Input
          id="passwordConfirm"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="Confirm your password"
          disabled={isLoading}
          aria-invalid={!!errors.passwordConfirm}
        />
        {errors.passwordConfirm && (
          <p className="text-sm text-red-600">{errors.passwordConfirm}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Spinner className="mr-2" /> : null}
        Create Account
      </Button>

      <div className="text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link href={ROUTES.LOGIN} className="text-blue-600 hover:text-blue-800">
          Sign in
        </Link>
      </div>
    </form>
  )
}