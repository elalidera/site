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
    <section className="relative group overflow-hidden">
      <Link href={`/${category?.slug}/${post.slug}`} className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white border border-offwhite-300">
        <div className="lg:col-span-8 relative aspect-[16/9] lg:aspect-auto min-h-[300px] md:min-h-[450px]">
          <Image
            src={post.featuredImage?.url || '/placeholder.jpg'}
            alt={post.featuredImage?.alt || post.title}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        </div>
        
        <div className="lg:col-span-4 p-8 md:p-12 flex flex-col justify-center space-y-6">
          <span className="inline-block px-3 py-1 bg-purple-700 text-white text-[10px] font-bold uppercase tracking-widest self-start">
            {category?.title}
          </span>
          
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-purple-900 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-neutral-600 text-base md:text-lg line-clamp-3 font-body">
            {post.excerpt}
          </p>
          
          <div className="pt-4 border-t border-offwhite-300 flex items-center text-xs text-neutral-400 font-medium uppercase tracking-widest">
            <span>Por {author?.name || 'Redação'}</span>
            <span className="mx-2">·</span>
            <span>{publishedDate}</span>
            <span className="mx-2">·</span>
            <span>{post.readingTime || 5} min leitura</span>
          </div>
        </div>
      </Link>
    </section>
  )
}
