import { getPayload } from 'payload'
import config from '../payload.config'

const seed = async () => {
  const payload = await getPayload({ config })

  console.log('Seeding database...')

  // 1. Create Admin User
  const { totalDocs: userCount } = await payload.find({
    collection: 'users',
  })

  if (userCount === 0) {
    console.log('Creating admin user...')
    await payload.create({
      collection: 'users',
      data: {
        email: 'vander@gmail.com', // Change this or keep it as placeholder
        password: 'l2EFI8Kovd3gPaey', // Same password as DB for consistency in this environment
        name: 'Vander Freitas',
        role: 'admin',
      },
    })
  }

  // 2. Create Categories
  const categories = [
    { title: 'Liderança Feminina', slug: 'lideranca-feminina', sortOrder: 1 },
    { title: 'Carreira & Negócios', slug: 'carreira-e-negocios', sortOrder: 2 },
    { title: 'Etiqueta Corporativa', slug: 'etiqueta-corporativa', sortOrder: 3 },
    { title: 'Poder Pessoal', slug: 'poder-pessoal', sortOrder: 4 },
    { title: 'Dinheiro & Independência', slug: 'dinheiro-e-independencia', sortOrder: 5 },
    { title: 'Lifestyle Inteligente', slug: 'lifestyle-inteligente', sortOrder: 6 },
    { title: 'Opinião', slug: 'opiniao', sortOrder: 7 },
  ]

  for (const cat of categories) {
    const { totalDocs } = await payload.find({
      collection: 'categories',
      where: {
        slug: { equals: cat.slug },
      },
    })

    if (totalDocs === 0) {
      console.log(`Creating category: ${cat.title}`)
      await payload.create({
        collection: 'categories',
        data: cat,
      })
    }
  }

  // 3. Initialize SiteSettings
  console.log('Initializing SiteSettings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Ela Lidera',
      description: 'O portal editorial definitivo para mulheres líderes 40+ que buscam impacto, elegância e crescimento.',
      footerDescription: 'Inspirando e capacitando mulheres líderes a alcançarem seu potencial máximo com elegância e estratégia.',
      socialLinks: {
        instagram: 'https://instagram.com/elalidera',
        linkedin: 'https://linkedin.com/company/elalidera',
      },
    },
  })

  console.log('Seed completed successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
