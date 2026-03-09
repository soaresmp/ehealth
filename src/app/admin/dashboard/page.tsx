import { TopBar } from '@/components/layout/TopBar'
import { Card, CardHeader } from '@/components/ui/Card'
import { StatCard } from '@/components/ui/StatCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockPublicHealthData } from '@/lib/mock-data'
import { getSeverityColor } from '@/lib/utils'

export default function AdminDashboard() {
  const { diseaseStats, vaccinationCoverage, regionalData, antibioticUsage } = mockPublicHealthData

  return (
    <div className="animate-fade-in">
      <TopBar
        title="Public Health Dashboard"
        subtitle="Ghana Ministry of Health — National Health Intelligence"
        action={
          <div className="flex gap-2">
            <Button size="sm" variant="outline">📥 Export Report</Button>
            <Button size="sm" variant="primary">🚨 Declare Outbreak</Button>
          </div>
        }
      />
      <div className="p-6 space-y-6">
        {/* National stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Registered Patients" value="3.2M" trend={{ value: 12, label: 'vs last year' }} icon={<span>👥</span>} color="green" />
          <StatCard title="Active Providers" value="18,400" trend={{ value: 5, label: 'vs last year' }} icon={<span>🩺</span>} color="blue" />
          <StatCard title="Health Facilities" value="2,340" trend={{ value: 3, label: 'vs last year' }} icon={<span>🏥</span>} color="purple" />
          <StatCard title="e-Prescriptions (MTD)" value="124,500" trend={{ value: 22, label: 'vs last month' }} icon={<span>💊</span>} color="orange" />
        </div>

        {/* Outbreak alert */}
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 flex items-start gap-3">
          <span className="text-2xl">🚨</span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-bold text-red-800">ACTIVE ALERT: Malaria Surge — Northern Region</p>
              <Badge variant="error" size="sm">High Severity</Badge>
            </div>
            <p className="text-sm text-red-700 mt-1">
              Malaria cases in Northern Region increased by 34% over the past 2 weeks. 3 districts above epidemic threshold.
              Enhanced surveillance activated. ACT stockpile reallocation in progress.
            </p>
          </div>
          <Button size="sm" variant="danger">View Alert</Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Disease statistics */}
          <Card>
            <CardHeader title="Disease Burden (Nationwide)" icon={<span>🦠</span>} subtitle="Current month — active cases" />
            <div className="space-y-3">
              {diseaseStats.map(d => (
                <div key={d.disease} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{d.disease}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium ${d.change < 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {d.change > 0 ? '↑' : '↓'} {Math.abs(d.change)}%
                        </span>
                        <span className="font-semibold text-gray-900 text-sm">{d.cases.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          d.severity === 'high' ? 'bg-red-500' :
                          d.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${(d.cases / 50000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getSeverityColor(d.severity)}`}>
                    {d.severity}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Vaccination coverage */}
          <Card>
            <CardHeader title="Vaccination Coverage" icon={<span>💉</span>} subtitle="National targets vs actual coverage" />
            <div className="space-y-3">
              {vaccinationCoverage.map(v => (
                <div key={v.vaccine}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{v.vaccine}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">Target: {v.target}%</span>
                      <span className={`font-bold text-sm ${v.coverage >= v.target ? 'text-green-600' : 'text-orange-600'}`}>
                        {v.coverage}%
                      </span>
                    </div>
                  </div>
                  <div className="relative bg-gray-100 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all ${v.coverage >= v.target ? 'bg-green-500' : 'bg-orange-500'}`}
                      style={{ width: `${v.coverage}%` }}
                    ></div>
                    <div
                      className="absolute top-0 h-2.5 w-0.5 bg-gray-400 rounded"
                      style={{ left: `${v.target}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Regional breakdown */}
        <Card>
          <CardHeader title="Regional Health Dashboard" icon={<span>🗺️</span>} />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 uppercase tracking-wide bg-gray-50">
                  <th className="text-left px-4 py-2.5 rounded-l-lg">Region</th>
                  <th className="text-right px-4 py-2.5">Active Cases</th>
                  <th className="text-right px-4 py-2.5">Health Facilities</th>
                  <th className="text-right px-4 py-2.5">Healthcare Providers</th>
                  <th className="text-right px-4 py-2.5">Coverage Index</th>
                  <th className="px-4 py-2.5 rounded-r-lg"></th>
                </tr>
              </thead>
              <tbody>
                {regionalData.map((r, i) => (
                  <tr key={r.region} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-2.5 font-medium text-gray-900">{r.region}</td>
                    <td className="px-4 py-2.5 text-right text-gray-600">{r.cases.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right text-gray-600">{r.facilities}</td>
                    <td className="px-4 py-2.5 text-right text-gray-600">{r.providers.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 bg-gray-100 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${i < 2 ? 'bg-green-500' : i < 4 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${Math.min(100, (r.providers / r.cases) * 100000)}%` }}
                          ></div>
                        </div>
                        <span className={`text-xs font-medium ${i < 2 ? 'text-green-600' : i < 4 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {i < 2 ? 'Good' : i < 4 ? 'Fair' : 'Low'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <Button size="sm" variant="ghost">Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Antibiotic usage & AI */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="Antibiotic Usage Monitoring" icon={<span>💊</span>} subtitle="Antimicrobial resistance tracking" />
            <div className="space-y-2">
              {antibioticUsage.byClass.map(ab => (
                <div key={ab.class} className="flex items-center gap-3">
                  <span className="text-sm text-gray-700 w-32">{ab.class}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${ab.percentage}%` }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-16 text-right">{ab.count.toLocaleString()}</span>
                  <span className="text-xs text-gray-400 w-8">{ab.percentage}%</span>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-orange-50 border border-orange-200 rounded-xl p-3 text-sm text-orange-800">
              ⚠️ <strong>AMR Alert:</strong> Fluoroquinolone resistance detected in 12% of samples. Guidelines updated.
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-700 to-purple-700 text-white">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl">🤖</span>
              <div>
                <h3 className="font-semibold text-lg">AI Epidemiology Engine</h3>
                <p className="text-indigo-200 text-sm">Predictive analytics and early warning system</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { icon: '🔴', text: 'High malaria transmission risk in 5 northern districts — rainy season forecast', action: 'Pre-position ACT drugs' },
                { icon: '🟡', text: 'Meningitis B outbreak probability elevated in Upper East Region', action: 'Activate surveillance' },
                { icon: '🟢', text: 'COVID-19 wastewater surveillance: low circulating viral load nationally', action: 'Continue monitoring' },
                { icon: '🔵', text: 'Diabetes prevalence model: 18% increase projected in urban areas by 2026', action: 'Plan prevention program' },
              ].map((a, i) => (
                <div key={i} className="bg-white/10 rounded-xl p-3">
                  <div className="flex items-start gap-2">
                    <span>{a.icon}</span>
                    <div>
                      <p className="text-sm text-white">{a.text}</p>
                      <p className="text-xs text-indigo-200 mt-0.5">Recommended: {a.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Security & compliance */}
        <Card>
          <CardHeader title="Security & Data Governance" icon={<span>🔐</span>} />
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { label: 'Data Access Requests', value: '1,234', sub: 'All authorized', icon: '📋', ok: true },
              { label: 'MFA Compliance', value: '98.2%', sub: 'Of active users', icon: '🔒', ok: true },
              { label: 'Audit Logs', value: '2.3M', sub: 'Events this month', icon: '📑', ok: true },
              { label: 'Encryption Status', value: '100%', sub: 'End-to-end', icon: '🛡️', ok: true },
            ].map(s => (
              <div key={s.label} className={`rounded-xl p-4 border ${s.ok ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <span className="text-2xl">{s.icon}</span>
                <p className={`text-xl font-bold mt-1 ${s.ok ? 'text-green-700' : 'text-red-700'}`}>{s.value}</p>
                <p className="text-sm font-medium text-gray-700">{s.label}</p>
                <p className="text-xs text-gray-500">{s.sub}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
