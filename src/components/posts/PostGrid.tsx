import React from 'react'
import PostCard from './PostCard'

interface PostGridProps {
  posts: any[]
  title?: string
}

export default function PostGrid({ posts, title }: PostGridProps) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="py-16">
      {title && (
        <div className="flex items-center gap-6 mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-purple-900 whitespace-nowrap">
            {title}
          </h2>
          <div className="h-[1px] w-full bg-offwhite-300" />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
