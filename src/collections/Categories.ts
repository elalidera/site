// src/collections/Categories.ts
import type { CollectionConfig } from 'payload'
 
export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Categoria', plural: 'Categorias' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'sortOrder'],
    group: 'Conteúdo',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL amigável (ex: lideranca-feminina)',
      },
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
    },
    {
      name: 'description',
      label: 'Descrição',
      type: 'textarea',
      admin: {
        description: 'Descrição da categoria para SEO e página de listagem',
      },
    },
    {
      name: 'sortOrder',
      label: 'Ordem de exibição',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Menor número aparece primeiro na navegação',
      },
    },
    // Campos SEO serão adicionados automaticamente pelo plugin
  ],
}
