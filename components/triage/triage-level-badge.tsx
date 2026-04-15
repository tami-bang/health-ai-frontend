import { cn } from '@/lib/utils'
import { TRIAGE_COLORS } from '@/lib/constants/theme'
import type { TriageLevel } from '@/types/search'

interface TriageLevelBadgeProps {
  level: TriageLevel
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function TriageLevelBadge({
  level,
  size = 'md',
  className,
}: TriageLevelBadgeProps) {
  const config = TRIAGE_COLORS[level]

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base font-semibold',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        config.bg,
        config.text,
        sizeClasses[size],
        className
      )}
    >
      {config.label}
    </span>
  )
}
