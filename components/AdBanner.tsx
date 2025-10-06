'use client'

interface AdBannerProps {
  position: 'top' | 'middle' | 'bottom'
  searchTerm?: string
}

export default function AdBanner({ position, searchTerm = 'technology' }: AdBannerProps) {
  const amazonTag = process.env.NEXT_PUBLIC_AMAZON_TAG || 'temp-tag-20'

  // Amazon検索結果ページへのリンク（アフィリエイトリンク）
  const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(searchTerm)}&tag=${amazonTag}`

  // 関連商品キーワード（searchTermに基づいて生成）
  const relatedProducts = [
    searchTerm,
    `${searchTerm} tools`,
    `${searchTerm} guide`,
    `best ${searchTerm}`
  ]

  return (
    <div className="my-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
      <div className="text-xs text-gray-500 mb-3 uppercase tracking-wide">Recommended Products</div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {relatedProducts.map((keyword, index) => (
          <a
            key={index}
            href={`https://www.amazon.com/s?k=${encodeURIComponent(keyword)}&tag=${amazonTag}`}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105 border border-gray-200"
          >
            <div className="text-sm font-semibold text-blue-600 mb-1 line-clamp-2">
              {keyword}
            </div>
            <div className="text-xs text-gray-500">
              View on Amazon →
            </div>
          </a>
        ))}
      </div>

      <a
        href={amazonSearchUrl}
        target="_blank"
        rel="noopener noreferrer nofollow sponsored"
        className="inline-block px-6 py-2 bg-amazon-orange hover:bg-orange-500 text-white font-semibold rounded-lg transition-colors"
        style={{ backgroundColor: '#FF9900' }}
      >
        Shop All {searchTerm} Products on Amazon
      </a>

      <p className="text-xs text-gray-500 mt-4">
        *As an Amazon Associate, we earn from qualifying purchases.
      </p>
    </div>
  )
}
