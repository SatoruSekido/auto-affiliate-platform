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
    creator: config.siteName,
    publisher: config.siteName,
    category: config.niche,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      alternateLocale: ['ja_JP', 'es_ES', 'fr_FR', 'de_DE', 'zh_CN'],
      url: config.siteUrl,
      siteName: config.siteName,
      title: config.siteName,
      description: config.description,
      images: [
        {
          url: `${config.siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: config.siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.siteName,
      description: config.description,
      creator: '@' + config.siteName.toLowerCase().replace(/\s/g, ''),
      images: [`${config.siteUrl}/og-image.png`],
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
    verification: {
      google: 'google-site-verification-code',
      yandex: 'yandex-verification-code',
      yahoo: 'yahoo-site-verification-code',
    },
    alternates: {
      canonical: config.siteUrl,
      languages: {
        'en-US': config.siteUrl,
        'ja-JP': `${config.siteUrl}/ja`,
        'es-ES': `${config.siteUrl}/es`,
        'fr-FR': `${config.siteUrl}/fr`,
        'de-DE': `${config.siteUrl}/de`,
        'zh-CN': `${config.siteUrl}/zh`,
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
