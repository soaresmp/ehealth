import { TopBar } from '@/components/layout/TopBar'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockPublicHealthData } from '@/lib/mock-data'
import { getSeverityColor } from '@/lib/utils'

const outbreakAlerts = [
  { id: 'oa-001', disease: 'Malaria', region: 'Northern Region', districts: 3, cases: 1240, change: 34, status: 'active', date: '2024-03-01' },
  { id: 'oa-002', disease: 'Cholera', region: 'Volta Region', districts: 1, cases: 89, change: 156, status: 'investigating', date: '2024-03-03' },
  { id: 'oa-003', disease: 'Meningitis', region: 'Upper East', districts: 2, cases: 45, change: 78, status: 'monitoring', date: '2024-03-05' },
]

export default function SurveillancePage() {
  return (
    <div className="animate-fade-in">
      <TopBar
        title="Disease Surveillance"
        subtitle="Real-time outbreak detection and monitoring"
        action={<Button size="sm" variant="danger">🚨 Declare Outbreak</Button>}
      />
      <div className="p-6 space-y-6">
        {/* Active outbreaks */}
        <Card>
          <CardHeader title="Active Outbreak Alerts" icon={<span>🚨</span>} />
          <div className="space-y-3">
            {outbreakAlerts.map(alert => (
              <div key={alert.id} className={`border-2 rounded-xl p-4 ${
                alert.status === 'active' ? 'border-red-300 bg-red-50' :
                alert.status === 'investigating' ? 'border-yellow-300 bg-yellow-50' :
                'border-blue-200 bg-blue-50'
              }`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{alert.disease} — {alert.region}</h3>
                      <Badge
                        variant={alert.status === 'active' ? 'error' : alert.status === 'investigating' ? 'warning' : 'info'}
                        size="sm"
                      >
                        {alert.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {alert.districts} district(s) affected • {alert.cases} cases reported
                    </p>
                    <p className="text-sm font-semibold text-red-600">
                      ↑ {alert.change}% increase from last week
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View Map</Button>
                    <Button size="sm" variant="primary">Manage Response</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Disease trend table */}
        <Card>
          <CardHeader title="National Disease Statistics" icon={<span>📊</span>} subtitle="Current month — all regions" />
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase">
                <th className="text-left px-4 py-2.5 rounded-l-lg">Disease</th>
                <th className="text-right px-4 py-2.5">Active Cases</th>
                <th className="text-right px-4 py-2.5">Change vs Last Month</th>
                <th className="text-right px-4 py-2.5">Severity</th>
                <th className="px-4 py-2.5 rounded-r-lg"></th>
              </tr>
            </thead>
            <tbody>
              {mockPublicHealthData.diseaseStats.map(d => (
                <tr key={d.disease} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{d.disease}</td>
                  <td className="px-4 py-3 text-right font-semibold">{d.cases.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-medium ${d.change < 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {d.change > 0 ? '↑' : '↓'} {Math.abs(d.change)}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${getSeverityColor(d.severity)}`}>
                      {d.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Button size="sm" variant="ghost">Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}
