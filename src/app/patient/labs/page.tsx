import { TopBar } from '@/components/layout/TopBar'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockLabResults } from '@/lib/mock-data'
import { formatDate, getStatusColor } from '@/lib/utils'

export default function LabResultsPage() {
  return (
    <div className="animate-fade-in">
      <TopBar title="Lab Results" subtitle="Laboratory tests and diagnostic reports" />
      <div className="p-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Tests', value: mockLabResults.reduce((a, l) => a + l.tests.length, 0), color: 'text-blue-600' },
            { label: 'Abnormal Results', value: mockLabResults.flatMap(l => l.tests).filter(t => t.isAbnormal).length, color: 'text-red-600' },
            { label: 'Pending', value: mockLabResults.filter(l => l.status !== 'COMPLETED').length, color: 'text-yellow-600' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Lab orders */}
        <div className="space-y-4">
          {mockLabResults.map(lab => (
            <Card key={lab.id}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(lab.status)}`}>
                      {lab.status.replace('_', ' ')}
                    </span>
                    <Badge variant={lab.urgency === 'urgent' ? 'error' : 'outline'} size="sm">
                      {lab.urgency === 'urgent' ? '🔴 URGENT' : 'Routine'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Ordered by {lab.provider.firstName} {lab.provider.lastName} • {lab.facility}
                  </p>
                  <p className="text-xs text-gray-400">
                    Ordered: {formatDate(lab.orderDate, 'time')}
                    {lab.completedDate && ` • Completed: ${formatDate(lab.completedDate, 'time')}`}
                  </p>
                </div>
                <Button size="sm" variant="outline">📥 Download Report</Button>
              </div>

              {/* Tests */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                      <th className="text-left px-3 py-2 rounded-l-lg">Test</th>
                      <th className="text-left px-3 py-2">Code</th>
                      <th className="text-left px-3 py-2">Result</th>
                      <th className="text-left px-3 py-2">Unit</th>
                      <th className="text-left px-3 py-2">Reference Range</th>
                      <th className="text-left px-3 py-2 rounded-r-lg">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lab.tests.map((test, i) => (
                      <tr key={i} className={`border-t border-gray-50 ${test.isAbnormal ? 'bg-red-50/50' : ''}`}>
                        <td className="px-3 py-2.5">
                          <p className="font-medium text-gray-900">{test.testName}</p>
                          {test.interpretation && (
                            <p className="text-xs text-gray-400 mt-0.5">{test.interpretation}</p>
                          )}
                        </td>
                        <td className="px-3 py-2.5 font-mono text-xs text-gray-500">{test.testCode || '—'}</td>
                        <td className="px-3 py-2.5">
                          {test.result ? (
                            <span className={`font-semibold ${test.isAbnormal ? 'text-red-600' : 'text-gray-900'}`}>
                              {test.result}
                            </span>
                          ) : (
                            <span className="text-gray-400 italic">Pending</span>
                          )}
                        </td>
                        <td className="px-3 py-2.5 text-gray-500 text-xs">{test.unit || '—'}</td>
                        <td className="px-3 py-2.5 text-gray-500 text-xs">{test.referenceRange || '—'}</td>
                        <td className="px-3 py-2.5">
                          {test.result ? (
                            <Badge variant={test.isAbnormal ? 'error' : 'success'} size="sm">
                              {test.isAbnormal ? '⚠ Abnormal' : '✓ Normal'}
                            </Badge>
                          ) : (
                            <Badge variant="warning" size="sm">Pending</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ))}
        </div>

        {/* Notification info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <span className="text-blue-500 text-xl">🔔</span>
          <div>
            <p className="font-medium text-blue-900">Instant Result Notifications</p>
            <p className="text-sm text-blue-700 mt-0.5">
              You will receive SMS and app notifications as soon as your pending lab results are available.
              Abnormal results are flagged immediately to your care team.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
