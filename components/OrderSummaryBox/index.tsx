/* library package */
import { FC, useState } from 'react'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import {
  FiChevronDown,
  FiChevronUp,
  FiX
} from 'react-icons/fi'
import {
  OrderSummary,
  CartDetails
} from '@sirclo/nexus'
/* components */
import Placeholder from 'components/Placeholder'
import Loader from 'components/Loader/Loader'
const Popup = dynamic(() => import('components/Popup'))
/* styles */
import styles from 'public/scss/components/OrderSummaryBox.module.scss'

const classesOrderSummary = {
  containerClassName: styles.orderSummary,
  continueShoppingClassName: styles.orderSummary_button__continueShopping,
  footerClassName: styles.orderSummary_footer,
  headerClassName: styles.orderSummary_header,
  submitButtonClassName: styles.orderSummary_button__submit,
  subTotalClassName: styles.orderSummary_subTotal,
  expandButtonClassName: styles.orderSummary_button__expand,
  expandedDivClassName: styles.orderSummary_expanded,
  /* pop up */
  popupClassName: styles.orderSummary_popup,
  closeButtonClassName: styles.orderSummary_closeButton,
  popupBackgroundClassName: styles.orderSummary_popupBackground,
  voucherContainerClassName: styles.orderSummary_voucherContainer,
  voucherFormContainerClassName: styles.orderSummary_voucherFormContainer,
  voucherListClassName: styles.orderSummary_voucherList,
  /* voucher */
  voucherButtonClassName: styles.orderSummary_voucherButton,
  voucherIconClassName: styles.orderSummary_voucherIcon,
  voucherTextClassName: styles.orderSummary_voucherText,
  voucherFormClassName: styles.orderSummary_voucherForm,
  voucherInputClassName: styles.orderSummary_voucherInput,
  voucherSubmitButtonClassName: styles.orderSummary_voucherSubmitButton,
  voucherListHeaderClassName: styles.orderSummary_voucherListHeader,
  voucherClassName: styles.orderSummary_voucher,
  voucherFooterClassName: styles.orderSummary_voucherFooter,
  voucherApplyButtonClassName: styles.orderSummary_voucherApplyButton,
  voucherDetailClassName: styles.orderSummary_voucherDetail,
  voucherButtonAppliedClassName: styles.orderSummary_voucherButtonApplied,
  voucherAppliedIconClassName: styles.orderSummary_voucherAppliedIcon,
  voucherAppliedTextClassName: styles.orderSummary_voucherAppliedText,
  voucherButtonRemoveClassName: styles.orderSummary_voucherButtonRemove,
  /* point */
  pointsButtonClassName: styles.orderSummary_voucherButton,
  pointsIconClassName: styles.orderSummary_voucherIcon,
  pointsTextClassName: styles.orderSummary_voucherText,
  pointsContainerClassName: styles.orderSummary_pointsContainer,
  changePointsClassName: styles.orderSummary_pointsChange,
  numberOfPointsClassName: styles.orderSummary_numberOfPoints,
  pointLabelClassName: 'd-none',
  pointsFormContainerClassName: styles.orderSummary_pointsFormContainer,
  pointsWarningClassName: styles.orderSummary_pointsWarning,
  pointsFormClassName: styles.orderSummary_pointsForm,
  totalPointsClassName: styles.orderSummary_totalPoints,
  pointValueClassName: styles.orderSummary_pointValue,
  pointsSubmitButtonClassName: styles.orderSummary_pointsSubmitButton,
  pointsInsufficientClassName: styles.orderSummary_pointsInsufficient,
  pointsButtonAppliedClassName: styles.orderSummary_voucherButtonApplied,
  pointsAppliedTextClassName: styles.orderSummary_voucherAppliedText,
  pointButtonRemoveClassName: styles.orderSummary_voucherButtonRemove,
}

