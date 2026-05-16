import React from 'react'
import { getPayload } from 'payload'
import config from '@/../payload.config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArticleContent } from '@/components/posts/RichTextRenderer'
import { AdSlot } from '@/components/ads/AdSlot'
import { NewsletterForm } from '@/components/shared/NewsletterForm'
import PostCard from '@/components/posts/PostCard'
import { Metadata } from 'next'
import { Post, Category, Media, User } from '@/../payload-types'

interface PageProps {
  params: Promise<{
    category: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      status: { equals: 'published' },
    },
    limit: 100,
  })

  return posts.map((post: Post) => ({
    category: (post.category as Category)?.slug || 'geral',
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
    },
  })

  const post = posts[0] as Post
  if (!post) return {}

  const featuredImage = post.featuredImage as Media

  return {
    title: `${post.title} | Ela Lidera`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: featuredImage?.url ? [{ url: featuredImage.url }] : [],
      type: 'article',
    },
  }
}

function generateArticleJsonLd(post: Post) {
  const featuredImage = post.featuredImage as Media
  const author = post.author as User

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: featuredImage?.url,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: author?.name || 'Ela Lidera',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ela Lidera',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      },
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
    },
    depth: 2,
  })

  const post = posts[0] as Post
  if (!post) notFound()

  const category = post.category as Category
  const author = post.author as User
  const featuredImage = post.featuredImage as Media

  // Related posts (same category, excluding current)
  const { docs: relatedPosts } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { category: { equals: category?.id } },
        { id: { not_equals: post.id } },
        { status: { equals: 'published' } },
      ],
    },
    limit: 3,
    depth: 1,
  })

  const publishedDate = new Date(post.publishedAt || post.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  const jsonLd = generateArticleJsonLd(post)

  return (
    <article style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', paddingBottom: 'var(--space-3xl)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Header Section */}
      <header className="article-header" style={{ paddingTop: 'var(--space-2xl)' }}>
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link href={`/${category?.slug}`} style={{ fontWeight: 600 }}>
            {category?.title}
          </Link>
        </nav>

        <h1 className="article-title">
          {post.title}
        </h1>

        <div className="article-meta" style={{ borderTop: '1px solid var(--color-border-light)', borderBottom: '1px solid var(--color-border-light)', padding: 'var(--space-md) 0' }}>
          <div className="flex items-center justify-center gap-md">
            <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>Por {author?.name}</span>
            <span style={{ color: 'var(--color-border)' }}>|</span>
            <span>{publishedDate}</span>
            <span style={{ color: 'var(--color-border)' }}>|</span>
            <span>{post.readingTime || 5} min de leitura</span>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="container" style={{ marginBottom: 'var(--space-2xl)', maxWidth: '1000px' }}>
        <div className="article-featured-image">
          <Image
            src={featuredImage?.url || '/placeholder.jpg'}
            alt={featuredImage?.alt || post.title}
            fill
            priority
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
        </div>
      </div>

      {/* Content */}
      <div className="article-content">
        <ArticleContent content={post.content} />
        
        {/* AdSlot In-Article */}
        <div className="section" style={{ borderTop: '1px solid var(--color-border-light)', borderBottom: '1px solid var(--color-border-light)', margin: 'var(--space-2xl) 0', textAlign: 'center', backgroundColor: 'var(--color-bg-secondary)' }}>
          <p className="text-xs text-muted uppercase" style={{ letterSpacing: '1px', marginBottom: 'var(--space-sm)' }}>Publicidade</p>
          <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--color-border)' }}>
            <AdSlot slot="in-article-1" />
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="article-tags">
            {post.tags.map((tag: any) => {
              const tagObj = tag as any
              return (
                <Link
                  key={tagObj.id}
                  href={`/tag/${tagObj.slug}`}
                  className="tag-pill"
                >
                  #{tagObj.title}
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Related Posts */}
      <section className="related-posts" style={{ backgroundColor: 'var(--color-bg-secondary)', padding: 'var(--space-3xl) 0' }}>
        <div className="container">
          <h2 className="text-center mb-xl">
            Continue lendo sobre {category?.title}
          </h2>
          <div className="grid grid-3">
            {relatedPosts.map((related) => (
              <PostCard key={related.id} post={related} />
            ))}
          </div>
          
          <div className="container-narrow mt-3xl">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </article>
  )
}
