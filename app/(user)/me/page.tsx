import { Metadata } from 'next'
import { PageContainer, PageHeader } from '@/components/layout/page-container'
import { ProfileForm } from '@/components/auth/profile-form'

export const metadata: Metadata = {
  title: 'My Profile - HealthAI',
  description: 'Manage your HealthAI account settings',
}

export default function ProfilePage() {
  return (
    <PageContainer maxWidth="lg">
      <PageHeader
        title="My Profile"
        description="Manage your account settings and preferences"
      />
      <ProfileForm />
    </PageContainer>
  )
}
