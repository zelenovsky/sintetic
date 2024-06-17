'use server'
import { Buffer } from 'node:buffer'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { validateFormEmail } from '@/lib/helpers/validations'

export async function updateUserProfile(prevState: any, formData: FormData) {
  const cookieStore = cookies()
  const user_id = cookieStore.get('authorized')

  if (!user_id) {
    return {
      common: 'User does not exist',
      email: '',
      success: false,
    }
  }

  const { valid, email } = validateFormEmail(formData)

  if (!valid) {
    return {
      common: '',
      email: 'Please enter a valid email',
      success: false,
    }
  }

  const payload = await getPayload({ config: configPromise })

  const avatar = formData.get('avatar') as File

  const isAvatarChanged = !!avatar.size

  let avatarId
  if (isAvatarChanged) {
    const buf = await avatar.arrayBuffer()

    const { id } = await payload.create({
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

    avatarId = id
  }

  await payload.update({
    collection: 'users',
    id: user_id.value,
    data: {
      email,
      username: formData.get('username')?.toString(),
      first_name: formData.get('firstname')?.toString(),
      last_name: formData.get('lastname')?.toString(),
      location: formData.get('location')?.toString(),
      ...(avatarId ? { avatar: avatarId } : {}),
    },
  })

  return { success: true }
}
