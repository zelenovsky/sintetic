import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { resolveAcceptLanguage } from 'resolve-accept-language'

const locales = process.env.LOCALES?.split(',') ?? ['en-US']

function getLocale(request: NextRequest) {
  const defaultLocale = 'en-US'

  return resolveAcceptLanguage(
    request.headers.get('Accept-Language')!,
    locales,
    defaultLocale,
  )
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
  ],
}
