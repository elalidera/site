import React from 'react'
import { getPayload } from 'payload'
import config from '@/../payload.config'
import PostHero from '@/components/posts/PostHero'
import PostGrid from '@/components/posts/PostGrid'
import CategorySection from '@/components/posts/CategorySection'
import { NewsletterForm } from '@/components/shared/NewsletterForm'
import { AdSlot } from '@/components/ads/AdSlot'
import MostRead from '@/components/posts/MostRead'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config })

  // 1. Fetch Hero Post
  const { docs: heroDocs } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 1,
    depth: 2,
  })
  const heroPost = heroDocs[0]

  // 2. Fetch Latest 6 Posts
  const { docs: latestPosts } = await payload.find({
    collection: 'posts',
    where: { 
      status: { equals: 'published' },
      ...(heroPost ? { id: { not_equals: heroPost.id } } : {}),
    },
    sort: '-publishedAt',
    limit: 6,
    depth: 2,
  })

  // 3. Fetch Top 5 for Sidebar
  const { docs: mostReadPosts } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 5,
  })

  // 4. Fetch Category Sections
  const { docs: categories } = await payload.find({
    collection: 'categories',
    sort: 'sortOrder',
    limit: 3,
  })

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

  return (
    <div className="bg-offwhite min-h-screen">
      {/* SEÇÃO HERO - O impacto inicial */}
      <section className="border-b border-offwhite-300">
        {heroPost ? (
          <PostHero post={heroPost} />
        ) : (
          <div className="py-32 text-center">
            <h1 className="text-4xl font-display text-purple-900">Bem-vinda ao Ela Lidera</h1>
            <p className="text-neutral-600 mt-4">Conteúdo premium para mulheres que lideram o seu tempo.</p>
          </div>
        )}
      </section>

      {/* SEÇÃO DE ÚLTIMAS NOTÍCIAS */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 border-b border-purple-100 pb-4">
          <h2 className="text-3xl font-display text-purple-900">As mais recentes</h2>
          <span className="text-accent-600 font-medium text-sm uppercase tracking-widest">Update diário</span>
        </div>
        
        <PostGrid posts={latestPosts} />
      </div>

      {/* SEÇÃO NEWSLETTER - Design Editorial High-Contrast */}
      <section className="bg-purple-900 py-20 my-16 text-offwhite">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h3 className="text-4xl md:text-5xl font-display leading-tight">
              Liderança, postura e crescimento <br/> de um jeito forte e elegante.
            </h3>
            <p className="text-purple-100 text-lg max-w-2xl mx-auto">
              Inscreva-se na nossa curadoria semanal e receba insights exclusivos para o seu desenvolvimento.
            </p>
            <div className="max-w-md mx-auto pt-4">
              <NewsletterForm inverted />
            </div>
          </div>
        </div>
      </section>

      {/* FEED PRINCIPAL + SIDEBAR */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Coluna Principal */}
          <div className="lg:col-span-8 space-y-24">
            {categorySections.map((section) => (
              <CategorySection 
                key={section.category.id} 
                category={section.category} 
                posts={section.posts} 
              />
            ))}
          </div>
          
          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-16">
            <div className="sticky top-32 space-y-16">
              <MostRead posts={mostReadPosts} />
              
              <div className="p-8 bg-offwhite-200 border border-offwhite-300 space-y-4">
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 block text-center">Publicidade</span>
                <AdSlot slot="sidebar-home" className="h-[250px] flex items-center justify-center grayscale" />
              </div>

              {/* Box de Seguir (Placeholder visual) */}
              <div className="border-t-4 border-purple-900 pt-8">
                <h4 className="font-display text-xl text-purple-900 mb-4">Siga o Ela Lidera</h4>
                <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                  Junte-se à nossa comunidade de líderes nas redes sociais e acompanhe os bastidores.
                </p>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-900 cursor-pointer hover:bg-purple-900 hover:text-white transition-colors">IN</div>
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-900 cursor-pointer hover:bg-purple-900 hover:text-white transition-colors">IG</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* BANNER FINAL */}
      <div className="container mx-auto px-4 pb-20">
        <AdSlot slot="bottom-home" className="w-full h-32 bg-offwhite-300 flex items-center justify-center">
          <span className="text-neutral-400 text-xs italic">Publicidade</span>
        </AdSlot>
      </div>
    </div>
  )
}
