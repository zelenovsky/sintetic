'use client'
import s from './authSheet.module.css'
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import Start from './Start'
import Register from './Register'
import RegisterWelcome from './RegisterWelcome'
import LoginStart from './LoginStart'
import LoginFind from './LoginFind'
import LoginFinish from './LoginFinish'
import RegisterCheck from './RegisterCheck'
import RegisterSetup from './RegisterSetup'
import RegisterUpload from './RegisterUpload'
import type { User } from '@payload-types'

type Props = {
  onClose: () => void
  authProceeded: boolean
}

export type Views =
  | 'start'
  | 'login:start'
  | 'login:find'
  | 'login:finish'
  | 'register:start'
  | 'register:check'
  | 'register:welcome'
  | 'register:setup'
  | 'register:upload'

export type ViewProps = {
  setView: Dispatch<SetStateAction<Views>>
  setUser: Dispatch<SetStateAction<User | null>>
  user: User | null
}

const views: { [key in Views]: (p: ViewProps) => JSX.Element } = {
  start: Start,
  'register:start': Register,
  'register:check': RegisterCheck,
  'register:welcome': RegisterWelcome,
  'register:setup': RegisterSetup,
  'register:upload': RegisterUpload,
  'login:start': LoginStart,
  'login:find': LoginFind,
  'login:finish': LoginFinish,
}

export default function AuthSheet({ onClose, authProceeded }: Props) {
  const [view, setView] = useState<Views>('start')
  const [user, setUser] = useState<User | null>(null)

  const View = views[view]

  useEffect(() => {
    if (authProceeded) {
      setView('register:welcome')
    }
  }, [])

  const handleClose = () => {
    const yes = confirm('Do you really want to close this window?')
    if (yes) {
      onClose()
    }
  }

  return (
    <div className={`${s.root} container`}>
      <div onClick={handleClose} />

      <div className={s.content}>
        <View setView={setView} user={user} setUser={setUser} />
      </div>
    </div>
  )
}
