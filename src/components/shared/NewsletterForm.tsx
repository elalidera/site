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
      <div className="newsletter" style={inverted ? { backgroundColor: 'var(--color-purple-800)', borderLeft: 'none' } : {}}>
        <p className="newsletter-title" style={inverted ? { color: 'white' } : {}}>Bem-vinda!</p>
        <p className="newsletter-subtitle" style={inverted ? { color: 'var(--color-purple-100)' } : {}}>{message}</p>
      </div>
    )
  }
 
  return (
    <div className="newsletter" style={inverted ? { backgroundColor: 'var(--color-purple-800)', borderLeft: 'none' } : {}}>
      <div className="newsletter-inner">
        <div className="newsletter-text">
          <h2 className="newsletter-title" style={inverted ? { color: 'white' } : {}}>
            Receba o melhor do Ela Lidera
          </h2>
          <p className="newsletter-subtitle" style={inverted ? { color: 'var(--color-purple-100)' } : {}}>
            Conteúdo direto, sem enrolação. Toda semana no seu e-mail.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="newsletter-form">
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
            className="newsletter-input"
            style={inverted ? { backgroundColor: 'var(--color-purple-900)', borderColor: 'var(--color-purple-700)', color: 'white' } : {}}
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn btn-primary"
            style={inverted ? { backgroundColor: 'var(--color-accent-500)' } : {}}
          >
            {status === 'loading' ? 'Enviando...' : 'Assinar'}
          </button>
        </form>
      </div>
      {status === 'error' && (
        <p className="text-sm mt-sm" style={{ color: inverted ? 'var(--color-accent-200)' : 'var(--color-accent-700)' }}>{message}</p>
      )}
    </div>
  )
}
