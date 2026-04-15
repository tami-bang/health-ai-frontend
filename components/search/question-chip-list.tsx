'use client'

import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSearch } from '@/hooks/use-search'

interface QuestionChipListProps {
  questions: string[]
}

export function QuestionChipList({ questions }: QuestionChipListProps) {
  const { setQuery } = useSearch()

  if (!questions || questions.length === 0) return null

  const handleClick = (question: string) => {
    setQuery(question)
    // Scroll to search form
    const searchForm = document.getElementById('search-query')
    if (searchForm) {
      searchForm.focus()
      searchForm.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-4 w-4 text-slate-500" />
        <span className="text-sm font-medium text-slate-700">
          Related questions you might want to ask
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="h-auto whitespace-normal text-left text-xs py-2 px-3"
            onClick={() => handleClick(question)}
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  )
}
