import React from 'react'
import Link from 'next/link'

interface PostListItemProps {
  post: any
  index?: number
}

export default function PostListItem({ post, index }: PostListItemProps) {
  if (!post) return null

  return (
    <div className="group py-4 border-b border-offwhite-300 last:border-0 flex gap-4 items-baseline">
      {index !== undefined && (
        <span className="text-2xl font-display text-offwhite-300 font-bold leading-none">
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <Link href={`/${post.category?.slug}/${post.slug}`} className="block">
          <span className="text-[10px] font-bold uppercase tracking-widest text-accent-700 mb-1 block">
            {post.category?.title}
          </span>
          <h4 className="font-display text-lg text-purple-900 group-hover:text-accent-700 transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h4>
        </Link>
      </div>
    </div>
  )
}
