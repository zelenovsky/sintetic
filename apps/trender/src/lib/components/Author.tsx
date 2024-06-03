import Image from 'next/image'

type Props = {
  avatar_url: string
  name: string
  description: string
}

export default function Author({ avatar_url, name, description }: Props) {
  return (
    <address className="s-post-author">
      <Image
        src={avatar_url}
        alt={name}
        className="s-post-author_avatar"
        width={300}
        height={300}
      />
      <div>
        <p className="s-post-author_name">{name}</p>
        <p className="s-post-author_description">{description}</p>
      </div>
    </address>
  )
}
