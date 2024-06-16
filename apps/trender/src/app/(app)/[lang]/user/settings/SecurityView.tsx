'use client'
import s from './userProfileSettings.module.css'
import type { Media, User } from '@payload-types'

type Props = {
  user: User
}

export default function SecurityView() {
  return <section className={s.view}>Security</section>
}
