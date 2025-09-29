import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  maxRating?: number
  className?: string
}

export function StarRating({
  rating,
  maxRating = 5,
  className,
}: StarRatingProps) {
  return (
    <div className={cn('flex items-center', className)}>
      {[...Array(maxRating)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-5 w-5',
            i < rating ? 'text-accent fill-accent' : 'text-muted-foreground/50',
          )}
        />
      ))}
    </div>
  )
}
