import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import { PatientSidebar } from '@/components/layout/PatientSidebar'

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ResponsiveLayout sidebar={<PatientSidebar />}>
      {children}
    </ResponsiveLayout>
  )
}
