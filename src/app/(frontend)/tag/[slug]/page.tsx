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
    <div className="container mx-auto px-4 py-16">
      <header className="mb-16 border-b border-offwhite-300 pb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-700 mb-4 block">Assunto</span>
        <h1 className="font-display text-4xl md:text-5xl text-purple-900">
          #{tag.title}
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {(hasPrevPage || hasNextPage) && (
        <div className="mt-16 pt-8 border-t border-offwhite-300 flex justify-center space-x-4">
          {hasPrevPage && (
            <Link 
              href={`/tag/${slug}?page=${currentPage - 1}`}
              className="px-6 py-2 bg-white border border-offwhite-300 text-sm font-bold uppercase tracking-widest text-neutral-600 hover:text-accent-700"
            >
              ← Anterior
            </Link>
          )}
          {hasNextPage && (
            <Link 
              href={`/tag/${slug}?page=${currentPage + 1}`}
              className="px-6 py-2 bg-purple-900 text-white text-sm font-bold uppercase tracking-widest hover:bg-purple-800"
            >
              Próxima →
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
