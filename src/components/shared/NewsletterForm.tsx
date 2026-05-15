// src/components/shared/NewsletterForm.tsx
'use client'
 
import { useState, FormEvent } from 'react'
 
export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
 
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    
    // Client-side honeypot check
    if (honeypot) return

    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Insira um e-mail válido')
      return
    }
 
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, honeypot }),
      })
      const data = await res.json()
 
      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'Inscrição realizada!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Erro ao processar.')
      }
    } catch {
      setStatus('error')
      setMessage('Erro de conexão. Tente novamente.')
    }
  }
 
  if (status === 'success') {
    return (
      <div className="border-l-4 border-accent-700 bg-offwhite-200 p-6 md:p-8">
        <p className="font-display text-xl text-purple-900">Bem-vinda!</p>
        <p className="text-neutral-600 mt-1">{message}</p>
      </div>
    )
  }
 
  return (
    <div className="border-l-4 border-accent-700 bg-offwhite-200 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <div className="flex-1">
          <h2 className="font-display text-xl md:text-2xl text-purple-900">
            Receba o melhor do Ela Lidera
          </h2>
          <p className="text-neutral-600 mt-1 text-sm">
            Conteúdo direto, sem enrolação. Toda semana no seu e-mail.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2 flex-1 min-w-0">
          {/* Honeypot field - hidden from users */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="honeypot"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu melhor e-mail"
            aria-label="E-mail para newsletter"
            className="flex-1 min-w-0 px-4 py-2.5 border border-neutral-300 bg-white text-sm
                       focus:outline-none focus:border-purple-700 transition-colors"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-2.5 bg-purple-700 text-white text-sm font-semibold
                       hover:bg-purple-800 transition-colors disabled:opacity-60 whitespace-nowrap"
          >
            {status === 'loading' ? 'Enviando...' : 'Assinar'}
          </button>
        </form>
      </div>
      {status === 'error' && (
        <p className="text-red-600 text-sm mt-2">{message}</p>
      )}
    </div>
  )
}
