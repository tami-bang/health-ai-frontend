'use client'

import Link from 'next/link' // 용도: 사용자 메뉴 라우팅 링크 렌더링
import { usePathname } from 'next/navigation' // 용도: 현재 경로 기반 활성 메뉴 판별
import { Search, Sparkles, Stethoscope, User, Home } from 'lucide-react' // 용도: 사이드바 메뉴 아이콘 표시
import { cn } from '@/lib/utils' // 용도: 조건부 className 병합
import { ROUTES } from '@/lib/constants/routes' // 용도: 사용자 라우트 상수 사용

const NAV_ITEMS = [
  { label: 'Home', href: ROUTES.HOME, icon: Home },
  { label: 'Search', href: ROUTES.SEARCH, icon: Search },
  { label: 'AI Summary', href: ROUTES.SEARCH_SUMMARY, icon: Sparkles },
  { label: 'Triage', href: ROUTES.TRIAGE, icon: Stethoscope },
  { label: 'My Profile', href: ROUTES.ME, icon: User },
]

function isSidebarItemActive(pathname: string, href: string): boolean {
  if (href === ROUTES.HOME) {
    return pathname === href
  }

  return pathname === href || pathname.startsWith(href)
}

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
            const isActive = isSidebarItemActive(pathname, item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ease-out active:scale-[0.985]',
                  isActive
                    ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm',
                )}
              >
                <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-105" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="border-t border-slate-200 p-4">
        <div className="rounded-lg bg-teal-50 p-3 shadow-sm transition-all duration-200 hover:shadow-md">
          <p className="text-xs text-teal-800">
            Need immediate help? Use our Triage tool to assess your symptoms.
          </p>
          <Link
            href={ROUTES.TRIAGE}
            className="mt-2 inline-flex items-center text-xs font-medium text-teal-700 transition-colors duration-200 hover:text-teal-900"
          >
            Start Assessment &rarr;
          </Link>
        </div>
      </div>
    </aside>
  )
}