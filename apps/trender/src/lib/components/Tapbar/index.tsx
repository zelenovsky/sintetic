'use client'
import s from './tapbar.module.css'
import { useState } from 'react'
import Link from 'next/link'
import AuthSheet from '@/lib/components/AuthSheet'

type Props = {
  links: {
    href: string
    text: string
    svg_icon: string
    needAuth: boolean
  }[]
}

export default function Tapbar({ links }: Props) {
  const [authOpen, setAuthOpen] = useState(false)

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

        {authOpen && <AuthSheet onClose={() => setAuthOpen(false)} />}
      </nav>
    </div>
  )
}
