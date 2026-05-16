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
    <div className="container" style={{ padding: 'var(--space-3xl) var(--space-lg)' }}>
      <header style={{ marginBottom: 'var(--space-2xl)', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-xl)' }}>
          Busca
        </h1>
        <form action="/busca" method="GET" style={{ position: 'relative' }}>
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="O que você está procurando?"
            className="search-page-input"
          />
          <button type="submit" className="btn btn-primary" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', padding: '8px 16px' }}>
            Buscar
          </button>
        </form>
      </header>

      {query && (
        <div className="search-results-count">
          <p>
            Exibindo {posts.length} de {totalDocs} resultados para <strong>"{query}"</strong>
          </p>
        </div>
      )}

      {posts.length > 0 ? (
        <>
          <div className="grid grid-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {(hasPrevPage || hasNextPage) && (
            <div className="pagination">
              {hasPrevPage && (
                <Link 
                  href={`/busca?q=${query}&page=${currentPage - 1}`}
                  className="btn btn-outline"
                >
                  ← Anterior
                </Link>
              )}
              {hasNextPage && (
                <Link 
                  href={`/busca?q=${query}&page=${currentPage + 1}`}
                  className="btn btn-primary"
                >
                  Próxima →
                </Link>
              )}
            </div>
          )}
        </>
      ) : query ? (
        <div className="empty-state">
          <p style={{ fontSize: '1.25rem', fontStyle: 'italic' }}>Nenhum resultado encontrado para sua busca.</p>
          <Link href="/" className="btn btn-outline mt-xl">
            Voltar para a Home
          </Link>
        </div>
      ) : null}
    </div>
  )
}
