import type { CollectionConfig } from 'payload/types'

export default {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    hidden: ({ user }) => {
      if (user?.role === 'super_admin' || user?.role === 'admin') {
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
      name: 'username',
      type: 'text',
    },
    {
      label: 'First name',
      name: 'first_name',
      type: 'text',
    },
    {
      label: 'Last name',
      name: 'last_name',
      type: 'text',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'verified',
      type: 'checkbox',
      defaultValue: false,
      required: true,
    },
  ],
} satisfies CollectionConfig
