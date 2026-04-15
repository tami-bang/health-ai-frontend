import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { ResetPasswordForm } from '@/components/auth/reset-password-form'
import { PageContainer } from '@/components/layout/page-container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormSkeleton } from '@/components/common/loading-skeleton'
import { ROUTES } from '@/lib/constants/routes'

export const metadata: Metadata = {
  title: 'Reset Password - HealthAI',
  description: 'Set your new HealthAI password',
}

export default function ResetPasswordPage() {
  return (
    <PageContainer className="flex min-h-[calc(100vh-200px)] items-center justify-center">
      <Card className="w-full max-w-md border-slate-200">
        <CardHeader className="text-center">
          <Link href={ROUTES.HOME} className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-xl">
            H
          </Link>
          <CardTitle className="text-2xl">Set New Password</CardTitle>
          <CardDescription>
            Create a new password for your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<FormSkeleton />}>
            <ResetPasswordForm />
          </Suspense>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
