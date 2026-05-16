import React from 'react'
import PostCard from './PostCard'

interface PostGridProps {
  posts: any[]
  title?: string
}

export default function PostGrid({ posts, title }: PostGridProps) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="section">
      {title && (
        <div className="section-heading">
          <h2>{title}</h2>
        </div>
      )}
      
      <div className="grid grid-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
