'use client'

import { useState } from 'react'
import { Search, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { useSearch } from '@/hooks/use-search'
import { validateSearchQuery } from '@/lib/validators/search-validator'
import { toast } from 'sonner'

interface SymptomSearchFormProps {
  defaultIncludeSummary?: boolean
}

export function SymptomSearchForm({ defaultIncludeSummary = false }: SymptomSearchFormProps) {
  const { search, searchWithSummary, isLoading, query, setQuery } = useSearch()
  const [includeSummary, setIncludeSummary] = useState(defaultIncludeSummary)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const validation = validateSearchQuery(query)
    if (!validation.valid) {
      setError(validation.errors.query)
      return
    }

    try {
      if (includeSummary) {
        await searchWithSummary(query)
      } else {
        await search(query)
      }
    } catch {
      toast.error('Failed to search. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="search-query" className="text-base font-medium">
          Describe your symptoms or health question
        </Label>
        <Textarea
          id="search-query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., I have a headache and fever for the past 2 days..."
          className="min-h-[120px] resize-none text-base"
          disabled={isLoading}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Switch
            id="include-summary"
            checked={includeSummary}
            onCheckedChange={setIncludeSummary}
            disabled={isLoading}
          />
          <Label htmlFor="include-summary" className="cursor-pointer text-sm">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-blue-600" />
              Include AI Summary
            </span>
          </Label>
        </div>

        <Button type="submit" disabled={isLoading || !query.trim()}>
          {isLoading ? (
            <Spinner className="mr-2" />
          ) : (
            <Search className="mr-2 h-4 w-4" />
          )}
          Search
        </Button>
      </div>
    </form>
  )
}
