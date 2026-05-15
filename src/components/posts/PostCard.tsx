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
    <article className="group flex flex-col h-full bg-white border border-offwhite-300 transition-all hover:border-accent-200">
      <Link href={`/${post.category?.slug}/${post.slug}`} className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={post.featuredImage?.url || '/placeholder.jpg'}
          alt={post.featuredImage?.alt || post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 bg-purple-900/90 text-white text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm">
            {post.category?.title}
          </span>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <Link href={`/${post.category?.slug}/${post.slug}`}>
          <h3 className="font-display text-xl text-purple-900 leading-snug group-hover:text-accent-700 transition-colors line-clamp-2 mb-3">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-neutral-600 text-sm line-clamp-2 mb-6 font-body">
          {post.excerpt}
        </p>
        
        <div className="mt-auto pt-4 border-t border-offwhite-200 flex items-center justify-between text-[10px] text-neutral-400 font-bold uppercase tracking-widest">
          <span>{post.author?.name || 'Redação'}</span>
          <span>{publishedDate}</span>
        </div>
      </div>
    </article>
  )
}
