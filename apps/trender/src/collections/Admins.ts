import { isAdminOrSuperAdmin } from '../access/fields'
import type { CollectionConfig } from 'payload/types'

export default {
  slug: 'admins',
  auth: true,
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
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
    {
      name: 'role',
      type: 'select',
      access: {
        read: () => true,
        create: isAdminOrSuperAdmin,
        update: isAdminOrSuperAdmin,
      },
      options: [
        { label: 'Super Admin', value: 'super_admin' },
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      required: true,
      defaultValue: 'editor',
    },
    {
      name: 'description',
      type: 'text',
    },
  ],
} satisfies CollectionConfig
