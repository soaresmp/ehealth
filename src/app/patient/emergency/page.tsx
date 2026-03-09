import { TopBar } from '@/components/layout/TopBar'
import { Card } from '@/components/ui/Card'
import { mockPatient, mockAllergies, mockDiagnoses, mockVaccinations } from '@/lib/mock-data'
import { calculateAge, getBloodTypeLabel, getSeverityColor, formatDate } from '@/lib/utils'

export default function EmergencyPage() {
  return (
    <div className="animate-fade-in">
      <TopBar title="Emergency Information" subtitle="Critical health data for emergency responders" />
      <div className="p-6 space-y-6">
        {/* Emergency card */}
        <div className="bg-red-600 rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-bold">
                {mockPatient.firstName[0]}{mockPatient.lastName[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-mono">{mockPatient.healthId}</span>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">🚨 Emergency Card</span>
                </div>
                <h2 className="text-2xl font-bold mt-1">{mockPatient.firstName} {mockPatient.lastName}</h2>
                <p className="text-red-100">{calculateAge(mockPatient.dateOfBirth)} years old • {mockPatient.gender}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{getBloodTypeLabel(mockPatient.bloodType!)}</div>
              <div className="text-red-100 text-sm">Blood Type</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white/15 rounded-xl p-3">
              <p className="text-red-200 text-xs uppercase font-semibold mb-1">Emergency Contact</p>
              <p className="font-semibold">{mockPatient.emergencyContact.name}</p>
              <p className="text-sm text-red-100">{mockPatient.emergencyContact.phone}</p>
              <p className="text-xs text-red-200">{mockPatient.emergencyContact.relation}</p>
            </div>
            <div className="bg-white/15 rounded-xl p-3">
              <p className="text-red-200 text-xs uppercase font-semibold mb-1">Region</p>
              <p className="font-semibold">{mockPatient.region}</p>
              <p className="text-sm text-red-100">{mockPatient.district}</p>
            </div>
            <div className="bg-white/15 rounded-xl p-3">
              <p className="text-red-200 text-xs uppercase font-semibold mb-1">Nationality</p>
              <p className="font-semibold">{mockPatient.nationality}</p>
              <p className="text-sm text-red-100">National ID: {mockPatient.nationalId}</p>
            </div>
            <div className="bg-white/15 rounded-xl p-3">
              <p className="text-red-200 text-xs uppercase font-semibold mb-1">Contact</p>
              <p className="font-semibold text-sm">{mockPatient.phone}</p>
              <p className="text-sm text-red-100">{mockPatient.email}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Critical allergies */}
          <Card className="border-red-200">
            <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
              <span>⚠️</span> Critical Allergies
            </h3>
            <div className="space-y-2">
              {mockAllergies.map(a => (
                <div key={a.id} className={`rounded-xl p-3 ${getSeverityColor(a.severity)}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{a.allergen}</p>
                      <p className="text-xs capitalize mt-0.5">{a.type} allergen • Reaction: {a.reaction}</p>
                    </div>
                    <span className="text-xs font-bold uppercase bg-current/10 px-2 py-1 rounded-lg">
                      {a.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
              ⚠️ <strong>CRITICAL:</strong> Patient has severe Penicillin allergy — risk of anaphylaxis. Avoid all penicillin-based antibiotics.
            </div>
          </Card>

          {/* Chronic conditions */}
          <Card>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>🩺</span> Active Chronic Conditions
            </h3>
            <div className="space-y-3">
              {mockDiagnoses.filter(d => d.isActive && d.type === 'chronic').map(d => (
                <div key={d.id} className="border-l-4 border-orange-400 pl-3 py-1">
                  <p className="font-semibold text-gray-900">{d.description}</p>
                  <p className="text-xs text-gray-500">ICD-10: {d.icdCode} • Since {formatDate(d.onsetDate!)}</p>
                  {d.notes && <p className="text-xs text-gray-400 mt-0.5">{d.notes}</p>}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Current Medications</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  <span>Metformin 500mg — twice daily</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  <span>Lisinopril 10mg — once daily</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Vaccination status */}
        <Card>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>💉</span> Vaccination Records
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {mockVaccinations.map(v => (
              <div key={v.id} className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl p-3">
                <span className="text-xl">💉</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{v.vaccineName}</p>
                  <p className="text-xs text-gray-500">Dose {v.doseNumber} • {formatDate(v.administeredAt)}</p>
                  <p className="text-xs text-gray-400">{v.facility} • Batch: {v.batchNumber}</p>
                </div>
                <span className="text-green-600 text-lg">✓</span>
              </div>
            ))}
          </div>
        </Card>

        {/* QR Emergency Access */}
        <Card className="text-center">
          <h3 className="font-semibold text-gray-900 mb-2">Emergency QR Code</h3>
          <p className="text-sm text-gray-500 mb-4">
            Scan this code to instantly access emergency health information — no login required
          </p>
          <div className="inline-block border-2 border-gray-200 rounded-xl p-4">
            <div className="grid grid-cols-7 gap-0.5">
              {Array.from({length: 49}).map((_, i) => (
                <div key={i} className={`w-4 h-4 rounded-sm ${Math.random() > 0.4 ? 'bg-gray-900' : 'bg-white'}`}></div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2 font-mono">{mockPatient.healthId}</p>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Contains: Blood type, allergies, conditions, emergency contacts, medications
          </p>
        </Card>
      </div>
    </div>
  )
}
