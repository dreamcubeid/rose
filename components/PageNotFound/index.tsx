import { useRouter } from "next/router";
import styles from "public/scss/components/NotFound.module.scss";

const PageNotFound = ({
  i18n
}) => {
  const router = useRouter()

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-8 offset-sm2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <div className={styles.notFound}>
            <h2>{i18n.t("global.pageNotFound")}</h2>
            <a
              className={`btn ${styles.btn_primary} py-3 px-5`}
              onClick={() => router.push('/')}
            >
              {i18n.t("global.backHome")}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound