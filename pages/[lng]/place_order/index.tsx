import {
  FC,
  useState,
  useEffect
} from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import Router from "next/router";
import {
  PlaceOrderForm,
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
  Calendar,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Eye,
  EyeOff,
  Crosshair
} from "react-feather";
import { toast } from "react-toastify";
import styles from "public/scss/pages/Placeorder.module.scss";

const Popup = dynamic(() => import("components/Popup/Popup"));
const Placeholder = dynamic(() => import("components/Placeholder"));
const LoaderPages = dynamic(() => import("components/Loader/LoaderPages"));

const placeOrderClasses = {
  placeOrderClassName: styles.placeorder,
  formClassName: styles.placeorder_form,
  formGroupClassName: `mb-3 ${styles.sirclo_form_row} sirclo_form__city`,
  inputClassName: `form-control ${styles.sirclo_form_input} ${styles.placeorder_form_input}`,
  billingAddressHeaderClassName: styles.placeorder_header,
  billingAddressLabelClassName: styles.placeorder_formError,
  errorMessageClassName: styles.placeorder_formError__label,
  checkoutAsMemberClassName: styles.placeorder_header__label,
  loginLabelClassName: styles.placeorder_header__login,
  signupContainerClassName: styles.placeorder_header_labelRegister,
  shippingCheckboxContainerClassName: styles.placeorder_shipping,
  shippingCheckboxTitleClassName: "d-none",
  shippingCheckboxClassName: styles.placeorder_shipping__checkbox,
  shippingCheckboxLabelClassName: styles.placeorder_shipping__label,
  passwordStrengthBarClassName: styles.passwordBar,
  passwordStrengthBarContainerClassName: styles.passwordValidation,
  passwordCriteriaListClassName: `${styles.formPassword} d-none`,
  passwordCriteriaClassName: styles.formPasswordList,
  datePickerInputClassName: "date-picker__input",
  datePickerCalendarClassName: "date-picker__calendar",
  mapNoteClassName: styles.placeorder_mapNote,
  mapSelectAreaClassName: styles.placeorder_mapChooseLocation,
  mapAreaClassName: styles.placeorder_mapArea,
  mapPopupClassName: styles.placeorder_mapPopup,
  mapPopupBackgroundClassName: styles.placeorder_mapPopupContainer,
  mapClassName: styles.placeorder_mapPopupMaps,
  mapHeaderWrapperClassName: styles.placeorder_mapPopupHeader,
  mapHeaderTitleClassName: styles.placeorder_mapPopupHeaderTitle,
  mapHeaderCloseButtonClassName: styles.placeorder_mapPopupClose,
  mapHeaderNoteClassName: styles.placeorder_mapPopupNote,
  mapLabelAddressClassName: styles.placeorder_mapPopupLabelAddress,
  mapCenterButtonClassName: styles.placeorder_mapPopupCenterButton,
  mapButtonFooterClassName: `btn ${styles.btn_primary} ${styles.btn_long} d-block mx-auto my-3`
};

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
  emptyContainer: styles.cart_empty,
  emptyTitle: styles.cart_emptyTitle
}

const classesPlaceholderCartPlaceorder = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_cartPlaceorder}`,
  placeholderTitle: `${styles.placeholderItem} ${styles.placeholderItem_cartPlaceorderTitle}`
}

const classesPlaceholderForm = {
  placeholderList: `${styles.placeholderItem} ${styles.placeholderItem_placeorderForm}`
}

type PrivateComponentPropsType = {
  children: any;
};

const PrivateRouteWrapper = ({ children }: PrivateComponentPropsType) => (
  <PrivateRoute
    page="place_order"
    loadingComponent={<LoaderPages />}
    redirectCart="products"
  >
    {children}
  </PrivateRoute>
)

const PlaceOrderPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const size = useWindowSize();

  const [openOrderSummary, setOpenOrderSummary] = useState<boolean>(true);
  const [showModalErrorAddToCart, setShowModalErrorAddToCart] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = 'unset';
  }, [])

  const toogleOrderSummary = () => setOpenOrderSummary(!openOrderSummary);
  const toogleErrorAddToCart = () => setShowModalErrorAddToCart(!showModalErrorAddToCart);

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
        <SEO title="Place Order" />
        {showModalErrorAddToCart &&
          <Popup
            withHeader
            setPopup={toogleErrorAddToCart}
            mobileFull={false}
            classPopopBody
          >
            <div className={styles.placeorder_popupError}>
              <h3 className={styles.placeorder_popupErrorTitle}>{i18n.t("cart.errorSKUTitle")}</h3>
              <p className={styles.placeorder_popupErrorDesc}>{i18n.t("cart.errorSKUDesc")} </p>
            </div>
          </Popup>
        }
        <div id="summaryCart" className={styles.placeorder}>
          <div className="row mx-0">
            <div className="col-12 col-md-6 col-lg-7 p-0">
              <div className={styles.placeorder_container}>
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-md-12 col-lg-10 offset-lg-2 p-0">
                      <div className={styles.placeorder_heading}>
                        <div
                          className={styles.placeorder_headingIcon}
                          onClick={() => Router.push("/[lng]/products", `/${lng}/products`)}
                        >
                          <ArrowLeft color="black" />
                        </div>
                        <h6>{i18n.t("placeOrder.checkOrder")}</h6>
                      </div>
                      <hr className={styles.placeorder_line} />
                      <div className={styles.placeorder_steps}>
                        <Breadcrumb currentStep={1} />
                      </div>
                      <hr className={`${styles.placeorder_lineSecond}`} />
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
                              thumborSetting: {
                                width: 200,
                                format: "webp",
                                quality: 85,
                              },
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
                              )
                            }}
                            orderSummaryProps={{
                              classes: classesOrderSummary,
                              isAccordion: true,
                              page: "place_order",
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
                    <div className="col-12 col-md-12 col-lg-8 offset-lg-2 mt-4">
                      <PlaceOrderForm
                        classes={placeOrderClasses}
                        onErrorMsg={(msg) => toast.error(msg)}
                        passwordViewIcon={<Eye />}
                        passwordHideIcon={<EyeOff />}
                        passwordFulfilledCriteriaIcon={<CheckCircle color="green" size={16} />}
                        passwordUnfulfilledCriteriaIcon={<CheckCircle color="gray" size={16} />}
                        datePickerCalendarIcon={<Calendar />}
                        mapButtonCloseIcon={<XIcon />}
                        mapCenterIcon={<Crosshair />}
                        loadingComponent={
                          <Placeholder classes={classesPlaceholderForm} withList listMany={5} />
                        }
                      />
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
                            currency: "IDR",
                            classes: classesCartDetails,
                            itemRedirectPathPrefix: "/product",
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
                            thumborSetting: {
                              width: 250,
                              format: "webp",
                              quality: 85,
                            },
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
                            page: "place_order",
                            currency: "IDR",
                            submitButtonLabel: i18n.t("orderSummary.placeOrder"),
                            continueShoppingRoute: "products",
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
                            },
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

export default PlaceOrderPage;
