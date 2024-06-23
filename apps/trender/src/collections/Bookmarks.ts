import type { CollectionConfig } from 'payload/types'

export default {
  slug: 'bookmarks',
  admin: {
    hidden: () => true,
  },
  fields: [
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
