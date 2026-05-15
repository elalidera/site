import React from 'react'
import { getPayload } from 'payload'
import config from '@/../payload.config'
import PostCard from '@/components/posts/PostCard'
import { Metadata } from 'next'
import Link from 'next/link'

interface PageProps {
  searchParams: Promise<{
    q?: string
    page?: string
  }>
}

export const metadata: Metadata = {
  title: 'Busca | Ela Lidera',
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q: query, page } = await searchParams
  const currentPage = parseInt(page || '1')
  
  const payload = await getPayload({ config })

  let posts: any[] = []
  let totalDocs = 0
  let hasNextPage = false
  let hasPrevPage = false

  if (query) {
    const result = await payload.find({
      collection: 'posts',
      where: {
        and: [
          { status: { equals: 'published' } },
          {
            or: [
              { title: { contains: query } },
              { excerpt: { contains: query } },
            ],
          },
        ],
      },
      sort: '-publishedAt',
      limit: 12,
      page: currentPage,
    })
    posts = result.docs
    totalDocs = result.totalDocs
    hasNextPage = result.hasNextPage
    hasPrevPage = result.hasPrevPage
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="mb-16 max-w-2xl mx-auto text-center">
        <h1 className="font-display text-4xl text-purple-900 mb-8">
          Busca
        </h1>
        <form action="/busca" method="GET" className="relative">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="O que você está procurando?"
            className="w-full border-b-2 border-purple-900 py-4 px-2 text-xl focus:outline-none bg-transparent font-body"
          />
          <button type="submit" className="absolute right-2 top-4 text-purple-900 font-bold uppercase tracking-widest text-xs">
            Buscar
          </button>
        </form>
      </header>

      {query && (
        <div className="mb-12">
          <p className="text-neutral-500 font-body">
            Exibindo {posts.length} de {totalDocs} resultados para <span className="text-purple-900 font-bold">"{query}"</span>
          </p>
        </div>
      )}

      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {(hasPrevPage || hasNextPage) && (
            <div className="mt-16 pt-8 border-t border-offwhite-300 flex justify-center space-x-4">
              {hasPrevPage && (
                <Link 
                  href={`/busca?q=${query}&page=${currentPage - 1}`}
                  className="px-6 py-2 bg-white border border-offwhite-300 text-sm font-bold uppercase tracking-widest text-neutral-600 hover:text-accent-700"
                >
                  ← Anterior
                </Link>
              )}
              {hasNextPage && (
                <Link 
                  href={`/busca?q=${query}&page=${currentPage + 1}`}
                  className="px-6 py-2 bg-purple-900 text-white text-sm font-bold uppercase tracking-widest hover:bg-purple-800"
                >
                  Próxima →
                </Link>
              )}
            </div>
          )}
        </>
      ) : query ? (
        <div className="text-center py-20 bg-offwhite-200 border border-dashed border-offwhite-300">
          <p className="text-neutral-500 font-body italic text-lg">Nenhum resultado encontrado para sua busca.</p>
          <Link href="/" className="inline-block mt-8 text-accent-700 font-bold uppercase tracking-widest text-xs hover:underline">
            Voltar para a Home
          </Link>
        </div>
      ) : null}
    </div>
  )
}
