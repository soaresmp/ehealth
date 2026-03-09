import { NextResponse } from 'next/server'
import { mockPrescriptions } from '@/lib/mock-data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  const code = searchParams.get('code')
  const patientId = searchParams.get('patientId')

  // Verify prescription by digital token (for pharmacy)
  if (token) {
    const rx = mockPrescriptions.find(p => p.digitalToken === token)
    if (!rx) return NextResponse.json({ error: 'Prescription not found or invalid token' }, { status: 404 })
    return NextResponse.json({ prescription: rx })
  }

  // Get all prescriptions for patient
  if (patientId) {
    return NextResponse.json({ prescriptions: mockPrescriptions })
  }

  return NextResponse.json({ prescriptions: mockPrescriptions })
}

export async function POST(request: Request) {
  const body = await request.json()

  // Validate required fields
  if (!body.patientId || !body.medications || !body.medications.length) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Drug interaction check (mock)
  const interactionCheck = {
    safe: true,
    warnings: [],
    allergyAlerts: [],
  }

  // In production: check against drug database
  const newPrescription = {
    id: `rx-${Date.now()}`,
    prescriptionCode: `RX-GH-${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,'0')}${String(new Date().getDate()).padStart(2,'0')}-${Math.floor(Math.random()*1000)}`,
    digitalToken: `tok-${Math.random().toString(36).substring(2)}`,
    status: 'PENDING',
    issuedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    ...body,
    interactionCheck,
  }

  return NextResponse.json({ prescription: newPrescription }, { status: 201 })
}
