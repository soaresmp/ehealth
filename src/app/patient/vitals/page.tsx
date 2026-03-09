import { TopBar } from '@/components/layout/TopBar'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { mockVitals } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'

export default function VitalsPage() {
  const latest = mockVitals[0]
  return (
    <div className="animate-fade-in">
      <TopBar title="Vital Signs" subtitle="Track your health measurements over time" />
      <div className="p-6 space-y-6">
        {/* Latest reading */}
        <Card className="bg-gradient-to-r from-green-700 to-emerald-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-green-200 text-sm">Latest Vital Signs</p>
              <p className="font-semibold">{formatDate(latest.recordedAt, 'time')}</p>
            </div>
            <Badge variant="success" size="md">All Normal</Badge>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { label: 'Blood Pressure', value: `${latest.bloodPressureSystolic}/${latest.bloodPressureDiastolic}`, unit: 'mmHg', icon: '🩸' },
              { label: 'Heart Rate', value: latest.heartRate, unit: 'bpm', icon: '💓' },
              { label: 'Temperature', value: latest.temperature, unit: '°C', icon: '🌡️' },
              { label: 'SpO₂', value: `${latest.oxygenSaturation}%`, unit: '', icon: '🫁' },
              { label: 'Blood Glucose', value: latest.bloodGlucose, unit: 'mmol/L', icon: '🍬' },
              { label: 'BMI', value: latest.bmi, unit: '', icon: '⚖️' },
            ].map((v) => (
              <div key={v.label} className="bg-white/15 rounded-xl p-3 text-center">
                <span className="text-2xl">{v.icon}</span>
                <p className="text-xl font-bold mt-1">{v.value}</p>
                {v.unit && <p className="text-xs text-green-200">{v.unit}</p>}
                <p className="text-xs text-green-100 mt-0.5">{v.label}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* History */}
        <Card>
          <CardHeader title="Vital Signs History" icon={<span>📈</span>} />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                  <th className="text-left px-4 py-2.5 rounded-l-lg">Date & Time</th>
                  <th className="text-center px-4 py-2.5">Blood Pressure</th>
                  <th className="text-center px-4 py-2.5">Heart Rate</th>
                  <th className="text-center px-4 py-2.5">Temp (°C)</th>
                  <th className="text-center px-4 py-2.5">SpO₂</th>
                  <th className="text-center px-4 py-2.5">Glucose</th>
                  <th className="text-center px-4 py-2.5">Weight (kg)</th>
                  <th className="text-center px-4 py-2.5 rounded-r-lg">Source</th>
                </tr>
              </thead>
              <tbody>
                {mockVitals.map((v, i) => (
                  <tr key={v.id} className={`border-t border-gray-50 ${i === 0 ? 'bg-green-50/30' : 'hover:bg-gray-50'}`}>
                    <td className="px-4 py-3 font-medium text-gray-700">{formatDate(v.recordedAt, 'time')}</td>
                    <td className="px-4 py-3 text-center">{v.bloodPressureSystolic}/{v.bloodPressureDiastolic}</td>
                    <td className="px-4 py-3 text-center">{v.heartRate}</td>
                    <td className="px-4 py-3 text-center">{v.temperature}</td>
                    <td className="px-4 py-3 text-center">{v.oxygenSaturation}%</td>
                    <td className="px-4 py-3 text-center">{v.bloodGlucose}</td>
                    <td className="px-4 py-3 text-center">{v.weight}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant={v.source === 'wearable' ? 'info' : 'outline'} size="sm" className="capitalize">{v.source}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Log new reading */}
        <Card>
          <CardHeader title="Record New Vital Signs" icon={<span>➕</span>} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {['BP Systolic', 'BP Diastolic', 'Heart Rate', 'Temperature (°C)', 'Weight (kg)', 'Blood Glucose'].map(f => (
              <div key={f}>
                <label className="block text-xs font-medium text-gray-500 mb-1">{f}</label>
                <input
                  type="number"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                  placeholder="—"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-3">
            <button className="bg-green-700 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-green-800 transition-colors">
              Save Reading
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
