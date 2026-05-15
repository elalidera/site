// src/collections/Posts.ts
import type { CollectionConfig } from 'payload'
 
export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Artigo', plural: 'Artigos' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'status', 'publishedAt'],
    group: 'Conteúdo',
    listSearchableFields: ['title', 'excerpt'],
    pagination: { defaultLimit: 20 },
    description: 'Gerencie os artigos do portal Ela Lidera',
  },
  versions: {
    drafts: {
      autosave: {
        interval: 30000, // auto-save a cada 30 segundos
      },
    },
  },
  access: {
    read: ({ req: { user } }) => {
      // Público vê apenas publicados
      if (!user) return { status: { equals: 'published' } }
      return true
    },
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Gerar slug a partir do título se não fornecido
        if (operation === 'create' && !data.slug && data.title) {
          data.slug = data.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        // Setar publishedAt na primeira publicação
        if (data.status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
      maxLength: 120,
      admin: {
        description: 'Máximo 120 caracteres. Seja direta e impactante.',
      },
    },
    {
      name: 'slug',
      label: 'Slug (URL)',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Gerado automaticamente a partir do título',
      },
    },
    {
      name: 'excerpt',
      label: 'Descrição curta',
      type: 'textarea',
      required: true,
      maxLength: 280,
      admin: {
        description: 'Resumo que aparece nos cards e compartilhamentos. Máx 280 caracteres.',
      },
    },
    {
      name: 'content',
      label: 'Conteúdo',
      type: 'richText',
      required: true,
    },
    {
      name: 'featuredImage',
      label: 'Imagem de destaque',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          label: 'Categoria',
          type: 'relationship',
          relationTo: 'categories',
          required: true,
          hasMany: false,
          admin: {
            width: '50%',
            allowCreate: true, // Permite criar categoria inline
          },
        },
        {
          name: 'tags',
          label: 'Tags',
          type: 'relationship',
          relationTo: 'tags',
          hasMany: true,
          admin: {
            width: '50%',
            allowCreate: true, // Permite criar tag inline
            // O Payload já faz busca/autocomplete em campos relationship
          },
        },
      ],
    },
    {
      name: 'author',
      label: 'Autor(a)',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      defaultValue: ({ user }) => user?.id,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Rascunho', value: 'draft' },
        { label: 'Publicado', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      label: 'Data de publicação',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Preenchido automaticamente na primeira publicação',
      },
    },
    {
      name: 'readingTime',
      label: 'Tempo de leitura (min)',
      type: 'number',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Calculado automaticamente',
      },
      hooks: {
        beforeChange: [
          ({ data, siblingData }) => {
            // Estimativa: 200 palavras por minuto
            if (siblingData?.content) {
              const text = JSON.stringify(siblingData.content)
              const wordCount = text.split(/\s+/).length
              return Math.max(1, Math.ceil(wordCount / 200))
            }
            return data
          },
        ],
      },
    },
    {
      name: 'locale',
      label: 'Idioma',
      type: 'select',
      defaultValue: 'pt',
      options: [
        { label: 'Português', value: 'pt' },
        { label: 'English', value: 'en' },
        { label: 'Español', value: 'es' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Preparado para internacionalização futura',
      },
    },
    // SEO fields são adicionados automaticamente pelo @payloadcms/plugin-seo
  ],
}
