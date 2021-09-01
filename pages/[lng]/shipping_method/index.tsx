import { FC, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import Router from "next/router";
import {
  CustomerDetail,
  ShippingMethods,
  CartSummary,
  useI18n,
  PrivateRoute
} from "@sirclo/nexus";
import SEO from "components/SEO";
import Layout from "components/Layout/Layout";
import Footer from "components/Footer/Footer";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import EmptyComponent from "components/EmptyComponent/EmptyComponent";
import useWindowSize from "lib/useWindowSize";
import { useBrand } from "lib/useBrand";
import {
  ArrowLeft,
  ShoppingCart,
  X as XIcon,
  ChevronDown,
  ChevronUp,
  Info,
  Crosshair
} from "react-feather";
import { toast } from "react-toastify";
import styles from "public/scss/pages/ShippingMethod.module.scss";

const Popup = dynamic(() => import("components/Popup/Popup"));
const Placeholder = dynamic(() => import("components/Placeholder"));
const LoaderPages = dynamic(() => import("components/Loader/LoaderPages"));

const classesCustomerDetail = {
  customerDetailBoxClass: styles.customer,
  addressContainerClassName: styles.customer_info,
  addressDetailClassName: styles.customer_infoPerson,
  addressValueClassName: styles.customer_infoPersonValue,
  changePinClassName: styles.customer_changePin,
  mapPopupClassName: styles.customer_mapPopup,
  mapPopupBackgroundClassName: styles.customer_mapPopupContainer,
  mapClassName: styles.customer_mapPopupMaps,
  mapHeaderWrapperClassName: styles.customer_mapPopupHeader,
  mapHeaderTitleClassName: styles.customer_mapPopupHeaderTitle,
  mapHeaderCloseButtonClassName: styles.customer_mapPopupClose,
  mapHeaderNoteClassName: styles.customer_mapPopupNote,
  mapLabelAddressClassName: styles.customer_mapPopupLabelAddress,
  mapButtonFooterClassName: `btn ${styles.btn_primary} ${styles.btn_long} d-block mx-auto my-3`,
  mapCenterButtonClassName: styles.customer_mapPopupCenterButton
};

const classesShippingMethod = {
  containerClass: styles.shippingMethod_container,
  shippingRadioDiv: styles.shippingMethodItem,
  divInputClass: styles.shippingMethodItem_radio,
  shippingNameDivClass: styles.shippingMethodItem_label,
  shippingNameClass: styles.shippingMethodItem_title,
  shippingPriceDivClass: styles.shippingMethodItem_price,
  pinPointLocationClassName: `${styles.shippingMethodItem_pinButton} btn ${styles.btn_primary} ${styles.btn_long} ${styles.btn_full_width}`,
  warningPinPointClassName: styles.shippingmethod__itemWarning,
  mapPopupClassName: styles.customer_mapPopup,
  mapPopupBackgroundClassName: styles.customer_mapPopupContainer,
  mapClassName: styles.customer_mapPopupMaps,
  mapHeaderWrapperClassName: styles.customer_mapPopupHeader,
  mapHeaderTitleClassName: styles.customer_mapPopupHeaderTitle,
  mapHeaderCloseButtonClassName: styles.customer_mapPopupClose,
  mapHeaderNoteClassName: styles.customer_mapPopupNote,
  mapLabelAddressClassName: styles.customer_mapPopupLabelAddress,
  mapButtonFooterClassName: `btn ${styles.btn_primary} ${styles.btn_long} d-block mx-auto my-3`,
  mapCenterButtonClassName: styles.customer_mapPopupCenterButton
}

const classesOrderSummary = {
  containerClassName: styles.ordersummary_container,
  headerClassName: styles.ordersummary_header,
  voucherButtonClassName: styles.ordersummary_headerRow,
  voucherIconClassName: styles.ordersummary_headerIcon,
  voucherTextClassName: styles.ordersummary_headerLabel,
  pointsButtonClassName: styles.ordersummary_headerRow,
  pointsIconClassName: styles.ordersummary_headerIcon,
  pointsTextClassName: styles.ordersummary_headerLabel,
  subTotalClassName: styles.ordersummary_subTotal,
  subTotalTextClassName: styles.ordersummary_subTotalLabel,
  subTotalPriceClassName: styles.ordersummary_subTotalPrice,
  footerClassName: styles.ordersummary_footer,
  submitButtonClassName: `btn ${styles.btn_primary} ${styles.btn_long} ${styles.btn_full_width} m-0`,
  continueShoppingClassName: "d-none",
  popupClassName: styles.ordersummary_overlay,
  numberOfPointsClassName: styles.ordersummary_popupPoints,
  labelClassName: styles.ordersummary_popupPointsLabel,
  valueClassName: styles.ordersummary_popupPointsValue,
  closeButtonClassName: styles.ordersummary_popupClose,
  voucherContainerClassName: `${styles.ordersummary_popupVoucherContainer} ${styles.ordersummary_popup}`,
  voucherFormContainerClassName: `${styles.ordersummary_voucherFormContainer} ${styles.ordersummary_popupFormContainer}`,
  voucherFormClassName: `${styles.ordersummary_voucherForm} ${styles.sirclo_form_row}`,
  voucherInputClassName: `form-control ${styles.sirclo_form_input} ${styles.ordersummary_popupFormInput}`,
  voucherSubmitButtonClassName: `btn ${styles.btn_primary} ${styles.ordersummary_popupFormButton}`,
  voucherListClassName: styles.ordersummary_popupVoucher,
  voucherListHeaderClassName: styles.ordersummary_popupVoucherTitle,
  voucherClassName: styles.ordersummary_popupVoucherItem,
  voucherDetailClassName: styles.ordersummary_popupVoucherDetail,
  voucherFooterClassName: styles.ordersummary_popupVoucherFooter,
  voucherApplyButtonClassName: `btn ${styles.btn_primary}`,
  pointsContainerClassName: styles.ordersummary_popup,
  expandedDivClassName: styles.ordersummary_expanded,
  expandedLabelClassName: styles.ordersummary_expandedLabel,
  expandedPriceClassName: styles.ordersummary_expandedPrice,
  expandButtonClassName: styles.ordersummary_expandedButton,
  voucherButtonAppliedClassName: styles.ordersummary_voucherAppliedButton,
  voucherAppliedIconClassName: styles.ordersummary_voucherAppliedIcon,
  voucherAppliedTextClassName: styles.ordersummary_voucherAppliedText,
  voucherButtonRemoveClassName: styles.ordersummary_voucherAppliedRemove,
  //point
  pointsButtonAppliedClassName: styles.ordersummary_pointsButtonApplied,
  pointsAppliedTextClassName: styles.ordersummary_pointsAppliedText,
  pointLabelClassName: styles.ordersummary_pointLabel,
  totalPointsClassName: styles.ordersummary_totalPoints,
  pointValueClassName: styles.ordersummary_pointValue,
  pointsFormContainerClassName: styles.ordersummary_pointsFormContainer,
  pointsFormClassName: styles.ordersummary_pointsForm,
  changePointsClassName: styles.ordersummary_buttonChangePoint,
  pointsInsufficientClassName: styles.ordersummary_pointsInsufficient,
  pointsSubmitButtonClassName: `btn ${styles.btn_primary} ${styles.btn_long} w-100 mt-4 mb-0`,
  pointsWarningClassName: styles.ordersummary_pointsWarning
};

const classesCartDetails = {
  className: styles.cartsummary,
  cartBodyClassName: styles.cartsummary_body,
  itemClassName: `${styles.cartItem} ${styles.cart_itemSummary} ${styles.cartsummary_item}`,
  itemImageClassName: `${styles.cartItem_image} ${styles.cartsummary_image}`,
  itemTitleClassName: styles.cartItem_detailSummary,
  titleClassName: styles.cartItem_detail_title,
  itemPriceClassName: styles.cartItem_priceCalculateSummary,
  itemRegularAmountClassName: "d-none",
  itemRegularPriceClassName: styles.cartItem_priceCalculatePriceSummary,
  itemSalePriceWrapperClassName: styles.cartItem_priceSalePriceWrapperSummary,
  itemSalePriceClassName: styles.cartItem_priceSalePriceSummary,
  itemAmountClassName: `${styles.cartItem_priceSummary} ${styles.cartsummary_priceSummary}`,
  itemQtyClassName: `${styles.cartsummary_qty__clean} ${styles.cartItem_qtySummary}`,
  itemDiscountNoteClassName: styles.cartItem_discountNoteSummary,
  itemRemoveClassName: styles.cartsummary_itemRemove,
  removeButtonClassName: "d-none",
}

const classesEmptyComponent = {
  emptyContainer: styles.cart__empty,
  emptyTitle: styles.cart__empty__title
}

const classesPlaceholderCartPlaceorder = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_cartPlaceorder}`,
  placeholderTitle: `${styles.placeholderItem} ${styles.placeholderItem_cartPlaceorderTitle}`
}

const classesPlaceholderCustomerDetail = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_customerDetail}`,
}

