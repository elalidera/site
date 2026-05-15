// src/collections/Tags.ts
import type { CollectionConfig } from 'payload'
 
export const Tags: CollectionConfig = {
  slug: 'tags',
  labels: { singular: 'Tag', plural: 'Tags' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
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
  ],
}
