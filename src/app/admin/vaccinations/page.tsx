import { TopBar } from '@/components/layout/TopBar'
import { Card } from '@/components/ui/Card'

export default function Page() {
  return (
    <div className="animate-fade-in">
      <TopBar title="Coming Soon" subtitle="This section is under development" />
      <div className="p-6">
        <Card className="text-center py-16">
          <span className="text-6xl">🚧</span>
          <p className="text-xl font-semibold text-gray-700 mt-4">Under Development</p>
          <p className="text-gray-500 mt-2">This module is being built. Check back soon.</p>
        </Card>
      </div>
    </div>
  )
}
