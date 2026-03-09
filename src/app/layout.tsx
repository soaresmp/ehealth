import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EHealth Africa — Unified Health Platform',
  description: 'Pan-African electronic health platform providing unified patient records, e-prescriptions, telemedicine, and public health monitoring.',
  keywords: 'ehealth, africa, health records, telemedicine, e-prescription, ghana',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
