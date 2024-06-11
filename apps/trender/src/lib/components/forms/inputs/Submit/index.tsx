import s from './styles.module.css'

type Props = {
  text: string
  disabled?: boolean
}

export default function Submit({ text, disabled }: Props) {
  return (
    <button className={s.button} type="submit" disabled={disabled}>
      {text}
    </button>
  )
}
