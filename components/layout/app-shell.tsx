'use client'

import { useState } from 'react'
import { AppHeader } from './app-header'
import { AppFooter } from './app-footer'
import { MobileDrawer } from './mobile-drawer'

interface AppShellProps {
  children: React.ReactNode
  sidebar?: React.ReactNode
  showFooter?: boolean
}

export function AppShell({ children, sidebar, showFooter = true }: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <AppHeader
        onMenuClick={() => setDrawerOpen(true)}
        showMenuButton={!!sidebar}
      />

      <div className="flex flex-1">
        {sidebar}
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>

      {showFooter && <AppFooter />}

      <MobileDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  )
}
