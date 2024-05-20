import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload/types'

export const galleryImageDescriptionEditor = lexicalEditor({})

export default {
  slug: 'gallery',
  fields: [
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          editor: galleryImageDescriptionEditor,
        },
      ]
    },
  ],
} satisfies Block
