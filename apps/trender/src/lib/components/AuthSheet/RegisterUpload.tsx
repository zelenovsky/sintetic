'use client'
import s from './authSheet.module.css'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { updateUserAvatar } from './actions'

export default function () {
  const url = new URL(window.location.href)
  const [imageUrl, setImageUrl] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${url.origin}/api/media`, {
        method: 'post',
        body: new FormData(e.target as HTMLFormElement),
      })

      const { doc } = await res.json()

      await updateUserAvatar(doc.id)

      window.location.href = `${url.origin}/user`
    } catch (err) {
      setMessage('Error while avatar uploading')
    } finally {
      setLoading(false)
    }
  }

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

      <p className={s.subtitle}>Upload your profile picture.</p>

      <form method="post" onSubmit={handleSubmit}>
        {imageUrl ? (
          <img src={imageUrl} className={s.avatar} alt="New uploaded avatar" />
        ) : (
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
        )}

        <label className={s.uploadPhoto}>
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            accept="image/*"
          />
          <span>Upload photo</span>
        </label>

        <button className={s.submit} type="submit" disabled={loading}>
          {loading ? '...' : 'Proceed'}
        </button>

        {message && <p>{message}</p>}
      </form>
    </>
  )
}
