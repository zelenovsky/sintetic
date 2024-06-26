'use client'
import s from './userProfileSettings.module.css'
import type { Media, User } from '@payload-types'
import { InputTemplate, Submit } from '@/lib/components/forms/inputs'
import { updateUserProfile } from './actions'
import { useFormState } from 'react-dom'
import Image from 'next/image'
import { useState, type ChangeEvent } from 'react'

type Props = {
  user: User
  d: any
}

export default function ProfileView({ user, d }: Props) {
  const [state, formAction] = useFormState(updateUserProfile, {
    common: '',
    email: '',
    success: false,
  })
  const [imageUrl, setImageUrl] = useState('')

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (!e.target.files) return

    const previewReader = new FileReader()
    const file = e.target.files[0]

    previewReader.readAsDataURL(file)

    previewReader.onloadend = () => {
      setImageUrl(previewReader.result as string)
    }
  }

  return (
    <section className={s.view}>
      <form action={formAction} className={s.form}>
        <div className={s.uploadContainer}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              className={s.avatar}
              width="62"
              height="62"
              alt="Avatar"
            />
          ) : user.avatar ? (
            <Image
              src={(user.avatar as Media).url!}
              className={s.avatar}
              width="62"
              height="62"
              alt="Avatar"
            />
          ) : (
            <div className={s.placeholder}>
              <svg width="62" height="62" viewBox="0 0 62 62" fill="none">
                <g clipPath="url(#clip0_444_374)">
                  <path
                    d="M31.077 36.3197C36.9953 36.3513 41.7837 31.721 41.8706 25.8777C41.9575 19.995 37.1019 15.1157 31.1639 15.1157C25.2456 15.1157 20.5441 19.7935 20.5323 25.6881C20.5165 31.6222 25.1468 36.2841 31.0809 36.3157L31.077 36.3197Z"
                    fill="#E5E5E5"
                  />
                  <path
                    d="M31.002 0C13.8792 0 0 13.8792 0 31.002C0 48.1248 13.8792 62.004 31.002 62.004C48.1248 62.004 62.004 48.1248 62.004 31.002C62.004 13.8792 48.1208 0 31.002 0ZM6.6413 31.002C6.6413 21.8045 11.7418 13.8002 19.2641 9.65182C19.3431 9.60836 19.4222 9.5649 19.5051 9.52144C19.7422 9.39502 19.9792 9.27254 20.2202 9.15402C20.3704 9.07895 20.5205 9.00784 20.6706 8.93672C20.8563 8.84981 21.0459 8.76289 21.2356 8.67992C21.441 8.58905 21.6425 8.50609 21.848 8.42312C21.9981 8.36386 22.1482 8.30064 22.3023 8.24533C22.5394 8.15446 22.7803 8.06755 23.0213 7.98458C23.1557 7.93717 23.29 7.89371 23.4243 7.8463C23.6693 7.76729 23.9182 7.68827 24.1671 7.61715C24.3093 7.5737 24.4555 7.53419 24.6017 7.49468C24.8269 7.43147 25.056 7.37616 25.2852 7.32084C25.4708 7.27739 25.6565 7.23393 25.8422 7.19442C26.02 7.15491 26.1978 7.11935 26.3716 7.08775C26.6284 7.03639 26.8852 6.98898 27.146 6.94947C27.2448 6.93367 27.3396 6.91786 27.4383 6.90601C28.5999 6.73612 29.7891 6.64526 31.002 6.64526C44.4545 6.64526 55.3627 17.5534 55.3627 31.0059C55.3627 37.2364 53.0198 42.9176 49.1757 47.224C37.1178 39.9347 25.0363 39.9308 12.9507 47.2279C12.6465 46.9395 12.3542 46.6353 12.0658 46.3232C8.67597 42.1393 6.6413 36.8097 6.6413 31.0059V31.002Z"
                    fill="#E5E5E5"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_444_374">
                    <rect width="62" height="62" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          )}

          <label className={s.uploadPhoto}>
            <input
              type="file"
              name="avatar"
              onChange={handleFileChange}
              accept="image/*"
            />
            <span>{d.forms.upload.avatar.input_text}</span>
          </label>
        </div>

        {state.common && <p>{state.common}</p>}

        <InputTemplate
          label={d.forms.email.label_text}
          name="email"
          type="email"
          defaultValue={user.email}
        />

        {state.email && <p>{state.email}</p>}

        <InputTemplate
          label={d.forms.first_name.label_text}
          type="text"
          name="firstname"
          defaultValue={user.first_name}
        />

        <InputTemplate
          label={d.forms.last_name.label_text}
          type="text"
          name="lastname"
          defaultValue={user.last_name}
        />

        <InputTemplate
          label={d.forms.username.label_text}
          type="text"
          name="username"
          defaultValue={user.username}
        />

        <InputTemplate
          label={d.forms.location.label_text}
          type="text"
          name="location"
          defaultValue={user.location}
        />

        <Submit className={s.submit}>{d.forms.submit.save_text}</Submit>
      </form>
    </section>
  )
}
