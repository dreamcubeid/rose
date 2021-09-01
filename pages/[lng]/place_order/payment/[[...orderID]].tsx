import { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useI18n, usePaymentLink } from "@sirclo/nexus";
import Layout from "components/Layout/Layout";
import { useBrand } from "lib/useBrand";
import {
  AlertCircle,
  XCircle
} from "react-feather";
import styles from "public/scss/pages/PaymentStatus.module.scss";

type TypePaymentStatus = {
  title?: string,
  contentDesc?: string
}

const PaymentStatus: FC<any> = ({
  lng,
  lngDict,
  brand,
  orderID,
  status
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const router = useRouter();
  const { data } = usePaymentLink(orderID);

  let paymentStatus: TypePaymentStatus;

  if (data === undefined || status === null) status = "orderNotFound"

  switch (status) {
    case 'failed':
      paymentStatus = {
        title: i18n.t("paymentStatus.titleFailed"),
        contentDesc: i18n.t("paymentStatus.failedDesc")
      }
      break
    case 'unfinish':
      paymentStatus = {
        title: i18n.t("paymentStatus.titleUnfinish"),
        contentDesc: i18n.t("paymentStatus.unfinishDesc")
      }
      break
    default:
      paymentStatus = {
        title: i18n.t("paymentStatus.orderNotFound")
      }
  }

  return (
    <Layout
      lngDict={lngDict}
      i18n={i18n}
      lng={lng}
      brand={brand}
    >
      <section>
        <div className="container">
          <div className={styles.paymentStatus}>
            <div className={styles.paymentStatus_inner}>
              <div className={styles.paymentStatus_heading}>
                <h6 className={styles.paymentStatus_title}>
                  {paymentStatus?.title}
                </h6>
                {status === 'failed' ?
                  <XCircle className="ml-2" color="#F44444" /> :
                  <AlertCircle className="ml-2" color="#FBC02D" />
                }
              </div>
              {!["orderNotFound", ""].includes(status) &&
                <div className={styles.paymentStatus_content}>
                  <p className={styles.paymentStatus_contentDesc}>
                    {paymentStatus?.contentDesc}
                  </p>
                </div>
              }
              <div className={styles.paymentStatus_action}>
                {status !== 'unfinish' &&
                  <div className="paymentStatus_actionButton">
                    <button
                      className={`
                        ${styles.btn} ${status !== 'orderNotFound' ? styles.btn_paymentNotif : styles.btn_primary} 
                        ${styles.btn_long} ${styles.btn_full_width} 
                        text-uppercase
                      `}
                      onClick={() => router.push("/[lng]/products", `/${lng}/products`)}
                    >
                      {i18n.t("paymentStatus.continueShopping")}
                    </button>
                  </div>
                }
                {status !== 'orderNotFound' &&
                  <div className={styles.paymentStatus_actionButton}>
                    <button
                      className={`
                        ${styles.btn} ${styles.btn_primary} 
                        ${styles.btn_long} ${styles.btn_full_width} 
                        text-uppercase
                      `}
                      onClick={() => {
                        window.location.href = data.orders[0].paymentLinks[0];
                      }}
                    >
                      {i18n.t("paymentStatus.tryAgain")}
                    </button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  );

  const brand = await useBrand(req);
  const [orderID, status] = params?.orderID as string[];

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || "",
      orderID: orderID || "",
      status: status || "",
    }
  };
}

export default PaymentStatus;