import s from './article.module.css'
import { getPayload } from 'payload'
import Image from 'next/image'
import { cookies } from 'next/headers'
import Author from '@/lib/components/Author'
import Comments from '@/lib/components/Comments'
import configPromise from '@payload-config'
import TechLogo from '@/lib/svg-icons/TechLogo'
import AnalyticsHandler from './AnalyticsHandler'
import CarouselHandler from './CarouselHandler'
import { getDictionary } from '../../../../dictionaries'
import type { Article, Admin, Media } from '@payload-types'

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
  const d = await getDictionary(params.lang)
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

  const author = doc.author as Admin

  const cookieStore = cookies()
  const userId = cookieStore.get('authorized')

  let currentUser = null
  if (userId) {
    currentUser = await payload.findByID({
      collection: 'users',
      id: Number(userId.value),
    })
  }

  const { docs: comments } = await payload.find({
    collection: 'comments',
    where: {
      article: {
        equals: params.id,
      },
    },
  })

  return (
    <article className={s.article} data-analytics="article-root">
      <AnalyticsHandler />
      <CarouselHandler />

      <Comments
        d={d}
        articleId={params.id}
        currentUser={currentUser}
        comments={comments}
      />

      {/* {verticals.length > 0 && (
        <style>
          {`
            ${verticals[0].theme_light_css ?? ''}
            @media (prefers-color-scheme: dark) {
              ${verticals[0].theme_dark_css ?? ''}
            }
          `}
        </style>
      )} */}

      <section className={`${s.teaser} container`}>
        {params.vertical === 'tech' && <TechLogo />}

        <div>
          <h1 className={s.teaserTitle}>{doc.title}</h1>
          <p className={s.teaserSubtitle}>{doc.subtitle}</p>
        </div>

        <p className={s.teaserDescription}>{doc.description}</p>

        {/* <Author
          name={author?.name ?? ''}
          avatar_url={(author?.avatar as Media)?.url ?? ''}
          description={author?.description ?? ''}
        /> */}
      </section>

      <section className="container">
        {doc.teaser_image && (
          <Image
            src={(doc.teaser_image as Media).url ?? ''}
            alt={(doc.teaser_image as Media).alt ?? ''}
            width={390}
            height={390}
            className={s.teaserImage}
          />
        )}

        <div className={s.bannerContainer}>
          <div className={s.banner}></div>
        </div>
      </section>

      <div className={s.bodyContainer}>
        <section
          className={`${s.body} container s-prose`}
          dangerouslySetInnerHTML={{ __html: doc.content_html as string }}
        />
      </div>
    </article>
  )
}
