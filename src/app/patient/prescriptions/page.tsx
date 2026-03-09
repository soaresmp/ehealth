import { TopBar } from '@/components/layout/TopBar'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockPrescriptions } from '@/lib/mock-data'
import { formatDate, getStatusColor } from '@/lib/utils'

export default function PrescriptionsPage() {
  return (
    <div className="animate-fade-in">
      <TopBar title="My Prescriptions" subtitle="View and manage your digital prescriptions" />
      <div className="p-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active', count: mockPrescriptions.filter(p => p.status === 'PENDING').length, color: 'bg-yellow-50 border-yellow-100 text-yellow-700' },
            { label: 'Dispensed', count: mockPrescriptions.filter(p => p.status === 'DISPENSED').length, color: 'bg-green-50 border-green-100 text-green-700' },
            { label: 'Total', count: mockPrescriptions.length, color: 'bg-blue-50 border-blue-100 text-blue-700' },
            { label: 'Refills Available', count: mockPrescriptions.reduce((a, p) => a + (p.refillsAllowed - p.refillsUsed), 0), color: 'bg-purple-50 border-purple-100 text-purple-700' },
          ].map(s => (
            <div key={s.label} className={`border rounded-xl p-4 text-center ${s.color}`}>
              <p className="text-2xl font-bold">{s.count}</p>
              <p className="text-sm font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Prescriptions list */}
        <div className="space-y-4">
          {mockPrescriptions.map(rx => (
            <Card key={rx.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row gap-4">
                {/* QR Code placeholder */}
                <div className="md:w-32 flex-shrink-0">
                  <div className="w-32 h-32 bg-gray-50 border border-gray-200 rounded-xl flex flex-col items-center justify-center text-center p-2">
                    <div className="grid grid-cols-3 gap-0.5 mb-2">
                      {Array.from({length: 9}).map((_, i) => (
                        <div key={i} className={`w-4 h-4 rounded-sm ${Math.random() > 0.5 ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 font-mono">{rx.digitalToken.slice(0, 8)}</p>
                    <p className="text-xs text-gray-400 mt-0.5">QR Code</p>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm text-gray-600 font-medium">{rx.prescriptionCode}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(rx.status)}`}>
                          {rx.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Prescribed by {rx.provider.firstName} {rx.provider.lastName} • {rx.provider.specialization}
                      </p>
                      <p className="text-sm text-gray-500">{rx.facility}</p>
                    </div>
                    <div className="text-right text-xs text-gray-400">
                      <p>Issued: {formatDate(rx.issuedAt)}</p>
                      <p>Expires: {formatDate(rx.expiresAt)}</p>
                    </div>
                  </div>

                  {/* Medications table */}
                  <div className="bg-gray-50 rounded-xl overflow-hidden">
                    <div className="grid grid-cols-5 px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                      <span className="col-span-2">Medication</span>
                      <span>Dosage & Form</span>
                      <span>Frequency</span>
                      <span>Duration</span>
                    </div>
                    {rx.medications.map((med, i) => (
                      <div key={i} className={`grid grid-cols-5 px-3 py-2.5 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <div className="col-span-2">
                          <p className="font-medium text-gray-900">{med.medicationName}</p>
                          {med.genericName && <p className="text-xs text-gray-400">{med.genericName}</p>}
                        </div>
                        <div>
                          <p>{med.dosage}</p>
                          <p className="text-xs text-gray-400 capitalize">{med.form}</p>
                        </div>
                        <p className="text-gray-600">{med.frequency}</p>
                        <p className="text-gray-600">{med.duration}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      {rx.refillsAllowed > 0 && (
                        <span className="flex items-center gap-1">
                          🔄 {rx.refillsAllowed - rx.refillsUsed} refills remaining
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {rx.status === 'PENDING' && (
                        <Button href="/patient/appointments" size="sm" variant="outline">
                          📍 Find Pharmacy
                        </Button>
                      )}
                      {rx.refillsAllowed > rx.refillsUsed && rx.status === 'DISPENSED' && (
                        <Button size="sm" variant="primary">
                          Request Refill
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        📥 Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Drug interaction & safety notice */}
        <Card className="bg-amber-50 border-amber-200">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-semibold text-amber-900">Medication Safety Check</h3>
              <p className="text-sm text-amber-800 mt-1">
                Our system continuously monitors your prescriptions for drug interactions and allergy conflicts.
                Your current medications have been checked and are safe to use together.
              </p>
              <div className="flex gap-2 mt-2">
                <Badge variant="success" size="sm">✓ No drug interactions detected</Badge>
                <Badge variant="success" size="sm">✓ No allergy conflicts</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
