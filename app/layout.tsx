import type { Metadata } from 'next' // 용도: 메타데이터 정의
import { Geist, Geist_Mono } from 'next/font/google' // 용도: 폰트 설정
import { Analytics } from '@vercel/analytics/next' // 용도: 분석 도구
import AppProviders from './providers' // 용도: 전역 세션 초기화
import './globals.css' // 용도: 글로벌 스타일

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HealthAI',
  description: 'AI Health Search Service',
  other: {
    google: 'notranslate',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

function renderAnalytics() {
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return <Analytics />
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en" translate="no" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <AppProviders>
          {children}
        </AppProviders>

        {renderAnalytics()}
      </body>
    </html>
  )
}