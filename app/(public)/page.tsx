import Link from 'next/link'
import { Search, Stethoscope, Shield, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PageContainer } from '@/components/layout/page-container'
import { ROUTES } from '@/lib/constants/routes'

const FEATURES = [
  {
    icon: Search,
    title: 'Symptom Search',
    description: 'Search our comprehensive database of health information based on your symptoms.',
  },
  {
    icon: Stethoscope,
    title: 'AI-Powered Triage',
    description: 'Get an initial assessment of your symptoms with our intelligent triage system.',
  },
  {
    icon: Shield,
    title: 'Evidence-Based',
    description: 'All information is sourced from trusted medical databases and peer-reviewed research.',
  },
  {
    icon: Clock,
    title: 'Available 24/7',
    description: 'Access health information anytime, anywhere, on any device.',
  },
]

export default function HomePage() {
  return (
    <PageContainer maxWidth="xl">
      {/* Hero Section */}
      <section className="py-8 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl text-balance">
            Your Trusted Health Information Assistant
          </h1>
          <p className="mt-4 text-lg text-slate-600 md:text-xl text-pretty">
            Get reliable health information, symptom assessments, and personalized guidance
            powered by advanced AI technology.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href={ROUTES.SEARCH}>
                <Search className="mr-2 h-5 w-5" />
                Start Searching
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={ROUTES.TRIAGE}>
                <Stethoscope className="mr-2 h-5 w-5" />
                Check Symptoms
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-8 md:py-12">
        <h2 className="mb-8 text-center text-2xl font-semibold text-slate-900">
          How We Help You
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="border-slate-200">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-12">
        <Card className="border-slate-200 bg-gradient-to-br from-blue-50 to-teal-50">
          <CardContent className="py-8 text-center md:py-12">
            <h2 className="text-2xl font-semibold text-slate-900">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-slate-600">
              Create a free account to access personalized health insights, save your search history,
              and get the most out of our platform.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link href={ROUTES.SIGNUP}>
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href={ROUTES.LOGIN}>Sign In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-slate-200 py-6">
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-center text-sm text-slate-500">
            <strong className="text-slate-700">Important Notice:</strong> HealthAI provides general health
            information for educational purposes only. It is not intended as a substitute for professional
            medical advice, diagnosis, or treatment. Always seek the advice of your physician or other
            qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </div>
      </section>
    </PageContainer>
  )
}
