import s from './tabs.module.css'

export type Tab = {
  text: string
  slug: string
  isActive: boolean
  viewComponent: (viewProps: any) => JSX.Element
  count?: number
}

type Props = {
  tabs: Tab[]
  setActive: (tab: Tab) => () => void
}

export default function Tabs({ tabs, setActive }: Props) {
  return (
    <ul className={s.tabs}>
      {tabs.map((tab, index) => (
        <li className={tab.isActive ? s.active : ''} key={index}>
          <button className={s.button} type="button" onClick={setActive(tab)}>
            {tab.text}
            {tab.count && <span className={s.count}>{tab.count}</span>}
          </button>
        </li>
      ))}
    </ul>
  )
}
