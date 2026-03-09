import { TopBar } from '@/components/layout/TopBar'
import { Card, CardHeader } from '@/components/ui/Card'
import { StatCard } from '@/components/ui/StatCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockProviderDashboard } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'

const todaySchedule = [
  { time: '09:00', patient: 'Amara Mensah', reason: 'Diabetes follow-up', type: 'IN_PERSON', status: 'COMPLETED' },
  { time: '09:45', patient: 'Kweku Boateng', reason: 'Malaria treatment review', type: 'IN_PERSON', status: 'COMPLETED' },
  { time: '10:30', patient: 'Abena Owusu', reason: 'Prenatal checkup (28 weeks)', type: 'IN_PERSON', status: 'IN_PROGRESS' },
  { time: '11:15', patient: 'Yaw Asante', reason: 'Heart failure management', type: 'IN_PERSON', status: 'SCHEDULED' },
  { time: '14:00', patient: 'Ama Tetteh', reason: 'New patient consultation', type: 'IN_PERSON', status: 'SCHEDULED' },
  { time: '15:30', patient: 'Kofi Adjei', reason: 'Hypertension review', type: 'TELEMEDICINE', status: 'SCHEDULED' },
]

const pendingActions = [
  { type: 'lab', icon: '🔬', text: 'Lab results ready for Kweku Boateng — Malaria RDT', time: '10 min ago', urgent: true },
  { type: 'prescription', icon: '💊', text: 'Prescription refill request from Amara Mensah', time: '1 hour ago', urgent: false },
  { type: 'referral', icon: '🔄', text: 'Cardiology accepted referral for Yaw Asante', time: '2 hours ago', urgent: false },
  { type: 'lab', icon: '🔬', text: 'Critical HbA1c result for Ama Tetteh (8.9%)', time: '3 hours ago', urgent: true },
]

export default function ProviderDashboard() {
  return (
    <div className="animate-fade-in">
      <TopBar
        title="Provider Dashboard"
        subtitle="Dr. Kwame Asante • Internal Medicine, Korle-Bu Teaching Hospital"
        action={
          <Button href="/provider/patients" size="sm" variant="primary">
            🔍 Search Patient
          </Button>
        }
      />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Today's Appointments" value={mockProviderDashboard.todayAppointments} subtitle="3 completed, 3 pending" icon={<span>📅</span>} color="blue" />
          <StatCard title="Pending Prescriptions" value={mockProviderDashboard.pendingPrescriptions} subtitle="Awaiting signature" icon={<span>💊</span>} color="orange" />
          <StatCard title="Pending Lab Orders" value={mockProviderDashboard.pendingLabResults} subtitle="Awaiting results" icon={<span>🔬</span>} color="purple" />
          <StatCard title="Open Referrals" value={mockProviderDashboard.pendingReferrals} subtitle="In progress" icon={<span>🔄</span>} color="green" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Today's schedule */}
          <Card className="lg:col-span-3">
            <CardHeader
              title="Today's Schedule"
              subtitle={formatDate(new Date().toISOString(), 'long')}
              icon={<span>📅</span>}
              action={<Button size="sm" variant="outline">View Full Schedule</Button>}
            />
            <div className="space-y-2">
              {todaySchedule.map((s, i) => (
                <div key={i} className={`flex items-start sm:items-center gap-3 p-3 rounded-xl border transition-colors ${
                  s.status === 'IN_PROGRESS' ? 'border-green-300 bg-green-50' :
                  s.status === 'COMPLETED' ? 'border-gray-100 bg-gray-50 opacity-60' :
                  'border-gray-100 hover:bg-gray-50'
                }`}>
                  <div className="w-14 text-center">
                    <p className="text-sm font-bold text-gray-700">{s.time}</p>
                    {s.status === 'IN_PROGRESS' && (
                      <span className="text-xs text-green-600 font-medium">Now</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{s.patient}</p>
                    <p className="text-xs text-gray-500">{s.reason}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {s.type === 'TELEMEDICINE' && <Badge variant="info" size="sm">📹</Badge>}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      s.status === 'COMPLETED' ? 'bg-gray-100 text-gray-500' :
                      s.status === 'IN_PROGRESS' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {s.status.replace('_', ' ')}
                    </span>
                    {s.status === 'SCHEDULED' && (
                      <Button size="sm" variant="primary">Start</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Pending actions */}
          <Card className="lg:col-span-2">
            <CardHeader title="Action Required" icon={<span>🔔</span>} />
            <div className="space-y-3">
              {pendingActions.map((a, i) => (
                <div key={i} className={`p-3 rounded-xl border ${a.urgent ? 'border-red-200 bg-red-50' : 'border-gray-100 bg-gray-50'}`}>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">{a.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{a.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                    </div>
                    {a.urgent && <span className="text-red-500 text-xs font-bold">!</span>}
                  </div>
                  <button className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium">
                    View & Take Action →
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent patients */}
        <Card>
          <CardHeader
            title="Recent Patients"
            icon={<span>👥</span>}
            action={<Button href="/provider/patients" size="sm" variant="ghost">View All Patients</Button>}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="text-xs text-gray-500 uppercase tracking-wide border-b border-gray-100">
                  <th className="text-left py-2 px-3">Patient</th>
                  <th className="text-left py-2 px-3">Health ID</th>
                  <th className="text-left py-2 px-3">Age</th>
                  <th className="text-left py-2 px-3">Condition</th>
                  <th className="text-left py-2 px-3">Last Visit</th>
                  <th className="py-2 px-3"></th>
                </tr>
              </thead>
              <tbody>
                {mockProviderDashboard.recentPatients.map(p => (
                  <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">
                          {p.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-gray-900">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-xs text-gray-500">{p.healthId}</td>
                    <td className="py-2.5 px-3 text-gray-600">{p.age}</td>
                    <td className="py-2.5 px-3 text-gray-600">{p.condition}</td>
                    <td className="py-2.5 px-3 text-gray-500">{formatDate(p.lastVisit)}</td>
                    <td className="py-2.5 px-3">
                      <Button size="sm" variant="ghost">View EHR</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Clinical decision support */}
        <Card className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">🧠</div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Clinical Decision Support — AI Alert</h3>
              <p className="text-blue-100 text-sm mt-0.5">
                3 of your patients with Type 2 Diabetes show HbA1c values above 8%. Consider reviewing treatment protocols.
                Evidence-based guideline update available: <span className="underline cursor-pointer">ADA 2024 Diabetes Standards</span>
              </p>
            </div>
            <button className="bg-white/20 text-white px-4 py-2 rounded-xl text-sm hover:bg-white/30 transition-colors whitespace-nowrap border border-white/20">
              Review Now
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
