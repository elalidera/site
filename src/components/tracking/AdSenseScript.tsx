// src/components/tracking/AdSenseScript.tsx
import Script from 'next/script'

export function AdSenseScript({ publisherId }: { publisherId?: string | null }) {
  if (!publisherId) return null

  return (
    <Script
      id="adsense-init"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}
