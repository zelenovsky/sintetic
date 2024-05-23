import Select from './Select'
import SinteticLogo from '@/lib/svg-icons/sintetic-logo'
import s from './project-switcher.module.css'
import type { Payload } from 'payload'

export default function ProjectSwitcher({ payload }: { payload: Payload }) {
  return (
    <div className={s.container}>
      <SinteticLogo className={s.sinteticLogo} />
      <Select domains={payload.config.custom.projectDomains} />
    </div>
  )
}
