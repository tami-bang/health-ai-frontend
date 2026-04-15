import { Metadata } from 'next'
import Link from 'next/link'
import { SignupForm } from '@/components/auth/signup-form'
import { PageContainer } from '@/components/layout/page-container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES } from '@/lib/constants/routes'

export const metadata: Metadata = {
  title: 'Sign Up - HealthAI',
  description: 'Create a new HealthAI account',
}

export default function SignupPage() {
  // In a real app, this would be fetched from the API/policy settings
  const signupEnabled = true

  return (
    <PageContainer className="flex min-h-[calc(100vh-200px)] items-center justify-center py-8">
      <Card className="w-full max-w-md border-slate-200">
        <CardHeader className="text-center">
          <Link href={ROUTES.HOME} className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-xl">
            H
          </Link>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            {signupEnabled
              ? 'Sign up for a free account to get started'
              : 'Account registration information'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm signupEnabled={signupEnabled} />
        </CardContent>
      </Card>
    </PageContainer>
  )
}
