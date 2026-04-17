'use client'

import Link from 'next/link' // 용도: 헤더 로고 및 메뉴 링크 이동
import { Menu, LogOut, User, Settings, ChevronDown } from 'lucide-react' // 용도: 헤더 액션 아이콘 표시
import { Button } from '@/components/ui/button' // 용도: 헤더 버튼 공통 UI 사용
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu' // 용도: 사용자 메뉴 드롭다운 렌더링
import { Badge } from '@/components/ui/badge' // 용도: 사용자 역할 뱃지 표시
import { useAuth } from '@/hooks/use-auth' // 용도: 인증 사용자 및 로그아웃 액션 사용
import { ROUTES } from '@/lib/constants/routes' // 용도: 라우트 상수 사용
import { ROLE_COLORS } from '@/lib/constants/theme' // 용도: 역할별 뱃지 색상 사용
import { ROLES, canAccessAdmin } from '@/lib/constants/roles' // 용도: 역할 라벨 및 관리자 접근 판별
import { cn } from '@/lib/utils' // 용도: 조건부 className 병합

interface AppHeaderProps {
  onMenuClick?: () => void
  showMenuButton?: boolean
}

export function AppHeader({ onMenuClick, showMenuButton = true }: AppHeaderProps) {
  const { user, isAuthenticated, logout } = useAuth()
  const roleColor = user?.role ? ROLE_COLORS[user.role] : null

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-14 items-center gap-4 px-4 md:h-16 md:px-6">
        {showMenuButton && (
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 md:hidden"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        <Link
          href={ROUTES.HOME}
          className="group flex items-center gap-2 rounded-md px-1 py-1 transition-all duration-200 hover:bg-slate-50"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-semibold text-white transition-transform duration-200 group-hover:scale-105">
            H
          </div>
          <span className="hidden font-semibold text-slate-900 sm:inline-block">
            HealthAI
          </span>
        </Link>

        <div className="flex-1" />

        {isAuthenticated && user ? (
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className={cn(
                'hidden text-xs font-medium sm:inline-flex',
                roleColor?.bg,
                roleColor?.text,
              )}
            >
              {ROLES[user.role]?.label || user.role}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-medium text-slate-700 transition-colors duration-200 group-hover:bg-slate-200">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden max-w-[100px] truncate text-sm font-medium md:inline-block">
                    {user.username}
                  </span>
                  <ChevronDown className="h-4 w-4 text-slate-500 transition-transform duration-200" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium text-slate-900">{user.username}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link
                    href={canAccessAdmin(user.role) ? ROUTES.ADMIN_PROFILE : ROUTES.ME}
                    className="flex items-center"
                  >
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </Link>
                </DropdownMenuItem>

                {canAccessAdmin(user.role) && (
                  <DropdownMenuItem asChild>
                    <Link href={ROUTES.ADMIN} className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Admin Console
                    </Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href={ROUTES.LOGIN}>Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={ROUTES.SIGNUP}>Get Started</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}