import { TopBar } from '@/components/layout/TopBar'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockPrescriptions } from '@/lib/mock-data'
import { formatDate, getStatusColor } from '@/lib/utils'

export default function ProviderPrescriptionsPage() {
  return (
    <div className="animate-fade-in">
      <TopBar
        title="Electronic Prescriptions"
        subtitle="Issue and manage digital prescriptions"
        action={<Button size="sm" variant="primary">+ New Prescription</Button>}
      />
      <div className="p-6 space-y-6">
        {/* New prescription form */}
        <Card>
          <CardHeader title="Issue New e-Prescription" icon={<span>💊</span>} />
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Patient</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
                <span className="text-gray-400">🔍</span>
                <input type="text" placeholder="Search patient by name or Health ID..." className="flex-1 outline-none text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Validity Period</label>
              <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500">
                <option>30 days</option>
                <option>60 days</option>
                <option>90 days</option>
              </select>
            </div>
          </div>

          {/* Medication entry */}
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Medications</p>
            <div className="border border-gray-200 rounded-xl p-4 space-y-3">
              <div className="grid grid-cols-5 gap-2 text-xs font-semibold text-gray-500 uppercase px-1">
                <span className="col-span-2">Drug Name</span>
                <span>Dosage</span>
                <span>Frequency</span>
                <span>Duration</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <div className="col-span-2">
                  <input type="text" placeholder="Drug name or generic" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
                </div>
                <input type="text" placeholder="500mg" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
                <select className="border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-green-500">
                  <option>Once daily</option>
                  <option>Twice daily</option>
                  <option>Three times daily</option>
                </select>
                <input type="text" placeholder="7 days" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
              </div>

              {/* Drug interaction check */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-2">
                <span className="text-green-500">✅</span>
                <p className="text-sm text-green-700">Drug interaction check passed — no known interactions with patient&apos;s current medications</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
                <span className="text-amber-500">⚠️</span>
                <div>
                  <p className="text-sm font-medium text-amber-800">Allergy Alert</p>
                  <p className="text-sm text-amber-700">Patient has documented Penicillin allergy (Severity: Severe). Avoid amoxicillin, ampicillin, and all β-lactam antibiotics.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <Button variant="ghost" size="sm">+ Add Another Medication</Button>
            <div className="flex-1"></div>
            <Button variant="outline" size="sm">Save Draft</Button>
            <Button variant="primary" size="sm">Issue Prescription & Generate QR</Button>
          </div>
        </Card>

        {/* Recent prescriptions */}
        <Card>
          <CardHeader title="Recently Issued Prescriptions" icon={<span>📋</span>} />
          <div className="space-y-3">
            {mockPrescriptions.map(rx => (
              <div key={rx.id} className="border border-gray-100 rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">💊</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm text-gray-700 font-medium">{rx.prescriptionCode}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(rx.status)}`}>
                      {rx.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Patient: Amara Mensah • {rx.medications.length} medication(s)
                  </p>
                  <p className="text-xs text-gray-400">
                    Issued: {formatDate(rx.issuedAt)} • Expires: {formatDate(rx.expiresAt)}
                    {rx.refillsAllowed > 0 && ` • ${rx.refillsAllowed - rx.refillsUsed} refills remaining`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost">View</Button>
                  {rx.status === 'PENDING' && <Button size="sm" variant="outline">Cancel</Button>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
