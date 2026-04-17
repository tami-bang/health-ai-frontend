'use client'

import { useState } from 'react' // 용도: triage 결과 상태 관리
import { PageContainer, PageHeader } from '@/components/layout/page-container' // 용도: 페이지 레이아웃
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card' // 용도: 카드 UI
import { TriageForm } from '@/components/triage/triage-form' // 용도: triage 입력 폼
import { TriageResultCard } from '@/components/triage/triage-result-card' // 용도: triage 결과 카드
import type { TriageResponse } from '@/types/triage' // 용도: triage 응답 타입

export default function TriagePage() {
  const [result, setResult] = useState<TriageResponse | null>(null)

  const handleReset = () => {
    setResult(null)
  }

  return (
    <PageContainer>
      <PageHeader
        title="Symptom Urgency Assessment"
        description="Understand how urgent your symptoms may be and what to do next"
      />

      {!result ? (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Check Your Symptoms</CardTitle>
                <CardDescription>
                  Enter your symptoms to get a quick urgency assessment and guidance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TriageForm onResult={setResult} />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600 space-y-3">
                <p>1. Enter your symptoms</p>
                <p>2. Add context like duration and severity</p>
                <p>3. Get urgency level and next steps</p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-red-900">Emergency Warning</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-red-800">
                If symptoms are life-threatening, call emergency services immediately.
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <TriageResultCard result={result} onReset={handleReset} />
      )}
    </PageContainer>
  )
}