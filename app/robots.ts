import { MetadataRoute } from 'next'
import { getSiteConfig } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
  const config = getSiteConfig()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [],
    },
    sitemap: `${config.siteUrl}/sitemap.xml`,
  }
}
