'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Public Health Dashboard', href: '/admin/dashboard', icon: '📊' },
  { name: 'Disease Surveillance', href: '/admin/surveillance', icon: '🦠' },
  { name: 'Vaccination Coverage', href: '/admin/vaccinations', icon: '💉' },
  { name: 'Facility Management', href: '/admin/facilities', icon: '🏥' },
  { name: 'Provider Registry', href: '/admin/providers', icon: '👨‍⚕️' },
  { name: 'Antibiotic Monitoring', href: '/admin/antibiotics', icon: '💊' },
  { name: 'Supply Chain', href: '/admin/supply-chain', icon: '📦' },
  { name: 'Insurance & Billing', href: '/admin/insurance', icon: '🏦' },
  { name: 'Security & Audit', href: '/admin/security', icon: '🔐' },
  { name: 'AI Analytics', href: '/admin/ai-analytics', icon: '🤖' },
  { name: 'National ID Integration', href: '/admin/national-id', icon: '🆔' },
]

export function AdminSidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
      <div className="px-6 py-5 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg gradient-africa flex items-center justify-center">
            <span className="text-white text-sm font-bold">E+</span>
          </div>
          <div>
            <span className="font-bold text-gray-900 text-sm">EHealth</span>
            <span className="text-green-700 font-bold text-sm"> Africa</span>
          </div>
        </Link>
      </div>
      <div className="px-4 py-3 mx-3 mt-3 rounded-xl bg-orange-50 border border-orange-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-orange-200 flex items-center justify-center text-orange-800 font-semibold text-sm">
            GH
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Ministry of Health</p>
            <p className="text-xs text-orange-700">Public Health Officer</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              pathname === item.href
                ? 'bg-orange-600 text-white'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            <span className="text-base">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-gray-100">
        <Link href="/login" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors">
          <span>🚪</span> Sign Out
        </Link>
      </div>
    </aside>
  )
}
