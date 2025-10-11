import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { getSiteConfig } from '@/lib/site-config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import AffiliateLinks from '@/components/AffiliateLinks'
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from '@/components/JsonLd'
import type { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  const config = getSiteConfig()

  if (!post) {
    notFound()
  }

  const articleUrl = `${config.siteUrl}/posts/${post.slug}`

  // Extract word count from content
  const wordCount = post.content.split(/\s+/).length

  // Extract FAQ questions from content (if they exist)
  const faqQuestions = [
    {
      question: 'Is this suitable for beginners?',
      answer: 'Absolutely! With proper guidance and patience, beginners can successfully get started.'
    },
    {
      question: 'How long does it take to learn?',
      answer: 'Basic proficiency: 1-2 weeks. Advanced skills: 2-3 months with regular practice.'
    },
    {
      question: 'What\'s the cost involved?',
      answer: 'Options range from free to premium. Start with free options and upgrade as needed.'
    },
    {
      question: 'Do I need technical skills?',
      answer: 'Basic computer literacy is sufficient for most applications.'
    },
    {
      question: 'Are there free alternatives?',
      answer: 'Yes! Many excellent free options are available with good feature sets.'
    }
  ]

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        datePublished={post.date}
        dateModified={post.date}
        authorName={config.siteName}
        url={articleUrl}
        keywords={post.keywords}
        wordCount={wordCount}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: config.siteUrl },
          { name: 'Posts', url: `${config.siteUrl}/posts` },
          { name: post.title, url: articleUrl },
        ]}
      />
      <FAQJsonLd questions={faqQuestions} />
      <Header />
      <main className="min-h-screen">
        <article className="container mx-auto px-4 py-8 max-w-4xl">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="text-gray-600">
              <time dateTime={post.date}>{post.date}</time>
            </div>
          </header>

          <AdBanner position="top" searchTerm={post.keywords[0]} />

          <div
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <AdBanner position="middle" searchTerm={post.keywords[1] || post.keywords[0]} />

          <AffiliateLinks keywords={post.keywords} />

          <AdBanner position="bottom" searchTerm={post.keywords[2] || post.keywords[0]} />
        </article>
      </main>
      <Footer />
    </>
  )
}
