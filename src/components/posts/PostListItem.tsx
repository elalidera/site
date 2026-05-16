import React from 'react'
import Link from 'next/link'

interface PostListItemProps {
  post: any
  index?: number
}

export default function PostListItem({ post, index }: PostListItemProps) {
  if (!post) return null

  return (
    <div className="post-list-item">
      {index !== undefined && (
        <span className="most-read-number">
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <Link href={`/${post.category?.slug}/${post.slug}`}>
          <span className="text-xs" style={{ color: 'var(--color-accent-700)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px', display: 'block' }}>
            {post.category?.title}
          </span>
          <h4 className="post-list-item-title">
            {post.title}
          </h4>
        </Link>
      </div>
    </div>
  )
}
