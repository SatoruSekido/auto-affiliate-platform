'use client'

import { useEffect } from 'react'

interface AdBannerProps {
  position: 'top' | 'middle' | 'bottom'
  searchTerm?: string
}

export default function AdBanner({ position, searchTerm = 'technology' }: AdBannerProps) {
  const amazonTag = process.env.NEXT_PUBLIC_AMAZON_TAG || 'temp-tag-20'

  useEffect(() => {
    // Amazon Native Shopping Ads のスクリプトを動的に読み込む
    const script = document.createElement('script')
    script.src = '//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // クリーンアップ
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="my-8 p-4 bg-gray-50 border border-gray-200 rounded text-center">
      <div className="text-xs text-gray-500 mb-2">Advertisement</div>
      <div id={`ad-${position}`} className="min-h-[250px] flex items-center justify-center">
        {/* Amazon Native Shopping Ads */}
        <div
          id={`amzn-assoc-ad-${position}`}
          dangerouslySetInnerHTML={{
            __html: `
              <script type="text/javascript">
                amzn_assoc_placement = "adunit0";
                amzn_assoc_search_bar = "true";
                amzn_assoc_tracking_id = "${amazonTag}";
                amzn_assoc_ad_mode = "search";
                amzn_assoc_ad_type = "smart";
                amzn_assoc_marketplace = "amazon";
                amzn_assoc_region = "US";
                amzn_assoc_title = "Shop Related Products";
                amzn_assoc_default_search_phrase = "${searchTerm}";
                amzn_assoc_default_category = "All";
                amzn_assoc_linkid = "ad_${position}_${Date.now()}";
                amzn_assoc_rows = "2";
              </script>
            `
          }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">
        *As an Amazon Associate, we earn from qualifying purchases.
      </p>
    </div>
  )
}
