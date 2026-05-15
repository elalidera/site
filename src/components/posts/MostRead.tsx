import React from 'react'
import PostListItem from './PostListItem'

interface MostReadProps {
  posts: any[]
}

export default function MostRead({ posts }: MostReadProps) {
  if (!posts || posts.length === 0) return null

  return (
    <div className="bg-white border border-offwhite-300 p-8">
      <h3 className="text-xl font-display font-bold text-purple-900 mb-8 border-b border-offwhite-300 pb-4">
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
