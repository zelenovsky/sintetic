'use server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function createComment(prevState: any, formData: FormData) {
  let text = formData.get('text')?.toString()?.trim()
  const userId = formData.get('user-id')
  const articleId = formData.get('article-id')
  const replyToId = formData.get('reply-to-id')

  if (!text || !userId || !articleId) {
    return { newComment: null, success: false }
  }

  const payload = await getPayload({ config: configPromise })

  const newComment = await payload.create({
    collection: 'comments',
    data: {
      comment: text,
      user: Number(userId),
      article: Number(articleId),
      ...(replyToId ? { reply_to: Number(replyToId) } : {}),
    },
  })

  return { newComment, success: true }
}

export async function deleteComment(prevState: any, formData: FormData) {
  const commentId = formData.get('comment-id')

  const payload = await getPayload({ config: configPromise })

  const deletedComment = await payload.delete({
    collection: 'comments',
    id: Number(commentId),
  })

  return { deletedComment, success: true }
}

export async function updateLike(prevState: any, formData: FormData) {
  const userId = formData.get('user-id')
  const commentId = formData.get('comment-id')
  const myLikeId = formData.get('my-like-id')

  const payload = await getPayload({ config: configPromise })

  if (myLikeId) {
    const deletedLike = await payload.delete({
      collection: 'comment-likes',
      id: Number(myLikeId),
    })

    return { deletedLike, newLike: null, success: true }
  }

  const newLike = await payload.create({
    collection: 'comment-likes',
    data: {
      comment: Number(commentId),
      user: Number(userId),
    },
  })

  return { deletedLike: null, newLike, success: true }
}
