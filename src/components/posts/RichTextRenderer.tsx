import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

export function ArticleContent({ content }: { content: any }) {
  if (!content) return null

  return (
    <div className="rich-text">
      <RichText data={content} />
    </div>
  )
}
