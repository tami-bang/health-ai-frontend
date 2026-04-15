'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Search,
  Sparkles,
  Stethoscope,
  User,
  LogIn,
  UserPlus,
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  X,
} from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/constants/routes'
import { useAuth } from '@/hooks/use-auth'
import { canAccessAdmin } from '@/lib/constants/roles'

interface MobileDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const PUBLIC_ITEMS = [
  { label: 'Home', href: ROUTES.HOME, icon: Home },
  { label: 'Sign In', href: ROUTES.LOGIN, icon: LogIn },
  { label: 'Sign Up', href: ROUTES.SIGNUP, icon: UserPlus },
]

const USER_ITEMS = [
  { label: 'Home', href: ROUTES.HOME, icon: Home },
  { label: 'Search', href: ROUTES.SEARCH, icon: Search },
  { label: 'AI Summary', href: ROUTES.SEARCH_SUMMARY, icon: Sparkles },
  { label: 'Triage', href: ROUTES.TRIAGE, icon: Stethoscope },
  { label: 'My Profile', href: ROUTES.ME, icon: User },
]

const ADMIN_ITEMS = [
  { label: 'Dashboard', href: ROUTES.ADMIN, icon: LayoutDashboard },
  { label: 'Users', href: ROUTES.ADMIN_USERS, icon: Users },
  { label: 'Policies', href: ROUTES.ADMIN_POLICIES, icon: Settings },
  { label: 'Audit Logs', href: ROUTES.ADMIN_AUDIT_LOGS, icon: FileText },
  { label: 'My Profile', href: ROUTES.ADMIN_PROFILE, icon: User },
]

export function MobileDrawer({ open, onOpenChange }: MobileDrawerProps) {
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuth()

  const isAdmin = user?.role && canAccessAdmin(user.role)
  const isAdminSection = pathname.startsWith('/admin')

  const navItems = !isAuthenticated
    ? PUBLIC_ITEMS
    : isAdminSection && isAdmin
    ? ADMIN_ITEMS
    : USER_ITEMS

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-semibold text-sm">
                H
              </div>
              <span className="font-semibold text-slate-900">HealthAI</span>
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href ||
              (item.href !== ROUTES.HOME &&
                item.href !== ROUTES.ADMIN &&
                pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {isAuthenticated && isAdmin && !isAdminSection && (
          <div className="border-t border-slate-200 p-4">
            <Link
              href={ROUTES.ADMIN}
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 rounded-lg bg-slate-100 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <LayoutDashboard className="h-5 w-5" />
              Admin Console
            </Link>
          </div>
        )}

        {isAuthenticated && isAdminSection && (
          <div className="border-t border-slate-200 p-4">
            <Link
              href={ROUTES.SEARCH}
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 rounded-lg bg-slate-100 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <Search className="h-5 w-5" />
              User Portal
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
