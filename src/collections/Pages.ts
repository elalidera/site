// src/collections/Pages.ts
import type { CollectionConfig } from 'payload'
 
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Página', plural: 'Páginas' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status'],
    group: 'Conteúdo',
    description: 'Páginas de conteúdo fixo (Sobre, Contato, Política de Privacidade, etc.)',
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return { status: { equals: 'published' } }
      return true
    },
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug (URL)',
      type: 'text',
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      label: 'Resumo (SEO)',
      type: 'textarea',
      admin: {
        description: 'Breve resumo da página para resultados de busca.',
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
      label: 'Imagem de capa',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Rascunho', value: 'draft' },
        { label: 'Publicada', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    // SEO fields adicionados automaticamente pelo plugin
  ],
}
