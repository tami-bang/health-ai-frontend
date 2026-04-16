import { cn } from '@/lib/utils' // 용도: className 병합
import { getTriageConfig } from '@/lib/utils/triage' // 용도: 백엔드/프론트 triage level 정규화 및 스타일 조회
import type { TriageLevel } from '@/types/search' // 용도: 기존 프론트 triage level 타입 호환
import type { ExtendedTriageLevel } from '@/types/triage' // 용도: 백엔드 triage level 타입 호환

interface TriageLevelBadgeProps {
  level: ExtendedTriageLevel | TriageLevel
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

function getSizeClasses(size: NonNullable<TriageLevelBadgeProps['size']>) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base font-semibold',
  }

  return sizeClasses[size]
}

export function TriageLevelBadge({
  level,
  size = 'md',
  className,
}: TriageLevelBadgeProps) {
  const config = getTriageConfig(level)

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        config.bg,
        config.text,
        getSizeClasses(size),
        className
      )}
    >
      {config.label}
    </span>
  )
}