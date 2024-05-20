import { CollectionConfig } from 'payload/types'

export default {
  slug: 'tags',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true
    },
    {
      name: 'vertical',
      type: 'relationship',
      relationTo: 'verticals'
    }
  ],
} satisfies CollectionConfig
