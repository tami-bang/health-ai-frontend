'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  User,
  ArrowLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/constants/routes'
import { useAuth } from '@/hooks/use-auth'
import { canManageUsers, canEditPolicies } from '@/lib/constants/roles'

export function AdminSidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  const navItems = [
    {
      label: 'Dashboard',
      href: ROUTES.ADMIN,
      icon: LayoutDashboard,
      show: true,
    },
    {
      label: 'Users',
      href: ROUTES.ADMIN_USERS,
      icon: Users,
      show: true,
    },
    {
      label: 'Policies',
      href: ROUTES.ADMIN_POLICIES,
      icon: Settings,
      show: true,
    },
    {
      label: 'Audit Logs',
      href: ROUTES.ADMIN_AUDIT_LOGS,
      icon: FileText,
      show: true,
    },
    {
      label: 'My Profile',
      href: ROUTES.ADMIN_PROFILE,
      icon: User,
      show: true,
    },
  ]

  const canCreate = user?.role ? canManageUsers(user.role) : false
  const canEdit = user?.role ? canEditPolicies(user.role) : false

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white md:block">
      <div className="p-4">
        <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Admin Console
        </h2>
        <nav className="flex flex-col gap-1">
          {navItems.filter(item => item.show).map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href ||
              (item.href !== ROUTES.ADMIN && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
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
      </div>

      <div className="border-t border-slate-200 p-4">
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-xs text-slate-600">
            {canCreate && canEdit
              ? 'Full admin access enabled'
              : canCreate
              ? 'User management enabled'
              : 'View-only access'}
          </p>
        </div>
      </div>

      <div className="border-t border-slate-200 p-4">
        <Link
          href={ROUTES.SEARCH}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to User Portal
        </Link>
      </div>
    </aside>
  )
}
