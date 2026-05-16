'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationProps {
  categories: any[]
  className?: string
}

export default function Navigation({ categories, className }: NavigationProps) {
  const pathname = usePathname()

  return (
    <nav className={`nav ${className || ''}`}>
      {categories.map((category) => {
        const isActive = pathname === `/${category.slug}`
        
        return (
          <Link
            key={category.id}
            href={`/${category.slug}`}
            className={isActive ? 'active' : ''}
          >
            {category.title}
          </Link>
        )
      })}
    </nav>
  )
}
