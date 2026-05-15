import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

export function ArticleContent({ content }: { content: any }) {
  if (!content) return null

  return (
    <div className="prose prose-lg max-w-none
      prose-headings:font-display prose-headings:text-purple-900
      prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-offwhite-300
      prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
      prose-p:text-neutral-800 prose-p:leading-relaxed prose-p:mb-8 font-body
      prose-a:text-purple-700 prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-accent-700 transition-colors
      prose-blockquote:border-l-4 prose-blockquote:border-accent-700
      prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-neutral-600 prose-blockquote:bg-offwhite-200 prose-blockquote:py-4 prose-blockquote:pr-4
      prose-strong:text-purple-900 prose-strong:font-bold
      prose-img:rounded-sm prose-img:my-12 prose-img:shadow-sm
      prose-li:text-neutral-800 prose-li:mb-2
    ">
      <RichText data={content} />
    </div>
  )
}
