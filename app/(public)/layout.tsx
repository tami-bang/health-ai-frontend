import { AppShell } from '@/components/layout/app-shell'
import { PublicSidebar } from '@/components/layout/public-sidebar'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppShell sidebar={<PublicSidebar />}>
      {children}
    </AppShell>
  )
}
