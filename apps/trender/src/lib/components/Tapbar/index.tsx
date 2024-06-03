import s from './tapbar.module.css'

import Link from 'next/link'

type Props = {
  links: {
    href: string
    text: string
    svg_icon: () => JSX.Element
  }[]
}

export default function Tapbar({ links }: Props) {
  return (
    <div className={s.container}>
      <nav className={s.tapbar}>
        {links.map(({ href, text, svg_icon: Icon }, index) => (
          <Link
            href={href}
            title={text}
            aria-label={text}
            className={s.link}
            key={index}
          >
            <Icon />
          </Link>
        ))}
      </nav>
    </div>
  )
}
