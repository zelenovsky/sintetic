import { lexicalHTML } from '@payloadcms/richtext-lexical'
import { isAdminOrSuperAdminOrSelf } from '../access/articles'
import PreviewLink from '@/lib/components/admin/PreviewLink'
import type { CollectionConfig } from 'payload/types'

export default {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
  },
  access: {
    read: ({ req }) => {
      // If there is a user logged in,
      // let them retrieve all documents
      if (req.user) return true

      // If there is no user,
      // restrict the documents that are returned
      // to only those where `_status` is equal to `published`
      return {
        _status: {
          equals: 'published',
        },
      }
    },
    update: isAdminOrSuperAdminOrSelf,
    delete: isAdminOrSuperAdminOrSelf
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
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
    {
      name: 'preview',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: PreviewLink
        }
      }
    }
  ],
} satisfies CollectionConfig
