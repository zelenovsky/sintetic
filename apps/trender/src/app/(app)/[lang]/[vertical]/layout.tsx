import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Logo from '@/lib/svg-icons/Logo'
import Link from 'next/link'

import type { Metadata } from 'next'
import type { Vertical } from '@payload-types'

// export const metadata: Metadata = {
//   title: "Tech",
//   description: "Tech topics",
// }

export default async function VerticalLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: {
    lang: string
    vertical: string
  }
}>) {
  const payload = await getPayload({ config: configPromise })

  const { docs: verticals } = await payload.find({
    collection: 'verticals',
    // @ts-ignore
    locale: params.lang,
  })

  const nav = verticals.map((vertical: Vertical) => {
    return {
      id: vertical.id,
      title: vertical.title,
      slug: vertical.slug,
      url: `/${vertical.slug}`,
    }
  })

  return (
    <>
      <header className="container s-header-vertical">
        <a href="/" className="s-header_logo">
          <Logo />
        </a>

        <nav className="s-nav">
          {nav.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className={item.slug === params.vertical ? 'is-active' : ''}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </header>

      <main>{children}</main>
    </>
  )
}
