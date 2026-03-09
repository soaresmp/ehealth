import { TopBar } from '@/components/layout/TopBar'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockPharmacyPrescriptions } from '@/lib/mock-data'
import { formatDate, getStatusColor } from '@/lib/utils'

export default function PharmacyPrescriptionsPage() {
  return (
    <div className="animate-fade-in">
      <TopBar
        title="Prescription Queue"
        subtitle="Electronic prescriptions pending dispensing"
        action={
          <div className="flex gap-2">
            <Button size="sm" variant="outline">🔍 Scan QR</Button>
            <Button size="sm" variant="primary">Enter Token</Button>
          </div>
        }
      />
      <div className="p-4 lg:p-6 space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search by patient name, Health ID, or prescription code..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500"
          />
          <select className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none">
            <option>All</option>
            <option>Pending</option>
            <option>Dispensed</option>
            <option>NHIS Only</option>
          </select>
        </div>

        {mockPharmacyPrescriptions.map(rx => (
          <Card key={rx.id}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="font-mono text-sm font-medium text-gray-700">{rx.prescriptionCode}</span>
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(rx.status)}`}>
                  {rx.status}
                </span>
                {rx.insuranceScheme && (
                  <Badge variant="info" size="sm" className="ml-2">{rx.insuranceScheme}</Badge>
                )}
              </div>
              <div className="text-xs text-gray-400 text-right">
                <p>Issued: {formatDate(rx.issuedAt)}</p>
                <p>Expires: {formatDate(rx.expiresAt)}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Patient</p>
                <p className="font-semibold text-gray-900">{rx.patient.name}</p>
                <p className="text-xs text-gray-500">ID: {rx.patient.healthId}</p>
                <p className="text-xs text-gray-500">DOB: {formatDate(rx.patient.dob)}</p>
                {rx.insuranceScheme && <p className="text-xs text-blue-600">Member: {rx.memberId}</p>}
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Prescriber</p>
                <p className="font-semibold text-gray-900">{rx.provider.name}</p>
                <p className="text-xs text-gray-500">{rx.provider.facility}</p>
              </div>
            </div>

            <table className="w-full text-sm mb-3">
              <thead>
                <tr className="bg-purple-50 text-xs text-gray-500 uppercase">
                  <th className="text-left px-3 py-2 rounded-l-lg">Medication</th>
                  <th className="text-center px-3 py-2">Qty</th>
                  <th className="text-center px-3 py-2">Form</th>
                  <th className="text-left px-3 py-2 rounded-r-lg">Instructions</th>
                </tr>
              </thead>
              <tbody>
                {rx.medications.map((med, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="px-3 py-2 font-medium text-gray-900">{med.name}</td>
                    <td className="px-3 py-2 text-center">{med.quantity}</td>
                    <td className="px-3 py-2 text-center capitalize">{med.form}</td>
                    <td className="px-3 py-2 text-gray-600 text-xs">{med.instructions}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between">
              <div className="text-sm text-green-700 font-medium flex items-center gap-1">
                <span>✅</span> Drug & allergy check passed — safe to dispense
              </div>
              <div className="flex gap-2">
                {rx.insuranceScheme && (
                  <Button size="sm" variant="outline">Verify Insurance</Button>
                )}
                <Button size="sm" variant="ghost">Partial</Button>
                <Button size="sm" className="bg-purple-700 text-white hover:bg-purple-800 px-4 py-1.5 text-sm rounded-lg transition-colors">
                  Dispense & Record
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
