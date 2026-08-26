"use client"

import { useEffect, useState } from 'react'

export default function CookieBannerClient() {
  const [Banner, setBanner] = useState(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const mod = await import('./CookieBanner')
        if (mounted) setBanner(() => mod.default)
      } catch (e) {
        console.error('Failed to load CookieBanner dynamically', e)
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

  if (!Banner) return null
  return <Banner />
}