const classesCartDetails = {
  className: `${styles.cart} ${styles.orderSummary_cartDetails}`,
  cartHeaderClassName: styles.cartHeader,
  cartBodyClassName: styles.cartBody,
  itemClassName: styles.cartItem,
  itemImageClassName: styles.cartItem_image,
  itemTitleClassName: styles.cartItem_titleWrapper,
  titleClassName: styles.cartItem_title,
  selectedVariantContainerClassName: styles.cartItem_variantWrapper,
  selectedVariantClassName: styles.cartItem_variant,
  itemPriceClassName: styles.orderSummary_price,
  itemRegularPriceClassName: styles.cartItem_price__regular,
  itemSalePriceClassName: styles.cartItem_price__sale,
  itemSalePriceWrapperClassName: styles.cartItem_priceWrapper,
  itemQtyClassName: `${styles.cartItem_qty} ${styles.orderSummary_qty}`,
  itemAmountClassName: styles.cartItem_amount,
  itemRemoveClassName: styles.cartItem_remove,
  itemEditClassName: styles.cartItem_edit,
  qtyBoxClassName: `${styles.cartItem_qtyBox} ${styles.orderSummary_qtyBox}`,
  changeQtyButtonClassName: 'd-none',
  removeButtonClassName: 'd-none',
  cartFooterClassName: 'd-none',
  cartFooterTitleClassName: styles.cartFooter_title,
  cartFooterTextareaClassName: styles.cartFooter_textarea,
}


const classesCartPlaceholder = {
  placeholderList: styles.cartItem_placeholder
}

type iProps = {
  i18n: any
  page: "cart"
  | "place_order"
  | "shipping_method"
  | "payment_method"
  withCartDetails?: boolean
  withOrderSummary?: boolean
  titleSubmit?: string
  totalCrossSell?: number
}

const OrderSummaryComponent: FC<iProps> = ({
  i18n,
  page,
  withCartDetails = true,
  withOrderSummary = true,
  titleSubmit = i18n.t("orderSummary.placeOrder"),
  totalCrossSell = 0
}) => {
  const [showModalErrorAddToCart, setShowModalErrorAddToCart] = useState<boolean>(false)

  return (
    <>
      {withCartDetails &&
        <>
          <h2 className={styles.orderSummary_cartDetailsTitle}>{i18n.t("orderSummary.yourCart")}</h2>
          <CartDetails
            imageHeaderText={i18n.t("cart.item")}
            nameHeaderText={i18n.t("cart.product")}
            currency="IDR"
            withSeparatedVariant={true}
            itemRedirectPathPrefix={`product`}
            onErrorMsg={(msg) => toast.error(msg)}
            classes={classesCartDetails}
            isEditable={false}
            editIcon={<div>{i18n.t("cart.edit")}</div>}
            removeIcon={<div>{i18n.t("cart.remove")}</div>}
            loadingComponent={
              <Placeholder
                classes={classesCartPlaceholder}
                withList
                listMany={1}
              />
            }
          />
        </>
      }
      {withOrderSummary &&
        <>
          <OrderSummary
            page={page}
            currency="IDR"
            classes={{
              ...classesOrderSummary,
              containerClassName: `${styles.orderSummary} ${totalCrossSell === 0 && styles.orderSummary_extras}`
            }}
            submitButtonLabel={titleSubmit}
            continueShoppingLabel={i18n.t("orderSummary.continueShopping")}
            onErrorMsg={() => setShowModalErrorAddToCart(!showModalErrorAddToCart)}
            onErrorMsgCoupon={(msg) => toast.error(msg)}
            isAccordion
            onAddressInvalid={(e) => toast.error(e)}
            loadingComponent={<Loader />}
            icons={{
              voucher: <img src="/icons/voucher.svg" alt="voucher" />,
              points: <img src="/icons/point.svg" alt="voucher" />,
              close: <FiX size={24} color="#444444" />,
              voucherApplied: <img src="/icons/voucher.svg" alt="voucher" />,
              voucherRemoved: <FiX color="#CC4534" size={16} />,
              pointsApplied: <img src="/icons/point.svg" alt="voucher" />,
              expand: <FiChevronUp />,
              collapse: <FiChevronDown />,
            }}
          />
          {showModalErrorAddToCart &&
            <Popup
              title={i18n.t("product.sort")}
              withCloseButton
              visibleState={showModalErrorAddToCart}
              setVisibleState={setShowModalErrorAddToCart}
              popupSize={`fluid`}
              withHeader={false}
            >
              <div className={styles.orderSummary_errorCartContainer}>
                <div className={styles.orderSummary_errorCartInner}>
                  <h4>{i18n.t("cart.errorSKUTitle")}</h4>
                  <p>{i18n.t("cart.errorSKUDesc")}</p>
                  <button
                    onClick={() => setShowModalErrorAddToCart(false)}
                    className={styles.btn_long}
                  >
                    {i18n.t("error.buttonBack")}
                  </button>
                </div>
              </div>
            </Popup>
          }
        </>
      }
    </>
  )
}

export default OrderSummaryComponent
