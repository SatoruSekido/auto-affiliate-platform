import { getSiteConfig } from '@/lib/site-config'

export default function Footer() {
  const config = getSiteConfig()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="mb-2">&copy; {currentYear} {config.siteName}. All rights reserved.</p>
          <p className="text-sm text-gray-400">
            Disclosure: This site contains affiliate links. We may earn a commission from purchases made through these links.
          </p>
        </div>
      </div>
    </footer>
  )
}
