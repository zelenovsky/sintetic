import type { Access } from 'payload/types'

export const isAdminOrSuperAdminOrSelf: Access = async ({ req, id }) => {
  const user = req.user

  if (!user) return false

  if (
    user.role === 'admin' || 
    user.role === 'super_admin'
  ) {
    return true
  }

  const { totalDocs } = await req.payload.find({
    collection: 'articles',
    limit: 0,
    depth: 0,
    where: {
      id: {
        equals: id
      },
      'author.id': {
        equals: user.id
      }
    }
  })

  return Boolean(totalDocs)
}