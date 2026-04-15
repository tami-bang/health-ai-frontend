import type { ValidationResult } from './auth-validator'

export function validateSearchQuery(query: string): ValidationResult {
  const errors: Record<string, string> = {}

  if (!query.trim()) {
    errors.query = 'Please enter your symptoms or health question'
  } else if (query.trim().length < 3) {
    errors.query = 'Query must be at least 3 characters'
  } else if (query.length > 500) {
    errors.query = 'Query must be less than 500 characters'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateTriageSymptoms(symptoms: string[]): ValidationResult {
  const errors: Record<string, string> = {}

  if (!symptoms.length) {
    errors.symptoms = 'Please enter at least one symptom'
  }

  const validSymptoms = symptoms.filter(s => s.trim().length > 0)
  if (validSymptoms.length === 0) {
    errors.symptoms = 'Please enter valid symptoms'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}
