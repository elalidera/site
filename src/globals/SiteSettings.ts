// src/globals/SiteSettings.ts
import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configurações do Site',
  admin: {
    group: 'Administração',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      label: 'Nome do Site',
      type: 'text',
      required: true,
      defaultValue: 'Ela Lidera',
    },
    {
      name: 'description',
      label: 'Descrição (SEO)',
      type: 'textarea',
      required: true,
    },
    {
      name: 'socialLinks',
      label: 'Links de Redes Sociais',
      type: 'group',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
        },
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
        },
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter URL',
        },
      ],
    },
    {
      name: 'footerDescription',
      label: 'Descrição do Footer',
      type: 'textarea',
    },
    {
      name: 'tracking',
      label: 'Tracking & Marketing',
      type: 'group',
      fields: [
        {
          name: 'gaId',
          label: 'Google Analytics ID (G-XXXXXXX)',
          type: 'text',
        },
        {
          name: 'gtmId',
          label: 'Google Tag Manager ID (GTM-XXXXXXX)',
          type: 'text',
        },
        {
          name: 'pixelId',
          label: 'Meta Pixel ID',
          type: 'text',
        },
        {
          name: 'adsenseId',
          label: 'AdSense Publisher ID (pub-XXXXXXXXXXXX)',
          type: 'text',
        },
        {
          name: 'googleSearchConsole',
          label: 'Search Console Verification Tag',
          type: 'text',
        },
      ],
    },
  ],
}
