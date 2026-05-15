// src/components/tracking/GoogleAnalytics.tsx
import Script from 'next/script'
 
export function GoogleAnalytics({ gaId }: { gaId?: string | null }) {
  if (!gaId) return null
 
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('consent', 'default', {
              analytics_storage: 'granted',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
            });
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
