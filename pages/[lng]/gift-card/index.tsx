import { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { GiftCard, useI18n } from "@sirclo/nexus";
import { useBrand } from "lib/useBrand";
import Layout from "components/Layout/Layout";
import styles from "public/scss/pages/GiftCard.module.scss";

const classesGiftCard = {
  containerClassName: `${styles.giftcard_item} ${styles.giftcard_item__form}`,
  inputContainerClassName: styles.sirclo_form_row,
  labelClassName: styles.giftcard_label,
  inputClassName: `form-control ${styles.sirclo_form_input}`,
  buttonClassName: `btn mt-3
    ${styles.btn_primary} ${styles.btn_long} 
    ${styles.btn_full_width} ${styles.btn_center}`
}

const GiftCardPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const i18n: any = useI18n()

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      titleHeader={i18n.t("giftCard.title")}
    >
      <section className={styles.giftcard_wrapper}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 d-flex flex-column align-items-start justify-content-start flex-nowrap">
              <div className={styles.giftcard_header}>
                <h1>{i18n.t("giftCard.title")}</h1>
                <p>{i18n.t("giftCard.desc")}</p>
              </div>
              <GiftCard
                classes={classesGiftCard}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req
}) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  )

  const brand = await useBrand(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ''
    }
  }
}

export default GiftCardPage;
