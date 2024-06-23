import type { CollectionConfig } from 'payload/types'

export default {
  slug: 'reading-history',
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
      label: 'Reading time in second',
      name: 'reading_time_sec',
      type: 'number',
      defaultValue: 0,
    },
    {
      label: 'Reading percent',
      name: 'reading_percent',
      type: 'number',
      defaultValue: 0,
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
    },
  ],
} satisfies CollectionConfig
