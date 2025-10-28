import type { Metadata } from 'next'
import './globals.css'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shiftby.in'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Shiftby',
    template: '%s | Shiftby',
  },
  description: 'Shiftby training platform',
  openGraph: {
    url: siteUrl,
    siteName: 'Shiftby',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export const viewport = {
  themeColor: '#1976d2',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
        <SiteHeader />
        <main style={{ flex: 1 }}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
