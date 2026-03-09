import { TopBar } from '@/components/layout/TopBar'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockAppointments } from '@/lib/mock-data'
import { formatDate, getStatusColor } from '@/lib/utils'

export default function AppointmentsPage() {
  const upcoming = mockAppointments.filter(a => ['SCHEDULED', 'CONFIRMED'].includes(a.status))
  const past = mockAppointments.filter(a => a.status === 'COMPLETED')

  return (
    <div className="animate-fade-in">
      <TopBar
        title="Appointments"
        subtitle="Manage your healthcare appointments"
        action={<Button size="sm">📅 Book New Appointment</Button>}
      />
      <div className="p-6 space-y-6">
        {/* Upcoming */}
        <Card>
          <CardHeader title="Upcoming Appointments" icon={<span>📅</span>} />
          {upcoming.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <span className="text-4xl">📅</span>
              <p className="mt-2">No upcoming appointments</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcoming.map(apt => (
                <div key={apt.id} className="flex flex-col md:flex-row md:items-center gap-4 border border-gray-100 rounded-xl p-4">
                  <div className="md:w-24 text-center bg-green-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500 uppercase">
                      {new Date(apt.scheduledAt).toLocaleString('en', { month: 'short' })}
                    </p>
                    <p className="text-2xl font-bold text-green-700">
                      {new Date(apt.scheduledAt).getDate()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(apt.scheduledAt).toLocaleString('en', { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(apt.status)}`}>
                        {apt.status}
                      </span>
                      <Badge variant={apt.type === 'TELEMEDICINE' ? 'info' : 'outline'} size="sm">
                        {apt.type === 'TELEMEDICINE' ? '📹 Video' : '🏥 In-Person'}
                      </Badge>
                    </div>
                    <p className="font-semibold text-gray-900">{apt.reason}</p>
                    <p className="text-sm text-gray-600">
                      {apt.provider.firstName} {apt.provider.lastName} • {apt.provider.specialization}
                    </p>
                    <p className="text-sm text-gray-500">{apt.facility} • {apt.duration} min</p>
                  </div>
                  <div className="flex gap-2">
                    {apt.type === 'TELEMEDICINE' ? (
                      <Button href="/patient/telemedicine" size="sm" variant="primary">
                        Join Meeting
                      </Button>
                    ) : null}
                    <Button size="sm" variant="outline">Reschedule</Button>
                    <Button size="sm" variant="ghost">Cancel</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Book appointment */}
        <Card className="bg-gradient-to-r from-green-700 to-emerald-600 text-white">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            <div>
              <h3 className="font-semibold text-lg">Book a New Appointment</h3>
              <p className="text-green-100 text-sm mt-1">
                Find available slots with doctors across all facilities or book a video consultation
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white text-green-700 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-green-50 transition-colors">
                🏥 In-Person Visit
              </button>
              <button className="bg-white/20 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-white/30 transition-colors border border-white/30">
                📹 Video Consultation
              </button>
            </div>
          </div>
        </Card>

        {/* Past appointments */}
        <Card>
          <CardHeader title="Past Appointments" icon={<span>🕐</span>} />
          <div className="space-y-3">
            {past.map(apt => (
              <div key={apt.id} className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl opacity-75">
                <div className="w-20 text-center bg-gray-50 rounded-xl p-2">
                  <p className="text-xs text-gray-400 uppercase">
                    {new Date(apt.scheduledAt).toLocaleString('en', { month: 'short' })}
                  </p>
                  <p className="text-xl font-bold text-gray-500">
                    {new Date(apt.scheduledAt).getDate()}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-700 text-sm">{apt.reason}</p>
                  <p className="text-xs text-gray-500">
                    {apt.provider.firstName} {apt.provider.lastName} • {apt.facility}
                  </p>
                </div>
                <Badge variant="default" size="sm">Completed</Badge>
                <Button size="sm" variant="ghost">View Notes</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
