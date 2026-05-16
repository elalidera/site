// src/components/ads/AdSlot.tsx
'use client'
 
import { useEffect, useRef } from 'react'
 
interface AdSlotProps {
  slot?: string
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle'
  responsive?: boolean
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}
 
export function AdSlot({ slot, format = 'auto', responsive = true, className, style, children }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const isLoaded = useRef(false)
 
  useEffect(() => {
    if (isLoaded.current) return
    try {
      // @ts-ignore
      if (window.adsbygoogle && adRef.current) {
        // @ts-ignore
        window.adsbygoogle.push({})
        isLoaded.current = true
      }
    } catch (e) {
      // AdSense might not be loaded or blocked
    }
  }, [])
 
  if (!slot) return null
 
  return (
    <div className={className} style={style} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
      {!isLoaded.current && children}
    </div>
  )
}
