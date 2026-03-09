import { TopBar } from '@/components/layout/TopBar'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockLabResults } from '@/lib/mock-data'
import { formatDate, getStatusColor } from '@/lib/utils'

const commonTests = [
  { name: 'Full Blood Count', code: 'FBC', category: 'Hematology' },
  { name: 'HbA1c', code: 'HBA1C', category: 'Biochemistry' },
  { name: 'Lipid Profile', code: 'LIPID', category: 'Biochemistry' },
  { name: 'Kidney Function Test', code: 'KFT', category: 'Biochemistry' },
  { name: 'Liver Function Test', code: 'LFT', category: 'Biochemistry' },
  { name: 'Thyroid Function Test', code: 'TFT', category: 'Biochemistry' },
  { name: 'Malaria RDT', code: 'MAL-RDT', category: 'Parasitology' },
  { name: 'Urine Analysis', code: 'UA', category: 'Urinalysis' },
]

export default function ProviderLabsPage() {
  return (
    <div className="animate-fade-in">
      <TopBar
        title="Laboratory Orders"
        subtitle="Order tests and view patient results"
        action={<Button size="sm" variant="primary">+ New Lab Order</Button>}
      />
      <div className="p-6 space-y-6">
        {/* Order form */}
        <Card>
          <CardHeader title="New Laboratory Order" icon={<span>🔬</span>} />
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Patient</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
                <span className="text-gray-400">🔍</span>
                <input type="text" placeholder="Search patient..." className="flex-1 outline-none text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Urgency</label>
              <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500">
                <option>Routine</option>
                <option>Urgent</option>
                <option>STAT (Immediate)</option>
              </select>
            </div>
          </div>

          <p className="text-sm font-medium text-gray-700 mb-2">Select Tests</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {commonTests.map(t => (
              <label key={t.code} className="flex items-center gap-2 border border-gray-200 rounded-xl p-3 cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors">
                <input type="checkbox" className="rounded" />
                <div>
                  <p className="text-sm font-medium text-gray-700">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.category}</p>
                </div>
              </label>
            ))}
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Laboratory</label>
              <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500">
                <option>Korle-Bu Central Lab</option>
                <option>Trust Hospital Lab</option>
                <option>KATH Lab Centre</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Clinical Notes</label>
              <input type="text" placeholder="Clinical indication..." className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500" />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" size="sm">Save Draft</Button>
            <Button variant="primary" size="sm">Submit Order</Button>
          </div>
        </Card>

        {/* Pending & recent results */}
        <Card>
          <CardHeader title="Patient Lab Orders & Results" icon={<span>📋</span>} />
          <div className="space-y-4">
            {mockLabResults.map(lab => (
              <div key={lab.id} className="border border-gray-100 rounded-xl overflow-hidden">
                <div className={`flex items-center justify-between p-4 ${lab.status !== 'COMPLETED' ? 'bg-yellow-50' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🔬</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(lab.status)}`}>
                          {lab.status.replace('_', ' ')}
                        </span>
                        <Badge variant={lab.urgency === 'urgent' ? 'error' : 'outline'} size="sm">
                          {lab.urgency}
                        </Badge>
                        {lab.tests.some(t => t.isAbnormal) && (
                          <Badge variant="error" size="sm">⚠ Abnormal Values</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-0.5">
                        Patient: Amara Mensah • {lab.tests.length} tests ordered
                      </p>
                      <p className="text-xs text-gray-400">
                        Ordered: {formatDate(lab.orderDate, 'time')}
                        {lab.completedDate && ` • Completed: ${formatDate(lab.completedDate)}`}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">View Full Report</Button>
                </div>
                {lab.status === 'COMPLETED' && (
                  <div className="p-4">
                    <div className="grid md:grid-cols-2 gap-2">
                      {lab.tests.filter(t => t.result).map((t, i) => (
                        <div key={i} className={`flex items-center justify-between text-sm p-2 rounded-lg ${t.isAbnormal ? 'bg-red-50' : 'bg-green-50'}`}>
                          <span className="font-medium text-gray-700">{t.testName}</span>
                          <span className={`font-bold ${t.isAbnormal ? 'text-red-600' : 'text-green-700'}`}>
                            {t.result} {t.unit}
                            {t.isAbnormal ? ' ⚠' : ' ✓'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
