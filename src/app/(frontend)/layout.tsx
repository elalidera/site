import type { Metadata } from 'next'
import React from 'react'
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import './styles.css' // Tailwind importado SOMENTE aqui
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getPayload } from 'payload'
import config from '@/../payload.config'
import { GoogleAnalytics } from '@/components/tracking/GoogleAnalytics'
import { GoogleTagManager, GTMNoScript } from '@/components/tracking/GoogleTagManager'
import { MetaPixel } from '@/components/tracking/MetaPixel'
import { AdSenseScript } from '@/components/tracking/AdSenseScript'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-display',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-body',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'site-settings' })

  return {
    title: {
      default: settings?.siteName || 'Ela Lidera',
      template: `%s | ${settings?.siteName || 'Ela Lidera'}`,
    },
    description: settings?.description || 'O portal editorial definitivo para mulheres líderes 40+ que buscam impacto, elegância e crescimento.',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://elalidera.vercel.app'),
    verification: {
      google: settings?.tracking?.googleSearchConsole || '',
    },
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  const tracking = settings?.tracking

  return (
    <div className={`${playfair.variable} ${sourceSans.variable} font-body antialiased bg-[#FFFDF7] text-[#1A1A1A]`}>
      <GoogleAnalytics gaId={tracking?.gaId} />
      <GoogleTagManager gtmId={tracking?.gtmId} />
      <MetaPixel pixelId={tracking?.pixelId} />
      <AdSenseScript publisherId={tracking?.adsenseId} />
      <GTMNoScript gtmId={tracking?.gtmId} />
      
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  )
}
