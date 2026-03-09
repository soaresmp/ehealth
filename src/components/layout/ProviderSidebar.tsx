'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigation = [
  {
    group: 'Overview',
    items: [
      { name: 'Dashboard', href: '/provider/dashboard', icon: '⊞' },
      { name: 'My Schedule', href: '/provider/schedule', icon: '📅' },
    ],
  },
  {
    group: 'Patient Care',
    items: [
      { name: 'My Patients', href: '/provider/patients', icon: '👥' },
      { name: 'Consultations', href: '/provider/consultations', icon: '🩺' },
      { name: 'Prescriptions', href: '/provider/prescriptions', icon: '💊' },
      { name: 'Lab Orders', href: '/provider/labs', icon: '🔬' },
    ],
  },
  {
    group: 'Coordination',
    items: [
      { name: 'Referrals', href: '/provider/referrals', icon: '🔄' },
      { name: 'Care Plans', href: '/provider/care-plans', icon: '📋' },
      { name: 'Telemedicine', href: '/provider/telemedicine', icon: '📹' },
    ],
  },
  {
    group: 'Clinical',
    items: [
      { name: 'Decision Support', href: '/provider/clinical-support', icon: '🧠' },
      { name: 'Reports', href: '/provider/reports', icon: '📊' },
    ],
  },
]

export function ProviderSidebar() {
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

      <div className="px-4 py-3 mx-3 mt-3 rounded-xl bg-blue-50 border border-blue-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-semibold text-sm">
            KA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">Dr. Kwame Asante</p>
            <p className="text-xs text-blue-700">Internal Medicine</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {navigation.map((group) => (
          <div key={group.group}>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1">
              {group.group}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-blue-700 text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-gray-100">
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <span>🚪</span> Sign Out
        </Link>
      </div>
    </aside>
  )
}
