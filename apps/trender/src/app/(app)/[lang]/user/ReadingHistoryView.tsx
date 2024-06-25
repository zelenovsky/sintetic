'use client'
import s from './userProfile.module.css'
import type { User, ReadingHistory } from '@payload-types'
import { useEffect, useState } from 'react'
import ArticleTeaser from '@/lib/components/ArticleTeaser'

type Props = {
  user: User
  d: any
  setCount(count: number): void
}

export default function ReadingHistoryView({ user, setCount }: Props) {
  const [docs, setDocs] = useState<ReadingHistory[]>([])

  useEffect(() => {
    const url = new URL(window.location.href)

    fetch(
      `${url.origin}/api/reading-history?where[user][equals]=${user.id}&depth=2`,
    )
      .then((res) => res.json())
      .then(({ docs }) => {
        const uniq = new Set()
        for (const d of docs) {
          uniq.add(d.article.id)
        }

        const total = []
        for (const u of uniq.values()) {
          total.push(docs.find((d: any) => d.article.id === u))
        }

        setDocs(total)
        setCount(uniq.size)
      })
  }, [])

  return (
    <section className={s.view}>
      <ul className={`${s.list} clean-list`}>
        {docs.map(({ id, createdAt, article }) => {
          if (typeof article === 'number') return null
          return (
            <li key={id}>
              <ArticleTeaser
                article={article}
                date={new Date(createdAt).toDateString()}
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
