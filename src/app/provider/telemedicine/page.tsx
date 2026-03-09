import { TopBar } from '@/components/layout/TopBar'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const upcomingTeleconsultations = [
  { time: '15:30', patient: 'Kofi Adjei', healthId: 'GH-2021-0003456', reason: 'Hypertension review', duration: 20 },
  { time: '16:00', patient: 'Efua Amponsah', healthId: 'GH-2023-0017890', reason: 'Gestational diabetes monitoring', duration: 30 },
]

export default function ProviderTelemedicinePage() {
  return (
    <div className="animate-fade-in">
      <TopBar title="Telemedicine" subtitle="Video consultations and remote patient monitoring" />
      <div className="p-6 space-y-6">
        {/* Video room */}
        <Card>
          <div className="bg-gray-900 rounded-xl h-64 flex items-center justify-center mb-4">
            <div className="text-center text-white">
              <span className="text-5xl">📹</span>
              <p className="mt-2 font-semibold">Video Consultation Room</p>
              <p className="text-gray-400 text-sm">Next session at 15:30 — Kofi Adjei</p>
            </div>
          </div>
          <div className="flex justify-center gap-3">
            <Button variant="primary">Start Video Session</Button>
            <Button variant="outline">Test Equipment</Button>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">Upcoming Video Consultations</h3>
          <div className="space-y-3">
            {upcomingTeleconsultations.map(tc => (
              <div key={tc.patient} className="flex items-center gap-4 border border-gray-100 rounded-xl p-4">
                <div className="bg-blue-50 rounded-xl p-3 text-center w-20">
                  <p className="font-bold text-blue-700">{tc.time}</p>
                  <p className="text-xs text-gray-400">{tc.duration} min</p>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{tc.patient}</p>
                  <p className="text-xs text-gray-500 font-mono">{tc.healthId}</p>
                  <p className="text-sm text-gray-600">{tc.reason}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">View EHR</Button>
                  <Badge variant="info" size="sm">📹 Video</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
