'use client'

import { useState } from 'react'
import { Plus, X, Stethoscope } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Spinner } from '@/components/ui/spinner'
import { Badge } from '@/components/ui/badge'
import { triageApi } from '@/lib/api/triage-api'
import { validateTriageSymptoms } from '@/lib/validators/search-validator'
import { extractErrorMessage } from '@/lib/utils/response'
import type { TriageResponse } from '@/types/triage'
import { toast } from 'sonner'

interface TriageFormProps {
  onResult: (result: TriageResponse) => void
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
    if (currentSymptom.trim() && !symptoms.includes(currentSymptom.trim())) {
      setSymptoms([...symptoms, currentSymptom.trim()])
      setCurrentSymptom('')
    }
  }

  const removeSymptom = (index: number) => {
    setSymptoms(symptoms.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSymptom()
    }
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
        duration: duration || undefined,
        severity: severity[0],
        additional_info: additionalInfo || undefined,
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
    <form onSubmit={handleSubmit} className="space-y-6">
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
            disabled={!currentSymptom.trim() || isLoading}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {symptoms.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {symptoms.map((symptom, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="gap-1 pl-3 pr-1.5 py-1.5"
              >
                {symptom}
                <button
                  type="button"
                  onClick={() => removeSymptom(index)}
                  className="ml-1 hover:text-red-600 transition-colors"
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
        disabled={isLoading || symptoms.length === 0}
      >
        {isLoading ? (
          <Spinner className="mr-2" />
        ) : (
          <Stethoscope className="mr-2 h-4 w-4" />
        )}
        Assess Symptoms
      </Button>
    </form>
  )
}
