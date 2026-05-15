import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/../payload.config'
import Navigation from './Navigation'
import { Search, Menu } from 'lucide-react'
import SearchBar from '../shared/SearchBar'
import MobileMenu from './MobileMenu'

export default async function Header() {
  const payload = await getPayload({ config })
  
  const { docs: categories } = await payload.find({
    collection: 'categories',
    sort: 'sortOrder',
    limit: 10,
  })

  const settings = await payload.findGlobal({
    slug: 'site-settings',
  })

  return (
    <header className="sticky top-0 z-50 w-full border-b border-offwhite-300 bg-offwhite/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <MobileMenu categories={categories} socialLinks={settings?.socialLinks} />

        {/* Logo */}
        <Link href="/" className="text-2xl md:text-3xl font-display font-bold text-purple-900 tracking-tight shrink-0">
          Ela Lidera
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <Navigation categories={categories} />
        </div>

        {/* Search & Actions */}
        <div className="flex items-center space-x-4">
          <SearchBar />
        </div>
      </div>
    </header>
  )
}
