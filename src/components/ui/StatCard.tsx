import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  trend?: { value: number; label: string }
  color?: 'green' | 'blue' | 'orange' | 'red' | 'purple'
  className?: string
}

export function StatCard({ title, value, subtitle, icon, trend, color = 'green', className }: StatCardProps) {
  const colors = {
    green: { bg: 'bg-green-50', icon: 'text-green-600', trend: 'text-green-600' },
    blue: { bg: 'bg-blue-50', icon: 'text-blue-600', trend: 'text-blue-600' },
    orange: { bg: 'bg-orange-50', icon: 'text-orange-600', trend: 'text-orange-600' },
    red: { bg: 'bg-red-50', icon: 'text-red-600', trend: 'text-red-600' },
    purple: { bg: 'bg-purple-50', icon: 'text-purple-600', trend: 'text-purple-600' },
  }
  const c = colors[color]
  return (
    <div className={cn('bg-white rounded-xl border border-gray-100 shadow-sm p-5', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
          {trend && (
            <div className={cn('flex items-center gap-1 mt-2 text-xs font-medium', trend.value >= 0 ? 'text-green-600' : 'text-red-600')}>
              <span>{trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
              <span className="text-gray-400">{trend.label}</span>
            </div>
          )}
        </div>
        <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', c.bg)}>
          <span className={c.icon}>{icon}</span>
        </div>
      </div>
    </div>
  )
}
