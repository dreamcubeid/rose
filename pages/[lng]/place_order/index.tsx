/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import {
  X as XIcon,
  Calendar,
  Crosshair
} from 'react-feather'
import {
  RiEyeCloseLine,
  RiEye2Line,
  RiCheckboxCircleFill,
  RiCheckboxCircleLine
} from 'react-icons/ri'
import {
  PlaceOrderForm,
  useI18n,
  PrivateRoute
} from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
/* components */
import Layout from 'components/Layout/Layout'
import HeaderCheckout from 'components/Header/HeaderCheckout'
import Stepper from 'components/Stepper'
import OrderSummaryBox from 'components/OrderSummaryBox'
const Popup = dynamic(() => import('components/Popup'))
const Loader = dynamic(() => import('components/Loader/Loader'))
const LoaderPages = dynamic(() => import('components/Loader/LoaderPages'))
/* styles */
import styleForm from 'public/scss/components/Form.module.scss'
import styleButton from 'public/scss/components/Button.module.scss'
import styleMap from 'public/scss/components/Map.module.scss'
import stylePassword from 'public/scss/components/Password.module.scss'
import stylePlaceorder from 'public/scss/pages/Placeorder.module.scss'

const placeOrderClasses = {
  billingAddressHeaderClassName: stylePlaceorder.placeorder_header,
  billingAddressLabelClassName: stylePlaceorder.placeorder_formError,
  errorMessageClassName: stylePlaceorder.placeorder_formError__label,
  checkoutAsMemberClassName: stylePlaceorder.placeorder_header__label,
  loginLabelClassName: stylePlaceorder.placeorder_header__login,
  signupContainerClassName: stylePlaceorder.placeorder_labelRegister,
  // form
  formGroupClassName: `${styleForm.form} mb-3`,
  passwordInputContainerClassName: stylePassword.password_passwordContainer,
  // shipping
  shippingCheckboxContainerClassName: stylePlaceorder.placeorder_shipping,
  shippingCheckboxTitleClassName: 'd-none',
  shippingCheckboxClassName: stylePlaceorder.placeorder_shipping__checkbox,
  shippingCheckboxLabelClassName: stylePlaceorder.placeorder_shipping__label,
  // password
  passwordStrengthBarContainerClassName: stylePassword.password,
  passwordStrengthBarClassName: stylePassword.password_bar,
  passwordStrengthLabelClassName: stylePassword.password_label,
  passwordCriteriaListClassName: `${stylePassword.password_criteria} d-none`,
  datePickerInputClassName: 'date-picker__input',
  datePickerCalendarClassName: 'date-picker__calendar',
  // map
  mapNoteClassName: "d-none",
  mapAreaClassName: styleMap.map_mapArea,
  mapSelectAreaClassName: `${styleMap.map_btnLocation}`,
  mapPopupClassName: styleMap.map_mapPopup,
  mapClassName: styleMap.map_mapPopupMaps,
  mapHeaderWrapperClassName: styleMap.map_mapPopupHeader,
  mapHeaderTitleClassName: styleMap.map_mapPopupHeaderTitle,
  mapHeaderCloseButtonClassName: styleMap.map_mapPopupClose,
  mapLabelAddressClassName: styleMap.map_mapPopupLabelAddress,
  mapCenterButtonClassName: styleMap.map_mapPopupCenterButton,
  mapButtonFooterClassName: `${styleButton.btn} ${styleButton.btn_primary} ${styleMap.map_btn}`,
}

type PrivateComponentPropsType = {
  children: any
}

const PrivateRouteWrapper = ({ children }: PrivateComponentPropsType) => (
  <PrivateRoute
    page='place_order'
    loadingComponent={<LoaderPages />}
    redirectCart='products'
  >
    {children}
  </PrivateRoute>
)

const PlaceOrderPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const [showModalErrorAddToCart, setShowModalErrorAddToCart] = useState<boolean>(false)

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
          title={i18n.t('placeOrder.userInformation')}
          step={1}
        />
        <div className={stylePlaceorder.placeorder}>
          <PlaceOrderForm
            classes={placeOrderClasses}
            onErrorMsg={(msg) => toast.error(msg)}
            passwordViewIcon={<RiEyeCloseLine />}
            passwordHideIcon={<RiEye2Line />}
            passwordFulfilledCriteriaIcon={<RiCheckboxCircleFill color="#53B671" size={10} />}
            passwordUnfulfilledCriteriaIcon={<RiCheckboxCircleLine color="#BCBCBC" size={10} />}
            datePickerCalendarIcon={<Calendar />}
            mapButtonCloseIcon={<XIcon />}
            mapCenterIcon={<Crosshair />}
            loadingComponent={<Loader />}
            logistixStyles={{
              menu: (provided) => ({ ...provided, zIndex: 3, marginTop: '1px' }),
              control: (provided) => ({
                ...provided,
                borderRadius: '37px',
                height: '58px',
                padding: '0 21px',
                width: '100%',
                paddingTop: '16px',
              }),
              singleValue: (provided) => ({ ...provided, marginRight: '0', marginLeft: '-8px' }),
              input: (provided) => ({ ...provided, marginRight: '0', marginLeft: '-8px' }),
              indicatorsContainer: (provided) => ({ ...provided, display: 'none' }),
            }}
          />
          <OrderSummaryBox
            i18n={i18n}
            lng={lng}
            page='place_order'
            withCartDetails
          />
        </div>
        <Popup
          withHeader={false}
          visibleState={showModalErrorAddToCart}
          setVisibleState={setShowModalErrorAddToCart}
          outsideClose={false}
        >
          <>
            <div className={stylePlaceorder.placeOrder_popupTitle}>
              <h3>
                {i18n.t('product.tryAgain')}
              </h3>
            </div>
            <div className={stylePlaceorder.placeOrder_popupContent}>
              <p className={stylePlaceorder.placeOrder_popupDesc}>
                {i18n.t('cart.errorSKUDesc')}
              </p>
            </div>
            <button
              className={`${stylePlaceorder.btn} ${stylePlaceorder.btn_primary}`}
              onClick={() => setShowModalErrorAddToCart(false)}
            >
              {i18n.t('product.tryAgain')}
            </button>
          </>
        </Popup>
      </Layout>
    </PrivateRouteWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params
}) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  )

  const brand = await useBrand(req)

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ''
    }
  }
}

export default PlaceOrderPage
