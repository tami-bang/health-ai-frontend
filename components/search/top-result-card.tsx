import { Star, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { TopResult } from '@/types/search'

interface TopResultCardProps {
  result: TopResult
}

export function TopResultCard({ result }: TopResultCardProps) {
  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-blue-100 p-1.5">
              <Star className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{result.title}</CardTitle>
              <Badge variant="secondary" className="mt-1 text-xs">
                {result.category}
              </Badge>
            </div>
          </div>
          {result.url && (
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-slate-400 hover:text-blue-600 transition-colors"
              aria-label={`Read more about ${result.title}`}
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-700">{result.detailed_content}</p>
        
        {result.key_points && result.key_points.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-slate-900 mb-2">Key Points</h4>
            <ul className="space-y-1">
              {result.key_points.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {result.related_conditions && result.related_conditions.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-slate-900 mb-2">Related Conditions</h4>
            <div className="flex flex-wrap gap-2">
              {result.related_conditions.map((condition, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {condition}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {result.source && (
          <p className="mt-4 text-xs text-slate-400">Source: {result.source}</p>
        )}
      </CardContent>
    </Card>
  )
}
