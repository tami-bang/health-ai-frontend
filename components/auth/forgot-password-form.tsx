'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { authApi } from '@/lib/api/auth-api'
import { validateEmail } from '@/lib/validators/auth-validator'
import { ROUTES } from '@/lib/constants/routes'
import { extractErrorMessage } from '@/lib/utils/response'
import { toast } from 'sonner'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const validation = validateEmail(email)
    if (!validation.valid) {
      setErrors(validation.errors)
      return
    }

    setIsLoading(true)
    try {
      await authApi.forgotPassword({ email })
      setIsSubmitted(true)
      toast.success('Check your email for reset instructions')
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Email Sent</h3>
        <p className="mt-2 text-sm text-slate-600">
          If an account exists with that email, we&apos;ve sent password reset instructions.
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
        <Label htmlFor="email">Email Address</Label>
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
        <p className="text-sm text-slate-500">
          We&apos;ll send a password reset link to this email address.
        </p>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Spinner className="mr-2" /> : null}
        Send Reset Link
      </Button>

      <div className="text-center text-sm text-slate-500">
        Remember your password?{' '}
        <Link href={ROUTES.LOGIN} className="text-blue-600 hover:text-blue-800">
          Sign in
        </Link>
      </div>
    </form>
  )
}
