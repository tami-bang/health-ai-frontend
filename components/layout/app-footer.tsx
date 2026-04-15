import Link from 'next/link'

export function AppFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-white text-xs font-semibold">
              H
            </div>
            <span className="text-sm font-medium text-slate-700">HealthAI</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-900 transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-slate-900 transition-colors">
              Contact
            </Link>
          </nav>

          <p className="text-sm text-slate-500">
            &copy; {currentYear} HealthAI. All rights reserved.
          </p>
        </div>

        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="text-center text-xs text-slate-400">
            This service provides general health information for educational purposes only.
            It is not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </footer>
  )
}
