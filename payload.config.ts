import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Posts } from './src/collections/Posts'
import { Categories } from './src/collections/Categories'
import { Tags } from './src/collections/Tags'
import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Pages } from './src/collections/Pages'
import { NewsletterSubscribers } from './src/collections/NewsletterSubscribers'
import { SiteSettings } from './src/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Posts, Pages, Categories, Tags, Media, Users, NewsletterSubscribers],
  globals: [SiteSettings],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  plugins: [
    seoPlugin({
      collections: ['posts', 'pages'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }: any) => `Ela Lidera — ${doc.title}`,
      generateDescription: ({ doc }: any) => doc.excerpt,
    }),
  ],
})
