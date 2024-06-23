'use client'
import s from './tapbar.module.css'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import AuthSheet from '@/lib/components/AuthSheet'

export type TabLink = {
  type: 'link'
  href: string
  text: string
  svgIcon: string
  needAuth: boolean
  needUserInitInfo: boolean
}

export type TabMenu = {
  type: 'menu'
  text: string
  svgIcon: string
}

type Props = {
  tabs: (TabLink | TabMenu)[]
}

export default function Tapbar({ tabs }: Props) {
  const [authOpen, setAuthOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [authProceeded, setAuthProceeded] = useState(false)

  useEffect(() => {
    const neededInfo = tabs.find((t) => t.type === 'link' && t.needUserInitInfo)
    if (neededInfo) {
      setAuthOpen(true)
      setAuthProceeded(true)
    }
  }, [])

  return (
    <div className={s.container} data-analytics="tapbar-root">
      <nav className={s.tapbar}>
        <div className={`${s.tapbarInner} container`}>
          {tabs.map((t, index) => {
            if (t.type === 'menu') {
              return (
                <button
                  type="button"
                  className={s.link}
                  onClick={() => setMenuOpen(true)}
                  key={index}
                  aria-label={t.text}
                  dangerouslySetInnerHTML={{ __html: t.svgIcon }}
                ></button>
              )
            } else if (t.type === 'link') {
              return t.needAuth ? (
                <button
                  type="button"
                  className={s.link}
                  onClick={() => setAuthOpen(true)}
                  key={index}
                  aria-label={t.text}
                  dangerouslySetInnerHTML={{ __html: t.svgIcon }}
                ></button>
              ) : (
                <Link
                  href={t.href}
                  title={t.text}
                  aria-label={t.text}
                  className={s.link}
                  key={index}
                  dangerouslySetInnerHTML={{ __html: t.svgIcon }}
                ></Link>
              )
            }
            return null
          })}
        </div>

        {authOpen && (
          <AuthSheet
            onClose={() => setAuthOpen(false)}
            authProceeded={authProceeded}
          />
        )}
      </nav>
    </div>
  )
}
