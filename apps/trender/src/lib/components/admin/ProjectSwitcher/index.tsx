import SinteticLogo from '@/lib/svg-icons/sintetic-logo'
import Select from './Select'
import s from './project-switcher.module.css'

export default async function ProjectSwitcher() {
  return (
    <div className={s.container}>
      <SinteticLogo className={s.sinteticLogo} />
      <Select />
    </div>
  )
}
