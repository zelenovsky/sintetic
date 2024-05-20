import { CollectionConfig } from 'payload/types'

export default {
  slug: 'media',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    delete: () => false
  },
  fields: [
    {
      name: "alt",
      type: "text",
      localized: true,
    },
  ],
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*"],
  },
} satisfies CollectionConfig
