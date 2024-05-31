import { CollectionConfig } from 'payload/types'

export default {
  slug: 'verticals',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Theme',
          fields: [
            {
              label: 'Dark CSS',
              name: 'theme_dark_css',
              type: 'textarea',
              // type: 'code',
              // admin: {
              //   language: 'css',
              // },
            },
            {
              label: 'Light CSS',
              name: 'theme_light_css',
              type: 'textarea',
              // type: 'code',
              // admin: {
              //   language: 'css',
              // },
            },
          ],
        },
      ],
    },
  ],
} satisfies CollectionConfig
