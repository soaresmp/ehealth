import { NextResponse } from 'next/server'

// Supported roles for RBAC
const ROLES = ['PATIENT', 'DOCTOR', 'NURSE', 'PHARMACIST', 'LAB_TECHNICIAN', 'ADMIN', 'PUBLIC_HEALTH_OFFICER'] as const

// Demo credentials (in production: bcrypt hash comparison + database lookup)
const demoAccounts = [
  { healthId: 'GH-2024-0001234', password: 'patient123', role: 'PATIENT', name: 'Amara Mensah' },
  { healthId: 'DOC-001', password: 'doctor123', role: 'DOCTOR', name: 'Dr. Kwame Asante' },
  { healthId: 'PHARM-001', password: 'pharmacy123', role: 'PHARMACIST', name: 'Accra PharmaCare' },
  { healthId: 'ADMIN-001', password: 'admin123', role: 'ADMIN', name: 'Ministry of Health' },
]

export async function POST(request: Request) {
  const body = await request.json()
  const { identifier, password, mfaCode } = body

  if (!identifier || !password) {
    return NextResponse.json({ error: 'Credentials required' }, { status: 400 })
  }

  const account = demoAccounts.find(
    a => (a.healthId === identifier || identifier.includes('@')) && a.password === password
  )

  if (!account) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // MFA check (mock — in production: TOTP verification)
  if (account.role !== 'PATIENT' && !mfaCode) {
    return NextResponse.json({
      requiresMfa: true,
      message: 'MFA code required for provider access'
    }, { status: 200 })
  }

  // Generate session token (mock JWT payload)
  const sessionToken = Buffer.from(JSON.stringify({
    sub: account.healthId,
    role: account.role,
    name: account.name,
    iat: Date.now(),
    exp: Date.now() + 24 * 60 * 60 * 1000,
  })).toString('base64')

  return NextResponse.json({
    token: sessionToken,
    user: {
      healthId: account.healthId,
      name: account.name,
      role: account.role,
    },
    redirectTo: account.role === 'PATIENT' ? '/patient/dashboard' :
                account.role === 'DOCTOR' ? '/provider/dashboard' :
                account.role === 'PHARMACIST' ? '/pharmacy/dashboard' :
                '/admin/dashboard',
  })
}
