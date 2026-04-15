'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LogIn, UserPlus, Search, Stethoscope } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/constants/routes'

const NAV_ITEMS = [
  { label: 'Home', href: ROUTES.HOME, icon: Home },
  { label: 'Search', href: ROUTES.SEARCH, icon: Search },
  { label: 'Triage', href: ROUTES.TRIAGE, icon: Stethoscope },
  { label: 'Sign In', href: ROUTES.LOGIN, icon: LogIn },
  { label: 'Sign Up', href: ROUTES.SIGNUP, icon: UserPlus },
]

export function PublicSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white md:block">
      <nav className="flex flex-col gap-1 p-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

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
    </aside>
  )
}
