'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Sparkles, Stethoscope, User, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/constants/routes'

const NAV_ITEMS = [
  { label: 'Home', href: ROUTES.HOME, icon: Home },
  { label: 'Search', href: ROUTES.SEARCH, icon: Search },
  { label: 'AI Summary', href: ROUTES.SEARCH_SUMMARY, icon: Sparkles },
  { label: 'Triage', href: ROUTES.TRIAGE, icon: Stethoscope },
  { label: 'My Profile', href: ROUTES.ME, icon: User },
]

export function UserSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white md:block">
      <div className="p-4">
        <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Health Services
        </h2>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || 
              (item.href !== ROUTES.HOME && pathname.startsWith(item.href))

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
        <div className="rounded-lg bg-teal-50 p-3">
          <p className="text-xs text-teal-800">
            Need immediate help? Use our Triage tool to assess your symptoms.
          </p>
          <Link
            href={ROUTES.TRIAGE}
            className="mt-2 inline-block text-xs font-medium text-teal-700 hover:text-teal-900"
          >
            Start Assessment &rarr;
          </Link>
        </div>
      </div>
    </aside>
  )
}
