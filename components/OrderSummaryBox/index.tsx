/* library package */
import { FC } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import {
  FiChevronDown,
  FiChevronUp,
  FiX,
  FiChevronLeft
} from 'react-icons/fi'
import {
  OrderSummary,
  CartDetails
} from '@sirclo/nexus'
/* components */
import Loader from 'components/Loader/Loader'
/* styles */
import styleOrderSummary from 'public/scss/components/OrderSummaryBox.module.scss'

const classesOrderSummary = {
  containerClassName: styleOrderSummary.orderSummary,
  continueShoppingClassName: styleOrderSummary.orderSummary_button__continueShopping,
  footerClassName: styleOrderSummary.orderSummary_footer,
  headerClassName: styleOrderSummary.orderSummary_header,
  submitButtonClassName: styleOrderSummary.orderSummary_button__submit,
  subTotalClassName: styleOrderSummary.orderSummary_subTotal,
  expandButtonClassName: styleOrderSummary.orderSummary_button__expand,
  expandedDivClassName: styleOrderSummary.orderSummary_expanded,
  /* pop up */
  popupClassName: styleOrderSummary.orderSummary_popup,
  closeButtonClassName: styleOrderSummary.orderSummary_closeButton,
  popupBackgroundClassName: styleOrderSummary.orderSummary_popupBackground,
  voucherContainerClassName: styleOrderSummary.orderSummary_voucherContainer,
  voucherFormContainerClassName: styleOrderSummary.orderSummary_voucherFormContainer,
  voucherListClassName: styleOrderSummary.orderSummary_voucherList,
  /* voucher */
  voucherButtonClassName: styleOrderSummary.orderSummary_voucherButton,
  voucherIconClassName: styleOrderSummary.orderSummary_voucherIcon,
  voucherTextClassName: styleOrderSummary.orderSummary_voucherText,
  voucherFormClassName: styleOrderSummary.orderSummary_voucherForm,
  voucherInputClassName: styleOrderSummary.orderSummary_voucherInput,
  voucherSubmitButtonClassName: styleOrderSummary.orderSummary_voucherSubmitButton,
  voucherListHeaderClassName: styleOrderSummary.orderSummary_voucherListHeader,
  voucherClassName: styleOrderSummary.orderSummary_voucher,
  voucherFooterClassName: styleOrderSummary.orderSummary_voucherFooter,
  voucherApplyButtonClassName: styleOrderSummary.orderSummary_voucherApplyButton,
  voucherDetailClassName: styleOrderSummary.orderSummary_voucherDetail,
  voucherButtonAppliedClassName: styleOrderSummary.orderSummary_voucherButtonApplied,
  voucherAppliedIconClassName: styleOrderSummary.orderSummary_voucherAppliedIcon,
  voucherAppliedTextClassName: styleOrderSummary.orderSummary_voucherAppliedText,
  voucherButtonRemoveClassName: styleOrderSummary.orderSummary_voucherButtonRemove,
  /* point */
  pointsButtonClassName: styleOrderSummary.orderSummary_voucherButton,
  pointsIconClassName: styleOrderSummary.orderSummary_voucherIcon,
  pointsTextClassName: styleOrderSummary.orderSummary_voucherText,
  pointsContainerClassName: styleOrderSummary.orderSummary_pointsContainer,
  changePointsClassName: styleOrderSummary.orderSummary_pointsChange,
  numberOfPointsClassName: styleOrderSummary.orderSummary_numberOfPoints,
  pointLabelClassName: 'd-none',
  pointsFormContainerClassName: styleOrderSummary.orderSummary_pointsFormContainer,
  pointsWarningClassName: styleOrderSummary.orderSummary_pointsWarning,
  pointsFormClassName: styleOrderSummary.orderSummary_pointsForm,
  totalPointsClassName: styleOrderSummary.orderSummary_totalPoints,
  pointValueClassName: styleOrderSummary.orderSummary_pointValue,
  pointsSubmitButtonClassName: styleOrderSummary.orderSummary_pointsSubmitButton,
  pointsInsufficientClassName: styleOrderSummary.orderSummary_pointsInsufficient,
  pointsButtonAppliedClassName: styleOrderSummary.orderSummary_voucherButtonApplied,
  pointsAppliedTextClassName: styleOrderSummary.orderSummary_voucherAppliedText,
  pointButtonRemoveClassName: styleOrderSummary.orderSummary_voucherButtonRemove,
}

const classesCartDetails = {
  className: styleOrderSummary.cart_detail,
  cartHeaderClassName: 'd-none',
  itemClassName: styleOrderSummary.cart_item,
  itemImageClassName: styleOrderSummary.cart_image,
  itemTitleClassName: styleOrderSummary.cart_title,
  itemAmountClassName: styleOrderSummary.cart_totalPrice,
  itemPriceClassName: 'd-none',
  itemQtyClassName: 'd-none',
  errorClassName: 'd-none',
  itemEditClassName: 'd-none',
  itemRemoveClassName: 'd-none',
  cartFooterClassName: 'd-none',
  cartFooterTitleClassName: 'd-none',
}

type iProps = {
  i18n: any
  lng?: any
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
  lng,
  page,
  withCartDetails = true,
  withOrderSummary = true,
  titleSubmit = i18n.t("orderSummary.placeOrder"),
  totalCrossSell = 0
}) => {

  return (
    <>
      {withCartDetails &&
        <div className={styleOrderSummary.cart_container}>
          <div className={styleOrderSummary.cart_header}>
            <h6 className={styleOrderSummary.cart_headerTitle}>
              {i18n.t("orderSummary.yourCart")}
            </h6>
            <Link href="/[lng]/cart" as={`/${lng}/cart`}>
              <a>
                <FiChevronLeft
                  color="#998060"
                  size={16}
                  className="mr-1"
                />
                {i18n.t("global.changeCart")}
              </a>
            </Link>
          </div>
          <CartDetails
            currency="IDR"
            classes={classesCartDetails}
            itemRedirectPathPrefix={`product`}
            onErrorMsg={(msg) => toast.error(msg)}
            isEditable={false}
            lazyLoadedImage={false}
            thumborSetting={{
              width: 100,
              format: "webp",
              quality: 85,
            }}
            loadingComponent={
              <Loader />
            }
          />
        </div>
      }
      {withOrderSummary &&
        <>
          <OrderSummary
            page={page}
            currency="IDR"
            classes={{
              ...classesOrderSummary,
              containerClassName: `${styleOrderSummary.orderSummary} ${totalCrossSell === 0 && styleOrderSummary.orderSummary_extras}`
            }}
            submitButtonLabel={titleSubmit}
            continueShoppingLabel={i18n.t("orderSummary.continueShopping")}
            onErrorMsg={(msg) => toast.error(msg)}
            onErrorMsgCoupon={(msg) => toast.error(msg)}
            isAccordion
            onAddressInvalid={(e) => toast.error(e)}
            loadingComponent={<Loader />}
            icons={{
              voucher: <img src="/icons/voucher.svg" alt="voucher" />,
              points: <img src="/icons/point.svg" alt="points" />,
              close: <FiX size={24} color="#444444" />,
              voucherApplied: <img src="/icons/voucher.svg" alt="voucher" />,
              voucherRemoved: <FiX color="#CC4534" size={16} />,
              pointsApplied: <img src="/icons/point.svg" alt="points" />,
              expand: <FiChevronUp />,
              collapse: <FiChevronDown />,
            }}
          />
        </>
      }
    </>
  )
}

export default OrderSummaryComponent
