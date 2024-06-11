import '../assets/stylesheet/base/index.css'
import type { Metadata } from 'next'

import { cookies } from 'next/headers'
import Tapbar from '@/lib/components/Tapbar'
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
  const cookieStore = cookies()
  const authorized = cookieStore.get('authorized')

  const nav_links = [
    {
      href: '/',
      text: t.tapbar.home.link_text,
      svg_icon: `
        <svg
          width="23"
          height="21"
          viewBox="0 0 23 21"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0.810791 7.14V20.1H8.24539V14.03C8.82971 12.61 9.84917 11.89 11.3286 11.89C12.8081 11.89 13.8524 12.6 14.4865 14.03V20.1H21.9957V7.14C21.9957 7.14 18.4648 5.09 11.4032 1L0.810791 7.14Z"
            stroke="currentcolor"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      `,
      needAuth: false,
    },
    {
      href: '/user',
      text: t.tapbar.user.link_text,
      svg_icon: `
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          aria-label="true"
        >
          <path
            d="M9.43285 0.5C12.0651 0.5 14.2041 2.64751 14.2041 5.3029C14.2041 7.95829 12.0651 10.1058 9.43285 10.1058C6.80058 10.1058 4.6616 7.95829 4.6616 5.3029C4.6616 2.64751 6.80058 0.5 9.43285 0.5ZM9.43285 0.636346C6.8665 0.636346 4.79116 2.72845 4.79116 5.3029C4.79116 7.87734 6.8665 9.96945 9.43285 9.96945C11.9992 9.96945 14.0745 7.87734 14.0745 5.3029C14.0745 2.72845 11.9992 0.636346 9.43285 0.636346ZM9.49999 11.8633C11.4979 11.8633 13.2337 12.4109 14.7194 13.4866C16.2102 14.5659 17.4759 16.1967 18.4934 18.402C18.5101 18.4383 18.4932 18.4791 18.4613 18.494C18.431 18.5081 18.3928 18.4962 18.3768 18.4614C17.3962 16.3361 16.1741 14.7163 14.686 13.628C13.192 12.5353 11.4589 11.9997 9.49999 11.9997C7.54109 11.9997 5.80792 12.5353 4.31396 13.628C2.82592 14.7163 1.60381 16.3361 0.623167 18.4614C0.607146 18.4962 0.568948 18.5081 0.538684 18.494C0.506772 18.4791 0.489879 18.4383 0.506634 18.402C1.52413 16.1967 2.78983 14.5659 4.28059 13.4866C5.76631 12.4109 7.50206 11.8633 9.49999 11.8633Z"
            fill="currentcolor"
            stroke="currentcolor"
          />
        </svg>
      `,
      needAuth: !authorized,
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
