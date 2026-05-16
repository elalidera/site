import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface PostHeroProps {
  post: any
}

export default function PostHero({ post }: PostHeroProps) {
  if (!post) return null

  const publishedDate = new Date(post.publishedAt || post.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  const category = post.category
  const author = post.author

  return (
    <section className="post-hero">
      <Link href={`/${category?.slug}/${post.slug}`} className="grid grid-sidebar" style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border-light)' }}>
        <div style={{ position: 'relative', minHeight: '400px' }}>
          <Image
            src={post.featuredImage?.url || '/placeholder.jpg'}
            alt={post.featuredImage?.alt || post.title}
            fill
            priority
            className="post-hero-image"
            style={{ marginBottom: 0 }} // Override default margin if needed
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        </div>
        
        <div style={{ padding: 'var(--space-xl)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span className="badge">
            {category?.title}
          </span>
          
          <h1 className="post-hero-title">
            {post.title}
          </h1>
          
          <p className="post-hero-excerpt">
            {post.excerpt}
          </p>
          
          <div className="text-xs text-muted mt-md pt-md" style={{ borderTop: '1px solid var(--color-border-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <span>Por {author?.name || 'Redação'}</span>
            <span style={{ margin: '0 8px' }}>·</span>
            <span>{publishedDate}</span>
          </div>
        </div>
      </Link>
    </section>
  )
}
