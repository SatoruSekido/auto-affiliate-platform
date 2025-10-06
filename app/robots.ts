import { MetadataRoute } from 'next'
import { getSiteConfig } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
  const config = getSiteConfig()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0,
      },
    ],
    sitemap: [`${config.siteUrl}/sitemap.xml`, `${config.siteUrl}/feed.xml`],
  }
}
