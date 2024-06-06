import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  const valid_email = email.trim()

  const payload = await getPayload({ config: configPromise })

  let user
  let ml_data

  const { docs: users, totalDocs: users_total } = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: valid_email,
      },
    },
  })

  if (users_total === 0) {
    const new_user = await payload.create({
      collection: 'users',
      data: {
        email: valid_email,
      },
    })

    user = new_user
  } else {
    user = users[0]
  }

  const { docs: mls, totalDocs: ml_total } = await payload.find({
    collection: 'magic-links',
    where: {
      'user.email': {
        equals: valid_email,
      },
    },
  })

  const token = jwt.sign(
    { email: valid_email },
    process.env.MAGIC_LINK_JWT_SECRET!,
    {
      expiresIn: '1h',
    },
  )

  if (ml_total === 0) {
    ml_data = await payload.create({
      collection: 'magic-links',
      data: {
        user: user.id,
        token,
        expires_at: new Date(Date.now() + 3600000).toISOString(), // expires in 1 hour
      },
    })
  } else {
    ml_data = await payload.update({
      collection: 'magic-links',
      id: mls[0].id,
      data: {
        token,
        expires_at: new Date(Date.now() + 3600000).toISOString(), // expires in 1 hour
      },
    })
  }

  const headersList = headers()
  const origin = headersList.get('origin')
  const magicLink = `${origin}/api/auth/verifyMagicLink?token=${ml_data.token}`

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'vickie.schumm41@ethereal.email', // generated ethereal user
      pass: 'rqy2sAK6U4Aebgdk2W', // generated ethereal password
    },
  })

  await transporter.sendMail({
    from: 'vickie.schumm41@ethereal.email',
    to: email,
    subject: 'Your Magic Link',
    html: `<p><a href="${magicLink}">Click here to log in</a></p>`,
  })

  return Response.json({ message: 'Magic link sent!' })
}
