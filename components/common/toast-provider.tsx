'use client'

import { Toaster } from '@/components/ui/sonner'

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        classNames: {
          toast: 'bg-white border-slate-200 text-slate-900',
          title: 'text-slate-900 font-medium',
          description: 'text-slate-500',
          actionButton: 'bg-blue-600 text-white',
          cancelButton: 'bg-slate-100 text-slate-600',
          error: 'bg-red-50 border-red-200 text-red-900',
          success: 'bg-green-50 border-green-200 text-green-900',
          warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
          info: 'bg-blue-50 border-blue-200 text-blue-900',
        },
      }}
    />
  )
}
