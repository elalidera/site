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
    <div className="bg-bg">
      {/* SEÇÃO HERO - O impacto inicial */}
      <section style={{ borderBottom: '1px solid var(--color-border-light)' }}>
        {heroPost ? (
          <PostHero post={heroPost} />
        ) : (
          <div className="text-center" style={{ padding: 'var(--space-4xl) 0' }}>
            <h1 style={{ fontSize: '2.5rem' }}>Bem-vinda ao Ela Lidera</h1>
            <p className="text-muted mt-md">Conteúdo premium para mulheres que lideram o seu tempo.</p>
          </div>
        )}
      </section>

      {/* SEÇÃO DE ÚLTIMAS NOTÍCIAS */}
      <div className="container" style={{ padding: 'var(--space-3xl) var(--space-lg)' }}>
        <div className="section-heading">
          <h2>As mais recentes</h2>
          <span className="text-xs" style={{ color: 'var(--color-accent-700)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Update diário</span>
        </div>
        
        <PostGrid posts={latestPosts} />
      </div>

      {/* SEÇÃO NEWSLETTER - Design Editorial High-Contrast */}
      <section style={{ backgroundColor: 'var(--color-purple-900)', padding: 'var(--space-3xl) 0', color: 'white', margin: 'var(--space-3xl) 0' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', lineHeight: '1.2', color: 'white', marginBottom: 'var(--space-lg)' }}>
              Liderança, postura e crescimento <br/> de um jeito forte e elegante.
            </h3>
            <p style={{ color: 'var(--color-purple-100)', fontSize: '1.125rem', marginBottom: 'var(--space-xl)' }}>
              Inscreva-se na nossa curadoria semanal e receba insights exclusivos para o seu desenvolvimento.
            </p>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <NewsletterForm inverted />
            </div>
          </div>
        </div>
      </section>

      {/* FEED PRINCIPAL + SIDEBAR */}
      <div className="container" style={{ padding: 'var(--space-3xl) var(--space-lg)' }}>
        <div className="grid grid-sidebar" style={{ gap: 'var(--space-2xl)' }}>
          {/* Coluna Principal */}
          <div className="flex flex-col gap-4xl">
            {categorySections.map((section) => (
              <CategorySection 
                key={section.category.id} 
                category={section.category} 
                posts={section.posts} 
              />
            ))}
          </div>
          
          {/* Sidebar */}
          <aside className="flex flex-col gap-2xl">
            <div style={{ position: 'sticky', top: '100px' }}>
              <MostRead posts={mostReadPosts} />
              
              <div className="mt-xl" style={{ padding: 'var(--space-xl)', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-light)' }}>
                <span className="text-xs text-muted block text-center uppercase" style={{ letterSpacing: '1px', marginBottom: 'var(--space-md)' }}>Publicidade</span>
                <AdSlot slot="sidebar-home" className="flex items-center justify-center" style={{ height: '250px' }} />
              </div>

              {/* Box de Seguir (Placeholder visual) */}
              <div style={{ borderTop: '4px solid var(--color-purple-900)', marginTop: 'var(--space-xl)', paddingTop: 'var(--space-lg)' }}>
                <h4 style={{ fontSize: '1.25rem', color: 'var(--color-purple-900)', marginBottom: 'var(--space-md)' }}>Siga o Ela Lidera</h4>
                <p className="text-sm text-muted" style={{ marginBottom: 'var(--space-lg)' }}>
                  Junte-se à nossa comunidade de líderes nas redes sociais e acompanhe os bastidores.
                </p>
                <div className="flex gap-md">
                  <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-purple-100)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-purple-900)', cursor: 'pointer' }}>IN</div>
                  <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-purple-100)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-purple-900)', cursor: 'pointer' }}>IG</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* BANNER FINAL */}
      <div className="container" style={{ paddingBottom: 'var(--space-4xl)' }}>
        <AdSlot slot="bottom-home" className="flex items-center justify-center" style={{ width: '100%', height: '128px', backgroundColor: 'var(--color-bg-tertiary)' }}>
          <span className="text-muted text-xs italic">Publicidade</span>
        </AdSlot>
      </div>
    </div>
  )
}
