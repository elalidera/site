import React from 'react'
import PostListItem from './PostListItem'

interface MostReadProps {
  posts: any[]
}

export default function MostRead({ posts }: MostReadProps) {
  if (!posts || posts.length === 0) return null

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border-light)', padding: 'var(--space-xl)' }}>
      <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', color: 'var(--color-purple-900)', marginBottom: 'var(--space-xl)', borderBottom: '1px solid var(--color-border-light)', paddingBottom: 'var(--space-md)' }}>
        Mais lidos
      </h3>
      <div className="flex flex-col">
        {posts.map((post, index) => (
          <PostListItem key={post.id} post={post} index={index} />
        ))}
      </div>
    </div>
  )
}
