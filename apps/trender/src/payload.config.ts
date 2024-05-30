import { postgresAdapter } from '@payloadcms/db-postgres'
import { S3Client } from '@aws-sdk/client-s3'
import path from 'path'
import { buildConfig } from 'payload/config'
// import sharp from 'sharp'
import { fileURLToPath } from 'url'

import Users from './collections/Users'
import Articles from './collections/Articles'
import Media from './collections/Media'
import Verticals from './collections/Verticals'
import Tags from './collections/Tags'

import { postEditor } from './editor/config'

import s3 from './plugins/s3'

import ProjectSwitcher from '@/lib/components/admin/ProjectSwitcher'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    components: {
      actions: [ProjectSwitcher],
    },
    custom: {
      projectDomains: [
        'ru.sintetic.io',
        'in.sintetic.io',
      ]
    },
  },
  collections: [Users, Articles, Media, Verticals, Tags],
  editor: postEditor,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  localization: {
    locales: process.env.LOCALES?.split(',') ?? ['en'],
    defaultLocale: process.env.LOCALES?.split(',')[0] ?? 'en',
    fallback: false,
  },
  plugins: [
    s3({
      bucket: 'sintetic-assets',
      folder: 'images',
      client: new S3Client({
        forcePathStyle: false,
        region: 'sfo3',
        endpoint: process.env.S3_ENDPOINT,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID ?? '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
        },
      })
    }),
  ],

  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.

  // This is temporary - we may make an adapter pattern
  // for this before reaching 3.0 stable

  // sharp,
})
