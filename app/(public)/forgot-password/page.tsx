import { Metadata } from 'next'
import Link from 'next/link'
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'
import { PageContainer } from '@/components/layout/page-container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES } from '@/lib/constants/routes'

export const metadata: Metadata = {
  title: 'Forgot Password - HealthAI',
  description: 'Reset your HealthAI password',
}

export default function ForgotPasswordPage() {
  return (
    <PageContainer className="flex min-h-[calc(100vh-200px)] items-center justify-center">
      <Card className="w-full max-w-md border-slate-200">
        <CardHeader className="text-center">
          <Link href={ROUTES.HOME} className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-xl">
            H
          </Link>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your email address and we&apos;ll send you a reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </PageContainer>
  )
}
