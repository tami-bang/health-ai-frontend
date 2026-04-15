import Link from 'next/link' // 용도: 페이지 이동
import { AlertTriangle, AlertCircle, Clock, CheckCircle, Heart, ArrowRight } from 'lucide-react' // 용도: 아이콘
import { cn } from '@/lib/utils' // 용도: class 병합
import { TRIAGE_COLORS } from '@/lib/constants/theme' // 용도: 색상 매핑
import { ROUTES } from '@/lib/constants/routes' // 용도: 라우팅
import type { SearchGuidance, TriageLevel } from '@/types/search' // 용도: 타입

interface GuidanceBannerProps {
  guidance: SearchGuidance
}

const TRIAGE_ICONS: Record<TriageLevel, typeof AlertTriangle> = {
  emergency: AlertTriangle,
  urgent: AlertCircle,
  moderate: Clock,
  low: CheckCircle,
  self_care: Heart,
}

const DEFAULT_CONFIG = {
  bg: 'bg-slate-50',
  border: 'border-slate-200',
  text: 'text-slate-800',
  label: 'Info',
}

function resolveTriageLevel(level: unknown): TriageLevel | null {
  if (typeof level !== 'string') return null

  const normalized = level.toLowerCase().trim()

  const allowed: TriageLevel[] = [
    'emergency',
    'urgent',
    'moderate',
    'low',
    'self_care',
  ]

  return allowed.includes(normalized as TriageLevel)
    ? (normalized as TriageLevel)
    : null
}

export function GuidanceBanner({ guidance }: GuidanceBannerProps) {
  const safeLevel = resolveTriageLevel(guidance?.triage_level)

  const config = safeLevel
    ? TRIAGE_COLORS[safeLevel] ?? DEFAULT_CONFIG
    : DEFAULT_CONFIG

  const Icon = safeLevel
    ? TRIAGE_ICONS[safeLevel]
    : AlertCircle

  const isEmergency = safeLevel === 'emergency'
  const isUrgent = safeLevel === 'urgent'

  return (
    <div
      className={cn(
        'rounded-lg border p-4',
        config.bg,
        config.border
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'rounded-full p-2',
            isEmergency || isUrgent ? 'bg-white/50' : 'bg-white'
          )}
        >
          <Icon className={cn('h-5 w-5', config.text)} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn('font-semibold', config.text)}>
              {config.label ?? 'Guidance'}
            </span>
          </div>

          <p className={cn('mt-1 text-sm', config.text)}>
            {guidance?.triage_message ?? 'No guidance available'}
          </p>

          {(isEmergency || isUrgent) && (
            <Link
              href={ROUTES.TRIAGE}
              className={cn(
                'mt-3 inline-flex items-center gap-1 text-sm font-medium',
                config.text,
                'hover:underline'
              )}
            >
              Get detailed assessment
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}