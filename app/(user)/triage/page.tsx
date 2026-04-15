'use client'

import { useState } from 'react'
import { PageContainer, PageHeader } from '@/components/layout/page-container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TriageForm } from '@/components/triage/triage-form'
import { TriageResultCard } from '@/components/triage/triage-result-card'
import type { TriageResponse } from '@/types/triage'

export default function TriagePage() {
  const [result, setResult] = useState<TriageResponse | null>(null)

  const handleReset = () => {
    setResult(null)
  }

  return (
    <PageContainer>
      <PageHeader
        title="Symptom Triage"
        description="Get an initial assessment of your symptoms to help determine the urgency of care needed"
      />

      {!result ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Symptom Assessment</CardTitle>
                <CardDescription>
                  Enter your symptoms and we&apos;ll help you understand what level of care
                  may be appropriate.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TriageForm onResult={setResult} />
              </CardContent>
            </Card>
          </div>

          {/* Info Panel */}
          <div className="space-y-4">
            <Card className="border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600 space-y-3">
                <p>
                  1. Enter the symptoms you&apos;re experiencing
                </p>
                <p>
                  2. Provide additional context like duration and severity
                </p>
                <p>
                  3. Receive a personalized assessment with recommendations
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-red-900">Emergency Warning</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-red-800">
                <p>
                  If you are experiencing chest pain, difficulty breathing, severe
                  bleeding, or other life-threatening symptoms, please call emergency
                  services (911) immediately.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Triage Levels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="text-sm text-slate-700">Emergency - Seek immediate care</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-orange-500" />
                  <span className="text-sm text-slate-700">Urgent - See provider within 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="text-sm text-slate-700">Moderate - Schedule appointment</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-sm text-slate-700">Low - Monitor symptoms</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-teal-500" />
                  <span className="text-sm text-slate-700">Self Care - Home remedies</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <TriageResultCard result={result} onReset={handleReset} />
      )}

      {/* Disclaimer */}
      <div className="mt-8 rounded-lg bg-slate-50 p-4">
        <p className="text-center text-xs text-slate-500">
          <strong className="text-slate-600">Important:</strong> This triage tool provides
          general guidance only and is not a substitute for professional medical advice,
          diagnosis, or treatment. Always seek the advice of your physician or other
          qualified health provider with any questions you may have.
        </p>
      </div>
    </PageContainer>
  )
}
