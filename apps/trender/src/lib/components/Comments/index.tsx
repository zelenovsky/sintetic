'use client'
import s from './comments.module.css'
import { useEffect, useState, type FormEvent } from 'react'
import { createPortal, useFormState } from 'react-dom'
import TextareaAutosize from 'react-textarea-autosize'
import { createComment, deleteComment } from './actions'
import Submit from '@/lib/components/forms/inputs/Submit'
import Avatar from '@/lib/components/Avatar'
import CommentComponent from './Comment'
import type { Comment, User } from '@payload-types'

type Props = {
  d: any
  articleId: string
  currentUser: User | null
  comments: Comment[]
}

type DeletedCommentFormState = {
  deletedComment: Comment | null
  success: boolean
}

export default function ({ d, articleId, currentUser, comments }: Props) {
  const [createCommentFormState, formAction] = useFormState(createComment, {
    newComment: null,
    success: false,
  })
  const [deleteCommentFormState, deleteCommentAction] = useFormState<
    DeletedCommentFormState,
    FormData
  >(deleteComment, {
    deletedComment: null,
    success: false,
  })

  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [sendButtonVisible, setSendButtonVisible] = useState(false)
  const [runtimeComments, setRuntimeComments] = useState<Comment[]>(comments)
  const [replyToComment, setReplyToComment] = useState<Comment | null>(null)

  useEffect(() => {
    if (createCommentFormState.success) {
      setText('')
      setReplyToComment(null)
    }

    if (createCommentFormState.newComment) {
      if (createCommentFormState.newComment.reply_to) {
        setRuntimeComments(
          runtimeComments
            .map((com) => {
              if (com.id === createCommentFormState.newComment.reply_to!.id) {
                return [com, createCommentFormState.newComment]
              }
              return com
            })
            .flat(),
        )
      } else {
        setRuntimeComments([
          createCommentFormState.newComment,
          ...runtimeComments,
        ])
      }
    }
  }, [createCommentFormState])

  useEffect(() => {
    if (
      deleteCommentFormState.deletedComment &&
      deleteCommentFormState.success
    ) {
      setRuntimeComments(
        runtimeComments.filter(
          (com) => deleteCommentFormState.deletedComment!.id !== com.id,
        ),
      )
    }
  }, [deleteCommentFormState])

  if (!currentUser) {
    return (
      <button type="button" title="need auth" disabled>
        Оставить комментарий
      </button>
    )
  }

  const onInput = (e: FormEvent<HTMLTextAreaElement>) => {
    const t = e.target as HTMLTextAreaElement
    setText(t.value)
  }

  const onFocus = () => {
    setSendButtonVisible(true)
  }

  const onBlur = () => {
    if (text) return
    setSendButtonVisible(false)
  }

  return open ? (
    createPortal(
      <section aria-modal="true" className={s.modal}>
        <header className={s.header}>
          <span className={s.headerTitle}>{d.comments.title_text}</span>

          <button
            type="button"
            className={s.close}
            onClick={() => setOpen(false)}
          >
            <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.68199 0.181992C6.48673 -0.0132704 6.17015 -0.01327 5.97488 0.181992L3.49995 2.65693L1.02506 0.182044C0.8298 -0.0132179 0.513218 -0.0132181 0.317956 0.182044C0.122694 0.377306 0.122694 0.693889 0.317956 0.889151L2.79284 3.36404L0.318031 5.83885C0.122769 6.03411 0.122769 6.35069 0.318031 6.54595C0.513293 6.74122 0.829876 6.74121 1.02514 6.54595L3.49995 4.07114L5.97481 6.54601C6.17007 6.74127 6.48665 6.74127 6.68192 6.54601C6.87718 6.35074 6.87718 6.03416 6.68192 5.8389L4.20705 3.36404L6.68199 0.889099C6.87725 0.693837 6.87725 0.377254 6.68199 0.181992Z"
                fill="black"
              />
            </svg>
          </button>
        </header>

        <section className={`${s.comments} container`}>
          {runtimeComments.map((com) => (
            <CommentComponent
              d={d}
              comment={com}
              currentUser={currentUser}
              deleteCommentAction={deleteCommentAction}
              setReplyTo={setReplyToComment}
              key={com.id}
            />
          ))}
        </section>

        <footer className={s.footer}>
          {replyToComment && (
            <section className={`${s.replyTo} container`}>
              <span>{d.comments.reply_to_row_text}&nbsp;</span>
              <span className={s.replyToName}>
                {(replyToComment.user as User).first_name}{' '}
                {(replyToComment.user as User).last_name}.
              </span>
              <button
                className={s.replyToCancel}
                type="button"
                onClick={() => setReplyToComment(null)}
              >
                {d.comments.cancel_reply_to_text}
              </button>
            </section>
          )}

          <section className={`${s.userComment} container`}>
            <Avatar
              user={currentUser}
              width={39}
              height={39}
              className={s.avatar}
            />

            <form action={formAction} className={s.form}>
              <input type="hidden" name="article-id" value={articleId} />
              <input type="hidden" name="user-id" value={currentUser.id} />
              {replyToComment && (
                <input
                  type="hidden"
                  name="reply-to-id"
                  value={replyToComment.id}
                />
              )}

              <TextareaAutosize
                className={s.textInput}
                name="text"
                placeholder={d.comments.placeholder_text}
                value={text}
                onInput={onInput}
                onFocus={onFocus}
                onBlur={onBlur}
              />

              {sendButtonVisible && (
                <Submit className={s.submit}>
                  {replyToComment
                    ? d.comments.reply_button_text
                    : d.comments.send_text}
                </Submit>
              )}
            </form>
          </section>
        </footer>
      </section>,
      document.body,
    )
  ) : (
    <button type="button" onClick={() => setOpen(true)}>
      Оставить комментарий
    </button>
  )
}
