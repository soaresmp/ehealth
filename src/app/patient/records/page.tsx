import { TopBar } from '@/components/layout/TopBar'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockConsultations, mockDiagnoses, mockAllergies, mockPatient } from '@/lib/mock-data'
import { formatDate, getSeverityColor, getStatusColor } from '@/lib/utils'

const hospitalizations = [
  {
    id: 'h-001',
    admissionDate: '2019-07-12',
    dischargeDate: '2019-07-18',
    admissionReason: 'Acute appendicitis',
    dischargeSummary: 'Successful appendectomy, uneventful recovery',
    ward: 'Surgical Ward B',
    facility: 'Korle-Bu Teaching Hospital',
    attendingDoctor: 'Dr. Kofi Adjei',
  },
]

export default function MedicalRecordsPage() {
  return (
    <div className="animate-fade-in">
      <TopBar title="Medical History" subtitle="Your complete lifetime health record" />
      <div className="p-6 space-y-6">
        {/* Timeline header */}
        <Card className="bg-gradient-to-r from-green-700 to-emerald-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Health Timeline</h2>
              <p className="text-green-100 text-sm mt-0.5">Complete medical history since registration</p>
            </div>
            <div className="flex gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{mockConsultations.length}</p>
                <p className="text-green-200 text-xs">Consultations</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{mockDiagnoses.length}</p>
                <p className="text-green-200 text-xs">Diagnoses</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{hospitalizations.length}</p>
                <p className="text-green-200 text-xs">Hospitalizations</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Diagnoses */}
          <Card className="lg:col-span-1">
            <CardHeader title="Diagnoses" icon={<span>🩺</span>} />
            <div className="space-y-3">
              {mockDiagnoses.map(d => (
                <div key={d.id} className="border border-gray-100 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="outline" size="sm">{d.icdCode}</Badge>
                    <Badge variant={d.isActive ? 'warning' : 'default'} size="sm">
                      {d.isActive ? 'Active' : 'Resolved'}
                    </Badge>
                  </div>
                  <p className="font-medium text-gray-900 text-sm">{d.description}</p>
                  <p className="text-xs text-gray-500 mt-1 capitalize">{d.type} condition</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                    <span>Onset: {formatDate(d.onsetDate!)}</span>
                    {d.resolvedDate && <span>• Resolved: {formatDate(d.resolvedDate)}</span>}
                  </div>
                  {d.notes && <p className="text-xs text-gray-400 mt-1 italic">{d.notes}</p>}
                </div>
              ))}
            </div>
          </Card>

          {/* Consultation timeline */}
          <Card className="lg:col-span-2">
            <CardHeader title="Consultation Timeline" icon={<span>📋</span>} />
            <div className="space-y-4">
              {mockConsultations.map((c, idx) => (
                <div key={c.id} className="relative pl-6">
                  {idx < mockConsultations.length - 1 && (
                    <div className="absolute left-2.5 top-6 bottom-0 w-px bg-gray-200"></div>
                  )}
                  <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{c.chiefComplaint}</p>
                        <p className="text-xs text-gray-500">
                          {c.provider.firstName} {c.provider.lastName} • {c.provider.specialization}
                        </p>
                        <p className="text-xs text-gray-400">{c.facility}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{formatDate(c.date, 'short')}</p>
                        {c.isTelemedicine && <Badge variant="info" size="sm" className="mt-1">📹 Telemedicine</Badge>}
                      </div>
                    </div>
                    {c.assessment && (
                      <div className="mt-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Assessment</p>
                        <p className="text-sm text-gray-700">{c.assessment}</p>
                      </div>
                    )}
                    {c.plan && (
                      <div className="mt-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Plan</p>
                        <p className="text-sm text-gray-700">{c.plan}</p>
                      </div>
                    )}
                    {c.followUpDate && (
                      <p className="text-xs text-green-600 mt-2 font-medium">
                        Follow-up: {formatDate(c.followUpDate)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Allergies */}
        <Card>
          <CardHeader title="Allergies & Adverse Reactions" icon={<span>⚠️</span>} />
          <div className="grid md:grid-cols-3 gap-3">
            {mockAllergies.map(a => (
              <div key={a.id} className={`rounded-xl p-4 border ${getSeverityColor(a.severity)} border-current/20`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{a.allergen}</span>
                  <span className="text-xs capitalize font-medium bg-current/10 px-2 py-0.5 rounded-full">
                    {a.severity}
                  </span>
                </div>
                <p className="text-xs capitalize opacity-75">{a.type} allergen</p>
                {a.reaction && <p className="text-xs mt-1.5 opacity-80">Reaction: {a.reaction}</p>}
              </div>
            ))}
          </div>
        </Card>

        {/* Hospitalizations */}
        <Card>
          <CardHeader title="Hospitalization History" icon={<span>🏥</span>} />
          <div className="space-y-3">
            {hospitalizations.map(h => (
              <div key={h.id} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{h.admissionReason}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{h.facility} • {h.ward}</p>
                    <p className="text-sm text-gray-500">Attending: {h.attendingDoctor}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p>{formatDate(h.admissionDate)} — {formatDate(h.dischargeDate!)}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {Math.ceil((new Date(h.dischargeDate!).getTime() - new Date(h.admissionDate).getTime()) / (1000*60*60*24))} days
                    </p>
                  </div>
                </div>
                {h.dischargeSummary && (
                  <p className="text-sm text-gray-600 mt-2 bg-gray-50 rounded-lg p-2">
                    <span className="font-medium">Discharge summary: </span>{h.dischargeSummary}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
