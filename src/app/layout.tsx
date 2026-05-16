// src/app/layout.tsx
// Root layout - NÃO renderiza <html> ou <body>.
// Cada route group (frontend e payload) gerencia sua própria estrutura HTML.
import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
