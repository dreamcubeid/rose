/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import { parseCookies } from 'lib/parseCookies'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import {
  X as XIcon,
  Trash,
  ArrowLeftCircle,
  ChevronDown,
  ChevronUp,
  ArrowRightCircle
} from 'react-feather'
import { toast } from 'react-toastify'
import {
  CartDetails,
  OrderSummary,
  isProductRecommendationAllowed,
  Products,
  useI18n
} from '@sirclo/nexus'

/* library template */
import { useBrand } from 'lib/useBrand'
import useWindowSize from 'lib/useWindowSize'

/* components */
import Layout from 'components/Layout/Layout'
import EmptyComponent from 'components/EmptyComponent/EmptyComponent'
import Placeholder from 'components/Placeholder'

const Popup = dynamic(() => import('components/Popup/Popup'))

import styles from 'public/scss/pages/Cart.module.scss'
import stylesOrderSummary from 'public/scss/components/OrderSummaryV2.module.scss'

const classesCartDetails = {
  className: styles.cart,
  cartHeaderClassName: "d-none",
  itemClassName: styles.cartItem,
  itemImageClassName: styles.cartItem_image,
  itemTitleClassName: styles.cartItem_detail,
  itemPriceClassName: styles.cartItem_priceCalculate,
  itemRegularPriceClassName: styles.cartItem_priceRegular,
  itemSalePriceClassName: styles.cartItem_priceSale,
  itemSalePriceWrapperClassName: styles.cartItem_priceSaleWrapper,
  itemDiscountNoteClassName: styles.cartItem_discNote,
  itemRegularAmountClassName: "d-none",
  headerQtyClassName: "d-none",
  itemQtyClassName: styles.cartItem_qty,
  qtyBoxClassName: styles.cartItem_qtyBox,
  itemAmountClassName: styles.cartItem_price,
  itemEditClassName: "d-none",
  itemRemoveClassName: styles.cartItem_remove,
  cartFooterClassName: `${styles.cart_cartFooter} ${styles.sirclo_form_row} w-100`,
  cartFooterTitleClassName: styles.cartFooter_title,
  cartFooterTextareaClassName: `form-control ${styles.sirclo_form_input} ${styles.cartFooter_input} py-2`,
}

const classesCrosselProducts = {
  productContainerClassName: `col-6 mb-0 products_list ${styles.product}`,
  stickerContainerClassName: styles.product_sticker,
  outOfStockLabelClassName: `${styles.product_stickerLabel} ${styles.product_stickerLabel__outofstock}`,
  saleLabelClassName: `${styles.product_stickerLabel} ${styles.product_stickerLabel__sale}`,
  comingSoonLabelClassName: `${styles.product_stickerLabel} ${styles.product_stickerLabel__comingsoon}`,
  openOrderLabelClassName: `${styles.product_stickerLabel} ${styles.product_stickerLabel__openorder}`,
  preOrderLabelClassName: `${styles.product_stickerLabel} ${styles.product_stickerLabel__preorder}`,
  newLabelClassName: `${styles.product_stickerLabel} ${styles.product_stickerLabel__new}`,
  productImageContainerClassName: styles.product_link,
  productImageClassName: styles.product_link__image,
  productLabelContainerClassName: styles.product_label,
  productTitleClassName: styles.product_label__title,
  productPriceClassName: styles.product_labelPrice,
  salePriceClassName: styles.product_labelPrice__sale,
  priceClassName: styles.product_labelPrice__price,
}

const classesOrderSummary = {
  containerClassName: stylesOrderSummary.container,
  headerClassName: stylesOrderSummary.header,
  voucherButtonClassName: stylesOrderSummary.voucherButton,
  voucherIconClassName: stylesOrderSummary.voucherIcon,
  voucherTextClassName: stylesOrderSummary.voucherText,
  pointsButtonClassName: stylesOrderSummary.pointsButton,
  pointsIconClassName: stylesOrderSummary.pointsIcon,
  pointsTextClassName: stylesOrderSummary.pointsText,
  subTotalClassName: stylesOrderSummary.subTotal,
  subTotalTextClassName: stylesOrderSummary.subTotalText,
  subTotalPriceClassName: stylesOrderSummary.subTotalPrice,
  footerClassName: stylesOrderSummary.footer,
  submitButtonClassName: stylesOrderSummary.submitButton,
  continueShoppingClassName: stylesOrderSummary.continueShopping,

  //Popup
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
}

const paginationClasses = {
  pagingClassName: styles.cart_crossSellPaggination,
  itemClassName: styles.cart_crossSellPagginationItem
}

const classesEmptyComponent = {
  emptyContainer: styles.cart_empty,
  emptyTitle: styles.cart_emptyTitle
}

const classesPlaceholderOrderSummary = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_product__orderSummary}`
}

const classesPlaceholderProduct = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_product__card}`,
}

