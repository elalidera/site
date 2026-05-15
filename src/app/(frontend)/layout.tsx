import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import '../globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Metadata } from 'next'
import React from 'react'
import { getPayload } from 'payload'
import config from '@/../payload.config'
import { GoogleAnalytics } from '@/components/tracking/GoogleAnalytics'
import { GoogleTagManager, GTMNoScript } from '@/components/tracking/GoogleTagManager'
import { MetaPixel } from '@/components/tracking/MetaPixel'
import { AdSenseScript } from '@/components/tracking/AdSenseScript'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700'],
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  weight: ['400', '600'],
})

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'site-settings' })

  return {
    title: {
      default: settings?.siteName || 'Ela Lidera',
      template: `%s | ${settings?.siteName || 'Ela Lidera'}`,
    },
    description: settings?.description || 'Portal editorial para mulheres líderes 40+.',
    verification: {
      google: settings?.tracking?.googleSearchConsole || '',
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  const tracking = settings?.tracking

  return (
    <html lang="pt-BR" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className="bg-offwhite text-neutral-900 font-body min-h-screen flex flex-col">
        <GoogleAnalytics gaId={tracking?.gaId} />
        <GoogleTagManager gtmId={tracking?.gtmId} />
        <MetaPixel pixelId={tracking?.pixelId} />
        <AdSenseScript publisherId={tracking?.adsenseId} />
        
        <GTMNoScript gtmId={tracking?.gtmId} />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
