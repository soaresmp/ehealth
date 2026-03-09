import { NextResponse } from 'next/server'
import { mockLabResults } from '@/lib/mock-data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const patientId = searchParams.get('patientId')
  const labId = searchParams.get('id')

  if (labId) {
    const lab = mockLabResults.find(l => l.id === labId)
    if (!lab) return NextResponse.json({ error: 'Lab order not found' }, { status: 404 })
    return NextResponse.json({ labOrder: lab })
  }

  return NextResponse.json({ labOrders: mockLabResults })
}

export async function POST(request: Request) {
  const body = await request.json()

  if (!body.patientId || !body.tests || !body.tests.length) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const newOrder = {
    id: `lab-${Date.now()}`,
    status: 'ORDERED',
    orderDate: new Date().toISOString(),
    urgency: body.urgency || 'routine',
    tests: body.tests.map((t: string) => ({
      testName: t,
      result: null,
      isAbnormal: null,
    })),
    ...body,
  }

  return NextResponse.json({ labOrder: newOrder }, { status: 201 })
}
