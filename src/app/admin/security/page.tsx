import { TopBar } from '@/components/layout/TopBar'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const recentAuditLogs = [
  { time: '14:32:15', user: 'Dr. Kwame Asante', action: 'VIEW_PATIENT_RECORD', resource: 'Patient GH-2024-0001234', ip: '41.203.15.x', status: 'authorized' },
  { time: '14:28:02', user: 'Accra PharmaCare', action: 'DISPENSE_PRESCRIPTION', resource: 'RX-GH-20240301-001', ip: '197.255.22.x', status: 'authorized' },
  { time: '14:15:44', user: 'UNKNOWN', action: 'LOGIN_ATTEMPT', resource: 'System', ip: '102.89.45.x', status: 'failed' },
  { time: '13:55:10', user: 'Dr. Ama Boateng', action: 'CREATE_PRESCRIPTION', resource: 'Patient GH-2023-0005678', ip: '196.207.4.x', status: 'authorized' },
  { time: '13:40:22', user: 'Lab Tech - Korle-Bu', action: 'UPLOAD_LAB_RESULT', resource: 'Lab Order LAB-001', ip: '196.207.4.x', status: 'authorized' },
]

const securityMetrics = [
  { label: 'MFA Compliance', value: 98.2, target: 100, unit: '%', ok: true },
  { label: 'Encrypted Connections', value: 100, target: 100, unit: '%', ok: true },
  { label: 'Failed Login Rate', value: 0.8, target: '<2', unit: '%', ok: true },
  { label: 'Audit Log Coverage', value: 100, target: 100, unit: '%', ok: true },
]

export default function SecurityPage() {
  return (
    <div className="animate-fade-in">
      <TopBar title="Security & Privacy" subtitle="Data governance, access control, and audit logs" />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Security status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {securityMetrics.map(m => (
            <div key={m.label} className={`border rounded-xl p-4 text-center ${m.ok ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <p className={`text-2xl font-bold ${m.ok ? 'text-green-700' : 'text-red-700'}`}>{m.value}{m.unit}</p>
              <p className="text-sm text-gray-700 mt-1 font-medium">{m.label}</p>
              <p className="text-xs text-gray-400">Target: {m.target}{m.unit}</p>
            </div>
          ))}
        </div>

        {/* Security features */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="Security Architecture" icon={<span>🏗️</span>} />
            <div className="space-y-3">
              {[
                { feature: 'End-to-End Encryption', detail: 'AES-256 for data at rest, TLS 1.3 in transit', status: 'active' },
                { feature: 'Multi-Factor Authentication', detail: 'TOTP + SMS OTP + Biometric (mobile)', status: 'active' },
                { feature: 'Role-Based Access Control', detail: '7 roles with granular resource permissions', status: 'active' },
                { feature: 'Patient Consent Management', detail: 'Explicit consent required for data sharing', status: 'active' },
                { feature: 'Data Anonymization', detail: 'k-Anonymity + Differential privacy for research', status: 'active' },
                { feature: 'Intrusion Detection', detail: 'Real-time anomaly detection on access patterns', status: 'active' },
              ].map(f => (
                <div key={f.feature} className="flex items-start gap-3 p-3 bg-green-50 border border-green-100 rounded-xl">
                  <span className="text-green-500 mt-0.5">✅</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{f.feature}</p>
                    <p className="text-xs text-gray-500">{f.detail}</p>
                  </div>
                  <Badge variant="success" size="sm" className="ml-auto shrink-0">Active</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Compliance Status" icon={<span>📜</span>} />
            <div className="space-y-3">
              {[
                { standard: 'GDPR-style Privacy', region: 'EU Standard', status: 'compliant', score: 96 },
                { standard: 'HIPAA-like Standards', region: 'US Standard', status: 'compliant', score: 94 },
                { standard: 'ECOWAS Health Data Protocol', region: 'West Africa', status: 'compliant', score: 98 },
                { standard: 'WHO Digital Health Guidelines', region: 'Global', status: 'compliant', score: 91 },
                { standard: 'ISO 27001 Information Security', region: 'International', status: 'in_progress', score: 78 },
              ].map(c => (
                <div key={c.standard} className="border border-gray-100 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="font-medium text-gray-900 text-sm">{c.standard}</p>
                    <Badge variant={c.status === 'compliant' ? 'success' : 'warning'} size="sm">
                      {c.status === 'compliant' ? '✓ Compliant' : 'In Progress'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 mb-1.5">{c.region}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${c.score > 90 ? 'bg-green-500' : c.score > 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${c.score}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-gray-600">{c.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Audit logs */}
        <Card>
          <CardHeader
            title="Recent Audit Logs"
            subtitle="All data access and modifications are logged"
            icon={<span>📋</span>}
            action={<Button size="sm" variant="outline">Export Logs</Button>}
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase">
                  <th className="text-left px-4 py-2.5 rounded-l-lg">Time</th>
                  <th className="text-left px-4 py-2.5">User</th>
                  <th className="text-left px-4 py-2.5">Action</th>
                  <th className="text-left px-4 py-2.5">Resource</th>
                  <th className="text-left px-4 py-2.5">IP</th>
                  <th className="px-4 py-2.5 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAuditLogs.map((log, i) => (
                  <tr key={i} className={`border-t border-gray-50 ${log.status === 'failed' ? 'bg-red-50' : 'hover:bg-gray-50'}`}>
                    <td className="px-4 py-2.5 font-mono text-xs text-gray-500">{log.time}</td>
                    <td className="px-4 py-2.5 font-medium text-gray-700">{log.user}</td>
                    <td className="px-4 py-2.5">
                      <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">{log.action}</span>
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">{log.resource}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-gray-400">{log.ip}</td>
                    <td className="px-4 py-2.5">
                      <Badge variant={log.status === 'authorized' ? 'success' : 'error'} size="sm">
                        {log.status}
                      </Badge>
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
