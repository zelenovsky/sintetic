import s from './input.module.css'

type Props = {
  label: string
  [key: string]: any
}

export default function InputTemplate({ label, ...attrs }: Props) {
  return (
    <label className={s.wrapper}>
      <span className={s.label}>{label}</span>
      <input className={s.input} {...attrs} />
    </label>
  )
}
