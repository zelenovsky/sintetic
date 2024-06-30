'use client'
import s from './comment.module.css'
import Avatar from '@/lib/components/Avatar'
import type { Comment } from '@/payload-types'

type Props = {
  comment: Comment
}

export default function ({ comment }: Props) {
  if (typeof comment.user === 'number') {
    console.warn('need to path user object')
    return null
  }

  return (
    <article className={s.comment}>
      <Avatar user={comment.user} width={39} height={39} className={s.avatar} />
      <div className={s.body}>
        <h1 className={s.name}>
          {comment.user.first_name} {comment.user.last_name}
        </h1>
        <p className={s.date}>{new Date(comment.createdAt).toDateString()}</p>
        <p className={s.text}>{comment.comment}</p>
      </div>
    </article>
  )
}
