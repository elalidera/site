// src/app/(frontend)/layout.tsx
import type { Metadata } from 'next'
import React from 'react'
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import './styles.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getPayload } from 'payload'
import config from '@/../payload.config'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-source-sans',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config })
    const settings = await payload.findGlobal({ slug: 'site-settings' })
    return {
      title: {
        default: settings?.siteName || 'Ela Lidera',
        template: `%s | ${settings?.siteName || 'Ela Lidera'}`,
      },
      description: settings?.description || 'Liderança, postura e crescimento de um jeito forte, elegante e verdadeiro.',
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://elalidera.vercel.app'),
    }
  } catch {
    return {
      title: 'Ela Lidera',
      description: 'Liderança, postura e crescimento de um jeito forte, elegante e verdadeiro.',
    }
  }
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
