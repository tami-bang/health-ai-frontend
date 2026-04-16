'use client'

import { useState } from 'react' // 용도: triage form 상태 관리
import { Plus, X, Stethoscope } from 'lucide-react' // 용도: 폼 아이콘 렌더링
import { Button } from '@/components/ui/button' // 용도: 공용 버튼 UI
import { Input } from '@/components/ui/input' // 용도: 증상/기간 입력 UI
import { Label } from '@/components/ui/label' // 용도: 입력 라벨 UI
import { Textarea } from '@/components/ui/textarea' // 용도: 추가 정보 입력 UI
import { Slider } from '@/components/ui/slider' // 용도: 증상 심각도 입력 UI
import { Spinner } from '@/components/ui/spinner' // 용도: 제출 중 로딩 표시
import { Badge } from '@/components/ui/badge' // 용도: 등록된 증상 태그 UI
import { triageApi } from '@/lib/api/triage-api' // 용도: triage API 호출
import { validateTriageSymptoms } from '@/lib/validators/search-validator' // 용도: 증상 입력 검증
import { extractErrorMessage } from '@/lib/utils/response' // 용도: 에러 메시지 정규화
import type { TriageResponse } from '@/types/triage' // 용도: triage 응답 타입
import { toast } from 'sonner' // 용도: 에러 토스트 표시

interface TriageFormProps {
  onResult: (result: TriageResponse) => void
}

function getTrimmedSymptom(symptom: string) {
  return symptom.trim()
}

function canAddSymptom(symptoms: string[], currentSymptom: string) {
  const trimmedSymptom = getTrimmedSymptom(currentSymptom)
  if (!trimmedSymptom) {
    return false
  }

  return !symptoms.includes(trimmedSymptom)
}

function buildNextSymptoms(symptoms: string[], currentSymptom: string) {
  const trimmedSymptom = getTrimmedSymptom(currentSymptom)
  if (!trimmedSymptom) {
    return symptoms
  }

  return [...symptoms, trimmedSymptom]
}

function buildSubmitDisabled(isLoading: boolean, symptoms: string[]) {
  return isLoading || symptoms.length === 0
}

function buildDurationValue(duration: string) {
  return duration || undefined
}

function buildAdditionalInfoValue(additionalInfo: string) {
  return additionalInfo || undefined
}

function buildSpinnerVisibilityClass(isLoading: boolean) {
  return isLoading ? 'opacity-100' : 'opacity-0'
}

function buildIconVisibilityClass(isLoading: boolean) {
  return isLoading ? 'opacity-0' : 'opacity-100'
}

function renderSubmitIcon(isLoading: boolean) {
  return (
    <span className="mr-2 relative inline-flex h-4 w-4 items-center justify-center">
      <Spinner
        className={`absolute h-4 w-4 ${buildSpinnerVisibilityClass(isLoading)}`}
        aria-hidden={!isLoading}
      />
      <Stethoscope
        className={`absolute h-4 w-4 ${buildIconVisibilityClass(isLoading)}`}
        aria-hidden={isLoading}
      />
    </span>
  )
}

export function TriageForm({ onResult }: TriageFormProps) {
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [currentSymptom, setCurrentSymptom] = useState('')
  const [duration, setDuration] = useState('')
  const [severity, setSeverity] = useState([5])
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addSymptom = () => {
    if (!canAddSymptom(symptoms, currentSymptom)) {
      return
    }

    setSymptoms(buildNextSymptoms(symptoms, currentSymptom))
    setCurrentSymptom('')
  }

  const removeSymptom = (index: number) => {
    setSymptoms(symptoms.filter((_, symptomIndex) => symptomIndex !== index))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') {
      return
    }

    e.preventDefault()
    addSymptom()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const validation = validateTriageSymptoms(symptoms)
    if (!validation.valid) {
      setError(validation.errors.symptoms)
      return
    }

    setIsLoading(true)

    try {
      const response = await triageApi.submitTriage({
        symptoms,
        duration: buildDurationValue(duration),
        severity: severity[0],
        additional_info: buildAdditionalInfoValue(additionalInfo),
      })
      onResult(response)
    } catch (err) {
      const message = extractErrorMessage(err)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" translate="no">
      <div className="space-y-3">
        <Label className="text-base font-medium">
          What symptoms are you experiencing?
        </Label>

        <div className="flex gap-2">
          <Input
            value={currentSymptom}
            onChange={(e) => setCurrentSymptom(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a symptom (e.g., headache, fever)"
            disabled={isLoading}
          />

          <Button
            type="button"
            variant="outline"
            onClick={addSymptom}
            disabled={!canAddSymptom(symptoms, currentSymptom) || isLoading}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {symptoms.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {symptoms.map((symptom, index) => (
              <Badge
                key={`${symptom}-${index}`}
                variant="secondary"
                className="gap-1 pl-3 pr-1.5 py-1.5"
              >
                {symptom}
                <button
                  type="button"
                  onClick={() => removeSymptom(index)}
                  className="ml-1 transition-colors hover:text-red-600"
                  disabled={isLoading}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      <div className="space-y-3">
        <Label htmlFor="duration" className="text-base font-medium">
          How long have you had these symptoms?
        </Label>

        <Input
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="e.g., 2 days, 1 week, a few hours"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-3">
        <Label className="text-base font-medium">
          How severe are your symptoms? (1-10)
        </Label>

        <div className="px-2">
          <Slider
            value={severity}
            onValueChange={setSeverity}
            max={10}
            min={1}
            step={1}
            disabled={isLoading}
          />

          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span>Mild</span>
            <span className="font-medium text-slate-700">
              Current: {severity[0]}
            </span>
            <span>Severe</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="additionalInfo" className="text-base font-medium">
          Any additional information?
        </Label>

        <Textarea
          id="additionalInfo"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          placeholder="Include any relevant details: medications, medical history, allergies..."
          className="min-h-[100px]"
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={buildSubmitDisabled(isLoading, symptoms)}
      >
        {renderSubmitIcon(isLoading)}
        <span>Assess Symptoms</span>
      </Button>
    </form>
  )
}