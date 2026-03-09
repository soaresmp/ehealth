import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import { ProviderSidebar } from '@/components/layout/ProviderSidebar'

export default function ProviderLayout({ children }: { children: React.ReactNode }) {
  return (
    <ResponsiveLayout sidebar={<ProviderSidebar />}>
      {children}
    </ResponsiveLayout>
  )
}
