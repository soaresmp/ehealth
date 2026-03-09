import { TopBar } from '@/components/layout/TopBar'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

const availableDoctors = [
  { id: 'd1', name: 'Dr. Kwame Asante', specialty: 'Internal Medicine', available: true, rating: 4.9, consultations: 1234, nextSlot: 'Today, 2:00 PM', photo: 'KA' },
  { id: 'd2', name: 'Dr. Ama Boateng', specialty: 'Cardiology', available: true, rating: 4.8, consultations: 987, nextSlot: 'Today, 3:30 PM', photo: 'AB' },
  { id: 'd3', name: 'Dr. Yaw Mensah', specialty: 'Pediatrics', available: false, rating: 4.7, consultations: 756, nextSlot: 'Tomorrow, 9:00 AM', photo: 'YM' },
  { id: 'd4', name: 'Dr. Akosua Darkwah', specialty: 'Ophthalmology', available: true, rating: 4.9, consultations: 645, nextSlot: 'Today, 4:00 PM', photo: 'AD' },
]

export default function TelemedicinePage() {
  return (
    <div className="animate-fade-in">
      <TopBar title="Telemedicine" subtitle="Video consultations and remote care" />
      <div className="p-6 space-y-6">
        {/* Active session banner */}
        <div className="bg-green-700 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
                <span className="text-3xl">📹</span>
              </div>
              <div>
                <p className="text-green-200 text-sm">Upcoming Consultation</p>
                <h2 className="text-xl font-bold">Blood Pressure Review</h2>
                <p className="text-green-100">Dr. Ama Boateng • Cardiology</p>
                <p className="text-sm text-green-200 mt-1">📅 March 20, 2024 at 2:00 PM</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <button className="bg-white text-green-700 font-bold px-8 py-3 rounded-xl hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
                <span>📹</span> Join Consultation
              </button>
              <button className="bg-white/20 text-white px-8 py-2.5 rounded-xl hover:bg-white/30 transition-colors text-sm text-center border border-white/30">
                Test Audio & Video
              </button>
            </div>
          </div>
        </div>

        {/* Chat & Upload */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>💬</span> Message Your Doctor
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 h-48 overflow-y-auto space-y-3 mb-3">
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 flex-shrink-0">AB</div>
                <div className="bg-white rounded-xl rounded-tl-none px-3 py-2 text-sm shadow-sm max-w-xs">
                  <p>Hello Amara, I have reviewed your latest blood pressure readings. How are you feeling today?</p>
                  <p className="text-xs text-gray-400 mt-1">10:23 AM</p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <div className="bg-green-700 rounded-xl rounded-tr-none px-3 py-2 text-sm text-white max-w-xs">
                  <p>Good morning Dr. Boateng. I&apos;ve been feeling a bit dizzy in the mornings, but otherwise okay.</p>
                  <p className="text-xs text-green-200 mt-1">10:45 AM</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 flex-shrink-0">AB</div>
                <div className="bg-white rounded-xl rounded-tl-none px-3 py-2 text-sm shadow-sm max-w-xs">
                  <p>That could be a side effect of the medication timing. We&apos;ll discuss this in our video call on March 20th.</p>
                  <p className="text-xs text-gray-400 mt-1">11:02 AM</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500"
              />
              <button className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-800 transition-colors text-sm">
                Send
              </button>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>📎</span> Upload Medical Documents
            </h3>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center mb-4">
              <span className="text-4xl">📷</span>
              <p className="text-sm text-gray-600 mt-2">Upload photos, documents, or medical reports</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF up to 10MB</p>
              <button className="mt-3 text-sm text-green-700 font-medium hover:text-green-800">
                Select Files
              </button>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-500 uppercase">Recent Uploads</p>
              {[
                { name: 'BP_readings_feb2024.pdf', size: '124KB', date: 'Feb 28' },
                { name: 'glucometer_readings.jpg', size: '2.3MB', date: 'Mar 1' },
              ].map(f => (
                <div key={f.name} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2">
                  <span>📄</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 truncate">{f.name}</p>
                    <p className="text-xs text-gray-400">{f.size} • {f.date}</p>
                  </div>
                  <button className="text-xs text-red-400 hover:text-red-600">✕</button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Available doctors */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Available Doctors for Instant Consultation</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {availableDoctors.map(doc => (
              <Card key={doc.id} hover className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg mx-auto mb-3">
                  {doc.photo}
                </div>
                <p className="font-semibold text-gray-900 text-sm">{doc.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{doc.specialty}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <span className="text-yellow-400 text-xs">★</span>
                  <span className="text-xs font-medium text-gray-700">{doc.rating}</span>
                  <span className="text-xs text-gray-400">({doc.consultations})</span>
                </div>
                <div className="mt-2">
                  {doc.available ? (
                    <Badge variant="success" size="sm">🟢 Available</Badge>
                  ) : (
                    <Badge variant="default" size="sm">⏸ Busy</Badge>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1.5">Next: {doc.nextSlot}</p>
                <button
                  className={`mt-3 w-full text-sm py-2 rounded-xl font-medium transition-colors ${
                    doc.available
                      ? 'bg-green-700 text-white hover:bg-green-800'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!doc.available}
                >
                  {doc.available ? 'Book Now' : 'Not Available'}
                </button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
