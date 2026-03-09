import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import { AdminSidebar } from '@/components/layout/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ResponsiveLayout sidebar={<AdminSidebar />}>
      {children}
    </ResponsiveLayout>
  )
}
