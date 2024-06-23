'use client'
import { useEffect, useRef } from 'react'
import { useCookies } from 'next-client-cookies'
import { useParams } from 'next/navigation'
import { throttle } from '@/lib/helpers/utils'

export default function AnalyticsHandler() {
  const cookies = useCookies()
  const params = useParams()
  const articleRef = useRef<HTMLElement | null>(null)
  const tapbarRef = useRef<HTMLElement | null>(null)
  const prevReadingPercent = useRef(0)
  const readingPercent = useRef(0)

  const onScroll = () => {
    if (!articleRef.current) return

    const winHeight = window.innerHeight
    const t = tapbarRef.current?.getBoundingClientRect().height ?? 0
    const b = articleRef.current.getBoundingClientRect().bottom
    let p = Math.round(((winHeight - t) / b) * 100)

    if (p > 100) {
      p = 100
    }

    prevReadingPercent.current = p
    if (prevReadingPercent.current > readingPercent.current) {
      readingPercent.current = p
    }
  }

  useEffect(() => {
    const startReading = Date.now()

    const article = document.querySelector('[data-analytics="article-root"]')
    if (article) {
      articleRef.current = article as HTMLElement
    }

    const tapbar = document.querySelector('[data-analytics="tapbar-root"]')
    if (tapbar) {
      tapbarRef.current = tapbar as HTMLElement
    }

    const ths = throttle(onScroll, 200)
    window.addEventListener('scroll', ths)

    return () => {
      window.removeEventListener('scroll', ths)

      const delta = Date.now() - startReading
      const url = new URL(window.location.href)
      const userIdCookie = cookies.get('authorized')

      fetch(`${url.origin}/api/reading-history`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          reading_percent: readingPercent.current,
          reading_time_sec: delta / 1000,
          article: Number(params.id),
          ...(userIdCookie ? { user: Number(userIdCookie) } : {}),
        }),
      })
    }
  }, [])

  return null
}
