import type { CollectionConfig } from 'payload/types'

export default {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    hidden: ({ user }) => {
      if (user.role === 'super_admin' || user.role === 'admin') {
        return false
      }
      return true
    },
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
  ],
} satisfies CollectionConfig
