// src/components/shared/NewsletterForm.tsx
'use client'
 
import { useState, FormEvent } from 'react'
 
interface NewsletterFormProps {
  inverted?: boolean
}

export function NewsletterForm({ inverted = false }: NewsletterFormProps) {
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
      <div className={`p-6 md:p-8 ${inverted ? 'bg-purple-800' : 'bg-offwhite-200 border-l-4 border-accent-700'}`}>
        <p className={`font-display text-xl ${inverted ? 'text-white' : 'text-purple-900'}`}>Bem-vinda!</p>
        <p className={`${inverted ? 'text-purple-100' : 'text-neutral-600'} mt-1`}>{message}</p>
      </div>
    )
  }
 
  return (
    <div className={`p-6 md:p-8 ${inverted ? 'bg-purple-800 border-none rounded-none' : 'bg-offwhite-200 border-l-4 border-accent-700'}`}>
      <div className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-8 ${inverted ? 'md:gap-12' : ''}`}>
        <div className="flex-1">
          <h2 className={`font-display text-xl md:text-2xl ${inverted ? 'text-white' : 'text-purple-900'}`}>
            Receba o melhor do Ela Lidera
          </h2>
          <p className={`${inverted ? 'text-purple-100' : 'text-neutral-600'} mt-1 text-sm`}>
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
            className={`flex-1 min-w-0 px-4 py-2.5 border text-sm focus:outline-none transition-colors ${
              inverted 
                ? 'bg-purple-900 border-purple-700 text-white placeholder-purple-300 focus:border-accent-400' 
                : 'bg-white border-neutral-300 text-neutral-900 focus:border-purple-700'
            }`}
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className={`px-6 py-2.5 text-sm font-semibold transition-colors disabled:opacity-60 whitespace-nowrap ${
              inverted 
                ? 'bg-accent-500 text-white hover:bg-accent-600' 
                : 'bg-purple-700 text-white hover:bg-purple-800'
            }`}
          >
            {status === 'loading' ? 'Enviando...' : 'Assinar'}
          </button>
        </form>
      </div>
      {status === 'error' && (
        <p className={`${inverted ? 'text-accent-200' : 'text-red-600'} text-sm mt-2`}>{message}</p>
      )}
    </div>
  )
}
