'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface NavigationProps {
  categories: any[]
  className?: string
}

export default function Navigation({ categories, className }: NavigationProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-6", className)}>
      {categories.map((category) => {
        const isActive = pathname === `/${category.slug}`
        
        return (
          <Link
            key={category.id}
            href={`/${category.slug}`}
            className={cn(
              "text-sm uppercase tracking-widest font-semibold transition-colors duration-200 py-1",
              "hover:text-accent-700",
              isActive ? "text-accent-700 border-b border-accent-700" : "text-neutral-600"
            )}
          >
            {category.title}
          </Link>
        )
      })}
    </nav>
  )
}
