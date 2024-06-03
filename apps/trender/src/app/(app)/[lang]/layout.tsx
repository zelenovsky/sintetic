import '../assets/stylesheet/base/index.css'
import type { Metadata } from 'next'

import Tapbar from '@/lib/components/Tapbar'
import HomeIcon from '@/lib/svg-icons/Home'
import UserIcon from '@/lib/svg-icons/User'
import { dir, getDictionary, type SupportedLocales } from '../dictionaries'

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: {
    lang: string
  }
}>) {
  const t = await getDictionary(params.lang as SupportedLocales)

  const nav_links = [
    {
      href: '/',
      text: t.tapbar.home.link_text,
      svg_icon: HomeIcon,
    },
    {
      href: '/user',
      text: t.tapbar.user.link_text,
      svg_icon: UserIcon,
    },
  ]

  return (
    <html lang={params.lang} dir={dir(params.lang)}>
      <body>
        {children}

        <Tapbar links={nav_links} />
      </body>
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
