import { cn, getStatusColor, getStatusLabel } from '@/lib/utils'
import type { ReadingStatus } from '@/types'

interface BadgeProps {
  status?: ReadingStatus
  children?: React.ReactNode
  className?: string
}

export default function Badge({ status, children, className }: BadgeProps) {
  if (status) {
    return (
      <span className={cn('badge', getStatusColor(status), className)}>
        {getStatusLabel(status)}
      </span>
    )
  }

  return (
    <span className={cn('badge bg-gray-100 text-gray-800', className)}>
      {children}
    </span>
  )
}
