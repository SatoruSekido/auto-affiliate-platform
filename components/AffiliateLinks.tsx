'use client'

interface AffiliateLinksProps {
  keywords: string[]
}

export default function AffiliateLinks({ keywords }: AffiliateLinksProps) {
  // キーワードに基づいて関連するアフィリエイトリンクを生成
  // Amazon Associates、ClickBankなどの商品リンクをここに配置

  const generateAmazonLink = (keyword: string) => {
    const tag = process.env.NEXT_PUBLIC_AMAZON_TAG || 'YOUR_AMAZON_TAG'
    return `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}&tag=${tag}`
  }

  return (
    <div className="my-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Recommended Products</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {keywords.slice(0, 4).map((keyword, index) => (
          <a
            key={index}
            href={generateAmazonLink(keyword)}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="block p-4 bg-white rounded shadow hover:shadow-md transition-shadow"
          >
            <div className="font-medium text-blue-600">
              {keyword} Products →
            </div>
            <div className="text-sm text-gray-600 mt-1">
              View on Amazon
            </div>
          </a>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-4">
        *As an Amazon Associate, we earn from qualifying purchases.
      </p>
    </div>
  )
}
