'use client'
import { useEffect, useState, type ChangeEvent } from 'react'
import s from './select.module.css'

type Props = {
  domains: string[]
}

const url = new URL(window.location.href)

export default function Select({ domains }: Props) {
  const [accessAllowed, setAccessAllowed] = useState(false)

  useEffect(() => {
    fetch(`${url.origin}/api/users/me`)
      .then(res => res.json())
      .then(({ user }) => {
        if (user?.role === 'super_admin') {
          setAccessAllowed(true)
        }
      })
  }, [])

  const handler = (e: ChangeEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement
    window.location.href = `https://${target.value}/admin`
  }

  if (accessAllowed) {
    return (
      <div className={s.selectWrapper}>
        <select
          name="project-swither"
          id="project-switcher"
          onChange={handler}
          className={s.select}
          defaultValue={domains.find(domain => url.hostname === domain)}
        >
          {domains.map(domain => (
            <option
              value={domain}
              key={domain}
            >
              {domain}
            </option>
          ))}
        </select>

        <svg className={s.svg} width="28" height="24" viewBox="0 0 28 24" fill="none" aria-hidden="true">
          <path d="M0.421327 4.52618L11.2809 21.9877C12.442 23.9528 15.2852 23.9528 16.4464 21.9877L27.3059 4.52619C28.4877 2.52634 27.0461 0 24.7232 0H3.00411C0.681208 0 -0.760401 2.52634 0.421327 4.52618Z" fill="#E6E6E6"/>
        </svg>
      </div>
    )
  }

  return null
}
