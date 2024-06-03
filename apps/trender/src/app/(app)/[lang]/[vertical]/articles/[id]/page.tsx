import Script from 'next/script'
import { getPayload } from 'payload'
import Author from '@/lib/components/Author'
import configPromise from '@payload-config'
import TechLogo from '@/lib/svg-icons/TechLogo'
import type { Article, User, Media } from '@payload-types'

type Params = {
  id: string
  vertical: string
  lang: string
}

type Props = {
  params: Params
  searchParams: Record<string, string>
}

export default async function ArticlePage({ params, searchParams }: Props) {
  const payload = await getPayload({ config: configPromise })

  let doc: Article | null = null

  if (searchParams.version) {
    try {
      const { version } = await payload.findVersionByID({
        collection: 'articles',
        id: searchParams.version,
      })

      doc = version
    } catch (_) {}
  } else {
    const { docs } = await payload.find({
      collection: 'articles',
      // @ts-ignore
      locale: params.lang,
      where: {
        id: {
          equals: params.id,
        },
        'vertical.slug': {
          equals: params.vertical,
        },
        _status: {
          equals: 'published',
        },
      },
    })

    if (docs.length > 0) {
      doc = docs[0]
    }
  }

  if (!doc) {
    return <div className="container">Article is not found</div>
  }

  const { docs: verticals } = await payload.find({
    collection: 'verticals',
    // @ts-ignore
    locale: params.lang,
    where: {
      slug: {
        equals: params.vertical,
      },
    },
  })

  const author = doc.author as User

  return (
    <article className="s-post">
      {verticals.length > 0 && (
        <style>
          {`
            ${verticals[0].theme_light_css ?? ''}
            @media (prefers-color-scheme: dark) {
              ${verticals[0].theme_dark_css ?? ''}
            }
          `}
        </style>
      )}

      <Script src="/javascript/gallery.js" strategy="afterInteractive" />

      <section className="s-post-teaser container">
        {params.vertical === 'tech' && <TechLogo />}

        <div className="s-post-teaser_content">
          <h1>{doc.title}</h1>
          <p>{doc.description}</p>
        </div>

        <Author
          name={author?.name ?? ''}
          avatar_url={(author?.avatar as Media)?.url ?? ''}
          description={author?.description ?? ''}
        />
      </section>

      {doc.teaser_image && (
        <img
          src={(doc.teaser_image as Media).url ?? ''}
          alt={(doc.teaser_image as Media).alt ?? ''}
          className="s-post-teaser_image"
        />
      )}

      <section
        className="container s-prose"
        dangerouslySetInnerHTML={{ __html: doc.content_html as string }}
      />
    </article>
  )
}
