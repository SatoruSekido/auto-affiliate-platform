import Link from 'next/link'
import { getSiteConfig } from '@/lib/site-config'
import { getAllPosts } from '@/lib/posts'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'

export default function Home() {
  const config = getSiteConfig()
  const posts = getAllPosts()

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <section className="text-center py-12">
            <h1 className="text-5xl font-bold mb-4">{config.siteName}</h1>
            <p className="text-xl text-gray-600 mb-8">{config.description}</p>
          </section>

          <AdBanner position="top" />

          <section className="py-8">
            <h2 className="text-3xl font-bold mb-6">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <span className="text-blue-600 hover:underline">
                    Read more →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <AdBanner position="middle" />

          <section className="py-12 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Stay Updated with Latest {config.niche.replace('-', ' ')} Content
            </h2>
            <p className="text-gray-600">
              Bookmark this page and check back regularly for new articles!
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