const classesPlaceholderCart = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_product__cart}`
}

const Cart: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const i18n: any = useI18n()
  const size: any = useWindowSize()
  const allowedProductRecommendation = isProductRecommendationAllowed()

  const [SKUs, setSKUs] = useState<Array<string>>(null)
  const [showModalErrorAddToCart, setShowModalErrorAddToCart] = useState<boolean>(false)
  const [invalidMsg, setInvalidMsg] = useState<string>('')
  const [pageInfo, setPageInfo] = useState({
    itemPerPage: null,
  })

  const toogleErrorAddToCart = () => setShowModalErrorAddToCart(!showModalErrorAddToCart);

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      titleHeader={i18n.t("cart.title")}
      withCart={false}
      withFooter={false}
      customClassName={`${styles.cart_layout} ${styles.main__noNavbar}`}
    >
      {invalidMsg !== "" &&
        <div className={styles.cartError}>
          <div className={styles.cartError_inner}>
            {invalidMsg}
          </div>
        </div>
      }
      <section className={styles.cart}>
        <div className={styles.cart_container}>
          <h3>{i18n.t("cart.title")}</h3>
          <CartDetails
            getSKU={(SKUs: any) => setSKUs(SKUs)}
            classes={classesCartDetails}
            itemRedirectPathPrefix="product"
            isEditable={true}
            removeIcon={<Trash />}
            onErrorMsg={() => setShowModalErrorAddToCart(true)}
            onInvalidMsg={(msg) => setInvalidMsg(msg)}
            thumborSetting={{
              width: size.width < 768 ? 200 : 400,
              format: "webp",
              quality: 85,
            }}
            loadingComponent={
              <div className="row">
                <div className="col-4 pr-0">
                  <Placeholder classes={classesPlaceholderCart} withImage />
                </div>
                <div className="col-8">
                  <Placeholder classes={classesPlaceholderCart} withImage />
                </div>
                <div className="col-4 pr-0">
                  <Placeholder classes={classesPlaceholderCart} withImage />
                </div>
                <div className="col-8">
                  <Placeholder classes={classesPlaceholderCart} withImage />
                </div>
              </div>
            }
            emptyCartPlaceHolder={
              <EmptyComponent
                classes={classesEmptyComponent}
                title={i18n.t("cart.isEmpty")}
                button={
                  <button
                    className={`${styles.btn} ${styles.btn_primary} ${styles.btn_long} my-1`}
                    onClick={() => Router.push(
                      "/[lng]/products",
                      `/${lng}/products`
                    )}
                  >{i18n.t("cart.shopNow")}</button>
                }
              />
            }
          />
          {allowedProductRecommendation && pageInfo.itemPerPage !== 10 && SKUs !== null &&
            <div className={`row ${styles.cart_crossSell}`}>
              <div className={`col-12 ${styles.cart_crossSellHeader}`}>
                <h6 className={styles.cart_crossSellTitle}>{i18n.t("product.related")}</h6>
              </div>
              <LazyLoadComponent>
                <Products
                  SKUs={SKUs}
                  classes={classesCrosselProducts}
                  paginationClasses={paginationClasses}
                  getCrossSellPageInfo={setPageInfo as any}
                  itemPerPage={2}
                  pathPrefix="product"
                  lazyLoadedImage={false}
                  newPagination
                  buttonPrev={<ArrowLeftCircle />}
                  buttonNext={<ArrowRightCircle />}
                  loadingComponent={
                    <>
                      <div className="col-6">
                        <Placeholder
                          classes={classesPlaceholderProduct}
                          withImage={true}
                        />
                      </div>
                      <div className="col-6">
                        <Placeholder
                          classes={classesPlaceholderProduct}
                          withImage={true}
                        />
                      </div>
                    </>
                  }
                  thumborSetting={{
                    width: size.width < 768 ? 350 : 600,
                    format: "webp",
                    quality: 85
                  }}
                />
              </LazyLoadComponent>
            </div>
          }
          <OrderSummary
            classes={classesOrderSummary}
            currency="IDR"
            submitButtonLabel={i18n.t("orderSummary.placeOrder")}
            continueShoppingLabel={i18n.t("orderSummary.viewCart")}
            page={"cart"}
            continueShoppingRoute="cart"
            isAccordion={true}
            onErrorMsg={() => setShowModalErrorAddToCart(true)}
            onErrorMsgCoupon={(msg) => toast.error(msg)}
            icons={{
              voucher: <img src="/images/mdi_ticket-percent-black.svg" alt="icon" />,
              voucherApplied: <img src="/images/mdi_ticket-percent.svg" alt="icon" />,
              points: <img src="/images/mdi_star-circle.svg" alt="icon" />,
              pointsApplied: <img src="/images/mdi_star-circle.svg" alt="icon" />,
              close: <XIcon />,
              collapse: <ChevronUp />,
              expand: <ChevronDown />,
              voucherRemoved: <XIcon />
            }}
            loadingComponent={
              <div className="row m-3 mb-0">
                <div className="col-6 pl-0">
                  <Placeholder classes={classesPlaceholderOrderSummary} withImage />
                </div>
                <div className="col-6 px-0">
                  <Placeholder classes={classesPlaceholderOrderSummary} withImage />
                </div>
              </div>
            }
          />
        </div>
      </section>
      {showModalErrorAddToCart &&
        <Popup
          withHeader
          setPopup={toogleErrorAddToCart}
          mobileFull={false}
          classPopopBody
        >
          <div className={styles.popup_popupError}>
            <h3 className={styles.popup_popupErrorTitle}>{i18n.t("cart.errorSKUTitle")}</h3>
            <p className={styles.popup_popupErrorDesc}>{i18n.t("cart.errorSKUDesc")} </p>
          </div>
        </Popup>
      }
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  )

  if (process.env.IS_PROD !== "false") {
    const cookies = parseCookies(req)
    res.writeHead(307, {
      Location: `/${cookies.ACTIVE_LNG || "id"}`,
    });
    res.end()
  }

  const brand = await useBrand(req)

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ''
    }
  }
}

export default Cart