import { getPayload } from 'payload'
import config from '@/../payload.config'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, honeypot } = await request.json()

    // Honeypot anti-spam check
    if (honeypot) {
      return NextResponse.json({ message: 'Spam detectado.' }, { status: 400 })
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'E-mail inválido ou obrigatório' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    // Check if already subscribed
    const { totalDocs } = await payload.find({
      collection: 'newsletter-subscribers',
      where: {
        email: { equals: email },
      },
    })

    if (totalDocs > 0) {
      return NextResponse.json({ message: 'Você já está inscrita em nossa newsletter!' })
    }

    // Create subscriber
    await payload.create({
      collection: 'newsletter-subscribers',
      data: {
        email,
        status: 'active',
        source: 'website',
        subscribedAt: new Date().toISOString(),
      },
    })

    return NextResponse.json({ message: 'Bem-vinda ao Ela Lidera! Inscrição realizada com sucesso.' })
  } catch (error: any) {
    console.error('Newsletter error:', error)
    return NextResponse.json({ error: 'Erro ao processar sua inscrição.' }, { status: 500 })
  }
}
