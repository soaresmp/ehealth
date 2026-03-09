import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 gradient-africa flex-col justify-between p-12">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <span className="text-white font-bold text-lg">E+</span>
          </div>
          <span className="font-bold text-2xl text-white">EHealth Africa</span>
        </Link>
        <div>
          <blockquote className="text-white/90 text-xl font-light leading-relaxed mb-6">
            &ldquo;A patient treated in a rural clinic can continue treatment in a major hospital
            with their complete medical history immediately available — anywhere in Africa.&rdquo;
          </blockquote>
          <div className="flex gap-4">
            {[
              { v: '3.2M+', l: 'Patients' },
              { v: '18K+', l: 'Providers' },
              { v: '2,340', l: 'Facilities' },
            ].map((s) => (
              <div key={s.l} className="bg-white/10 rounded-xl px-4 py-3">
                <div className="text-white font-bold text-xl">{s.v}</div>
                <div className="text-white/70 text-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <span className="font-bold text-2xl text-white">EHealth <span className="text-green-400">Africa</span></span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-gray-400 mb-8">Sign in to access your health portal</p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Health ID or Email</label>
              <input
                type="text"
                placeholder="GH-2024-0001234 or email@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-sm text-green-400 hover:text-green-300">Forgot password?</a>
            </div>
          </form>

          {/* Demo portals */}
          <div className="mt-6">
            <p className="text-center text-sm text-gray-500 mb-4">Demo — Select your role</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Patient Portal', href: '/patient/dashboard', color: 'bg-green-700 hover:bg-green-600' },
                { label: 'Provider Portal', href: '/provider/dashboard', color: 'bg-blue-700 hover:bg-blue-600' },
                { label: 'Pharmacy Portal', href: '/pharmacy/dashboard', color: 'bg-purple-700 hover:bg-purple-600' },
                { label: 'Public Health', href: '/admin/dashboard', color: 'bg-orange-700 hover:bg-orange-600' },
              ].map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className={`${p.color} text-white text-sm font-medium px-4 py-2.5 rounded-xl text-center transition-colors`}
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>

          {/* MFA notice */}
          <div className="mt-6 bg-blue-900/20 border border-blue-700/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <span className="text-blue-400 mt-0.5">🔐</span>
              <div>
                <p className="text-sm font-medium text-blue-300">Multi-Factor Authentication</p>
                <p className="text-xs text-blue-400/80 mt-0.5">
                  OTP via SMS or authenticator app required. Biometric login available on mobile devices.
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            New patient?{' '}
            <a href="#" className="text-green-400 hover:text-green-300">Register with your National ID</a>
          </p>
        </div>
      </div>
    </div>
  )
}
