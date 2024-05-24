import configPromise from '@payload-config'
import { getPayload } from 'payload'
import SinteticLogo from '@/lib/svg-icons/sintetic-logo'
import Select from './Select'
import s from './project-switcher.module.css'

export default async function ProjectSwitcher() {
  const payload = await getPayload({ config: configPromise })
  return (
    <div className={s.container}>
      <SinteticLogo className={s.sinteticLogo} />
      <Select domains={payload.config.custom.projectDomains} />
    </div>
  )
}
