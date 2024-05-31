import '../assets/stylesheet/base/index.css'

import type { Metadata } from 'next'
import { dir } from '../dictionaries'

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: {
    lang: string
  }
}>) {
  return (
    <html lang={params.lang} dir={dir(params.lang)}>
      <body>{children}</body>
    </html>
  )
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: {
    template: '%s :: Trender',
    default: 'Trender',
  },
  description: 'Trender Home',
}
