import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import { PharmacySidebar } from '@/components/layout/PharmacySidebar'

export default function PharmacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <ResponsiveLayout sidebar={<PharmacySidebar />}>
      {children}
    </ResponsiveLayout>
  )
}
