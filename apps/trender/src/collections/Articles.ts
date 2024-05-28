import { lexicalHTML } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload/types'

export default {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Teaser',
          fields: [
            {
              label: 'Title',
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
              maxLength: 100,
            },
            {
              label: 'Subtitle',
              name: 'subtitle',
              type: 'text',
              localized: true,
              maxLength: 100,
            },
            {
              label: 'Description',
              name: 'description',
              type: 'textarea',
              localized: true,
              maxLength: 300,
            },
            {
              label: 'Image',
              name: 'teaser_image',
              type: 'upload',
              relationTo: 'media',
            },
          ]
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              localized: true,
            },
            lexicalHTML('content', { name: 'content_html' })
          ]
        },
      ]
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          value: 'draft',
          label: 'Draft',
        },
        {
          value: 'published',
          label: 'Published',
        },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      }
    },
    {
      label: 'Published Date',
      name: 'published_date',
      type: 'date',
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar',
      },
      filterOptions: () => {
        return {
          role: { equals: 'editor' },
        }
      },
    },
    {
      name: 'vertical',
      type: 'relationship',
      relationTo: 'verticals',
      required: true,
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      filterOptions: ({ siblingData }) => {
        if (typeof siblingData === 'object' && siblingData !== null && 'vertical' in siblingData) {
          return {
            vertical: { equals: siblingData.vertical },
          }
        }

        return true
      },
      admin: {
        position: 'sidebar',
      }
    },
  ],
} satisfies CollectionConfig
