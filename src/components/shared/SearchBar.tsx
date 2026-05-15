'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Search, X, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 2) {
        setIsLoading(true)
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
          const data = await res.json()
          setResults(data.results || [])
        } catch (error) {
          console.error('Search error:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query) {
      router.push(`/busca?q=${encodeURIComponent(query)}`)
      setIsOpen(false)
    }
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-neutral-600 hover:text-purple-900 transition-colors"
      >
        <Search size={22} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 md:w-96 bg-white border border-offwhite-300 shadow-xl rounded-sm p-4 z-[100]">
          <form onSubmit={handleSubmit} className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="O que você está procurando?"
              className="w-full border-b border-neutral-200 py-2 pr-10 focus:outline-none focus:border-accent-700 text-sm"
            />
            {isLoading ? (
              <Loader2 className="absolute right-2 top-2 animate-spin text-neutral-400" size={18} />
            ) : (
              <X 
                className="absolute right-2 top-2 cursor-pointer text-neutral-400" 
                size={18} 
                onClick={() => setQuery('')}
              />
            )}
          </form>

          {results.length > 0 && (
            <div className="mt-4 space-y-3">
              {results.slice(0, 5).map((result: any) => (
                <Link
                  key={result.id}
                  href={`/${result.category?.slug}/${result.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="block group"
                >
                  <p className="text-sm font-semibold text-neutral-900 group-hover:text-accent-700 line-clamp-1 transition-colors">
                    {result.title}
                  </p>
                  <p className="text-xs text-neutral-400 uppercase tracking-tight">
                    {result.category?.title}
                  </p>
                </Link>
              ))}
              <Link
                href={`/busca?q=${encodeURIComponent(query)}`}
                onClick={() => setIsOpen(false)}
                className="block text-center text-xs font-bold text-accent-700 hover:underline pt-2 border-t border-offwhite-200"
              >
                Ver todos os resultados
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
