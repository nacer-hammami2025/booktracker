import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  variant?: 'light' | 'dark'
}

export default function Input({ label, error, className, variant = 'light', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className={cn(
          "block text-sm font-semibold mb-2",
          variant === 'dark' ? 'text-white/90 drop-shadow' : 'text-gray-700'
        )}>
          {label}
        </label>
      )}
      <input
        className={cn('input', error && 'border-red-500 focus:ring-red-500', className)}
        {...props}
      />
      {error && (
        <p className={cn(
          "mt-1 text-sm",
          variant === 'dark' ? 'text-red-300 drop-shadow' : 'text-red-600'
        )}>{error}</p>
      )}
    </div>
  )
}
