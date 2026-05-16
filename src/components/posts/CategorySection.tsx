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
    <section className="section">
      <div className="section-heading">
        <h2>{category.title}</h2>
        <Link href={`/${category.slug}`}>
          Ver todos →
        </Link>
      </div>

      <div className="grid grid-sidebar" style={{ gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)' }}>
        <div>
          <PostCard post={mainPost} />
        </div>
        
        <div className="flex flex-col">
          <div className="flex flex-col gap-md">
            {listPosts.map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
          </div>
          
          <div className="mt-xl pt-lg">
            <div className="ad-slot" style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-light)' }}>
              <p className="text-xs text-muted mb-sm">Publicidade</p>
              <div style={{ height: '160px', backgroundColor: 'var(--color-bg)', border: '1px dashed var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="text-muted text-xs italic">Espaço reservado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
