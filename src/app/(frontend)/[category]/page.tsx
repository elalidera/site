import React from 'react'
import { getPayload } from 'payload'
import config from '@/../payload.config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PostCard from '@/components/posts/PostCard'
import MostRead from '@/components/posts/MostRead'
import { AdSlot } from '@/components/ads/AdSlot'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{
    category: string
  }>
  searchParams: Promise<{
    page?: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params
  const payload = await getPayload({ config })
  
  const { docs: categories } = await payload.find({
    collection: 'categories',
    where: {
      slug: { equals: categorySlug },
    },
  })

  const category = categories[0]
  if (!category) return {}

  return {
    title: `${category.title} | Ela Lidera`,
    description: category.description,
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category: categorySlug } = await params
  const { page } = await searchParams
  const currentPage = parseInt(page || '1')
  
  const payload = await getPayload({ config })

  // Find category
  const { docs: categories } = await payload.find({
    collection: 'categories',
    where: {
      slug: { equals: categorySlug },
    },
  })

  const category = categories[0]
  if (!category) notFound()

  // Find posts for this category
  const { docs: posts, totalPages, hasNextPage, hasPrevPage } = await payload.find({
    collection: 'posts',
    where: {
      category: { equals: category.id },
      status: { equals: 'published' },
    },
    sort: '-publishedAt',
    limit: 12,
    page: currentPage,
    depth: 1,
  })

  // Fetch "Most Read" for sidebar
  const { docs: mostRead } = await payload.find({
    collection: 'posts',
    where: {
      status: { equals: 'published' },
    },
    sort: '-publishedAt',
    limit: 5,
  })

  return (
    <div className="container" style={{ padding: 'var(--space-3xl) var(--space-lg)' }}>
      <header className="category-header">
        <h1>{category.title}</h1>
        {category.description && (
          <p>{category.description}</p>
        )}
      </header>

      <div className="grid grid-sidebar">
        <div className="flex flex-col gap-xl">
          <div className="grid grid-2">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          {(hasPrevPage || hasNextPage) && (
            <div className="pagination">
              {hasPrevPage && (
                <Link 
                  href={`/${categorySlug}?page=${currentPage - 1}`}
                  className="btn btn-outline"
                >
                  ← Anterior
                </Link>
              )}
              {hasNextPage && (
                <Link 
                  href={`/${categorySlug}?page=${currentPage + 1}`}
                  className="btn btn-primary"
                >
                  Próxima →
                </Link>
              )}
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-xl">
          <MostRead posts={mostRead} />
          <AdSlot slot="sidebar-category" className="flex items-center justify-center" style={{ height: '600px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-light)' }}>
            <span className="text-muted text-xs italic">Publicidade Editorial</span>
          </AdSlot>
        </aside>
      </div>
    </div>
  )
}
