import React from 'react'
import { getPayload } from 'payload'
import config from '@/../payload.config'
import { notFound } from 'next/navigation'
import { ArticleContent } from '@/components/posts/RichTextRenderer'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  
  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug },
    },
  })

  const page = pages[0] as any
  if (!page) return {}

  return {
    title: `${page.title} | Ela Lidera`,
    description: page.excerpt,
  }
}

export default async function StaticPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug },
    },
    depth: 1,
  })

  const page = pages[0] as any
  if (!page) notFound()

  return (
    <article className="min-h-screen bg-offwhite py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <header className="mb-16 text-center">
          <h1 className="font-display text-4xl md:text-6xl text-purple-900 leading-tight">
            {page.title}
          </h1>
          <div className="h-1 w-20 bg-accent-700 mx-auto mt-8" />
        </header>

        <ArticleContent content={page.content} />
      </div>
    </article>
  )
}
