import '../assets/stylesheet/base/index.css'
import type { Metadata } from 'next'

import { CookiesProvider } from 'next-client-cookies/server'
import { cookies } from 'next/headers'
import Tapbar, { type TabLink, type TabMenu } from '@/lib/components/Tapbar'
import { dir, getDictionary } from '../dictionaries'

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: {
    lang: string
  }
}>) {
  const d = await getDictionary(params.lang)
  const cookieStore = cookies()
  const authorized = cookieStore.get('authorized')
  const needUserInitInfo = !!cookieStore.get('need_user_init_info')

  const tabs = [
    {
      type: 'link',
      href: '/',
      text: d.tapbar.home.link_text,
      svgIcon: `
        <svg width="19" height="21" viewBox="0 0 19 21" fill="none" aria-hidden="true">
          <path d="M1 7.10785V20H6.96596V13.9618C7.43486 12.5492 8.25293 11.833 9.44014 11.833C10.6273 11.833 11.4654 12.5393 11.9742 13.9618V20H18V7.10785C18 7.10785 15.1667 5.06859 9.5 1L1 7.10785Z" stroke="currentcolor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `,
      needAuth: false,
      needUserInitInfo: false,
    },
    {
      type: 'menu',
      text: d.tapbar.menu.link_text,
      svgIcon: `
        <svg width="20" height="24" viewBox="0 0 20 24" fill="none" aria-hidden="true">
          <path d="M18.5634 13.7479H17.5299C17.276 13.7479 17.0451 13.8953 16.9443 14.1251L16.3766 15.409L13.2789 0.494819C13.2151 0.202581 12.9446 -0.00848029 12.6448 0.000261875C12.3398 0.0052574 12.0809 0.221314 12.0273 0.514801L12.0388 0.574747C12.0209 0.620956 12.0056 0.668413 11.9979 0.719617L9.48326 19.308L7.81064 10.1274C7.75706 9.83395 7.49806 9.61789 7.19314 9.6129C6.89332 9.60291 6.62284 9.81522 6.55905 10.1062L5.37508 15.5288L4.80734 14.245C4.70654 14.0164 4.47562 13.8678 4.22173 13.8678H0.637916C0.285786 13.8678 0 14.1476 0 14.4923C0 14.837 0.285786 15.1167 0.637916 15.1167H3.80453L4.99743 17.818C5.10716 18.0678 5.36998 18.2189 5.64556 18.1915C5.92114 18.1652 6.14823 17.9667 6.20692 17.7006L7.1268 13.4844L8.94869 23.4855C9.00355 23.7839 9.26764 24 9.5764 24C9.5815 24 9.5866 24 9.59043 24C9.90428 23.9925 10.1671 23.7627 10.2079 23.458L12.6996 5.04199L12.794 4.3114L14.6249 13.3633L15.5447 17.5795C15.6021 17.8455 15.8292 18.0441 16.1061 18.0703C16.383 18.0978 16.6445 17.9467 16.7542 17.6969L17.9471 14.9956H18.5621C18.9142 14.9956 19.2 14.7158 19.2 14.3711C19.2 14.0264 18.9142 13.7467 18.5621 13.7467L18.5634 13.7479Z" fill="currentcolor"/>
        </svg>
      `,
    },
    {
      type: 'link',
      href: '/user/bookmarks',
      text: d.tapbar.bookmarks.link_text,
      svgIcon: `
        <svg width="15" height="21" viewBox="0 0 15 21" fill="none" aria-hidden="true">
          <path d="M14.4108 11.185C14.4108 13.9081 14.4108 16.6312 14.4108 19.3533C14.4108 19.7895 14.1467 20.0525 13.7575 19.9872C13.6392 19.9674 13.5236 19.8992 13.4185 19.8349C11.6016 18.7099 9.78369 17.5868 7.97431 16.4495C7.76885 16.3208 7.63156 16.3322 7.43462 16.4552C5.62334 17.5887 3.80449 18.7108 1.99038 19.8415C1.76314 19.9834 1.53685 20.0686 1.28499 19.9276C1.04261 19.7914 1 19.5615 1 19.3013C1.00284 13.8948 1.00189 8.48845 1.00284 3.08204C1.00284 1.87 1.86824 1.00237 3.08112 1.00142C6.16587 0.999527 9.25157 0.999527 12.3363 1.00142C13.5473 1.00142 14.4108 1.87189 14.4108 3.08677C14.4108 5.78619 14.4108 8.48655 14.4108 11.185ZM2.12956 18.4298C2.24697 18.3608 2.33313 18.3125 2.4174 18.2595C4.03931 17.2537 5.66311 16.2508 7.28029 15.2375C7.57664 15.0511 7.83039 15.0473 8.12864 15.2346C9.75244 16.2527 11.3838 17.2585 13.0124 18.269C13.09 18.3172 13.1705 18.3608 13.2832 18.4251C13.2832 18.3144 13.2832 18.2387 13.2832 18.163C13.2832 13.1512 13.2832 8.14026 13.2832 3.1284C13.2832 2.43959 12.9499 2.11033 12.2502 2.11033C9.22128 2.11033 6.19238 2.11601 3.16255 2.10465C2.52344 2.10181 2.1182 2.49069 2.12009 3.15111C2.13524 8.14688 2.12861 13.1426 2.12861 18.1384V18.4308L2.12956 18.4298Z" fill="currentcolor" stroke="currentcolor" stroke-width="0.2" stroke-linejoin="round"/>
        </svg>
      `,
      needAuth: !authorized,
      needUserInitInfo,
    },
    {
      type: 'link',
      href: '/user',
      text: d.tapbar.user.link_text,
      svgIcon: `
        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" aria-hidden="true">
          <path d="M10.4329 1C13.3441 1 15.7041 3.37419 15.7041 6.3029C15.7041 9.2316 13.3441 11.6058 10.4329 11.6058C7.52162 11.6058 5.1616 9.2316 5.1616 6.3029C5.1616 3.37419 7.52162 1 10.4329 1ZM10.4329 2.13635C8.14546 2.13635 6.29116 4.00177 6.29116 6.3029C6.29116 8.60402 8.14546 10.4694 10.4329 10.4694C12.7202 10.4694 14.5745 8.60402 14.5745 6.3029C14.5745 4.00177 12.7202 2.13635 10.4329 2.13635ZM10.5 13.3633C14.691 13.3633 17.8602 15.6689 19.9474 20.1925C20.0787 20.4771 19.9558 20.8149 19.6729 20.947C19.3899 21.0792 19.0541 20.9555 18.9228 20.6709C17.0111 16.5276 14.2235 14.4997 10.5 14.4997C6.77643 14.4997 3.98888 16.5276 2.07717 20.6709C1.94585 20.9555 1.61006 21.0792 1.32714 20.947C1.04421 20.8149 0.921306 20.4771 1.05263 20.1925C3.13979 15.6689 6.30896 13.3633 10.5 13.3633Z" fill="currentcolor" stroke="currentcolor" stroke-width="0.2"/>
        </svg>
      `,
      needAuth: !authorized,
      needUserInitInfo,
    },
  ] satisfies [TabLink, TabMenu, TabLink, TabLink]

  return (
    <CookiesProvider>
      <html lang={params.lang} dir={dir(params.lang)}>
        <body>
          {children}
          <Tapbar tabs={tabs} />
        </body>
      </html>
    </CookiesProvider>
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
