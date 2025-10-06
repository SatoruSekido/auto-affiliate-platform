import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import './globals.css'
import { getSiteConfig } from '@/lib/site-config'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const config = getSiteConfig()

  return {
    title: {
      default: config.siteName,
      template: `%s | ${config.siteName}`,
    },
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: config.siteName }],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: config.siteUrl,
      siteName: config.siteName,
      title: config.siteName,
      description: config.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: config.siteName,
      description: config.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
        <SpeedInsights />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  )
}
