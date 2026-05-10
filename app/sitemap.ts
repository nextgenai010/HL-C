import type { MetadataRoute } from 'next'
import { YDELSER } from '@/lib/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://hlchristiansen.dk'
  const now = new Date()
  const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/om-os', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/ydelser', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/projekter', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/kontakt', priority: 0.9, changeFrequency: 'yearly' as const },
    { path: '/cookies', priority: 0.2, changeFrequency: 'yearly' as const },
  ].map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
  const ydelseRoutes = YDELSER.map((y) => ({
    url: `${base}/ydelser/${y.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))
  return [...staticRoutes, ...ydelseRoutes]
}
