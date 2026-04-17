'use client'

import { useState } from 'react' // 용도: 모바일 드로어 열림 상태 관리
import { AppHeader } from './app-header' // 용도: 상단 헤더 렌더링
import { AppFooter } from './app-footer' // 용도: 하단 푸터 렌더링
import { MobileDrawer } from './mobile-drawer' // 용도: 모바일 메뉴 드로어 렌더링

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
        showMenuButton={Boolean(sidebar)}
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