import { TopBar } from '@/components/layout/TopBar'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const claims = [
  { id: 'CLM-001', patient: 'Amara Mensah', type: 'Prescription', amount: 85.00, scheme: 'NHIS', status: 'APPROVED', date: '2024-03-01' },
  { id: 'CLM-002', patient: 'Kweku Boateng', type: 'Consultation', amount: 50.00, scheme: 'NHIS', status: 'UNDER_REVIEW', date: '2024-03-01' },
  { id: 'CLM-003', patient: 'Yaw Asante', type: 'Hospitalization', amount: 1250.00, scheme: 'NHIS', status: 'SUBMITTED', date: '2024-02-28' },
  { id: 'CLM-004', patient: 'UNKNOWN_PATIENT', type: 'Prescription', amount: 450.00, scheme: 'NHIS', status: 'REJECTED', date: '2024-02-27' },
]

const statusColors: Record<string, string> = {
  APPROVED: 'bg-green-100 text-green-700',
  UNDER_REVIEW: 'bg-yellow-100 text-yellow-700',
  SUBMITTED: 'bg-blue-100 text-blue-700',
  REJECTED: 'bg-red-100 text-red-700',
  PAID: 'bg-gray-100 text-gray-700',
}

export default function InsurancePage() {
  return (
    <div className="animate-fade-in">
      <TopBar title="Insurance & Reimbursement" subtitle="NHIS and private insurance claim management" />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Claims This Month', value: '3,456', color: 'text-blue-600' },
            { label: 'Total Claimed', value: 'GHS 2.3M', color: 'text-green-600' },
            { label: 'Pending Review', value: '234', color: 'text-yellow-600' },
            { label: 'Fraud Flagged', value: '12', color: 'text-red-600' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* NHIS fraud alert */}
        <Card className="bg-red-50 border-red-200">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🚨</span>
            <div className="flex-1">
              <p className="font-semibold text-red-900">Fraud Alert — AI Detection</p>
              <p className="text-sm text-red-700 mt-1">
                AI system flagged 12 suspicious claims with unusually high prescription values for non-chronic patients.
                Pattern consistent with identity theft or prescription fraud.
              </p>
            </div>
            <Button size="sm" variant="danger">Investigate</Button>
          </div>
        </Card>

        <Card>
          <CardHeader title="Recent Insurance Claims" icon={<span>🏦</span>} />
          <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase">
                <th className="text-left px-4 py-2.5">Claim ID</th>
                <th className="text-left px-4 py-2.5">Patient</th>
                <th className="text-left px-4 py-2.5">Type</th>
                <th className="text-right px-4 py-2.5">Amount</th>
                <th className="text-left px-4 py-2.5">Scheme</th>
                <th className="text-left px-4 py-2.5">Date</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5"></th>
              </tr>
            </thead>
            <tbody>
              {claims.map(c => (
                <tr key={c.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-2.5 font-mono text-xs">{c.id}</td>
                  <td className="px-4 py-2.5 font-medium text-gray-900">{c.patient}</td>
                  <td className="px-4 py-2.5 text-gray-600">{c.type}</td>
                  <td className="px-4 py-2.5 text-right font-semibold">GHS {c.amount.toFixed(2)}</td>
                  <td className="px-4 py-2.5">{c.scheme}</td>
                  <td className="px-4 py-2.5 text-gray-500">{c.date}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[c.status] || 'bg-gray-100 text-gray-600'}`}>
                      {c.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <Button size="sm" variant="ghost">Review</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
