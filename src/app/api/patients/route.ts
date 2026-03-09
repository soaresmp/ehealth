import { NextResponse } from 'next/server'
import { mockPatient, mockDiagnoses, mockAllergies, mockVitals, mockVaccinations } from '@/lib/mock-data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const healthId = searchParams.get('healthId')
  const q = searchParams.get('q')

  // In production, this would query the database with proper auth
  if (healthId && healthId !== mockPatient.healthId) {
    return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
  }

  const patient = {
    ...mockPatient,
    diagnoses: mockDiagnoses,
    allergies: mockAllergies,
    vitals: mockVitals,
    vaccinations: mockVaccinations,
  }

  return NextResponse.json({ patient })
}
