import { TopBar } from '@/components/layout/TopBar'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { mockReferrals } from '@/lib/mock-data'
import { formatDate, getStatusColor } from '@/lib/utils'

export default function ProviderReferralsPage() {
  return (
    <div className="animate-fade-in">
      <TopBar
        title="Referral Management"
        subtitle="Create and track patient referrals"
        action={<Button size="sm" variant="primary">+ New Referral</Button>}
      />
      <div className="p-6 space-y-6">
        {/* Create referral form */}
        <Card>
          <CardHeader title="Create Referral" icon={<span>🔄</span>} />
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Patient</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
                <span className="text-gray-400">🔍</span>
                <input type="text" placeholder="Search patient..." className="flex-1 outline-none text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Urgency</label>
              <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500">
                <option>Routine (within 2 weeks)</option>
                <option>Urgent (within 48 hours)</option>
                <option>Emergency (immediate)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Specialty</label>
              <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500">
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Ophthalmology</option>
                <option>Endocrinology</option>
                <option>Nephrology</option>
                <option>Oncology</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Receiving Facility</label>
              <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500">
                <option>Korle-Bu Teaching Hospital</option>
                <option>Komfo Anokye Teaching Hospital</option>
                <option>Trust Hospital</option>
                <option>37 Military Hospital</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Reason for Referral</label>
              <textarea
                placeholder="Clinical reason for referral, relevant history, and specific questions for specialist..."
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 h-24 resize-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" size="sm">Save Draft</Button>
            <Button variant="primary" size="sm">Send Referral</Button>
          </div>
        </Card>

        {/* Active referrals */}
        <Card>
          <CardHeader title="Referral Tracking" icon={<span>📋</span>} />
          <div className="space-y-3">
            {mockReferrals.map(ref => (
              <div key={ref.id} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(ref.status)}`}>
                        {ref.status}
                      </span>
                      <Badge variant={ref.urgency === 'urgent' ? 'error' : 'outline'} size="sm">
                        {ref.urgency}
                      </Badge>
                    </div>
                    <p className="font-semibold text-gray-900">Amara Mensah</p>
                    <p className="text-sm text-gray-600">→ {ref.facility}</p>
                    {ref.receivingProvider && (
                      <p className="text-sm text-gray-500">
                        To: {ref.receivingProvider.firstName} {ref.receivingProvider.lastName} ({ref.receivingProvider.specialization})
                      </p>
                    )}
                  </div>
                  <div className="text-right text-xs text-gray-400">
                    <p>Referred: {formatDate(ref.referralDate)}</p>
                    {ref.completedDate && <p>Completed: {formatDate(ref.completedDate)}</p>}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-sm text-gray-700">{ref.reason}</p>
                </div>
                {ref.notes && <p className="text-xs text-gray-500 mt-2">{ref.notes}</p>}
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="ghost">View Details</Button>
                  {ref.status === 'PENDING' && <Button size="sm" variant="outline">Cancel</Button>}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Referral pathway map */}
        <Card className="bg-gradient-to-r from-green-700 to-teal-600 text-white">
          <div className="flex items-center gap-4">
            <div className="text-3xl">🏥</div>
            <div className="flex-1">
              <h3 className="font-semibold">National Referral Network</h3>
              <p className="text-green-100 text-sm mt-1">
                2,340 facilities connected across all 16 regions. Average referral acceptance time: 4.2 hours.
                Rural-to-urban referral pathway fully operational.
              </p>
            </div>
            <button className="bg-white/20 text-white px-4 py-2 rounded-xl text-sm border border-white/20 hover:bg-white/30 transition-colors">
              View Network Map
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
