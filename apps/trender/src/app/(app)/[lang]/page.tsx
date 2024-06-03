import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Logo from '@/lib/svg-icons/Logo'

import type { Vertical } from '@payload-types'

export default async function HomePage({
  params,
}: {
  params: {
    lang: string
  }
}) {
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
      <header className="container s-header">
        <a href="/" className="s-header_logo">
          <Logo />
        </a>

        <nav className="s-nav">
          {nav.map((item) => (
            <a
              key={item.id}
              href={item.url}
              className={item.slug === 'tech' ? 'is-active' : ''}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </header>

      <main className="container">
        <h1>Home</h1>
      </main>
    </>
  )
}
