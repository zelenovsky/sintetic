import s from './author.module.css'
import Image from 'next/image'

type Props = {
  avatar_url?: string
  name: string
  description: string
}

export default function Author({ avatar_url, name, description }: Props) {
  return (
    <address className={s.container}>
      {avatar_url && (
        <Image
          src={avatar_url}
          alt={name}
          className={s.avatar}
          width={43}
          height={43}
        />
      )}

      <div>
        <p className={s.name}>{name}</p>
        <p className={s.description}>{description}</p>
      </div>
    </address>
  )
}
