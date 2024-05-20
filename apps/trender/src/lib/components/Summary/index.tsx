import s from './summary.module.css'

type Props = {
  title: string
  content_html: string
}

export default function Summary({ title, content_html}: Props) {
  return (
    <section className={s.summary}>
      <h4 className={s.summary_title}>
        {title}
      </h4>

      {content_html}
    </section>
  )
}
