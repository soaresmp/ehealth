'use client'

import { SidebarProvider, useSidebar } from './SidebarContext'

function LayoutInner({ sidebar, children }: { sidebar: React.ReactNode; children: React.ReactNode }) {
  const { isOpen, close } = useSidebar()

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Sidebar — hidden off-screen on mobile, always visible on desktop */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30 transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 lg:block
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {sidebar}
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto min-w-0">
        {children}
      </main>
    </div>
  )
}

export function ResponsiveLayout({ sidebar, children }: { sidebar: React.ReactNode; children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <LayoutInner sidebar={sidebar}>{children}</LayoutInner>
    </SidebarProvider>
  )
}
