import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { getSiteConfig } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const config = getSiteConfig()
  const posts = getAllPosts()

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${config.siteUrl}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: config.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...postEntries,
  ]
}
