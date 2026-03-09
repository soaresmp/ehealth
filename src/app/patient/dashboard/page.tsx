import { TopBar } from '@/components/layout/TopBar'
import { Card, CardHeader } from '@/components/ui/Card'
import { StatCard } from '@/components/ui/StatCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockPatient, mockVitals, mockAllergies, mockDiagnoses, mockPrescriptions, mockAppointments, mockVaccinations } from '@/lib/mock-data'
import { formatDate, calculateAge, getBloodTypeLabel, getStatusColor } from '@/lib/utils'

export default function PatientDashboard() {
  const nextAppt = mockAppointments.find(a => ['SCHEDULED', 'CONFIRMED'].includes(a.status))
  const activePrescriptions = mockPrescriptions.filter(p => p.status === 'PENDING')
  const latestVitals = mockVitals[0]

  return (
    <div className="animate-fade-in">
      <TopBar
        title="Patient Dashboard"
        subtitle={`Good morning, ${mockPatient.firstName} — ${formatDate(new Date().toISOString())}`}
        action={
          <Button href="/patient/telemedicine" size="sm" variant="primary">
            📹 Start Video Consult
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Health ID Card */}
        <div className="gradient-health rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-bold">
                {mockPatient.firstName[0]}{mockPatient.lastName[0]}
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium">Digital Health ID</p>
                <h2 className="text-2xl font-bold">{mockPatient.firstName} {mockPatient.lastName}</h2>
                <p className="font-mono text-blue-200 text-sm">{mockPatient.healthId}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {[
                { label: 'Age', value: `${calculateAge(mockPatient.dateOfBirth)} yrs` },
                { label: 'Blood Type', value: getBloodTypeLabel(mockPatient.bloodType!) },
                { label: 'Gender', value: mockPatient.gender },
                { label: 'Nationality', value: 'Ghanaian' },
              ].map((d) => (
                <div key={d.label} className="bg-white/15 rounded-xl px-4 py-2 text-center">
                  <p className="text-white/70 text-xs">{d.label}</p>
                  <p className="font-semibold text-sm">{d.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts */}
        {mockAllergies.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <span className="text-red-500 text-xl">⚠️</span>
            <div>
              <p className="font-semibold text-red-800 text-sm">Active Allergies</p>
              <div className="flex flex-wrap gap-2 mt-1.5">
                {mockAllergies.map(a => (
                  <span key={a.id} className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-medium">
                    {a.allergen} ({a.severity})
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Conditions"
            value={mockDiagnoses.filter(d => d.isActive).length}
            subtitle="Under management"
            icon={<span className="text-xl">🩺</span>}
            color="orange"
          />
          <StatCard
            title="Active Prescriptions"
            value={activePrescriptions.length}
            subtitle="Awaiting dispensing"
            icon={<span className="text-xl">💊</span>}
            color="blue"
          />
          <StatCard
            title="Upcoming Appointments"
            value={mockAppointments.filter(a => ['SCHEDULED','CONFIRMED'].includes(a.status)).length}
            subtitle="In the next 30 days"
            icon={<span className="text-xl">📅</span>}
            color="green"
          />
          <StatCard
            title="Vaccinations"
            value={mockVaccinations.length}
            subtitle="Complete records"
            icon={<span className="text-xl">💉</span>}
            color="purple"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Next appointment */}
          <Card className="lg:col-span-1">
            <CardHeader title="Next Appointment" icon={<span>📅</span>} />
            {nextAppt ? (
              <div className="space-y-3">
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="info" size="sm">{nextAppt.type === 'TELEMEDICINE' ? '📹 Video' : '🏥 In-Person'}</Badge>
                    <Badge variant="success" size="sm">{nextAppt.status}</Badge>
                  </div>
                  <p className="font-semibold text-gray-900">{nextAppt.reason}</p>
                  <p className="text-sm text-gray-600 mt-1">{nextAppt.provider.firstName} {nextAppt.provider.lastName}</p>
                  <p className="text-sm text-gray-500">{nextAppt.facility}</p>
                  <p className="text-sm font-medium text-green-700 mt-2">
                    📅 {formatDate(nextAppt.scheduledAt, 'time')}
                  </p>
                </div>
                {nextAppt.type === 'TELEMEDICINE' && (
                  <Button href="/patient/telemedicine" size="sm" fullWidth>
                    Join Video Consultation
                  </Button>
                )}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400">
                <span className="text-4xl">📅</span>
                <p className="text-sm mt-2">No upcoming appointments</p>
                <Button href="/patient/appointments" size="sm" variant="outline" className="mt-3">
                  Book Appointment
                </Button>
              </div>
            )}
          </Card>

          {/* Latest vitals */}
          <Card className="lg:col-span-2">
            <CardHeader title="Latest Vital Signs" subtitle={`Recorded: ${formatDate(latestVitals.recordedAt, 'time')}`} icon={<span>❤️</span>} />
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Blood Pressure', value: `${latestVitals.bloodPressureSystolic}/${latestVitals.bloodPressureDiastolic}`, unit: 'mmHg', normal: true, icon: '🩸' },
                { label: 'Heart Rate', value: latestVitals.heartRate, unit: 'bpm', normal: true, icon: '💓' },
                { label: 'Temperature', value: latestVitals.temperature, unit: '°C', normal: true, icon: '🌡️' },
                { label: 'SpO₂', value: `${latestVitals.oxygenSaturation}%`, unit: '', normal: true, icon: '🫁' },
                { label: 'Blood Glucose', value: latestVitals.bloodGlucose, unit: 'mmol/L', normal: true, icon: '🍬' },
                { label: 'BMI', value: latestVitals.bmi, unit: '', normal: true, icon: '⚖️' },
              ].map((v) => (
                <div key={v.label} className="bg-gray-50 rounded-xl p-3 text-center">
                  <span className="text-xl">{v.icon}</span>
                  <p className="text-xs text-gray-500 mt-1">{v.label}</p>
                  <p className="text-lg font-bold text-gray-900">{v.value}</p>
                  {v.unit && <p className="text-xs text-gray-400">{v.unit}</p>}
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">
              <span>⌚</span> Source: {latestVitals.source === 'wearable' ? 'Connected wearable device' : 'Manual recording'}
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Active diagnoses */}
          <Card>
            <CardHeader
              title="Active Conditions"
              icon={<span>🩺</span>}
              action={<Button href="/patient/records" size="sm" variant="ghost">View All</Button>}
            />
            <div className="space-y-3">
              {mockDiagnoses.filter(d => d.isActive).map(d => (
                <div key={d.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 text-sm">{d.description}</p>
                      <Badge variant="outline" size="sm">{d.icdCode}</Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Since {formatDate(d.onsetDate!)} • {d.type}
                    </p>
                    {d.notes && <p className="text-xs text-gray-400 mt-0.5">{d.notes}</p>}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Prescriptions */}
          <Card>
            <CardHeader
              title="Active Prescriptions"
              icon={<span>💊</span>}
              action={<Button href="/patient/prescriptions" size="sm" variant="ghost">View All</Button>}
            />
            <div className="space-y-3">
              {mockPrescriptions.slice(0, 2).map(rx => (
                <div key={rx.id} className="border border-gray-100 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-mono text-xs text-gray-500">{rx.prescriptionCode}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(rx.status)}`}>
                      {rx.status}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {rx.medications.slice(0, 2).map((m, i) => (
                      <p key={i} className="text-sm text-gray-700">
                        <span className="font-medium">{m.medicationName}</span> {m.dosage} — {m.frequency}
                      </p>
                    ))}
                    {rx.medications.length > 2 && (
                      <p className="text-xs text-gray-400">+{rx.medications.length - 2} more medications</p>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    By {rx.provider.firstName} {rx.provider.lastName} • Expires {formatDate(rx.expiresAt)}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
