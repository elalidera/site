import { getPayload } from 'payload'
import config from '@/../payload.config'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ results: [] })
  }

  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      or: [
        { title: { contains: query } },
        { excerpt: { contains: query } },
      ],
      status: { equals: 'published' },
    },
    limit: 5,
  })

  return NextResponse.json({ results: posts })
}
