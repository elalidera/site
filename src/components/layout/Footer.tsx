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
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* About */}
          <div>
            <Link href="/" className="footer-logo">
              Ela Lidera
            </Link>
            <p className="footer-description">
              {settings?.footerDescription || 'O portal editorial definitivo para mulheres líderes 40+ que buscam impacto, elegância e crescimento.'}
            </p>
          </div>

          {/* Categorias */}
          <div>
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/${category.slug}`}>
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h4 className="footer-heading">Institucional</h4>
            <ul className="footer-links">
              <li>
                <Link href="/sobre">
                  Sobre o Ela Lidera
                </Link>
              </li>
              <li>
                <Link href="/contato">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidade">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Bottom */}
        <div className="footer-bottom">
          <div className="footer-social mb-lg flex items-center justify-center">
            {socialLinks?.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                <Instagram size={22} />
              </a>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin size={22} />
              </a>
            )}
            {socialLinks?.facebook && (
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                <Facebook size={22} />
              </a>
            )}
            {socialLinks?.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                <Twitter size={22} />
              </a>
            )}
          </div>
          <p>© {new Date().getFullYear()} Ela Lidera. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
