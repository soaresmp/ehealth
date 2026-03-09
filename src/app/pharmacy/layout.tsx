import { PharmacySidebar } from '@/components/layout/PharmacySidebar'

export default function PharmacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <PharmacySidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
