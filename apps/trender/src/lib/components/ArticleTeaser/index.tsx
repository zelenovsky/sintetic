import s from './articleTeaser.module.css'
import Link from 'next/link'
import Image from 'next/image'
import type { Article, Media } from '@payload-types'

type Props = {
  date: string
  article: Article
}

export default function ({ date, article }: Props) {
  const url = (article.teaser_image as Media | undefined)?.url
  const verticalSlug =
    typeof article.vertical === 'number' ? undefined : article.vertical.slug

  return (
    <article className={s.container}>
      {url && (
        <Image
          className={s.image}
          src={url}
          alt={article.title}
          width={62}
          height={62}
        />
      )}

      <div>
        <p className={s.date}>{date}</p>
        <h1 className={s.title}>
          {verticalSlug ? (
            <Link
              href={`/${verticalSlug}/articles/${article.id}`}
              className={s.link}
            >
              {article.title}
            </Link>
          ) : (
            article.title
          )}
        </h1>
      </div>
    </article>
  )
}
