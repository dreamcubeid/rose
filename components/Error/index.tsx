/* library package */
import { FC, useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
/* styles */
import styleError from 'public/scss/pages/404page.module.scss'
import styleBtn from 'public/scss/components/Button.module.scss'

const ErrorComponent: FC<any> = ({ i18n }) => {
  const [lng, setLang] = useState<string>('en')
  const allowedLang = ['id', 'en']

  useEffect(() => {
    _handleSetLngLocale()
  }, [])

  const _handleSetLngLocale = async () => {
    const allowPathname = allowedLang.includes(window.location.pathname.substring(1, 3))
    const activeLang = allowPathname ? window.location.pathname.substring(1, 3) : 'id'
    const { default: lngDict = {} } = await import(`locales/${activeLang}.json`)
    setLang(activeLang)
    i18n?.locale(lng, lngDict)
  }

  return (
    <>
      <Head>
        <title>{i18n.t('error.errorTitle')}</title>
      </Head>
      <div className={styleError.error}>
        <div className={styleError.error_container}>
          <h2 className={styleError.error_container__title}>{i18n.t('error.errorTitle')}</h2>
          <Link href="/" as="/">
            <a className={`${styleBtn.btn} ${styleBtn.btn_primary}`}>
              {i18n.t('error.errorBackHome')}
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default ErrorComponent
