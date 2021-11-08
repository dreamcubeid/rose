/* library package */
import { FC, ReactNode } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { FiX } from 'react-icons/fi'
import { BiTargetLock } from 'react-icons/bi'
import { HiCheckCircle } from 'react-icons/hi'
import {
  CustomerDetail,
  ShippingMethods,
  useI18n,
  PrivateRoute,
  useBuyerNotes
} from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
/* components */
import Layout from 'components/Layout/Layout'
import HeaderCheckout from 'components/Header/HeaderCheckout'
import Stepper from 'components/Stepper'
import OrderSummaryBox from 'components/OrderSummaryBox'
const Placeholder = dynamic(() => import('components/Placeholder'))
const LoaderPages = dynamic(() => import('components/Loader/LoaderPages'))
/* styles */
import styleShipping from 'public/scss/components/Shipping.module.scss'
import styleCustomer from 'public/scss/components/CustomerDetail.module.scss'
import styleBtn from 'public/scss/components/Button.module.scss'
import styles from 'public/scss/pages/ShippingMethod.module.scss'

const classesCustomerDetail = {
  customerDetailBoxClass: styleCustomer.customer,
  addressContainerClassName: styleCustomer.customer_info,
  addressDetailClassName: styleCustomer.customer_infoPerson,
  addressValueClassName: styleCustomer.customer_infoPersonValue,
  changePinClassName: styleCustomer.customer_changePin,
  // Map Popup
  mapPopupClassName: styleCustomer.customer_mapPopup,
  mapPopupBackgroundClassName: styleCustomer.customer_mapPopupContainer,
  mapClassName: styleCustomer.customer_mapPopupMaps,
  mapHeaderWrapperClassName: styleCustomer.customer_mapPopupHeader,
  mapHeaderTitleClassName: styleCustomer.customer_mapPopupHeaderTitle,
  mapHeaderCloseButtonClassName: styleCustomer.customer_mapPopupClose,
  mapHeaderNoteClassName: styleCustomer.customer_mapPopupNote,
  mapLabelAddressClassName: styleCustomer.customer_mapPopupLabelAddress,
  mapButtonFooterClassName: `${styleBtn.btn} ${styleBtn.btn_primary} d-block mx-auto my-3`,
  mapCenterButtonClassName: styleCustomer.customer_mapPopupCenterButton
}

const classesShippingMethod = {
  containerClass: styleShipping.shipping_container,
  shippingRadioDiv: styleShipping.shipping_item,
  divInputClass: styleShipping.shipping_item__radio,
  shippingNameDivClass: styleShipping.shipping_item__label,
  shippingNameClass: styleShipping.shipping_item__title,
  shippingPriceDivClass: styleShipping.shipping_item__price,
  pinPointLocationClassName: `${styleBtn.btn} ${styleBtn.btn_secondary} ${styleShipping.shipping_item__pinButton} mb-3`,
  shippingErrorMsgClass: styleShipping.shipping_item__errorMsg,
  // Map Popup
  mapPopupClassName: styleCustomer.customer_mapPopup,
  mapPopupBackgroundClassName: styleCustomer.customer_mapPopupContainer,
  mapClassName: styleCustomer.customer_mapPopupMaps,
  mapHeaderWrapperClassName: styleCustomer.customer_mapPopupHeader,
  mapHeaderTitleClassName: styleCustomer.customer_mapPopupHeaderTitle,
  mapHeaderCloseButtonClassName: styleCustomer.customer_mapPopupClose,
  mapHeaderNoteClassName: styleCustomer.customer_mapPopupNote,
  mapLabelAddressClassName: styleCustomer.customer_mapPopupLabelAddress,
  mapButtonFooterClassName: `${styleBtn.btn} ${styleBtn.btn_primary} ${styleShipping.shipping_item__pinButton}`,
  mapCenterButtonClassName: styleCustomer.customer_mapPopupCenterButton
}

const classesPlaceholderCustomerDetail = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_customerDetail}`,
}

const classesPlaceholderShipping = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_shippingMethod}`,
}

type PrivateComponentPropsType = {
  children: ReactNode
}

type TypeCustomerDetail = {
  i18n: any
  router: any
  title: string
  withIcon?: boolean
  toDirect?: string
}

const PrivateRouteWrapper = ({ children }: PrivateComponentPropsType) => (
  <PrivateRoute
    page="shipping_method"
    loadingComponent={<LoaderPages />}
    redirectCart="products"
  >
    {children}
  </PrivateRoute>
)

const CustomerDetailHeader = ({
  i18n,
  router,
  title,
  withIcon = true,
  toDirect = "place_order"
}: TypeCustomerDetail) => (
  <div className={styleCustomer.customer_infoHeader}>
    <div className={styleCustomer.customer_infoHeaderContainer}>
      <h3 className={styleCustomer.customer_infoHeaderTitle}>{title}</h3>
      {withIcon &&
        <HiCheckCircle color="#53B671" size={20} />
      }
    </div>
    <div
      className={styleCustomer.customer_infoHeaderLink}
      onClick={() => router.push({
        pathname: `/[lng]/${toDirect}`,
        query: router.query
      })}
    >
      {i18n.t("global.change")}
    </div>
  </div>
)

const ShippingMethodPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const router: any = useRouter()
  const { data: dataBuyerNotes } = useBuyerNotes()

  return (
    <PrivateRouteWrapper>
      <Layout
        i18n={i18n}
        lng={lng}
        lngDict={lngDict}
        brand={brand}
        withHeader={false}
        withFooter={false}
        layoutClassName='layout_fullHeight'
      >
        <HeaderCheckout
          i18n={i18n}
        />
        <Stepper
          title={i18n.t('shipping.title')}
          step={2}
        />
        <div className={styles.customer}>
          <CustomerDetail
            classes={classesCustomerDetail}
            isBilling={true}
            contactInfoHeader={
              <CustomerDetailHeader
                i18n={i18n}
                router={router}
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
                i18n={i18n}
                router={router}
                title={i18n.t("shipping.shipTo")}
              />
            }
            loadingComponent={
              <Placeholder classes={classesPlaceholderCustomerDetail} withImage />
            }
          />
          <div className={styles.customer_section}>
            <CustomerDetailHeader
              i18n={i18n}
              router={router}
              title={i18n.t("global.notes")}
              toDirect="cart"
            />
            <div className={styles.customer_notes}>
              {dataBuyerNotes?.buyerNotes?.buyerNotes || i18n.t("global.notesEmpty")}
            </div>
          </div>
        </div>
        <div className={styles.shippingMethod}>
          <h3 className={styles.shippingMethod_title}>
            {i18n.t("account.shippingMethod")}
          </h3>
          <ShippingMethods
            classes={classesShippingMethod}
            onErrorMsg={(msg) => toast.error(msg)}
            mapCenterIcon={<BiTargetLock color="#444444" size={20} />}
            mapButtonCloseIcon={<FiX color="#444444" size={20} />}
            loadingComponent={
              <Placeholder classes={classesPlaceholderShipping} withList listMany={5} />
            }
          />
          <OrderSummaryBox
            i18n={i18n}
            lng={lng}
            page='shipping_method'
            withCartDetails
          />
        </div>
      </Layout>
    </PrivateRouteWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  )

  const brand = await useBrand(req)

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ""
    }
  }
}

export default ShippingMethodPage
