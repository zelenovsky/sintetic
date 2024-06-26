'use server'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers, cookies } from 'next/headers'
import { validateFormEmail } from '@/lib/helpers/validations'

export async function requestMagicLink(prevState: any, formData: FormData) {
  const { valid, email } = validateFormEmail(formData)

  if (!valid) {
    return {
      message: 'Please enter a valid email',
    }
  }

  const payload = await getPayload({ config: configPromise })

  let user
  let ml_data

  const { docs: users, totalDocs: users_total } = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: email,
      },
    },
  })

  if (users_total === 0) {
    const new_user = await payload.create({
      collection: 'users',
      data: {
        email,
        verified: false,
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
        equals: email,
      },
    },
  })

  const token = jwt.sign({ email }, process.env.MAGIC_LINK_JWT_SECRET!, {
    expiresIn: '1h',
  })

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

  return { success: true }
}

export async function updateUserInfo(prevState: any, formData: FormData) {
  const cookieStore = cookies()
  const user_id = cookieStore.get('authorized')

  if (!user_id) {
    return {
      message: 'User does not exist',
    }
  }

  const payload = await getPayload({ config: configPromise })
  await payload.update({
    collection: 'users',
    id: user_id.value,
    data: {
      username: formData.get('username')?.toString(),
      first_name: formData.get('firstname')?.toString(),
      last_name: formData.get('lastname')?.toString(),
    },
  })

  cookieStore.delete('need_user_init_info')

  return { success: true }
}

export async function updateUserAvatar(prevState: any, formData: FormData) {
  const cookieStore = cookies()
  const user_id = cookieStore.get('authorized')

  if (!user_id) {
    return {
      message: 'User does not exist',
    }
  }

  const payload = await getPayload({ config: configPromise })

  const avatar = formData.get('avatar') as File

  const isAvatarChanged = !!avatar.size

  if (isAvatarChanged) {
    const buf = await avatar.arrayBuffer()

    const { id: avatarId } = await payload.create({
      collection: 'media',
      data: {
        alt: avatar.name,
      },
      file: {
        data: Buffer.from(buf),
        name: avatar.name,
        size: avatar.size,
        mimetype: avatar.type,
      },
    })

    await payload.update({
      collection: 'users',
      id: user_id.value,
      data: {
        avatar: avatarId,
      },
    })
  }

  return { success: true }
}

export async function signIn(prevState: any, formData: FormData) {
  const { valid, email } = validateFormEmail(formData)

  if (!valid) {
    return {
      message: 'Please enter a valid email',
    }
  }

  const payload = await getPayload({ config: configPromise })
  const { docs, totalDocs } = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: email,
      },
      verified: {
        equals: true,
      },
    },
  })

  if (totalDocs === 0) {
    return {
      message: 'User with this email is not found or is not verified yet',
    }
  }

  const user = docs[0]

  const cookieStore = cookies()
  cookieStore.set('authorized', String(user.id))

  return { user, success: true }
}
