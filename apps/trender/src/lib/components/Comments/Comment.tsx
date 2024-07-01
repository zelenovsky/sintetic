'use client'
import s from './comment.module.css'
import Avatar from '@/lib/components/Avatar'
import type { Comment, CommentLike, User } from '@/payload-types'
import { updateLike } from './actions'
import Submit from '@/lib/components/forms/inputs/Submit'
import { useFormState } from 'react-dom'
import { useEffect, useState } from 'react'

type Props = {
  d: any
  comment: Comment
  currentUser: User
  deleteCommentAction(payload: FormData): void
  setReplyTo(comment: Comment): void
}

type FormState = {
  deletedLike: CommentLike | null
  newLike: CommentLike | null
  success: boolean
}

export default function ({
  d,
  comment,
  currentUser,
  setReplyTo,
  deleteCommentAction,
}: Props) {
  const [updateLikeFormState, updateLikeAction] = useFormState<
    FormState,
    FormData
  >(updateLike, {
    deletedLike: null,
    newLike: null,
    success: false,
  })

  const [likesCount, setLikesCount] = useState<number | null>(null)
  const [myLikeId, setMyLikeId] = useState<number | null>(null)

  useEffect(() => {
    const url = new URL(window.location.href)

    fetch(
      `${url.origin}/api/comment-likes?where[comment][equals]=${comment.id}`,
    )
      .then((res) => res.json())
      .then(({ docs, totalDocs }) => {
        if (totalDocs === 0) return

        setLikesCount(totalDocs)

        const likes = docs as CommentLike[]

        const myLike = likes.find(
          ({ user }) =>
            (typeof user === 'number' ? user : user.id) === currentUser.id,
        )

        if (myLike) {
          setMyLikeId(myLike.id)
        }
      })
  }, [])

  useEffect(() => {
    if (updateLikeFormState.newLike) {
      setLikesCount(likesCount ? likesCount + 1 : 1)
      setMyLikeId(updateLikeFormState.newLike.id)
    }

    if (updateLikeFormState.deletedLike) {
      setLikesCount(
        likesCount ? (likesCount - 1 !== 0 ? likesCount - 1 : null) : null,
      )
      setMyLikeId(null)
    }
  }, [updateLikeFormState])

  if (typeof comment.user === 'number') {
    console.warn('need to path user object')
    return null
  }

  return (
    <article
      className={`${s.comment} ${comment.reply_to ? s.repliedComment : ''}`}
    >
      <Avatar user={comment.user} width={39} height={39} className={s.avatar} />

      <div className={s.body}>
        <h1 className={s.name}>
          {comment.user.first_name} {comment.user.last_name}
        </h1>
        <p className={s.date}>{new Date(comment.createdAt).toDateString()}</p>
        <p className={s.text}>{comment.comment}</p>

        <form action={updateLikeAction}>
          <input type="hidden" name="comment-id" value={comment.id} />
          <input type="hidden" name="user-id" value={currentUser.id} />
          {myLikeId && (
            <input type="hidden" name="my-like-id" value={String(myLikeId)} />
          )}

          <button
            type="submit"
            aria-label="like"
            className={`${s.like} ${myLikeId ? s.myLike : ''}`}
          >
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8.77643 2.93147C17.5929 -5.05262 20.9613 8 9.2073 15.1579C-4.30186 8.84212 0.329732 -4.63162 8.77643 2.93147Z"
                fill={myLikeId ? 'black' : 'white'}
              />
              <path
                d="M13.8099 1.20026C11.9508 0.841315 10.4781 1.49479 9.28164 3.2159L8.83067 3.86936L8.37969 3.2159C7.1924 1.49479 5.71057 0.841315 3.8514 1.20026C1.1823 1.71568 0.151487 5.35119 2.13951 8.23199C3.11511 9.64937 5.35164 11.7754 8.81227 14.5734L8.83067 14.5918H8.84906C12.19 11.8767 14.3898 9.80582 15.4114 8.38843L15.5126 8.24117C17.5007 5.36038 16.4698 1.72489 13.8007 1.20948L13.8099 1.20026ZM8.83988 1.98259C10.2112 0.353518 11.96 -0.281543 14.0216 0.114221C17.5467 0.795302 18.8352 5.36959 16.433 8.85784C15.3378 10.4409 12.9264 12.7234 9.18042 15.7239L8.83067 16L8.48092 15.7239L8.11277 15.4294C4.56931 12.567 2.28675 10.3857 1.22831 8.85784C-1.17388 5.36959 0.114649 0.795302 3.63971 0.114221C5.70136 -0.281543 7.45009 0.353518 8.82145 1.98259H8.83988Z"
                fill="black"
              />
            </svg>

            {likesCount && <span>{likesCount}</span>}
          </button>
        </form>
      </div>

      <div className={s.actions}>
        <button
          type="button"
          onClick={() => setReplyTo(comment)}
          className={s.replyAction}
        >
          {d.comments.reply_text}
        </button>

        {comment.user.id === currentUser.id && (
          <form action={deleteCommentAction}>
            <input type="hidden" name="comment-id" value={comment.id} />
            <Submit className={s.deleteAction}>{d.comments.delete_text}</Submit>
          </form>
        )}
      </div>
    </article>
  )
}
