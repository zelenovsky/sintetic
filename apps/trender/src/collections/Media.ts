import { isAdminOrSuperAdmin } from '../access/fields'
import type { CollectionConfig } from 'payload/types'

export default {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
  },
  access: {
    read: () => true,
    delete: isAdminOrSuperAdmin
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
    },
    {
      name: 'url',
      type: 'text',
      access: {
        create: () => false,
      },
      admin: {
        disabled: true,
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            const doc = data as any
            return `https://sintetic-assets.sfo3.digitaloceanspaces.com/images/${doc.filename}`
          },
        ],
      },
    },
  ],
  upload: {
    staticDir: 'assets',
    mimeTypes: ['image/*'],
    disableLocalStorage: true,
    adminThumbnail: ({ doc }: { doc: any }) => {
      return `https://sintetic-assets.sfo3.digitaloceanspaces.com/images/${doc.filename}`
    },
  },
} satisfies CollectionConfig
