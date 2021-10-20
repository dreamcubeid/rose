/* library package */
import Link from 'next/link'
/* styles */
import styleError from 'public/scss/pages/404page.module.scss'
import styleBtn from 'public/scss/components/Button.module.scss'

type TypePageNotFound = {
  i18n: any
}

const PageNotFound = ({
  i18n
}: TypePageNotFound) => {
  return (
    <div className={styleError.error}>
      <div className={styleError.error_container}>
        <h2 className={styleError.error_container__title}>
          {i18n.t("global.pageNotFound")}
        </h2>
        <Link href="/" as="/">
          <a className={`${styleBtn.btn} ${styleBtn.btn_primary}`}>
            {i18n.t("global.backHome")}
          </a>
        </Link>
      </div>
    </div>
  )
}

export default PageNotFound