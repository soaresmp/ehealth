'use client'

import { useSidebar } from './SidebarContext'

interface TopBarProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export function TopBar({ title, subtitle, action }: TopBarProps) {
  const { open } = useSidebar()

  return (
    <header className="bg-white border-b border-gray-100 px-4 lg:px-6 py-3 lg:py-4 flex items-center gap-3 sticky top-0 z-10">
      {/* Hamburger — mobile only */}
      <button
        onClick={open}
        className="lg:hidden flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
        aria-label="Open menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-base lg:text-lg font-semibold text-gray-900 truncate">{title}</h1>
        {subtitle && <p className="text-xs lg:text-sm text-gray-500 truncate hidden sm:block">{subtitle}</p>}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button className="relative w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
          <span className="text-lg">🔔</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        {action && <div className="hidden sm:block">{action}</div>}
      </div>
    </header>
  )
}
