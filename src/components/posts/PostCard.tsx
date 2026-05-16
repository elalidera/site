import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface PostCardProps {
  post: any
}

export default function PostCard({ post }: PostCardProps) {
  if (!post) return null

  const publishedDate = new Date(post.publishedAt || post.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <article className="post-card">
      <Link href={`/${post.category?.slug}/${post.slug}`} style={{ position: 'relative', display: 'block', aspectRatio: '3/2', overflow: 'hidden' }}>
        <Image
          src={post.featuredImage?.url || '/placeholder.jpg'}
          alt={post.featuredImage?.alt || post.title}
          fill
          className="post-card-image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <span className="badge">
            {post.category?.title}
          </span>
        </div>
      </Link>
      
      <div className="post-card-content">
        <h3 className="post-card-title">
          <Link href={`/${post.category?.slug}/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-sm text-muted" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.excerpt}
        </p>
        
        <div className="post-card-meta mt-md pt-sm" style={{ borderTop: '1px solid var(--color-border-light)', display: 'flex', justifyContent: 'between' }}>
          <span>{post.author?.name || 'Redação'}</span>
          <span style={{ marginLeft: 'auto' }}>{publishedDate}</span>
        </div>
      </div>
    </article>
  )
}
