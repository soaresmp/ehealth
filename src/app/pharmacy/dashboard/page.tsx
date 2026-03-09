import { TopBar } from '@/components/layout/TopBar'
import { Card, CardHeader } from '@/components/ui/Card'
import { StatCard } from '@/components/ui/StatCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockPharmacyPrescriptions } from '@/lib/mock-data'
import { formatDate, getStatusColor } from '@/lib/utils'

const lowStockItems = [
  { drug: 'Metformin 500mg', available: 120, min: 500, unit: 'tablets' },
  { drug: 'Artemether-Lumefantrine 80/480mg', available: 48, min: 200, unit: 'tablets' },
  { drug: 'Amoxicillin 500mg capsules', available: 85, min: 300, unit: 'capsules' },
]

export default function PharmacyDashboard() {
  return (
    <div className="animate-fade-in">
      <TopBar
        title="Pharmacy Dashboard"
        subtitle="Accra PharmaCare — Osu, Greater Accra"
        action={
          <div className="flex gap-2">
            <Button size="sm" variant="outline">🔍 Scan QR Code</Button>
            <Button size="sm" variant="primary">Enter Token</Button>
          </div>
        }
      />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Pending Prescriptions" value={mockPharmacyPrescriptions.length} subtitle="Awaiting dispensing" icon={<span>💊</span>} color="orange" />
          <StatCard title="Dispensed Today" value={34} subtitle="14 NHIS, 20 private" icon={<span>✅</span>} color="green" />
          <StatCard title="NHIS Claims" value="GHS 2,450" subtitle="Pending reimbursement" icon={<span>🏦</span>} color="blue" />
          <StatCard title="Low Stock Alerts" value={lowStockItems.length} subtitle="Items need reorder" icon={<span>⚠️</span>} color="red" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Prescription queue */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader title="Prescription Queue" icon={<span>💊</span>} subtitle={`${mockPharmacyPrescriptions.length} prescriptions pending`} />

              {/* QR scanner */}
              <div className="mb-4 bg-purple-50 border border-purple-200 rounded-xl p-4 flex items-center gap-4">
                <div className="w-16 h-16 bg-white border-2 border-dashed border-purple-300 rounded-xl flex items-center justify-center">
                  <span className="text-3xl">📷</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-purple-900 text-sm">Scan or Enter Prescription</p>
                  <p className="text-xs text-purple-600 mt-0.5">Scan patient QR code or enter digital token</p>
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      placeholder="Enter digital token..."
                      className="flex-1 border border-purple-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-purple-500"
                    />
                    <button className="bg-purple-700 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-purple-800 transition-colors">
                      Look Up
                    </button>
                  </div>
                </div>
              </div>

              {/* Prescriptions */}
              <div className="space-y-3">
                {mockPharmacyPrescriptions.map(rx => (
                  <div key={rx.id} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm font-medium text-gray-700">{rx.prescriptionCode}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(rx.status)}`}>
                            {rx.status}
                          </span>
                          {rx.insuranceScheme && (
                            <Badge variant="info" size="sm">{rx.insuranceScheme}</Badge>
                          )}
                        </div>
                        <p className="font-semibold text-gray-900">{rx.patient.name}</p>
                        <p className="text-xs text-gray-500">
                          ID: {rx.patient.healthId} • DOB: {formatDate(rx.patient.dob)}
                        </p>
                        <p className="text-xs text-gray-400">
                          Prescribed by: {rx.provider.name} • {rx.provider.facility}
                        </p>
                      </div>
                      <div className="text-right text-xs text-gray-400">
                        <p>Issued: {formatDate(rx.issuedAt)}</p>
                        <p>Expires: {formatDate(rx.expiresAt)}</p>
                        {rx.insuranceScheme && <p>Member: {rx.memberId}</p>}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3 space-y-1.5 mb-3">
                      {rx.medications.map((med, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <div>
                            <span className="font-medium text-gray-800">{med.name}</span>
                            <span className="text-gray-500"> × {med.quantity} {med.form}s</span>
                          </div>
                          <span className="text-gray-500 text-xs">{med.instructions}</span>
                        </div>
                      ))}
                    </div>

                    {/* Drug check warnings */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-2 mb-3 text-xs text-amber-700 flex items-center gap-2">
                      <span>ℹ️</span> Patient has documented Penicillin allergy — medications verified safe
                    </div>

                    <div className="flex items-center justify-between">
                      {rx.insuranceScheme && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">NHIS Eligible</span> — Coverage verified
                        </div>
                      )}
                      <div className="flex gap-2 ml-auto">
                        <Button size="sm" variant="outline">Partial Dispense</Button>
                        <Button size="sm" variant="success">Dispense All</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right panel */}
          <div className="space-y-4">
            {/* Low stock */}
            <Card>
              <CardHeader title="Low Stock Alerts" icon={<span>⚠️</span>} />
              <div className="space-y-3">
                {lowStockItems.map(item => (
                  <div key={item.drug} className="border border-red-100 rounded-xl p-3 bg-red-50">
                    <p className="font-medium text-gray-900 text-sm">{item.drug}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-red-600 font-medium">
                        {item.available} {item.unit} left
                      </span>
                      <span className="text-xs text-gray-400">Min: {item.min}</span>
                    </div>
                    <div className="mt-2 bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-red-500 h-1.5 rounded-full"
                        style={{ width: `${(item.available / item.min) * 100}%` }}
                      ></div>
                    </div>
                    <button className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium">
                      Request Reorder
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Track & trace */}
            <Card className="bg-gradient-to-br from-green-700 to-emerald-600 text-white">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span>📦</span> Drug Track & Trace
              </h3>
              <p className="text-green-100 text-sm">
                All dispensed medications are tracked. Batch numbers and supply chain data are logged for compliance.
              </p>
              <div className="mt-3 space-y-1 text-xs text-green-200">
                <div>✓ Counterfeit detection active</div>
                <div>✓ Supply chain verified</div>
                <div>✓ Temperature monitoring OK</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
