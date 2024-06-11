import jwt from 'jsonwebtoken'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import type { MagicLink } from '@payload-types'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return Response.json({ error: 'No token provided' })
  }

  const payload = await getPayload({ config: configPromise })

  const { docs: ml_docs, totalDocs: total_ml_docs } = await payload.find({
    collection: 'magic-links',
    where: {
      token: {
        equals: token,
      },
    },
  })

  if (total_ml_docs === 0) {
    return Response.json({ error: 'Token is invalid or does not exsist' })
  }

  const ml_data = ml_docs[0] as MagicLink

  if (new Date(ml_data.expires_at) < new Date()) {
    return Response.json({ error: 'Token is expired' })
  }

  // @ts-ignore
  const { email } = jwt.verify(token, process.env.MAGIC_LINK_JWT_SECRET!)

  const { docs, totalDocs: total_user_docs } = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: email,
      },
    },
  })

  if (total_user_docs === 0) {
    return Response.json({ error: 'User with this email does not exsist' })
  }

  const verified_user = docs[0]

  payload.update({
    collection: 'users',
    id: verified_user.id,
    data: {
      verified: true,
    },
  })

  // Delete or invalidate the token
  payload.delete({
    collection: 'magic-links',
    where: {
      token: {
        equals: token,
      },
    },
  })

  const destinationUrl = new URL('/user', new URL(req.url).origin)
  const response = NextResponse.redirect(destinationUrl, { status: 302 })

  response.cookies.set('authorized', verified_user.id.toString(), {
    path: '/',
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })

  return response
}
