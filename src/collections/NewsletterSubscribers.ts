// src/collections/NewsletterSubscribers.ts
import type { CollectionConfig } from 'payload'
 
export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  labels: { singular: 'Assinante', plural: 'Assinantes da Newsletter' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'status', 'subscribedAt'],
    group: 'Marketing',
    description: 'Gerenciamento de assinantes da newsletter',
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true, // Público pode se inscrever via API
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'email',
      label: 'E-mail',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Ativo', value: 'active' },
        { label: 'Cancelado', value: 'unsubscribed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'subscribedAt',
      label: 'Data de inscrição',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'source',
      label: 'Origem',
      type: 'select',
      defaultValue: 'website',
      options: [
        { label: 'Website', value: 'website' },
        { label: 'Import', value: 'import' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
