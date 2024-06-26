import s from './userProfileSettings.module.css'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { User } from '@payload-types'
import TabViews from './TabViews'
import { getDictionary } from '@/app/(app)/dictionaries'

export default async function UserProfileSettingsPage({
  params,
}: {
  params: {
    lang: string
  }
}) {
  const d = await getDictionary(params.lang)
  const cookieStore = cookies()
  const userIdCookie = cookieStore.get('authorized')

  const payload = await getPayload({ config: configPromise })

  const { docs, totalDocs } = await payload.find({
    collection: 'users',
    where: {
      id: {
        equals: userIdCookie!.value,
      },
    },
  })

  if (totalDocs === 0) {
    return (
      <div className="container">
        <p>User is not found</p>
      </div>
    )
  }

  const user = docs[0] as User

  return (
    <>
      <header className={`${s.header} container`}>
        <Link href="/user" className={s.headerLink}>
          {d.navigation.back_text}
        </Link>
      </header>

      <div className="container">
        <h1 className={s.title}>{d.user.settings_text}</h1>

        <TabViews user={user} d={d} />
      </div>
    </>
  )
}
