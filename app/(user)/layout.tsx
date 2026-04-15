import { AppShell } from '@/components/layout/app-shell'
import { UserSidebar } from '@/components/layout/user-sidebar'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppShell sidebar={<UserSidebar />}>
      {children}
    </AppShell>
  )
}
