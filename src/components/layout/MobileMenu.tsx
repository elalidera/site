'use client'

import React, { useState } from 'react'
import { Menu, X, Instagram, Linkedin, Facebook, Twitter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface MobileMenuProps {
  categories: any[]
  socialLinks?: any
}

export default function MobileMenu({ categories, socialLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="nav-mobile-toggle"
        aria-label="Open Menu"
      >
        <Menu size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="mobile-menu-backdrop"
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 200,
                backgroundColor: 'rgba(45, 27, 78, 0.4)',
                backdropFilter: 'blur(4px)'
              }}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="mobile-menu"
            >
              <button onClick={() => setIsOpen(false)} className="mobile-menu-close">
                <X size={28} />
              </button>

              <div className="logo mb-lg">Ela Lidera</div>

              <nav className="mobile-menu-nav">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/${category.slug}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {category.title}
                    </Link>
                  </li>
                ))}
              </nav>

              <div className="mt-auto pt-lg border-top">
                <div className="footer-social flex items-center justify-center gap-md">
                  {socialLinks?.instagram && (
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                      <Instagram size={24} />
                    </a>
                  )}
                  {socialLinks?.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin size={24} />
                    </a>
                  )}
                  {socialLinks?.facebook && (
                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                      <Facebook size={24} />
                    </a>
                  )}
                  {socialLinks?.twitter && (
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter size={24} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
