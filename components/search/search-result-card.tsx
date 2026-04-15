import { ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { SearchResult } from '@/types/search'

interface SearchResultCardProps {
  result: SearchResult
}

export function SearchResultCard({ result }: SearchResultCardProps) {
  return (
    <Card className="border-slate-200 transition-shadow hover:shadow-sm">
      <CardContent className="pt-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-medium text-slate-900 line-clamp-1">
                {result.title}
              </h3>
              <Badge variant="secondary" className="text-xs">
                {result.category}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-slate-600 line-clamp-2">
              {result.snippet}
            </p>
            {result.source && (
              <p className="mt-2 text-xs text-slate-400">
                Source: {result.source}
              </p>
            )}
          </div>
          {result.url && (
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-slate-400 hover:text-blue-600 transition-colors"
              aria-label={`Read more about ${result.title}`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
