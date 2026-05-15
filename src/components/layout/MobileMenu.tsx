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
    <div className="lg:hidden">
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 -ml-2 text-purple-900"
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
              className="fixed inset-0 z-[60] bg-purple-900/40 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[70] w-[85%] max-w-sm bg-offwhite p-6 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="text-2xl font-display font-bold text-purple-900">Ela Lidera</span>
                <button onClick={() => setIsOpen(false)} className="p-2 text-neutral-600">
                  <X size={28} />
                </button>
              </div>

              <nav className="flex flex-col space-y-6 flex-grow">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/${category.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-semibold text-neutral-900 hover:text-accent-700 transition-colors"
                  >
                    {category.title}
                  </Link>
                ))}
              </nav>

              <div className="border-t border-offwhite-300 pt-8 mt-auto">
                <div className="flex space-x-6 justify-center text-purple-900">
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
                <p className="text-center text-sm text-neutral-400 mt-6 font-medium tracking-tight">
                  © 2026 Ela Lidera. Todos os direitos reservados.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
