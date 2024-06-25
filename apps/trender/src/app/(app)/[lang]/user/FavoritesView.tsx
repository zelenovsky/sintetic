'use client'
import s from './userProfile.module.css'
import type { Media, User } from '@payload-types'

type Props = {
  user: User
}

export default function () {
  return <section className={s.view}>Favorites</section>
}
