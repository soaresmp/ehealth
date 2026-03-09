import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string | null | undefined, format: 'short' | 'long' | 'time' = 'short'): string {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  if (format === 'time') {
    return date.toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }
  if (format === 'long') {
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
  }
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function calculateAge(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth)
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const m = today.getMonth() - dob.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--
  return age
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    DISPENSED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
    EXPIRED: 'bg-gray-100 text-gray-600',
    PARTIALLY_DISPENSED: 'bg-blue-100 text-blue-800',
    SCHEDULED: 'bg-blue-100 text-blue-800',
    CONFIRMED: 'bg-green-100 text-green-800',
    COMPLETED: 'bg-gray-100 text-gray-800',
    IN_PROGRESS: 'bg-purple-100 text-purple-800',
    NO_SHOW: 'bg-red-100 text-red-800',
    ORDERED: 'bg-yellow-100 text-yellow-800',
    ACCEPTED: 'bg-blue-100 text-blue-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-600'
}

export function getBloodTypeLabel(bloodType: string): string {
  const labels: Record<string, string> = {
    A_POSITIVE: 'A+', A_NEGATIVE: 'A−',
    B_POSITIVE: 'B+', B_NEGATIVE: 'B−',
    AB_POSITIVE: 'AB+', AB_NEGATIVE: 'AB−',
    O_POSITIVE: 'O+', O_NEGATIVE: 'O−',
  }
  return labels[bloodType] || bloodType
}

export function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    mild: 'bg-yellow-100 text-yellow-700',
    moderate: 'bg-orange-100 text-orange-700',
    severe: 'bg-red-100 text-red-700',
    'life-threatening': 'bg-red-200 text-red-900',
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700',
    critical: 'bg-red-200 text-red-900',
  }
  return colors[severity.toLowerCase()] || 'bg-gray-100 text-gray-600'
}
