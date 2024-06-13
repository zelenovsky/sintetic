'use client'
import s from './tapbar.module.css'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import AuthSheet from '@/lib/components/AuthSheet'

type Props = {
  links: {
    href: string
    text: string
    svg_icon: string
    needAuth: boolean
    needUserInitInfo: boolean
  }[]
}

export default function Tapbar({ links }: Props) {
  const [authOpen, setAuthOpen] = useState(false)
  const [authProceeded, setAuthProceeded] = useState(false)

  useEffect(() => {
    const neededInfo = links.find((link) => link.needUserInitInfo)
    if (neededInfo) {
      setAuthOpen(true)
      setAuthProceeded(true)
    }
  }, [])

  return (
    <div className={s.container}>
      <nav className={s.tapbar}>
        <div className={`${s.tapbarInner} container`}>
          {links.map(({ href, text, svg_icon, needAuth }, index) =>
            needAuth ? (
              <button
                type="button"
                className={s.link}
                onClick={() => setAuthOpen(true)}
                key={index}
                dangerouslySetInnerHTML={{ __html: svg_icon }}
              ></button>
            ) : (
              <Link
                href={href}
                title={text}
                aria-label={text}
                className={s.link}
                key={index}
                dangerouslySetInnerHTML={{ __html: svg_icon }}
              ></Link>
            ),
          )}
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
