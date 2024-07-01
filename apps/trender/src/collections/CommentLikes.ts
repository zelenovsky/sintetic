import type { CollectionConfig } from 'payload/types'

export default {
  slug: 'comment-likes',
  admin: {
    hidden: () => true,
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'comment',
      type: 'relationship',
      relationTo: 'comments',
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
} satisfies CollectionConfig
