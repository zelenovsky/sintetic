'use client'
import s from './input.module.css'
import { useState, createRef, useEffect } from 'react'

type Props = {
  label: string
  [key: string]: any
}

export default function InputTemplate({ label, ...attrs }: Props) {
  const [labelFloating, setLabelFloating] = useState(false)
  const inputRef = createRef<HTMLInputElement>()

  useEffect(() => {
    if (inputRef.current?.value) {
      setLabelFloating(true)
    }
  }, [])

  const handleFocus = () => {
    setLabelFloating(true)
  }

  const handleBlur = () => {
    if (inputRef.current?.value) return
    setLabelFloating(false)
  }

  return (
    <label className={`${s.wrapper} ${labelFloating ? s.floating : ''}`}>
      <span className={s.label}>{label}</span>
      <input
        ref={inputRef}
        className={s.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...attrs}
      />
    </label>
  )
}
