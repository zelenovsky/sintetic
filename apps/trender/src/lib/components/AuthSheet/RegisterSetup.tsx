'use client'
import s from './authSheet.module.css'
import type { ViewProps } from '.'
import { InputTemplate, Submit } from '@/lib/components/forms/inputs'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { updateUserInfo } from './actions'

export default function RegisterSetup({ setView }: ViewProps) {
  const [state, formAction] = useFormState(updateUserInfo, {
    message: '',
  })

  useEffect(() => {
    if (state?.success) {
      setView('register:upload')
    }
  }, [state])

  return (
    <>
      <svg
        className={s.logo}
        width="46"
        height="46"
        viewBox="0 0 46 46"
        fill="none"
        aria-label="Trender logo"
      >
        <circle cx="23" cy="23" r="23" fill="black" />
        <path
          d="M33.62 25.955H32.1916C31.8407 25.955 31.5215 26.1669 31.3822 26.4972L30.5974 28.3428L26.3157 6.90368C26.2276 6.48359 25.8537 6.18019 25.4393 6.19276C25.0178 6.19994 24.6598 6.51052 24.5858 6.93241L24.6017 7.01858C24.577 7.08501 24.5558 7.15323 24.5452 7.22683L21.0694 33.9476L18.7575 20.7506C18.6834 20.3287 18.3255 20.0181 17.904 20.0109C17.4896 19.9966 17.1157 20.3018 17.0275 20.7201L15.391 28.5151L14.6063 26.6696C14.467 26.341 14.1478 26.1274 13.7969 26.1274H8.84328C8.35657 26.1274 7.96155 26.5295 7.96155 27.025C7.96155 27.5205 8.35657 27.9227 8.84328 27.9227H13.2202L14.8691 31.8058C15.0207 32.1649 15.384 32.3821 15.7649 32.3426C16.1458 32.3049 16.4597 32.0195 16.5408 31.6371L17.8123 25.5762L20.3305 39.9527C20.4064 40.3818 20.7714 40.6924 21.1982 40.6924C21.2052 40.6924 21.2123 40.6924 21.2176 40.6924C21.6514 40.6816 22.0146 40.3513 22.0711 39.9132L25.5151 13.4402L25.6456 12.39L28.1762 25.4021L29.4477 31.4629C29.527 31.8453 29.8409 32.1308 30.2236 32.1685C30.6063 32.208 30.9678 31.9907 31.1194 31.6317L32.7683 27.7485H33.6183C34.105 27.7485 34.5 27.3464 34.5 26.8509C34.5 26.3554 34.105 25.9533 33.6183 25.9533L33.62 25.955Z"
          fill="white"
        />
      </svg>

      <p className={s.infoText}>Let’s set up your profile</p>

      <form action={formAction}>
        <div className={s.fieldsGroup}>
          <InputTemplate label="First name" type="text" name="firstname" />
          <InputTemplate label="Last name" type="text" name="lastname" />
          <InputTemplate label="Username" type="text" name="username" />
        </div>

        <Submit className={s.submit}>Proceed</Submit>
      </form>
    </>
  )
}
