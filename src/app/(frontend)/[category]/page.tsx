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
    <div className="container mx-auto px-4 py-16">
      <header className="mb-16 max-w-4xl">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-purple-900 mb-6">
          {category.title}
        </h1>
        {category.description && (
          <p className="text-neutral-600 text-lg md:text-xl font-body leading-relaxed">
            {category.description}
          </p>
        )}
        <div className="h-1 w-20 bg-accent-700 mt-8" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          {(hasPrevPage || hasNextPage) && (
            <div className="mt-16 pt-8 border-t border-offwhite-300 flex justify-center space-x-4">
              {hasPrevPage && (
                <Link 
                  href={`/${categorySlug}?page=${currentPage - 1}`}
                  className="px-6 py-2 bg-white border border-offwhite-300 text-sm font-bold uppercase tracking-widest text-neutral-600 hover:text-accent-700"
                >
                  ← Anterior
                </Link>
              )}
              {hasNextPage && (
                <Link 
                  href={`/${categorySlug}?page=${currentPage + 1}`}
                  className="px-6 py-2 bg-purple-900 text-white text-sm font-bold uppercase tracking-widest hover:bg-purple-800"
                >
                  Próxima →
                </Link>
              )}
            </div>
          )}
        </div>

        <aside className="lg:col-span-4 space-y-12">
          <MostRead posts={mostRead} />
          <AdSlot slot="sidebar-category" className="h-[600px] bg-neutral-50 flex items-center justify-center border border-offwhite-300">
            <span className="text-neutral-300 text-xs italic">Publicidade Editorial</span>
          </AdSlot>
        </aside>
      </div>
    </div>
  )
}
