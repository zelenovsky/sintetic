'use client'
import { useState } from 'react'
import Tabs, { type Tab } from '@/lib/components/Tabs'
import ProfileView from './ProfileView'
import InterestsView from './InterestsView'
import SecurityView from './SecurityView'
import type { User } from '@payload-types'

type Props = {
  user: User
}

const initTabs = [
  {
    text: 'Profile',
    slug: 'profile',
    isActive: true,
    viewComponent: ProfileView,
  },
  {
    text: 'Interests',
    slug: 'interests',
    isActive: false,
    viewComponent: InterestsView,
  },
  {
    text: 'Security',
    slug: 'security',
    isActive: false,
    viewComponent: SecurityView,
  },
]

export default function TabViews({ user }: Props) {
  const [tabs, setTabs] = useState<Tab[]>(initTabs)

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

  const activeTab = tabs.find((tab) => tab.isActive)!
  const CurrentView = activeTab.viewComponent

  return (
    <>
      <Tabs tabs={tabs} setActive={handleActive} />

      <CurrentView user={user} />
    </>
  )
}
