import { TopBar } from '@/components/layout/TopBar'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { mockVaccinations } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'

const vaccinationSchedule = [
  { vaccine: 'Influenza (Annual)', nextDue: '2024-11-01', status: 'upcoming' },
  { vaccine: 'COVID-19 Booster', nextDue: '2024-06-15', status: 'due_soon' },
  { vaccine: 'Hepatitis B (Booster)', nextDue: '2029-03-14', status: 'ok' },
]

export default function VaccinationsPage() {
  return (
    <div className="animate-fade-in">
      <TopBar title="Vaccination Records" subtitle="Complete immunization history and upcoming vaccines" />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* International vaccine certificate */}
        <div className="bg-gradient-to-r from-green-700 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-200 text-sm">International Certificate of Vaccination</p>
              <h2 className="text-xl font-bold mt-1">Amara Mensah</h2>
              <p className="text-green-100 font-mono text-sm">GH-2024-0001234</p>
              <p className="text-green-200 text-sm mt-1">WHO Yellow Card — Digital Version</p>
            </div>
            <div className="text-right">
              <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-4xl">🌍</span>
              </div>
              <p className="text-xs text-green-200 mt-1">Valid for travel</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Vaccination history */}
          <Card>
            <CardHeader title="Vaccination History" icon={<span>💉</span>} />
            <div className="space-y-3">
              {mockVaccinations.map(v => (
                <div key={v.id} className="flex items-start gap-3 border border-green-100 rounded-xl p-3 bg-green-50">
                  <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-green-700 text-sm font-bold mt-0.5">
                    {v.doseNumber}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 text-sm">{v.vaccineName}</p>
                      <Badge variant="success" size="sm">✓ Received</Badge>
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Dose {v.doseNumber} • {formatDate(v.administeredAt, 'long')}
                    </p>
                    <p className="text-xs text-gray-500">{v.facility}</p>
                    <p className="text-xs text-gray-400 font-mono">Batch: {v.batchNumber}</p>
                  </div>
                  <span className="text-green-600 text-xl">✓</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming vaccines */}
          <div className="space-y-4">
            <Card>
              <CardHeader title="Upcoming Vaccinations" icon={<span>📅</span>} />
              <div className="space-y-3">
                {vaccinationSchedule.map(v => (
                  <div key={v.vaccine} className={`flex items-center gap-3 rounded-xl p-3 border ${
                    v.status === 'due_soon' ? 'bg-yellow-50 border-yellow-200' :
                    v.status === 'upcoming' ? 'bg-blue-50 border-blue-200' :
                    'bg-gray-50 border-gray-100'
                  }`}>
                    <span className="text-xl">
                      {v.status === 'due_soon' ? '⚠️' : v.status === 'upcoming' ? '📅' : '✅'}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{v.vaccine}</p>
                      <p className="text-xs text-gray-500">Due: {formatDate(v.nextDue, 'long')}</p>
                    </div>
                    <Badge
                      variant={v.status === 'due_soon' ? 'warning' : v.status === 'upcoming' ? 'info' : 'success'}
                      size="sm"
                    >
                      {v.status === 'due_soon' ? 'Due Soon' : v.status === 'upcoming' ? 'Upcoming' : 'OK'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-blue-700 text-white">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <h3 className="font-semibold">Vaccine QR Pass</h3>
                  <p className="text-blue-100 text-sm mt-1">
                    Your COVID-19 vaccination certificate is valid for international travel. Share your QR code at border control.
                  </p>
                  <button className="mt-2 bg-white text-blue-700 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                    Show QR Pass
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
