import { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ThankYou, useI18n } from "@sirclo/nexus";
import SEO from "components/SEO";
import Layout from "components/Layout/Layout";
import { useBrand } from "lib/useBrand";
import { Check } from "react-feather";
import styles from "public/scss/pages/ThankYou.module.scss";

const classesThankYouPage = {
  thankYouClassName: styles.thankyou_inner,
  hankYouOrderID: styles.thankyou_label,
  thankYouMessageClassName: styles.thankyou_message,
  thankYouOrderID: styles.thankyou_orderID,
  buttonClassName: `btn w-100 ${styles.btn_primary} ${styles.btn_long}`
}

const ThankYouPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <SEO title={i18n.t("thankYou.thanks")} />
      <section>
        <div className="container">
          <div className={styles.thankyou_container}>
            <ThankYou
              thankYouImageURL={<Check className={styles.thankyou_inner__icon} />}
              classes={classesThankYouPage}
              withDelay
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  );

  const brand = await useBrand(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ""
    }
  };
}

export default ThankYouPage;
