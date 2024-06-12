'use client'
import s from './authSheet.module.css'
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import Start from './Start'
import Register from './Register'
import RegisterWelcome from './RegisterWelcome'
import Login from './Login'
import RegisterCheck from './RegisterCheck'
import RegisterSetup from './RegisterSetup'

type Props = {
  onClose: () => void
  authProceeded: boolean
}

export type Views =
  | 'start'
  | 'login:start'
  | 'login:welcome'
  | 'login:finish'
  | 'register:start'
  | 'register:check'
  | 'register:welcome'
  | 'register:setup'
  | 'register:upload'

export type ViewProps = {
  setView: Dispatch<SetStateAction<Views>>
}

const views: { [key in Views]: (p: ViewProps) => JSX.Element } = {
  start: Start,
  'register:start': Register,
  'register:check': RegisterCheck,
  'register:welcome': RegisterWelcome,
  'register:setup': RegisterSetup,
  'login:start': Login,
}

export default function AuthSheet({ onClose, authProceeded }: Props) {
  const [view, setView] = useState<Views>('start')
  const View = views[view]

  useEffect(() => {
    if (authProceeded) {
      setView('register:welcome')
    }
  }, [])

  return (
    <div className={`${s.root} container`}>
      <div className={s.overlay} onClick={onClose} />

      <div className={s.content}>
        <View setView={setView} />
      </div>
    </div>
  )
}
