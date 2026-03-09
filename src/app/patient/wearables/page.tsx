import { TopBar } from '@/components/layout/TopBar'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { mockWearableData } from '@/lib/mock-data'

const connectedDevices = [
  { name: 'Fitbit Charge 6', type: 'fitness_tracker', status: 'connected', battery: 78, lastSync: '5 min ago', icon: '⌚', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { name: 'Glucometer Pro', type: 'glucose_monitor', status: 'connected', battery: 45, lastSync: '2 hours ago', icon: '🩸', color: 'bg-red-50 border-red-200 text-red-700' },
  { name: 'BP Monitor Home', type: 'bp_monitor', status: 'disconnected', battery: null, lastSync: '3 days ago', icon: '🫀', color: 'bg-gray-50 border-gray-200 text-gray-500' },
]

export default function WearablesPage() {
  const latest = mockWearableData[0]

  return (
    <div className="animate-fade-in">
      <TopBar title="Health Monitoring" subtitle="Wearable devices and continuous health tracking" />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Connected devices */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Connected Devices</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {connectedDevices.map(d => (
              <div key={d.name} className={`border rounded-xl p-4 ${d.color}`}>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-3xl">{d.icon}</span>
                  <Badge variant={d.status === 'connected' ? 'success' : 'default'} size="sm">
                    {d.status === 'connected' ? '🟢 Connected' : '⚫ Disconnected'}
                  </Badge>
                </div>
                <p className="font-semibold">{d.name}</p>
                <p className="text-xs mt-1 capitalize opacity-75">{d.type.replace('_', ' ')}</p>
                <div className="flex items-center justify-between mt-2 text-xs opacity-75">
                  <span>Last sync: {d.lastSync}</span>
                  {d.battery && <span>🔋 {d.battery}%</span>}
                </div>
                {d.status === 'disconnected' && (
                  <button className="mt-2 text-xs bg-white/50 px-3 py-1.5 rounded-lg w-full hover:bg-white/70 transition-colors">
                    Reconnect
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Today's stats */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Today&apos;s Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Heart Rate', value: latest.heartRate, unit: 'bpm', icon: '💓', normal: true },
              { label: 'Steps', value: latest.steps.toLocaleString(), unit: 'steps', icon: '👟', normal: true },
              { label: 'Sleep', value: latest.sleep, unit: 'hrs', icon: '😴', normal: true },
              { label: 'Blood Glucose', value: latest.bloodGlucose, unit: 'mmol/L', icon: '🩸', normal: true },
              { label: 'Blood Pressure', value: latest.bloodPressure, unit: 'mmHg', icon: '🫀', normal: true },
              { label: 'Active Mins', value: 42, unit: 'min', icon: '🏃', normal: true },
            ].map(m => (
              <div key={m.label} className="bg-white border border-gray-100 rounded-xl p-3 text-center shadow-sm">
                <span className="text-2xl">{m.icon}</span>
                <p className="text-xl font-bold text-gray-900 mt-1">{m.value}</p>
                <p className="text-xs text-gray-400">{m.unit}</p>
                <p className="text-xs text-gray-500 mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7-day trend */}
        <Card>
          <CardHeader title="7-Day Health Trends" subtitle="Continuous monitoring from connected devices" icon={<span>📈</span>} />
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase">
                  <th className="text-left px-3 py-2 rounded-l-lg">Date</th>
                  <th className="px-3 py-2 text-center">Heart Rate</th>
                  <th className="px-3 py-2 text-center">Steps</th>
                  <th className="px-3 py-2 text-center">Sleep</th>
                  <th className="px-3 py-2 text-center">Blood Glucose</th>
                  <th className="px-3 py-2 text-center rounded-r-lg">Blood Pressure</th>
                </tr>
              </thead>
              <tbody>
                {mockWearableData.map((d, i) => (
                  <tr key={d.date} className={`border-t border-gray-50 ${i === 0 ? 'bg-green-50/50' : ''}`}>
                    <td className="px-3 py-2.5 font-medium text-gray-700">
                      {i === 0 ? <span className="text-green-700">Today</span> : d.date}
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className={d.heartRate > 80 ? 'text-orange-600 font-medium' : ''}>{d.heartRate} bpm</span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <div className="flex items-center gap-1 justify-center">
                        {d.steps.toLocaleString()}
                        {d.steps >= 8000 ? <span className="text-green-500 text-xs">✓</span> : null}
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className={d.sleep < 7 ? 'text-orange-600' : 'text-green-600'}>{d.sleep}h</span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className={d.bloodGlucose > 5.6 ? 'text-orange-600 font-medium' : ''}>{d.bloodGlucose}</span>
                    </td>
                    <td className="px-3 py-2.5 text-center text-gray-600">{d.bloodPressure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* AI insights */}
        <Card className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">🤖</div>
            <div>
              <h3 className="font-semibold text-lg">AI Health Insights</h3>
              <p className="text-purple-100 text-sm mt-1">Based on your wearable data and medical history</p>
              <div className="mt-3 space-y-2">
                {[
                  { icon: '⚠️', text: 'Blood glucose trending slightly high over the past 3 days. Consider reducing refined carbohydrates.', severity: 'warning' },
                  { icon: '✅', text: 'Heart rate variability is within normal range, indicating good cardiovascular stress management.', severity: 'ok' },
                  { icon: '💤', text: 'Average sleep of 7.1 hours this week — meeting the recommended 7-9 hours target.', severity: 'ok' },
                  { icon: '🏃', text: 'Step count below 8,000/day target on 4 of 7 days. Increasing daily activity recommended.', severity: 'info' },
                ].map((i, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-white/10 rounded-xl px-3 py-2">
                    <span>{i.icon}</span>
                    <p className="text-sm text-purple-100">{i.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
