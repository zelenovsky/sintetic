import { useFormStatus } from 'react-dom'

type Props = {
  children: string
  [key: string]: any
}

export default function Submit({ children, ...attrs }: Props) {
  const { pending } = useFormStatus()

  return (
    <button {...attrs} type="submit" disabled={pending}>
      {pending ? '...' : children}
    </button>
  )
}
