import React from 'react'
import { getPayload } from 'payload'
import config from '@/../payload.config'
import { notFound } from 'next/navigation'
import PostCard from '@/components/posts/PostCard'
import { Metadata } from 'next'
import Link from 'next/link'

interface PageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    page?: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  
  const { docs: tags } = await payload.find({
    collection: 'tags',
    where: {
      slug: { equals: slug },
    },
  })

  const tag = tags[0]
  if (!tag) return {}

  return {
    title: `Assunto: ${tag.title} | Ela Lidera`,
  }
}

export default async function TagPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { page } = await searchParams
  const currentPage = parseInt(page || '1')
  
  const payload = await getPayload({ config })

  // Find tag
  const { docs: tags } = await payload.find({
    collection: 'tags',
    where: {
      slug: { equals: slug },
    },
  })

  const tag = tags[0]
  if (!tag) notFound()

  // Find posts with this tag
  const { docs: posts, hasNextPage, hasPrevPage } = await payload.find({
    collection: 'posts',
    where: {
      tags: { contains: tag.id },
      status: { equals: 'published' },
    },
    sort: '-publishedAt',
    limit: 12,
    page: currentPage,
  })

  return (
    <div className="container" style={{ padding: 'var(--space-3xl) var(--space-lg)' }}>
      <header className="category-header">
        <span className="text-xs" style={{ fontWeight: 600, color: 'var(--color-accent-700)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 'var(--space-sm)', display: 'block' }}>Assunto</span>
        <h1>#{tag.title}</h1>
      </header>

      <div className="grid grid-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {(hasPrevPage || hasNextPage) && (
        <div className="pagination">
          {hasPrevPage && (
            <Link 
              href={`/tag/${slug}?page=${currentPage - 1}`}
              className="btn btn-outline"
            >
              ← Anterior
            </Link>
          )}
          {hasNextPage && (
            <Link 
              href={`/tag/${slug}?page=${currentPage + 1}`}
              className="btn btn-primary"
            >
              Próxima →
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
