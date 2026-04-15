'use client'

import Link from 'next/link'
import { Menu, LogOut, User, Settings, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/use-auth'
import { ROUTES } from '@/lib/constants/routes'
import { ROLE_COLORS } from '@/lib/constants/theme'
import { ROLES, canAccessAdmin } from '@/lib/constants/roles'
import { cn } from '@/lib/utils'

interface AppHeaderProps {
  onMenuClick?: () => void
  showMenuButton?: boolean
}

export function AppHeader({ onMenuClick, showMenuButton = true }: AppHeaderProps) {
  const { user, isAuthenticated, logout } = useAuth()

  const roleColor = user?.role ? ROLE_COLORS[user.role] : null

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white">
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

        <Link href={ROUTES.HOME} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-semibold text-sm">
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
                roleColor?.text
              )}
            >
              {ROLES[user.role]?.label || user.role}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-medium text-slate-700">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden max-w-[100px] truncate text-sm font-medium md:inline-block">
                    {user.username}
                  </span>
                  <ChevronDown className="h-4 w-4 text-slate-500" />
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
