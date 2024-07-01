import type { CollectionConfig } from 'payload/types'

export default {
  slug: 'comments',
  admin: {
    useAsTitle: 'comment',
    hidden: () => false,
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  // hooks: {
  //   afterDelete: [
  //     async ({ req, id }) => {
  //       const { docs, totalDocs } = await req.payload.find({
  //         collection: 'comment-likes',
  //         where: {
  //           comment: {
  //             equals: id,
  //           },
  //         },
  //       })

  //       if (totalDocs === 0) return

  //       for (const doc of docs) {
  //         req.payload.delete({
  //           collection: 'comment-likes',
  //           id: doc.id,
  //         })
  //       }
  //     },
  //   ],
  // },
  fields: [
    {
      name: 'comment',
      type: 'textarea',
      required: true,
    },
    {
      name: 'reply_to',
      type: 'relationship',
      relationTo: 'comments',
    },
    {
      name: 'article',
      type: 'relationship',
      relationTo: 'articles',
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
} satisfies CollectionConfig
