'use client'
import { useState } from 'react'
import Tabs, { type Tab } from '@/lib/components/Tabs'
import LikesView from './LikesView'
import ReadingHistoryView from './ReadingHistoryView'
import CommentsView from './CommentsView'
import FavoritesView from './FavoritesView'
import type { User } from '@payload-types'

type Props = {
  user: User
  d: any
}

export default function TabViews({ user, d }: Props) {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      text: d.user.tab_views.reading_history_text,
      slug: 'reading-history',
      isActive: true,
      viewComponent: ReadingHistoryView,
    },
    {
      text: d.user.tab_views.favorites_text,
      slug: 'favorites',
      isActive: false,
      viewComponent: FavoritesView,
    },
    {
      text: d.user.tab_views.likes_text,
      slug: 'likes',
      isActive: false,
      viewComponent: LikesView,
    },
    {
      text: d.user.tab_views.comments_text,
      slug: 'comments',
      isActive: false,
      viewComponent: CommentsView,
    },
  ])

  const handleActive = (activeTab: Tab) => () => {
    setTabs(
      tabs.map((tab) => {
        if (activeTab.slug === tab.slug) {
          return {
            ...tab,
            isActive: true,
          }
        }

        return {
          ...tab,
          isActive: false,
        }
      }),
    )
  }

  const handleCount = (activeTab: Tab) => (count: number) => {
    setTabs(
      tabs.map((tab) => {
        if (activeTab.slug === tab.slug) {
          return {
            ...tab,
            count,
          }
        }
        return tab
      }),
    )
  }

  const activeTab = tabs.find((tab) => tab.isActive)!
  const CurrentView = activeTab.viewComponent

  return (
    <>
      <Tabs tabs={tabs} setActive={handleActive} />
      <CurrentView user={user} d={d} setCount={handleCount(activeTab)} />
    </>
  )
}
