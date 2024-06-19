'use client'
import { useState } from 'react'
import Tabs, { type Tab } from '@/lib/components/Tabs'
import ProfileView from './ProfileView'
import InterestsView from './InterestsView'
import SecurityView from './SecurityView'
import type { User } from '@payload-types'

type Props = {
  user: User
  d: any
}

export default function TabViews({ user, d }: Props) {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      text: d.user.profile_text,
      slug: 'profile',
      isActive: true,
      viewComponent: ProfileView,
    },
    {
      text: d.user.interests_text,
      slug: 'interests',
      isActive: false,
      viewComponent: InterestsView,
    },
    {
      text: d.user.security_text,
      slug: 'security',
      isActive: false,
      viewComponent: SecurityView,
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

  const activeTab = tabs.find((tab) => tab.isActive)!
  const CurrentView = activeTab.viewComponent

  return (
    <>
      <Tabs tabs={tabs} setActive={handleActive} />
      <CurrentView user={user} d={d} />
    </>
  )
}
