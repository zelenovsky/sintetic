'use client'
import s from './userProfileSettings.module.css'
import type { Media, User } from '@payload-types'

type Props = {
  user: User
}

export default function InterestsView() {
  return <section className={s.view}>Interests</section>
}
