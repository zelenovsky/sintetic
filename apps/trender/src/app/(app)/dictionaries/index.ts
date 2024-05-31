import 'server-only'

type SupportedLocales = 'ru-RU' | 'en-US' | 'hi-IN'

const supportedLocales: SupportedLocales[] = ['ru-RU', 'en-US', 'hi-IN']

const dictionaries: { [key in SupportedLocales]: () => Promise<any> } = {
  'ru-RU': () => import('./ru-RU.json').then((module) => module.default),
  'en-US': () => import('./en-US.json').then((module) => module.default),
  'hi-IN': () => import('./hi-IN.json').then((module) => module.default),
}

const getDitcionary = async (locale: SupportedLocales) => {
  return dictionaries[locale]()
}

const rtlLngs = [
  'ar',
  'shu',
  'sqr',
  'ssh',
  'xaa',
  'yhd',
  'yud',
  'aao',
  'abh',
  'abv',
  'acm',
  'acq',
  'acw',
  'acx',
  'acy',
  'adf',
  'ads',
  'aeb',
  'aec',
  'afb',
  'ajp',
  'apc',
  'apd',
  'arb',
  'arq',
  'ars',
  'ary',
  'arz',
  'auz',
  'avl',
  'ayh',
  'ayl',
  'ayn',
  'ayp',
  'bbz',
  'pga',
  'he',
  'iw',
  'ps',
  'pbt',
  'pbu',
  'pst',
  'prp',
  'prd',
  'ug',
  'ur',
  'ydd',
  'yds',
  'yih',
  'ji',
  'yi',
  'hbo',
  'men',
  'xmn',
  'fa',
  'jpr',
  'peo',
  'pes',
  'prs',
  'dv',
  'sam',
  'ckb',
]

const dir = (lang: string) => {
  if (rtlLngs.includes(lang)) {
    return 'rtl'
  }
  return 'ltr'
}

export { dir, getDitcionary, supportedLocales }
