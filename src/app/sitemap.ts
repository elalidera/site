// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/../payload.config'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elalidera.com.br'
 
  // Posts publicados
  const posts = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    limit: 1000,
    sort: '-publishedAt',
    depth: 1,
  })
 
  const postEntries = posts.docs.map((post: any) => {
    const categorySlug = typeof post.category === 'object' ? post.category.slug : ''
    return {
      url: `${baseUrl}/${categorySlug}/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  })
 
  // Categorias
  const categories = await payload.find({
    collection: 'categories',
    limit: 50,
  })
 
  const categoryEntries = categories.docs.map((cat: any) => ({
    url: `${baseUrl}/${cat.slug}`,
    lastModified: new Date(cat.updatedAt),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))
 
  // Páginas fixas
  const pages = await payload.find({
    collection: 'pages',
    where: { status: { equals: 'published' } },
    limit: 50,
  })
 
  const pageEntries = pages.docs.map((page: any) => ({
    url: `${baseUrl}/pagina/${page.slug}`,
    lastModified: new Date(page.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))
 
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...categoryEntries,
    ...postEntries,
    ...pageEntries,
  ]
}
