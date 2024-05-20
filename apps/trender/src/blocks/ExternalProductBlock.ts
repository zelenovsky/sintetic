import type { Block } from 'payload/types'

export default {
  slug: 'external-product',
  fields: [
    {
      name: 'gallery',
      type: 'group',
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
            }
          ]
        },
      ]
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'text',
      required: true,
    },
    {
      name: 'link',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ]
    }
  ],
} satisfies Block
