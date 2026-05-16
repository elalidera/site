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
    <div className="search-bar" style={{ position: 'relative' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ background: 'none', border: 'none', padding: 'var(--space-sm)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
      >
        <Search size={22} />
      </button>

      {isOpen && (
        <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: 'var(--space-sm)', width: '320px', backgroundColor: 'white', border: '1px solid var(--color-border)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: 'var(--border-radius)', padding: 'var(--space-md)', zIndex: 100 }}>
          <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar..."
              className="search-input"
              style={{ width: '100%', paddingLeft: 'var(--space-md)' }}
            />
            {isLoading ? (
              <Loader2 style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', animation: 'spin 1s linear infinite' }} size={18} />
            ) : (
              <X 
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--color-text-muted)' }} 
                size={18} 
                onClick={() => setQuery('')}
              />
            )}
          </form>

          {results.length > 0 && (
            <div style={{ marginTop: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {results.slice(0, 5).map((result: any) => (
                <Link
                  key={result.id}
                  href={`/${result.category?.slug}/${result.slug}`}
                  onClick={() => setIsOpen(false)}
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '2px' }}>
                    {result.title}
                  </p>
                  <p className="text-xs text-muted uppercase" style={{ margin: 0 }}>
                    {result.category?.title}
                  </p>
                </Link>
              ))}
              <Link
                href={`/busca?q=${encodeURIComponent(query)}`}
                onClick={() => setIsOpen(false)}
                style={{ display: 'block', textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent-700)', paddingTop: 'var(--space-sm)', borderTop: '1px solid var(--color-border-light)' }}
              >
                Ver todos os resultados
              </Link>
            </div>
          )}
        </div>
      )}
      <style jsx>{`
        @keyframes spin {
          from { transform: translateY(-50%) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
