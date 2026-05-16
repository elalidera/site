import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/../payload.config'
import Navigation from './Navigation'
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
    <header className="header">
      <div className="header-inner">
        {/* Mobile Menu Button */}
        <MobileMenu categories={categories} socialLinks={settings?.socialLinks} />

        {/* Logo */}
        <Link href="/" className="logo">
          Ela Lidera
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden">
          <Navigation categories={categories} />
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-md">
          <SearchBar />
        </div>
      </div>
    </header>
  )
}
