import { TopBar } from '@/components/layout/TopBar'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockPatient, mockAllergies, mockDiagnoses } from '@/lib/mock-data'
import { calculateAge, getBloodTypeLabel, formatDate } from '@/lib/utils'

export default function HealthIdPage() {
  return (
    <div className="animate-fade-in">
      <TopBar title="Digital Health ID" subtitle="Your secure national health identity card" />
      <div className="p-6 space-y-6">
        {/* Digital ID card */}
        <div className="max-w-2xl mx-auto">
          <div className="relative bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 rounded-3xl p-8 text-white overflow-hidden shadow-2xl">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white transform translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white transform -translate-x-8 translate-y-8"></div>
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">E+</span>
                    <div>
                      <p className="font-bold text-lg leading-none">EHealth Africa</p>
                      <p className="text-green-200 text-xs">Republic of Ghana</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-200 text-xs">National Health ID Card</p>
                  <p className="font-mono text-sm font-bold">{mockPatient.healthId}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-bold border-2 border-white/30">
                  {mockPatient.firstName[0]}{mockPatient.lastName[0]}
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold">{mockPatient.firstName} {mockPatient.lastName}</h2>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="bg-white/20 px-3 py-1 rounded-lg text-sm">
                      {calculateAge(mockPatient.dateOfBirth)} years old
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-lg text-sm">
                      Blood: {getBloodTypeLabel(mockPatient.bloodType!)}
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-lg text-sm">
                      {mockPatient.gender}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                <div>
                  <p className="text-green-200 text-xs uppercase">Date of Birth</p>
                  <p className="font-medium text-sm">{formatDate(mockPatient.dateOfBirth, 'long')}</p>
                </div>
                <div>
                  <p className="text-green-200 text-xs uppercase">Region</p>
                  <p className="font-medium text-sm">{mockPatient.region}</p>
                </div>
                <div>
                  <p className="text-green-200 text-xs uppercase">National ID</p>
                  <p className="font-medium text-sm font-mono">{mockPatient.nationalId}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="bg-white rounded-xl p-2">
                  <div className="grid grid-cols-5 gap-0.5">
                    {Array.from({length: 25}).map((_, i) => (
                      <div key={i} className={`w-2.5 h-2.5 rounded-sm ${Math.random() > 0.4 ? 'bg-gray-900' : 'bg-white border border-gray-100'}`}></div>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-green-200 text-xs">Scan for emergency access</p>
                  <p className="text-xs text-green-100 mt-1">
                    Contains: Blood type, allergies, chronic conditions, emergency contacts
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card actions */}
          <div className="flex gap-3 mt-4">
            <Button variant="outline" className="flex-1">📥 Download PDF</Button>
            <Button variant="outline" className="flex-1">📱 Add to Wallet</Button>
            <Button variant="primary" className="flex-1">🔗 Share Access</Button>
          </div>
        </div>

        {/* Critical info summary */}
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Card className="border-red-200 bg-red-50">
            <h3 className="font-semibold text-red-800 mb-3">⚠️ Allergies</h3>
            {mockAllergies.map(a => (
              <div key={a.id} className="text-sm text-red-700 flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <strong>{a.allergen}</strong> — {a.severity} ({a.reaction})
              </div>
            ))}
          </Card>
          <Card>
            <h3 className="font-semibold text-gray-900 mb-3">🩺 Chronic Conditions</h3>
            {mockDiagnoses.filter(d => d.type === 'chronic' && d.isActive).map(d => (
              <div key={d.id} className="text-sm text-gray-700 flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                {d.description}
              </div>
            ))}
          </Card>
        </div>

        {/* Access consent management */}
        <Card className="max-w-2xl mx-auto">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>🔐</span> Data Access Consents
          </h3>
          <div className="space-y-3">
            {[
              { org: 'Korle-Bu Teaching Hospital', type: 'Full EHR Access', granted: true, expires: '2025-01-01' },
              { org: 'Trust Hospital', type: 'Consultation Records', granted: true, expires: '2024-12-31' },
              { org: 'Ministry of Health (Research)', type: 'Anonymized Data', granted: false, expires: null },
            ].map((c, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{c.org}</p>
                  <p className="text-xs text-gray-500">{c.type}{c.expires && ` • Until ${c.expires}`}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={c.granted ? 'success' : 'default'} size="sm">
                    {c.granted ? 'Granted' : 'Denied'}
                  </Badge>
                  <Button size="sm" variant="ghost">{c.granted ? 'Revoke' : 'Grant'}</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
