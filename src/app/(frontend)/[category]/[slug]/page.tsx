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
    <article className="min-h-screen bg-offwhite pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Header Section */}
      <header className="container mx-auto px-4 pt-12 pb-8 max-w-4xl">
        <nav className="flex items-center space-x-2 text-xs text-neutral-400 uppercase tracking-widest mb-8">
          <Link href="/" className="hover:text-accent-700">Home</Link>
          <span>/</span>
          <Link href={`/${category?.slug}`} className="hover:text-accent-700 font-bold text-neutral-600">
            {category?.title}
          </Link>
        </nav>

        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-purple-900 leading-tight mb-8">
          {post.title}
        </h1>

        <div className="flex items-center space-x-4 border-y border-offwhite-300 py-6 text-sm text-neutral-500 font-body">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <span className="font-bold text-neutral-900">Por {author?.name}</span>
            <span className="hidden md:inline text-offwhite-300">|</span>
            <span>{publishedDate}</span>
            <span className="hidden md:inline text-offwhite-300">|</span>
            <span>{post.readingTime || 5} min de leitura</span>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="container mx-auto px-4 mb-16 max-w-6xl">
        <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
          <Image
            src={featuredImage?.url || '/placeholder.jpg'}
            alt={featuredImage?.alt || post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-3xl">
        <ArticleContent content={post.content} />
        
        {/* AdSlot In-Article (Placeholder) */}
        <AdSlot slot="in-article-1" className="my-16 border-y border-offwhite-300 py-8 text-center bg-offwhite-200">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Publicidade</p>
          <div className="h-60 flex items-center justify-center border border-dashed border-offwhite-300">
            <span className="text-neutral-400 text-xs italic">Publicidade Editorial</span>
          </div>
        </AdSlot>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-offwhite-300 flex flex-wrap gap-2">
            {post.tags.map((tag: any) => {
              const tagObj = tag as any // Need to handle relation type
              return (
                <Link
                  key={tagObj.id}
                  href={`/tag/${tagObj.slug}`}
                  className="px-4 py-1.5 bg-white border border-offwhite-300 text-xs font-bold uppercase tracking-widest text-neutral-600 hover:border-accent-700 hover:text-accent-700 transition-colors"
                >
                  #{tagObj.title}
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Related Posts */}
      <section className="bg-offwhite-200 mt-24 py-20 border-t border-offwhite-300">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl text-purple-900 mb-12 text-center">
            Continue lendo sobre {category?.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((related) => (
              <PostCard key={related.id} post={related} />
            ))}
          </div>
          
          <div className="mt-20 max-w-4xl mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </article>
  )
}
