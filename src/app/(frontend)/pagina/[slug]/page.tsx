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
    <article style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', padding: 'var(--space-3xl) 0' }}>
      <div className="container-narrow">
        <header style={{ marginBottom: 'var(--space-3xl)', textAlign: 'center' }}>
          <h1 className="article-title" style={{ fontSize: '3rem' }}>
            {page.title}
          </h1>
          <div style={{ height: '4px', width: '80px', backgroundColor: 'var(--color-accent-700)', margin: 'var(--space-xl) auto 0' }} />
        </header>

        <div className="article-content">
          <ArticleContent content={page.content} />
        </div>
      </div>
    </article>
  )
}
