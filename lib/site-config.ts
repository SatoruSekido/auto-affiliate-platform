import fs from 'fs'
import path from 'path'

export interface SiteConfig {
  siteId: string
  siteName: string
  siteUrl: string
  description: string
  niche: string
  keywords: string[]
  affiliatePrograms: {
    [key: string]: {
      enabled: boolean
      [key: string]: any
    }
  }
  contentStrategy: {
    postsPerWeek: number
    minWordCount: number
    targetKeywords: number
  }
}

let cachedConfig: SiteConfig | null = null

export function getSiteConfig(): SiteConfig {
  if (cachedConfig) {
    return cachedConfig
  }

  const siteId = process.env.SITE_ID || 'site1'
  const configPath = path.join(process.cwd(), 'sites', siteId, 'config', 'site-config.json')

  if (!fs.existsSync(configPath)) {
    throw new Error(`Site config not found for ${siteId}`)
  }

  const configData = fs.readFileSync(configPath, 'utf-8')
  cachedConfig = JSON.parse(configData)

  return cachedConfig as SiteConfig
}

export function getAllSiteIds(): string[] {
  const sitesDir = path.join(process.cwd(), 'sites')
  return fs.readdirSync(sitesDir).filter((item) => {
    const itemPath = path.join(sitesDir, item)
    return fs.statSync(itemPath).isDirectory()
  })
}
