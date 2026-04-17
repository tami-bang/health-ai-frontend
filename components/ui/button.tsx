import * as React from 'react' // 용도: React 컴포넌트 타입 및 forward 처리
import { Slot } from '@radix-ui/react-slot' // 용도: asChild 패턴 지원
import { cva, type VariantProps } from 'class-variance-authority' // 용도: 버튼 variant class 관리
import { Spinner } from '@/components/ui/spinner' // 용도: 공통 버튼 로딩 상태 표시
import { cn } from '@/lib/utils' // 용도: className 병합

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium shadow-xs transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-60 disabled:shadow-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] active:scale-[0.985] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive enabled:cursor-pointer",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-sm',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 hover:shadow-sm focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background hover:bg-accent hover:text-accent-foreground hover:shadow-sm dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-sm',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline shadow-none hover:shadow-none',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type NativeButtonProps = React.ComponentProps<'button'>

interface ButtonProps extends NativeButtonProps, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
}

function renderButtonChildren(
  children: React.ReactNode,
  isLoading: boolean,
  loadingText?: string,
) {
  if (!isLoading) {
    return children
  }

  return (
    <>
      <Spinner className="h-4 w-4" />
      {loadingText || children}
    </>
  )
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  loadingText,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  const isDisabled = Boolean(disabled || isLoading)

  return (
    <Comp
      data-slot="button"
      data-loading={isLoading ? 'true' : 'false'}
      aria-busy={isLoading}
      aria-disabled={isDisabled}
      className={cn(
        buttonVariants({ variant, size }),
        isLoading && 'cursor-wait',
        className,
      )}
      disabled={asChild ? undefined : isDisabled}
      {...props}
    >
      {renderButtonChildren(children, isLoading, loadingText)}
    </Comp>
  )
}

export { Button, buttonVariants }