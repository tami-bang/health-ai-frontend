import { apiClient } from './client'
import { API_ROUTES } from '@/lib/constants/routes'
import type { TriageRequest, TriageResponse } from '@/types/triage'

export const triageApi = {
  submitTriage: (data: TriageRequest) =>
    apiClient.post<TriageResponse>(API_ROUTES.TRIAGE, data),
}
