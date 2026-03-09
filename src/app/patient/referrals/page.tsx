import { TopBar } from '@/components/layout/TopBar'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockReferrals } from '@/lib/mock-data'
import { formatDate, getStatusColor } from '@/lib/utils'

export default function PatientReferralsPage() {
  return (
    <div className="animate-fade-in">
      <TopBar title="Referrals" subtitle="Track your specialist referrals and appointments" />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <div className="space-y-4">
          {mockReferrals.map(ref => (
            <Card key={ref.id}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(ref.status)}`}>
                      {ref.status}
                    </span>
                    <Badge variant={ref.urgency === 'urgent' ? 'error' : 'outline'} size="sm">
                      {ref.urgency}
                    </Badge>
                  </div>
                  <p className="font-semibold text-gray-900">{ref.reason}</p>
                  <p className="text-sm text-gray-600">
                    Referred by: {ref.referringProvider.firstName} {ref.referringProvider.lastName}
                  </p>
                  {ref.receivingProvider && (
                    <p className="text-sm text-gray-600">
                      Specialist: {ref.receivingProvider.firstName} {ref.receivingProvider.lastName} ({ref.receivingProvider.specialization})
                    </p>
                  )}
                  <p className="text-sm text-gray-500">{ref.facility}</p>
                </div>
                <div className="text-right text-xs text-gray-400">
                  <p>Referral Date: {formatDate(ref.referralDate)}</p>
                  {ref.completedDate && <p>Completed: {formatDate(ref.completedDate)}</p>}
                </div>
              </div>

              {/* Status timeline */}
              <div className="flex items-center gap-2 mb-4">
                {['Created', 'Sent', 'Accepted', 'Appointment', 'Completed'].map((step, i) => {
                  const stepsDone = ref.status === 'COMPLETED' ? 5 : ref.status === 'IN_PROGRESS' ? 4 : ref.status === 'ACCEPTED' ? 3 : ref.status === 'PENDING' ? 2 : 1
                  const done = i < stepsDone
                  const current = i === stepsDone - 1
                  return (
                    <div key={step} className="flex-1 flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                        done ? 'bg-green-600 text-white' : current ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                      }`}>
                        {done ? '✓' : i + 1}
                      </div>
                      <p className="text-xs text-gray-500 text-center leading-tight">{step}</p>
                      {i < 4 && (
                        <div className={`absolute h-px ${done ? 'bg-green-400' : 'bg-gray-200'}`} style={{ width: 'calc(100% - 28px)' }}></div>
                      )}
                    </div>
                  )
                })}
              </div>

              {ref.status === 'PENDING' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-800 flex items-center gap-2">
                  <span>⏳</span>
                  Waiting for specialist at {ref.facility} to accept your referral. Average acceptance time: 4.2 hours.
                </div>
              )}
              {ref.status === 'COMPLETED' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-800 flex items-center gap-2">
                  <span>✅</span>
                  Referral completed. Specialist report has been shared with your primary care provider.
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Info */}
        <Card className="bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <span className="text-2xl">ℹ️</span>
            <div>
              <p className="font-semibold text-blue-900">About the Referral System</p>
              <p className="text-sm text-blue-700 mt-1">
                When your doctor refers you to a specialist, all your medical history is securely shared with the
                receiving provider. No need to carry physical files — your records travel with you across all 2,340
                facilities in the national network.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
