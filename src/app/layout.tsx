import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Ela Lidera',
  description: 'Liderança, postura e crescimento de um jeito forte, elegante e verdadeiro.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  )
}
