import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(date: string | undefined): string {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatShortDate(date: string | undefined): string {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
  })
}

export function getStatusColor(status: string): string {
  const colors = {
    TO_READ: 'badge-to-read',
    READING: 'badge-reading',
    FINISHED: 'badge-finished',
    ABANDONED: 'badge-abandoned',
  }
  return colors[status as keyof typeof colors] || 'badge'
}

export function getStatusLabel(status: string): string {
  const labels = {
    TO_READ: 'À lire',
    READING: 'En cours',
    FINISHED: 'Terminé',
    ABANDONED: 'Abandonné',
  }
  return labels[status as keyof typeof labels] || status
}

export function calculateProgress(currentPage: number, totalPages: number): number {
  if (!totalPages || totalPages === 0) return 0
  return Math.round((currentPage / totalPages) * 100)
}

export function truncate(text: string | undefined, length: number): string {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

export function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural
}
