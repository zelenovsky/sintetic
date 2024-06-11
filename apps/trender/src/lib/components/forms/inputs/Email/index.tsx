import type { UseFormRegisterReturn, RegisterOptions } from 'react-hook-form'
import s from './styles.module.css'

type Props = {
  register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn
}

export default function Email({ register }: Props) {
  return (
    <label className={s.wrapper}>
      <span className={s.label}>Email</span>
      <input
        className={s.input}
        type="email"
        {...register('email', { required: true })}
        required
      />
    </label>
  )
}
