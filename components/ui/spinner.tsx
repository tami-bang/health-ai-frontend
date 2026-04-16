import { Loader2Icon } from 'lucide-react' // 용도: 로딩 아이콘 렌더링
import { cn } from '@/lib/utils' // 용도: className 병합

interface SpinnerProps extends React.ComponentProps<'svg'> {}

function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  )
}

export { Spinner }