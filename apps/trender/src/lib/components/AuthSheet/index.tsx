'use client'
import s from './styles.module.css'
import { useState, type Dispatch, type SetStateAction } from 'react'
import Start from './Start'
import Register from './Register'
import Login from './Login'

type Props = {
  onClose: () => void
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
  'login:start': Login,
}

export default function AuthSheet({ onClose }: Props) {
  const [view, setView] = useState<Views>('start')
  const View = views[view]

  return (
    <div className={s.root}>
      <div className={s.overlay} onClick={onClose} />

      <div>
        <View setView={setView} />
      </div>
    </div>
  )
}
