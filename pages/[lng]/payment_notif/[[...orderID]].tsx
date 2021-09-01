import { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { PaymentConfirmation, useI18n } from "@sirclo/nexus";
import SEO from "components/SEO";
import Layout from "components/Layout/Layout";
import Loader from "components/Loader/Loader";
import { useBrand } from "lib/useBrand";
import { toast } from "react-toastify";
import styles from "public/scss/pages/PaymentNotif.module.scss";
import {
  ChevronUp,
  ChevronDown,
} from "react-feather";

const classesPaymentConfirmation = {
  paymentConfirmationDivClassName: styles.paymentNotif_form,
  paymentInfoUploadClassName: styles.paymentNotif_info,
  inputContainerClassName: `${styles.sirclo_form_row} ${styles.paymentConfirmation}`,
  inputClassName: `form-control ${styles.sirclo_form_input}`,
  selectClassName: `form-control ${styles.sirclo_form_input}`,

  buttonConfirmClassName: styles.paymentConfirmation_buttonConfirm,
  detailContainerClassName: styles.paymentConfirmation_detailContainer,
  detailContentClassName: styles.paymentConfirmation_detailContent,
  detailHeaderClassName: styles.paymentConfirmation_detailHeader,
  detailTitleClassName: styles.paymentConfirmation_detailTitle,
  detailStatusClassName: styles.paymentConfirmation_detailStatus,
  detailTotalAmountClassName: styles.paymentConfirmation_detailTotalAmount,
  detailDropdownClassName: styles.paymentConfirmation_detailDropdown,
  detailItemClassName: `d-flex`,
  detailItemImgClassName: styles.paymentConfirmation_detailItemImg,
  detailItemLabelClassName: styles.paymentConfirmation_detailItemLabel,
  detailItemPriceClassName: styles.paymentConfirmation_detailItemPrice,
  detailPriceBreakdownClassName: styles.paymentConfirmation_detailPriceBreakdown,
  detailFieldClassName: styles.paymentConfirmation_detailField,
  detailTotalFieldClassName: styles.paymentConfirmation_detailTotalField,
  detailHeaderDropdownClassName: styles.paymentConfirmation_detailHeaderDropdown,
  detailBodyDropdownClassName: styles.paymentConfirmation_detailBodyDropdown,
  labelClassName: styles.paymentConfirmation_label,
}

const PaymentConfirmationPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const router = useRouter();
  let orderID = "";

  if (router.query.orderID) {
    orderID = router.query.orderID.toString();
  }

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <SEO title={i18n.t("paymentConfirm.heading")} />
      <section>
        <div className="container">
          <div className={styles.paymentNotif_container}>
            <div className={styles.paymentNotif_inner}>
              <div className={styles.paymentNotif_inner_title}>
                <h3>{i18n.t("paymentConfirm.heading")}</h3>
              </div>
              <PaymentConfirmation
                orderIDProps={orderID}
                classes={classesPaymentConfirmation}
                orderDetailIcon={{
                  close: <ChevronUp/>,
                  open: <ChevronDown />
                }}
                onErrorMsg={(msg) => toast.error(msg)}
                onSuccessMsg={(msg) => toast.success(msg)}
                loadingComponent={<Loader color="text-light" />}
                errorComponent={<div>{i18n.t("global.error")}</div>}
                withOrderDetails
                thumborSetting={{
                  width: 40,
                  format: "webp",
                  quality: 85
                }}
              />
            </div>
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

export default PaymentConfirmationPage;