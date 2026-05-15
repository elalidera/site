import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/../payload.config'
import { Instagram, Linkedin, Facebook, Twitter } from 'lucide-react'

export default async function Footer() {
  const payload = await getPayload({ config })
  
  const settings = await payload.findGlobal({
    slug: 'site-settings',
  })

  const { docs: categories } = await payload.find({
    collection: 'categories',
    sort: 'sortOrder',
    limit: 8,
  })

  const socialLinks = settings?.socialLinks

  return (
    <footer className="bg-offwhite-200 border-t border-offwhite-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About */}
          <div className="space-y-6">
            <Link href="/" className="text-3xl font-display font-bold text-purple-900 tracking-tight block">
              Ela Lidera
            </Link>
            <p className="text-neutral-600 text-sm leading-relaxed max-w-xs">
              {settings?.footerDescription || 'O portal editorial definitivo para mulheres líderes 40+ que buscam impacto, elegância e crescimento.'}
            </p>
          </div>

          {/* Categorias */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-6">Explore</h4>
            <ul className="space-y-4">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/${category.slug}`} className="text-neutral-600 hover:text-accent-700 text-sm transition-colors">
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-6">Institucional</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/sobre" className="text-neutral-600 hover:text-accent-700 text-sm transition-colors">
                  Sobre o Ela Lidera
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-neutral-600 hover:text-accent-700 text-sm transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidade" className="text-neutral-600 hover:text-accent-700 text-sm transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-6">Redes Sociais</h4>
            <div className="flex space-x-5 text-purple-900">
              {socialLinks?.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent-700 transition-colors">
                  <Instagram size={22} />
                </a>
              )}
              {socialLinks?.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent-700 transition-colors">
                  <Linkedin size={22} />
                </a>
              )}
              {socialLinks?.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-accent-700 transition-colors">
                  <Facebook size={22} />
                </a>
              )}
              {socialLinks?.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-accent-700 transition-colors">
                  <Twitter size={22} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-offwhite-300 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-400 font-medium tracking-tight">
          <p>© {new Date().getFullYear()} Ela Lidera. Todos os direitos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 uppercase tracking-widest">
            <span>Desenvolvido com sofisticação</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
