'use client'

interface AdBannerProps {
  position: 'top' | 'middle' | 'bottom'
}

export default function AdBanner({ position }: AdBannerProps) {
  // この部分は後で実際のアフィリエイト広告コードに置き換えます
  // Amazon、ClickBank、ShareASaleなどのコードをここに挿入

  return (
    <div className="my-8 p-4 bg-gray-100 border border-gray-300 rounded text-center">
      <div className="text-sm text-gray-500 mb-2">Advertisement</div>
      <div id={`ad-${position}`} className="min-h-[90px] flex items-center justify-center">
        {/* アフィリエイト広告コードをここに配置 */}
        <p className="text-gray-400">Ad Space - {position}</p>
      </div>
    </div>
  )
}
