import { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from 'next/link'
import Router from "next/router";
import dynamic from "next/dynamic";
import {
  CustomerDetail,
  ListPaymentMethod,
  PrivateRoute,
  useI18n,
  useShippingMethod
} from "@sirclo/nexus";
import SEO from "components/SEO";
import Layout from "components/Layout/Layout";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import Loader from "components/Loader/Loader";
import EmptyComponent from "components/EmptyComponent/EmptyComponent";
import { useBrand } from "lib/useBrand";
import { ArrowLeft, Info } from "react-feather";
import { toast } from "react-toastify";
import styles from "public/scss/pages/PaymentMethod.module.scss";

const LoaderPages = dynamic(() => import("components/Loader/LoaderPages"));
const Placeholder = dynamic(() => import("components/Placeholder"));

const classesCustomerDetail = {
  customerDetailBoxClass: styles.customer,
  addressContainerClassName: styles.customer_info,
  addressDetailClassName: styles.customer_infoPerson,
  addressValueClassName: styles.customer_infoPersonValue
};

const classesListPaymentMethod = {
  listPaymentDivClassName: "container",
  paymentItemEnabledClassName: `row ${styles.payment_listItemEnabled}`,
  paymentItemDisabledClassName: `row ${styles.payment_listItemDisabled}`,
  paymentTypeClassName: `align-self-center ${styles.payment_listItemPayment}`,
  radioButtonContainerClassName: styles.payment_listItemPayment__radio,
  paymentImgClassName: `align-self-center ${styles.payment_listItemPayment__image}`,
  paymentWarningTextClassName: styles.payment_listItemPayment__warning,
  paymentMethodDetailsClassName: `col-12 ${styles.payment_listItemBody}`,
  paymentMethodDetailBodyClassName: styles.payment_listItemDetail,
  selectedPaymentMethodClassName: styles.payment_listItemTable,
  paymentDetailsRowClassName: styles.payment_listItemTableRow,
  paymentDetailsLabelClassName: styles.payment_listItemTableRow__label,
  paymentDetailsValueClassName: styles.payment_listItemTableRow__value,
  // footer
  paymentMethodDetailFooterClassName: styles.payment_footer,
  promotionButtonGroupClassName: styles.payment_footer__promotion,
  couponButtonClassName: `btn ${styles.btn_black} ${styles.btn_long} ${styles.payment_pointButton} mb-3 px-3`,
  voucherAppliedTextClassName: styles.payment_voucherAppliedText,
  voucherButtonRemoveClassName: styles.payment_voucherAppliedRemove,
  popupClassName: styles.payment_listItemOverlay,
  voucherContainerClassName: styles.payment_listItemPopup,
  closeButtonClassName: styles.payment_listItemPopup__close,
  voucherFormContainerClassName: `${styles.payment_listItemPopupForm__body} ${styles.payment_listItemPopup__payment}`,
  voucherFormClassName: `form-inline ${styles.sirclo_form_row}`,
  voucherInputClassName: `form-control ${styles.sirclo_form_input} ${styles.payment_listItemPopupForm__input}`,
  voucherSubmitButtonClassName: `btn btn-black-outer ${styles.payment_listItemPopupForm__button}`,
  voucherListClassName: styles.ordersummary_popupVoucher,
  voucherListHeaderClassName: styles.ordersummary_popupVoucherTitle,
  voucherClassName: styles.ordersummary_popupVoucherItem,
  voucherDetailClassName: styles.ordersummary_popupVoucherDetail,
  voucherFooterClassName: styles.ordersummary_popupVoucherFooter,
  voucherApplyButtonClassName: `btn ${styles.btn_primary}`,
  agreementContainerClassName: styles.payment_footer__agreement,
  agreementCheckboxClassName: styles.payment_footer__check,
  buttonContainerClassName: styles.payment_footer__button,
  buttonClassName: `btn ${styles.btn_primary} ${styles.btn_long}`,
  basePriceClassName: styles.payment_listItemTableRow__priceSale,
  salePriceClassName: styles.payment_listItemTableRow__price,
  shippingPriceClassName: styles.payment_listItemTableRow__priceSale,
  shippingDiscountClassName: styles.payment_listItemTableRow__price,
  //point
  popupBackgroundClassName: styles.payment_listItemOverlay,
  pointsContainerClassName: styles.payment_containerPointPopup,
  numberOfPointsClassName: styles.payment_pointsPopup,
  pointsFormContainerClassName: styles.payment_pointsFormContainer,
  pointsFormClassName: styles.payment_pointsForm,
  pointsLabelClassName: styles.payment_pointsPopupLabel,
  pointsValueClassName: styles.payment_pointsPopupValue,
  changePointsClassName: styles.payment_buttonChangePoint,
  pointsInsufficientClassName: styles.payment_pointsInsufficient,
  pointsSubmitButtonClassName: `btn ${styles.btn_primary} ${styles.btn_long} w-100 mt-4 mb-0`,
  pointsWarningClassName: styles.payment_pointsWarning,
  pointButtonClassName: `btn ${styles.btn_black} ${styles.btn_long} ${styles.payment_pointButton} mb-3 px-3`,
  pointAppliedTextClassName: styles.payment_pointAppliedText,
  pointButtonRemoveClassName: styles.payment_pointAppliedRemove,
};

const classesEmptyComponent = {
  emptyContainer: styles.payment_empty,
  emptyTitle: styles.payment_empty__title
}

const classesPlaceholderCustomerDetail = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_customerDetail}`
}

const classesPlaceholderPayment = {
  placeholderList: `${styles.placeholderItem} ${styles.placeholderItem_paymentMethod}`
}

type PrivateComponentPropsType = {
  children: any;
};

const PrivateRouteWrapper = ({ children }: PrivateComponentPropsType) => (
  <PrivateRoute
    page="payment_method"
    loadingComponent={<LoaderPages />}
  >
    {children}
  </PrivateRoute>
)

const PaymentMethods: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const { data } = useShippingMethod();

  const CustomerDetailHeader = ({ title, linkTo, withLogo = false }) => (
    <div className={styles.customer_infoHeader}>
      <div className={styles.customer_infoHeaderContainer}>
        <h3 className={styles.customer_infoHeaderTitle}>{title}</h3>
        {withLogo &&
          <Info color="#767676" size="18" />
        }
      </div>
      <Link href={`/[lng]/${linkTo}`} as={`/${lng}/${linkTo}`}>
        <a className={styles.customer_infoHeaderLink}>{i18n.t("shipping.change")}</a>
      </Link>
    </div>
  )

  return (
    <PrivateRouteWrapper>
      <Layout
        i18n={i18n}
        lng={lng}
        lngDict={lngDict}
        brand={brand}
        withHeader={false}
      >
        <SEO title="Payment Method" />
        <div className={styles.payment}>
          <div className="row mx-0">
            <div className="col-12 p-0">
              <div className={styles.payment_container}>
                <div className="container">
                  <div className={styles.payment_heading}>
                    <div
                      className={styles.payment_headingIcon}
                      onClick={() => Router.push("/[lng]/products", `/${lng}/products`)}
                    >
                      <ArrowLeft color="black" />
                    </div>
                    <h6>{i18n.t("placeOrder.checkOrder")}</h6>
                  </div>
                </div>
                <hr className={styles.payment_line} />
                <div className={styles.payment_steps}>
                  <Breadcrumb currentStep={3} />
                </div>
                <hr className={`${styles.payment_lineSecond}`} />
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-md-12 col-lg-6 offset-lg-3">
                      <CustomerDetail
                        classes={classesCustomerDetail}
                        isBilling={true}
                        contactInfoHeader={
                          <CustomerDetailHeader
                            title={i18n.t("shipping.contactInfo")}
                            linkTo="place_order"
                            withLogo
                          />
                        }
                        loadingComponent={
                          <Placeholder classes={classesPlaceholderCustomerDetail} withImage />
                        }
                      />
                      <CustomerDetail
                        classes={classesCustomerDetail}
                        isBilling={false}
                        shippingInfoHeader={
                          <CustomerDetailHeader
                            title={i18n.t("shipping.shipTo")}
                            linkTo="place_order"
                            withLogo
                          />
                        }
                        loadingComponent={
                          <Placeholder classes={classesPlaceholderCustomerDetail} withImage />
                        }
                      />
                      {data?.shippingMethod &&
                        <>
                          <CustomerDetailHeader
                            title={i18n.t("account.shippingMethod")}
                            linkTo="shipping_method"
                          />
                          <div className={styles.payment_shipping}>
                            <h3 className={styles.payment_shippingTitle}>
                              {data?.shippingMethod?.shippingProvider}&nbsp;{data?.shippingMethod?.shippingService}
                            </h3>
                            <h3 className={styles.payment_shippingCost}>
                              {data?.shippingMethod?.shippingCost}
                            </h3>
                          </div>
                        </>
                      }
                      <div className={styles.payment_list}>
                        <h3 className={styles.payment_listTitle}>{i18n.t("payment.title")}</h3>
                        <ListPaymentMethod
                          classes={classesListPaymentMethod}
                          onErrorMsg={(msg) => toast.error(msg)}
                          onErrorMsgCoupon={(msg) => toast.error(msg)}
                          popupLoader={
                            <div className={styles.payment_popupProcessOverlay}>
                              <div className={styles.payment_popupProcessContainer}>
                                <div className={styles.payment_popupProcessInner}>
                                  <span className="spinner-border spinner-border-sm mr-3" role="status"></span>
                                  <span>{i18n.t("payment.prepayment")}</span>
                                </div>
                              </div>
                            </div>
                          }
                          loaderElement={
                            <div className="col-12 text-center mx-auto loader">
                              <Loader color="text-dark" withText />
                            </div>
                          }
                          emptyState={
                            <EmptyComponent
                              classes={classesEmptyComponent}
                              title={i18n.t("payment.isEmpty")}
                            />
                          }
                          loadingComponent={
                            <Placeholder classes={classesPlaceholderPayment} withList listMany={3} />
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </PrivateRouteWrapper>
  );
}

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

export default PaymentMethods;
