import React from 'react'
import Link from 'next/link'
import PostCard from './PostCard'
import PostListItem from './PostListItem'

interface CategorySectionProps {
  category: any
  posts: any[]
}

export default function CategorySection({ category, posts }: CategorySectionProps) {
  if (!posts || posts.length === 0) return null

  const mainPost = posts[0]
  const listPosts = posts.slice(1, 4)

  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-10 pb-4 border-b-2 border-purple-900">
        <h2 className="text-2xl font-display font-bold text-purple-900">
          {category.title}
        </h2>
        <Link 
          href={`/${category.slug}`}
          className="text-xs font-bold uppercase tracking-widest text-accent-700 hover:text-purple-700 transition-colors"
        >
          Ver todos →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <PostCard post={mainPost} />
        </div>
        
        <div className="lg:col-span-5">
          <div className="flex flex-col h-full">
            <div className="space-y-4">
              {listPosts.map((post) => (
                <PostListItem key={post.id} post={post} />
              ))}
            </div>
            
            {/* Optional Sidebar Ad or CTA in the future */}
            <div className="mt-auto pt-8">
              <div className="bg-offwhite-200 p-6 border border-offwhite-300 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Publicidade</p>
                <div className="h-40 bg-neutral-100 flex items-center justify-center border border-dashed border-neutral-300">
                  <span className="text-neutral-400 text-xs italic">Espaço reservado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
