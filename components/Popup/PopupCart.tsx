import { FC, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import {
  OrderSummary,
  CartDetails,
  isProductRecommendationAllowed,
  useI18n
} from "@sirclo/nexus";
import EmptyComponent from "../EmptyComponent/EmptyComponent";
import useOutsideClick from "lib/useOutsideClick";
import useWindowSize from "lib/useWindowSize";
import {
  X,
  Trash,
  ArrowLeftCircle,
  ArrowRightCircle
} from "react-feather";
import { toast } from "react-toastify";
import styles from "public/scss/components/Popup.module.scss";

const Popup = dynamic(() => import("components/Popup/Popup"));
const Products = dynamic(() => import("@sirclo/nexus/lib/component/products"));
const Placeholder = dynamic(() => import("components/Placeholder"));

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
  cartFooterClassName: `${styles.cartFooter} ${styles.sirclo_form_row}`,
  cartFooterTitleClassName: styles.cartFooter_title,
  cartFooterTextareaClassName: `form-control ${styles.sirclo_form_input} ${styles.cartFooter_input} py-2`,
}

const classesOrderSummary = {
  containerClassName: `row ${styles.summarycart}`,
  headerClassName: `col-12 p-0 ${styles.summarycart_header}`,
  voucherButtonClassName: `${styles.summarycart_headerFeatures} order-2`,
  voucherIconClassName: styles.summarycart_headerFeatures__icon,
  voucherTextClassName: styles.summarycart_headerFeatures__label,
  pointsButtonClassName: `${styles.summarycart_headerFeatures} order-1`,
  pointsIconClassName: styles.summarycart_headerFeatures__icon,
  pointsTextClassName: styles.summarycart_headerFeatures__label,
  subTotalClassName: `col-6 ${styles.summarycart_subtotal}`,
  subTotalTextClassName: styles.summarycart_subtotal__label,
  subTotalPriceClassName: styles.summarycart_subtotal__price,
  footerClassName: `col-6 ${styles.summarycart_footer} pl-0`,
  submitButtonClassName: `col-12 order-1 px-0 m-0 btn ${styles.btn_primary} ${styles.btn_long}`,
  continueShoppingClassName: "d-none",
  //Popup
  popupClassName: styles.summarycart_overlay,
  voucherContainerClassName: styles.summarycart_popup,
  numberOfPointsClassName: styles.summarycart_popupPoints,
  labelClassName: styles.summarycart_popupPoints__label,
  valueClassName: styles.summarycart_popupPoints__value,
  closeButtonClassName: styles.summarycart_popupClose,
  voucherFormContainerClassName: styles.summarycart_popupForm__container,
  voucherFormClassName: `form-inline ${styles.sirclo_form_row} ${styles.summarycart_popupForm}`,
  voucherInputClassName: `form-control ${styles.sirclo_form_input} ${styles.summarycart_popupForm__input}`,
  voucherSubmitButtonClassName: `btn ${styles.btn_primary} ${styles.summarycart_popupForm__button}`,
  voucherListClassName: styles.summarycart_popupVoucher,
  voucherListHeaderClassName: styles.summarycart_popupVoucherTitle,
  voucherClassName: styles.summarycart_popupVoucherItem,
  voucherDetailClassName: styles.summarycart_popupVoucherDetail,
  voucherFooterClassName: styles.summarycart_popupVoucherFooter,
  voucherApplyButtonClassName: `btn ${styles.btn_primary}`,
  pointsContainerClassName: styles.summarycart_popup,
  voucherButtonAppliedClassName: `${styles.summarycart_headerFeatures} order-2`,
  voucherAppliedIconClassName: `${styles.sumamrycart_headerFeatures__icon} mr-2`,
  voucherAppliedTextClassName: styles.summarycart_headerFeatures__label,
  voucherButtonRemoveClassName: styles.summarycart_voucherRemove
};

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
};

const classesPlaceholderProduct = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_product__card}`,
};

const classesEmptyComponent = {
  emptyContainer: styles.cart_empty,
  emptyTitle: styles.cart_emptyTitle
}

const classesPlaceholderCart = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_product__cart}`
};

const classesPlaceholderOrderSummary = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_product__orderSummary}`
}

const paginationClasses = {
  pagingClassName: styles.cart_crossSellPaggination,
  itemClassName: styles.cart_crossSellPagginationItem
}

export type PopupPropsType = {
  setPopup: any,
  popupTitle: string,
  lng: any,
}

const PopupCart: FC<PopupPropsType> = ({
  setPopup,
  popupTitle,
  lng
}) => {
  const i18n: any = useI18n();
  const size: any = useWindowSize();

  const cartOuterDiv = useRef<HTMLDivElement>(null);
  const [showModalErrorAddToCart, setShowModalErrorAddToCart] = useState<boolean>(false);
  const allowedProductRecommendation = isProductRecommendationAllowed();
  const [invalidMsg, setInvalidMsg] = useState<string>("");
  const [SKUs, setSKUs] = useState<Array<string>>(null);
  const [pageInfo, setPageInfo] = useState({
    totalItems: null,
  })

  const toogleErrorAddToCart = () => setShowModalErrorAddToCart(!showModalErrorAddToCart);

  useOutsideClick(cartOuterDiv, () => setPopup(false));

  return (
    <>
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
      <div className={styles.popup_overlay}>
        <div ref={cartOuterDiv} className={styles.popup_containerFull}>
          <div className={styles.popup_header}>
            <h6>{popupTitle}</h6>
            <span
              className={styles.close_button}
              onClick={() => setPopup(false)}
            >
              <X className={styles.close_icon} />
            </span>
          </div>
          <div id="popupCart" className={`${styles.popup_body} ${styles.popup_bodyFull}`}>
            {invalidMsg !== "" &&
              <div className={styles.errorCart}>
                {invalidMsg}
              </div>
            }
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
            {allowedProductRecommendation && pageInfo.totalItems !== 0 && SKUs !== null &&
              <div className={`row ${styles.cart_crossSell}`}>
                <div className={`col-12 ${styles.cart_crossSellHeader}`}>
                  <h6 className={styles.cart_crossSellTitle}>{i18n.t("product.related")}</h6>
                </div>
                <Products
                  SKUs={SKUs}
                  classes={classesCrosselProducts}
                  paginationClasses={paginationClasses}
                  getCrossSellPageInfo={(pageInfo: any) => setPageInfo({ totalItems: pageInfo.totalItems })}
                  itemPerPage={2}
                  pathPrefix="product"
                  newPagination
                  lazyLoadedImage={false}
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
              </div>
            }
          </div>
          <div className={styles.popup_footer}>
            <OrderSummary
              classes={classesOrderSummary}
              currency="IDR"
              submitButtonLabel={i18n.t("orderSummary.placeOrder")}
              continueShoppingLabel={i18n.t("orderSummary.viewCart")}
              page={"cart"}
              continueShoppingRoute="cart"
              onErrorMsg={() => setShowModalErrorAddToCart(true)}
              onErrorMsgCoupon={(msg) => toast.error(msg)}
              icons={{
                voucher: <img src="/images/mdi_ticket-percent-black.svg" alt="icon" />,
                points: <img src="/images/mdi_star-circle-black.svg" alt="icon" />,
                close: <X />,
                voucherRemoved: <X />,
                voucherApplied: <img src="/images/mdi_ticket-percent-black.svg" alt="icon" />
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
        </div>
      </div>
    </>
  )
}

export default PopupCart;