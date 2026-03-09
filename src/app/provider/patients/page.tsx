import { TopBar } from '@/components/layout/TopBar'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockProviderDashboard } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'

const allPatients = [
  ...mockProviderDashboard.recentPatients,
  { id: 'pat-006', name: 'Akosua Frimpong', healthId: 'GH-2020-0011234', age: 58, condition: 'Asthma, Arthritis', lastVisit: '2024-02-20' },
  { id: 'pat-007', name: 'Nana Osei', healthId: 'GH-2019-0014567', age: 73, condition: 'COPD, Hypertension', lastVisit: '2024-02-18' },
  { id: 'pat-008', name: 'Efua Amponsah', healthId: 'GH-2023-0017890', age: 32, condition: 'Gestational Diabetes', lastVisit: '2024-02-15' },
]

export default function PatientsPage() {
  return (
    <div className="animate-fade-in">
      <TopBar
        title="My Patients"
        subtitle="Manage patient records and care"
        action={<Button size="sm" variant="primary">+ New Patient</Button>}
      />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Search */}
        <Card padding="sm">
          <div className="flex gap-3">
            <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5">
              <span className="text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search by name, Health ID, national ID, phone..."
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
            <select className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-green-500">
              <option>All Conditions</option>
              <option>Diabetes</option>
              <option>Hypertension</option>
              <option>Chronic Disease</option>
            </select>
            <Button size="md" variant="outline">Filters</Button>
          </div>
        </Card>

        {/* Patient list */}
        <Card padding="none">
          <div className="px-4 lg:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <p className="font-semibold text-gray-900">{allPatients.length} patients</p>
            <div className="flex gap-2">
              <button className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100">⬇ Export</button>
            </div>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-xs text-gray-500 uppercase tracking-wide bg-gray-50">
                <th className="text-left py-3 px-6">Patient</th>
                <th className="text-left py-3 px-4">Health ID</th>
                <th className="text-left py-3 px-4">Age</th>
                <th className="text-left py-3 px-4">Active Conditions</th>
                <th className="text-left py-3 px-4">Last Visit</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {allPatients.map((p, i) => (
                <tr key={p.id} className={`border-t border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                        {p.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-gray-900">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{p.healthId}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{p.age} yrs</td>
                  <td className="py-3 px-4 text-gray-600 max-w-48">
                    <div className="flex flex-wrap gap-1">
                      {p.condition.split(', ').map(c => (
                        <span key={c} className="bg-orange-50 text-orange-700 text-xs px-1.5 py-0.5 rounded-md">{c}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{formatDate(p.lastVisit)}</td>
                  <td className="py-3 px-4">
                    <Badge variant="success" size="sm">Active</Badge>
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex gap-1">
                      <Button size="sm" variant="primary">View EHR</Button>
                      <Button size="sm" variant="outline">Prescribe</Button>
                    </div>
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
