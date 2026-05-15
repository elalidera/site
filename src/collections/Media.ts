// src/collections/Media.ts
import type { CollectionConfig } from 'payload'
 
export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Mídia', plural: 'Mídia' },
  admin: {
    group: 'Conteúdo',
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 480,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      label: 'Texto alternativo',
      type: 'text',
      required: true,
      admin: {
        description: 'Descreva a imagem para acessibilidade e SEO',
      },
    },
    {
      name: 'caption',
      label: 'Legenda',
      type: 'text',
    },
  ],
}
