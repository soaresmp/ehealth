import { TopBar } from '@/components/layout/TopBar'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockConsultations } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'

export default function ConsultationsPage() {
  return (
    <div className="animate-fade-in">
      <TopBar
        title="Consultations"
        subtitle="Document and manage patient consultations"
        action={<Button size="sm" variant="primary">+ New Consultation</Button>}
      />
      <div className="p-6 space-y-6">
        {/* Active consultation workspace */}
        <Card className="border-green-300 bg-green-50">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <div>
              <p className="font-semibold text-green-900">Current Patient: Abena Owusu</p>
              <p className="text-sm text-green-700">GH-2022-0009012 • Prenatal checkup — 28 weeks</p>
            </div>
            <Button size="sm" variant="primary" className="ml-auto">Open EHR</Button>
            <Button size="sm" variant="outline">Order Labs</Button>
            <Button size="sm" variant="outline">Prescribe</Button>
          </div>
        </Card>

        {/* New SOAP note */}
        <Card>
          <CardHeader title="SOAP Note — New Consultation" icon={<span>📝</span>} />
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'S — Subjective (Chief Complaint & History)', placeholder: 'Patient reports... History of present illness...' },
              { label: 'O — Objective (Physical Examination & Vitals)', placeholder: 'BP: / mmHg, HR: bpm, Temp: °C... Examination findings...' },
              { label: 'A — Assessment (Diagnosis)', placeholder: 'Primary diagnosis: ICD-10 code...' },
              { label: 'P — Plan (Treatment & Follow-up)', placeholder: 'Prescribe... Order labs... Follow up in...' },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{f.label}</label>
                <textarea
                  placeholder={f.placeholder}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 h-28 resize-none"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex gap-2">
              <button className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">
                🧠 AI Assist
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">
                📋 Use Template
              </button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Save Draft</Button>
              <Button variant="primary" size="sm">Complete & Sign</Button>
            </div>
          </div>
        </Card>

        {/* Recent consultations */}
        <Card>
          <CardHeader title="Recent Consultations" icon={<span>🕐</span>} />
          <div className="space-y-3">
            {mockConsultations.map(c => (
              <div key={c.id} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{c.chiefComplaint}</p>
                    <p className="text-sm text-gray-500">
                      Amara Mensah • {formatDate(c.date, 'time')}
                      {c.isTelemedicine && ' • 📹 Telemedicine'}
                    </p>
                  </div>
                  <Button size="sm" variant="ghost">View Full Record</Button>
                </div>
                {c.assessment && (
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-2">
                    <span className="font-medium">Assessment: </span>{c.assessment}
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
