import type { CollectionConfig } from 'payload/types'

export default {
  slug: 'magic-links',
  admin: {
    // hidden: true,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      unique: true,
    },
    {
      name: 'token',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'expires_at',
      label: 'Expires at',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
} satisfies CollectionConfig
