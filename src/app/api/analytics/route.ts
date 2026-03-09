import { NextResponse } from 'next/server'
import { mockPublicHealthData } from '@/lib/mock-data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  // Public health officers and admins can access aggregated analytics
  // In production: check JWT role claim

  switch (type) {
    case 'disease-stats':
      return NextResponse.json({ data: mockPublicHealthData.diseaseStats })
    case 'vaccination-coverage':
      return NextResponse.json({ data: mockPublicHealthData.vaccinationCoverage })
    case 'regional':
      return NextResponse.json({ data: mockPublicHealthData.regionalData })
    case 'antibiotic-usage':
      return NextResponse.json({ data: mockPublicHealthData.antibioticUsage })
    case 'monthly-trend':
      return NextResponse.json({ data: mockPublicHealthData.monthlyTrend })
    default:
      return NextResponse.json({ data: mockPublicHealthData })
  }
}
