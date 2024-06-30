import type { CollectionConfig } from 'payload/types'

export default {
  slug: 'comments',
  admin: {
    hidden: () => false,
  },
  fields: [
    {
      name: 'comment',
      type: 'textarea',
      required: true,
    },
    {
      name: 'reply_to',
      type: 'relationship',
      relationTo: 'comments',
    },
    {
      name: 'article',
      type: 'relationship',
      relationTo: 'articles',
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
