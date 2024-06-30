'use server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function createComment(prevState: any, formData: FormData) {
  let text = formData.get('text')?.toString()?.trim()
  const userId = formData.get('user-id')
  const articleId = formData.get('article-id')

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
    },
  })

  return { newComment, success: true }
}
