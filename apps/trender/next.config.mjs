import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sintetic-assets.sfo3.digitaloceanspaces.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:lang/user',
        missing: [
          {
            type: 'cookie',
            key: 'authorized',
          },
        ],
        destination: '/:lang',
        permanent: false,
      },
    ]
  },
}

export default withPayload(nextConfig)
