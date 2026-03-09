import { PatientSidebar } from '@/components/layout/PatientSidebar'

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <PatientSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
