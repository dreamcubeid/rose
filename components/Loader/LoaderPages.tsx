import { useI18n } from "@sirclo/nexus"

const LoaderPages = () => {
  const i18n: any = useI18n();

  return (
    <div className="loader-pages">
      <div className="loader-pages__container">
        <div className="loader-pages__container--spin"></div>
        <p className="loader-pages__container--label">{i18n.t("home.loading")}</p>
      </div>
    </div>
  )
}

export default LoaderPages;