import { FC } from "react";
import { useI18n } from "@sirclo/nexus"

type TypeLoader = {
  color?: string,
  withText?: boolean
}

const Loader: FC<TypeLoader> = ({
  color = "text-dark",
  withText
}) => {
  const i18n: any = useI18n();

  return (
    <>
      <span className={`spinner-border spinner-border-sm ${color}`} role="status"></span>
      {withText &&
        <span className="ml-2">{i18n.t("loader.loading")}</span>
      }
    </>
  )
}

export default Loader;