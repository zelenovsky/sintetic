import Image from 'next/image'

type Props = {
  avatar_url?: string
  name: string
  description: string
}

export default function Author({ avatar_url, name, description }: Props) {
  return (
    <address className="s-post-author">
      {avatar_url && (
        <Image
          src={avatar_url}
          alt={name}
          className="s-post-author_avatar"
          width={43}
          height={43}
        />
      )}

      <div>
        <p className="s-post-author_name">{name}</p>
        <p className="s-post-author_description">{description}</p>
      </div>
    </address>
  )
}
