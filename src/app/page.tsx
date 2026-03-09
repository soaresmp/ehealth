import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-africa flex items-center justify-center">
            <span className="text-white font-bold">E+</span>
          </div>
          <span className="font-bold text-xl">EHealth <span className="text-green-400">Africa</span></span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors">Sign In</Link>
          <Link href="/login" className="bg-green-700 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-20 pb-16 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-700/30 rounded-full px-4 py-1.5 text-sm text-green-300 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          Pan-African Health Platform — 2024
        </div>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Unified Healthcare<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
            for All of Africa
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
          A comprehensive digital health ecosystem connecting patients, providers, pharmacies,
          laboratories, and governments across Africa — ensuring continuity of care from rural
          clinics to major hospitals.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/patient/dashboard" className="bg-green-700 hover:bg-green-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-colors inline-flex items-center gap-2">
            Patient Portal <span>→</span>
          </Link>
          <Link href="/provider/dashboard" className="bg-blue-700 hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-colors inline-flex items-center gap-2">
            Provider Portal <span>→</span>
          </Link>
          <Link href="/pharmacy/dashboard" className="bg-purple-700 hover:bg-purple-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-colors inline-flex items-center gap-2">
            Pharmacy Portal <span>→</span>
          </Link>
          <Link href="/admin/dashboard" className="bg-orange-700 hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-colors inline-flex items-center gap-2">
            Public Health <span>→</span>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '3.2M+', label: 'Registered Patients', icon: '👥' },
            { value: '18,400', label: 'Healthcare Providers', icon: '🩺' },
            { value: '2,340', label: 'Facilities Nationwide', icon: '🏥' },
            { value: '98.7%', label: 'System Uptime', icon: '⚡' },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-sm text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3">Complete Health Ecosystem</h2>
        <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
          13 integrated modules working together to deliver world-class healthcare across the continent
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/8 transition-colors">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-gray-500">
        <p>© 2024 EHealth Africa. Built for the health of the continent.</p>
        <p className="mt-1">Prototype v1.0 — Aligned with HIPAA & GDPR standards</p>
      </footer>
    </div>
  )
}

const features = [
  {
    icon: '🆔',
    title: 'Unified Electronic Health Record',
    description: 'Lifetime medical history with a unique National Health ID. Access consultations, diagnoses, medications, and imaging from anywhere.',
  },
  {
    icon: '🔄',
    title: 'Continuous Care Coordination',
    description: 'Seamless referrals, shared care plans, and care timelines across hospitals, clinics, and specialists nationwide.',
  },
  {
    icon: '💊',
    title: 'Electronic Prescriptions',
    description: 'Digital prescriptions with QR codes, drug interaction warnings, allergy alerts, and automated pharmacy dispensing.',
  },
  {
    icon: '📱',
    title: 'Patient Mobile App',
    description: 'Book appointments, view lab results, manage medications, integrate wearables, and consult doctors via video.',
  },
  {
    icon: '🏥',
    title: 'Provider Portal',
    description: 'Full EHR access, digital prescribing, diagnostic order entry, clinical decision support, and imaging (PACS).',
  },
  {
    icon: '💉',
    title: 'Pharmacy Integration',
    description: 'Electronic prescription retrieval, medication eligibility verification, dispense tracking, and insurance reimbursement.',
  },
  {
    icon: '🔬',
    title: 'Lab & Diagnostics',
    description: 'Electronic test orders, automated result reporting, imaging links, and instant doctor notifications.',
  },
  {
    icon: '📊',
    title: 'Public Health Monitoring',
    description: 'Real-time disease surveillance, vaccination coverage tracking, epidemic detection, and antibiotic monitoring.',
  },
  {
    icon: '🛡️',
    title: 'Insurance & Billing',
    description: 'NHIS eligibility verification, automated claim submission, cost transparency, and fraud detection.',
  },
  {
    icon: '🔒',
    title: 'Security & Privacy',
    description: 'End-to-end encryption, MFA, role-based access control, patient consent management, and GDPR compliance.',
  },
  {
    icon: '🤖',
    title: 'AI & Advanced Analytics',
    description: 'Diagnostic support, predictive health risk scoring, prescription anomaly detection, and fraud identification.',
  },
  {
    icon: '🌍',
    title: 'National Digital Integration',
    description: 'Linked to national ID systems, digital signatures, border health control, and vaccination certificates.',
  },
]