const classesPlaceholderShipping = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_shippingMethod}`,
}

type PrivateComponentPropsType = {
  children: any;
};

const PrivateRouteWrapper = ({ children }: PrivateComponentPropsType) => (
  <PrivateRoute
    page="shipping_method"
    loadingComponent={<LoaderPages />}
    redirectCart="products"
  >
    {children}
  </PrivateRoute>
)

const ShippingMethodPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const size = useWindowSize();

  const [openOrderSummary, setOpenOrderSummary] = useState<boolean>(true);
  const [showModalErrorAddToCart, setShowModalErrorAddToCart] = useState<boolean>(false);

  const toogleOrderSummary = () => setOpenOrderSummary(!openOrderSummary);
  const toogleErrorAddToCart = () => setShowModalErrorAddToCart(!showModalErrorAddToCart);

  const CustomerDetailHeader = ({ title }) => (
    <div className={styles.customer_infoHeader}>
      <div className={styles.customer_infoHeaderContainer}>
        <h3 className={styles.customer_infoHeaderTitle}>{title}</h3>
        <Info color="#767676" size="18" />
      </div>
      <Link href="/[lng]/place_order" as={`/${lng}/place_order`}>
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
        withFooter={false}
      >
        <SEO title="Shipping Method" />
        {showModalErrorAddToCart &&
          <Popup
            withHeader
            setPopup={toogleErrorAddToCart}
            mobileFull={false}
            classPopopBody
          >
            <div className={styles.shipping_popupError}>
              <h3 className={styles.shipping_popupErrorTitle}>{i18n.t("cart.errorSKUTitle")}</h3>
              <p className={styles.shipping_popupErrorDesc}>{i18n.t("cart.errorSKUDesc")} </p>
            </div>
          </Popup>
        }
        <div id="summaryCart" className={styles.shipping}>
          <div className="row mx-0">
            <div className="col-12 col-md-6 col-lg-7 p-0">
              <div className={styles.shipping_container}>
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-md-12 col-lg-10 offset-lg-2 p-0">
                      <div className={styles.shipping_heading}>
                        <div
                          className={styles.shipping_headingIcon}
                          onClick={() => Router.push("/[lng]/products", `/${lng}/products`)}
                        >
                          <ArrowLeft color="black" />
                        </div>
                        <h6>{i18n.t("placeOrder.checkOrder")}</h6>
                      </div>
                      <hr className={styles.shipping_line} />
                      <div className={styles.shipping_steps}>
                        <Breadcrumb currentStep={2} />
                      </div>
                      <hr className={`${styles.shipping_lineSecond}`} />
                    </div>
                    {size.width < 576 &&
                      <div className={styles.ordersummary_collapse}>
                        <div
                          className={styles.ordersummary_collapseHeading}
                          onClick={toogleOrderSummary}
                        >
                          <div className={styles.ordersummary_collapseTitle}>
                            <ShoppingCart color="white" />
                            <h6>{i18n.t("placeOrder.orderSummary")}</h6>
                          </div>
                          {openOrderSummary ?
                            <ChevronUp color="white" /> :
                            <ChevronDown color="white" />
                          }
                        </div>
                        <div
                          className={openOrderSummary ?
                            styles.ordersummary_collapseBody :
                            styles.ordersummary_collapseBodyClose
                          }
                        >
                          <CartSummary
                            cartProps={{
                              classes: classesCartDetails,
                              withoutQtyInput: false,
                              onErrorMsg: () => setShowModalErrorAddToCart(true),
                              loadingComponent: (
                                <div className="row">
                                  <div className="col-4 pr-0">
                                    <Placeholder classes={classesPlaceholderCartPlaceorder} withImage />
                                  </div>
                                  <div className="col-8">
                                    <Placeholder classes={classesPlaceholderCartPlaceorder} withImage />
                                  </div>
                                </div>
                              ),
                              emptyCartPlaceHolder: (
                                <EmptyComponent
                                  classes={classesEmptyComponent}
                                  title={i18n.t("cart.isEmpty")}
                                />
                              ),
                            }}
                            orderSummaryProps={{
                              classes: classesOrderSummary,
                              isAccordion: true,
                              page: "shipping_method",
                              currency: "IDR",
                              submitButtonLabel: i18n.t("orderSummary.placeOrder"),
                              onErrorMsg: () => setShowModalErrorAddToCart(true),
                              onErrorMsgCoupon: (msg) => toast.error(msg),
                              loadingComponent: (
                                <Placeholder classes={classesPlaceholderCartPlaceorder} withTitle />
                              ),
                              icons: {
                                voucher: <img src="/images/mdi_ticket-percent.svg" alt="icon" />,
                                voucherApplied: <img src="/images/mdi_ticket-percent.svg" alt="icon" />,
                                points: <img src="/images/mdi_star-circle.svg" alt="icon" />,
                                pointsApplied: <img src="/images/mdi_star-circle.svg" alt="icon" />,
                                close: <XIcon />,
                                collapse: <ChevronUp />,
                                expand: <ChevronDown />,
                                voucherRemoved: <XIcon />
                              }
                            }}
                          />
                        </div>
                      </div>
                    }
                    <div className="col-12 col-md-12 col-lg-8 offset-lg-2">
                      <CustomerDetail
                        classes={classesCustomerDetail}
                        isBilling={true}
                        contactInfoHeader={
                          <CustomerDetailHeader
                            title={i18n.t("shipping.contactInfo")}
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
                          />
                        }
                        loadingComponent={
                          <Placeholder classes={classesPlaceholderCustomerDetail} withImage />
                        }
                      />
                      <div className={styles.shippingmethod}>
                        <h3 className={styles.shippingmethod_title}>{i18n.t("account.shippingMethod")}</h3>
                        <ShippingMethods
                          classes={classesShippingMethod}
                          onErrorMsg={(msg) => toast.error(msg)}
                          mapCenterIcon={<Crosshair />}
                          loadingComponent={
                            <Placeholder classes={classesPlaceholderShipping} withList listMany={5} />
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Footer brand={brand} />
            </div>
            {size.width > 575 &&
              <div className="col-12 col-md-6 col-lg-5 p-0">
                <div className={styles.ordersummary}>
                  <div className={styles.ordersummary_heading}>
                    <ShoppingCart color="white" />
                    <h6>{i18n.t("placeOrder.orderSummary")}</h6>
                  </div>
                  <hr className={styles.ordersummary_line} />
                  <div className="container">
                    <div className="row">
                      <div className="col-12 col-md-12 col-lg-8">
                        <CartSummary
                          cartProps={{
                            classes: classesCartDetails,
                            withoutQtyInput: false,
                            onErrorMsg: (msg) => toast.error(msg),
                            loadingComponent: (
                              <div className="p-3">
                                <div className="row">
                                  <div className="col-4 pr-0">
                                    <Placeholder classes={classesPlaceholderCartPlaceorder} withImage />
                                  </div>
                                  <div className="col-8">
                                    <Placeholder classes={classesPlaceholderCartPlaceorder} withImage />
                                  </div>
                                </div>
                              </div>
                            ),
                            emptyCartPlaceHolder: (
                              <EmptyComponent
                                classes={classesEmptyComponent}
                                title={i18n.t("cart.isEmpty")}
                              />
                            ),
                          }}
                          orderSummaryProps={{
                            classes: {
                              ...classesOrderSummary,
                              submitButtonClassName: `btn ${styles.btn_white} ${styles.btn_long} ${styles.btn_full_width} mt-3`
                            },
                            isAccordion: true,
                            page: "shipping_method",
                            currency: "IDR",
                            submitButtonLabel: i18n.t("orderSummary.placeOrder"),
                            onErrorMsg: (msg) => toast.error(msg),
                            onErrorMsgCoupon: (msg) => toast.error(msg),
                            loadingComponent: (
                              <div className="px-3">
                                <Placeholder classes={classesPlaceholderCartPlaceorder} withTitle />
                              </div>
                            ),
                            icons: {
                              voucher: <img src="/images/mdi_ticket-percent.svg" alt="icon" />,
                              voucherApplied: <img src="/images/mdi_ticket-percent.svg" alt="icon" />,
                              points: <img src="/images/mdi_star-circle.svg" alt="icon" />,
                              pointsApplied: <img src="/images/mdi_star-circle.svg" alt="icon" />,
                              close: <XIcon />,
                              collapse: <ChevronUp />,
                              expand: <ChevronDown />,
                              voucherRemoved: <XIcon />
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </Layout>
    </PrivateRouteWrapper>
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

export default ShippingMethodPage;
