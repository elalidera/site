import React from 'react'
import { getPayload } from 'payload'
import config from '@/../payload.config'
import PostHero from '@/components/posts/PostHero'
import PostGrid from '@/components/posts/PostGrid'
import CategorySection from '@/components/posts/CategorySection'
import { NewsletterForm } from '@/components/shared/NewsletterForm'
import { AdSlot } from '@/components/ads/AdSlot'
import MostRead from '@/components/posts/MostRead'

export const dynamic = 'force-dynamic' // Ensure we get fresh data

export default async function HomePage() {
  const payload = await getPayload({ config })

  // 1. Fetch Hero Post (latest published)
  const { docs: heroDocs } = await payload.find({
    collection: 'posts',
    where: {
      status: { equals: 'published' },
    },
    sort: '-publishedAt',
    limit: 1,
    depth: 2,
  })
  const heroPost = heroDocs[0]

  // 2. Fetch Latest 6 Posts (skipping hero)
  const { docs: latestPosts } = await payload.find({
    collection: 'posts',
    where: {
      status: { equals: 'published' },
      id: { not_equals: heroPost?.id },
    },
    sort: '-publishedAt',
    limit: 6,
    depth: 2,
  })

  // 3. Fetch Top 5 for "Most Read" (using latest as proxy for now)
  const { docs: mostReadPosts } = await payload.find({
    collection: 'posts',
    where: {
      status: { equals: 'published' },
    },
    sort: '-publishedAt', // Later change to views if implemented
    limit: 5,
  })

  // 4. Fetch Categories for Sections
  const { docs: categories } = await payload.find({
    collection: 'categories',
    sort: 'sortOrder',
    limit: 2,
  })

  // Fetch posts for each category
  const categorySections = await Promise.all(
    categories.map(async (category) => {
      const { docs: posts } = await payload.find({
        collection: 'posts',
        where: {
          status: { equals: 'published' },
          category: { equals: category.id },
        },
        sort: '-publishedAt',
        limit: 4,
      })
      return { category, posts }
    })
  )

  const settings = await payload.findGlobal({ slug: 'site-settings' })

  return (
    <div className="container mx-auto px-4 space-y-16 py-8">
      {/* 1. HERO */}
      {heroPost && <PostHero post={heroPost} />}

      {/* 2. AD SLOT Leaderboard */}
      <AdSlot 
        className="flex justify-center border-y border-offwhite-300 py-4"
        slot="leaderboard-top"
      />

      {/* 3. LATEST POSTS GRID */}
      <PostGrid posts={latestPosts} title="Últimas publicações" />

      {/* 4. NEWSLETTER CTA */}
      <section className="py-8">
        <NewsletterForm />
      </section>

      {/* 5. CATEGORY SECTIONS + SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-16">
          {categorySections.map((section) => (
            <CategorySection 
              key={section.category.id} 
              category={section.category} 
              posts={section.posts} 
            />
          ))}
        </div>
        
        <aside className="lg:col-span-4 pt-16">
          <MostRead posts={mostReadPosts} />
          
          <div className="mt-12 sticky top-24">
            <AdSlot slot="sidebar-fixed" className="h-[600px] bg-neutral-50 flex items-center justify-center border border-offwhite-300">
              <span className="text-neutral-300 text-xs italic">Espaço Publicitário</span>
            </AdSlot>
          </div>
        </aside>
      </div>

      {/* 6. BOTTOM AD SLOT */}
      <AdSlot slot="footer-banner" className="py-12 border-t border-offwhite-300" />
    </div>
  )
}
