import Link from 'next/link'
import { getSiteConfig } from '@/lib/site-config'

export default function Header() {
  const config = getSiteConfig()

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            {config.siteName}
          </Link>
          <div className="flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/#articles" className="text-gray-700 hover:text-gray-900">
              Articles
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
