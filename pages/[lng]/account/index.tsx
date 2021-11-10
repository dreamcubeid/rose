/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Account, useI18n } from '@sirclo/nexus'
import { BiChevronDown } from 'react-icons/bi'
import {
  RiEyeCloseLine,
  RiEye2Line,
  RiCheckboxCircleFill,
  RiCheckboxCircleLine,
  RiCloseLine,
  RiInformationLine,
  RiUser3Line,
  RiShoppingBag2Line,
  RiMailUnreadFill,
  RiWhatsappFill,
  RiLineLine
} from 'react-icons/ri'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { BiTargetLock } from 'react-icons/bi'
import { toast } from 'react-toastify'
/* library template */
import { useBrand } from 'lib/useBrand'
import { useWhatsAppOTPSetting } from 'lib/useWhatsAppOtp'
import { parseCookies } from 'lib/parseCookies'
/* components */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import EmptyComponent from 'components/EmptyComponent/EmptyComponent'
/* styles */
import styleAccount from 'public/scss/pages/Account.module.scss'
import styleMap from 'public/scss/components/Map.module.scss'
import styleButton from 'public/scss/components/Button.module.scss'
import styleForm from 'public/scss/components/Form.module.scss'
import styleDatePicker from 'public/scss/components/DatePicker.module.scss'
import stylePassword from 'public/scss/components/Password.module.scss'
import styleOrderHistory from 'public/scss/components/OrderHistory.module.scss'
import styleShipmentTracking from 'public/scss/components/shipmentTracking.module.scss'
import styleMembershipHistory from 'public/scss/components/MembershipHistory.module.scss'
import stylesNotif from 'public/scss/components/Notification.module.scss'
import stylePagination from 'public/scss/components/Pagination.module.scss'

const ACTIVE_CURRENCY = 'IDR'

const classesAccount = {
  tabClassName: styleAccount.account_tab,
  tabItemClassName: styleAccount.account_tabItem,
  linkTabItemClassName: styleAccount.account_tabItem_link,
  linkTabItemActiveClassName: styleAccount.account_tabItem_active,
  tabPaneClassName: styleAccount.account_tabPane,
  inputContainerClassName: `${styleForm.form} ${styleAccount.account_input}`,
  inputDistrictClassName: styleForm.form,
  buttonClassName: `${styleButton.btn} ${styleButton.btn_primary} ${styleAccount.account_btn} `,
  membershipStatusClassName: styleAccount.membership_status,
  accordionClassName: styleAccount.membership_accordion,
  accordionToggleClassName: styleAccount.membership_accordion_toggle,
  accordionIconClassName: styleAccount.membership_accordion_icon,
  membershipProgressClassName: styleAccount.membership_progress,
  datePickerInputClassName: styleDatePicker.datePicker,
  // account
  myAccountContentClassName: styleAccount.myAccount,
  myAccountBodyClassName: styleAccount.myAccount_list,
  myAccountFieldClassName: styleAccount.myAccount_list_item,
  myAccountLabelClassName: styleAccount.myAccount_list_label,
  myAccountValueClassName: styleAccount.myAccount_list_value,
  // map
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
  // change password
  passwordContainerClassName: stylePassword.password_passwordContainer,
  passwordStrengthBarContainerClassName: `${stylePassword.password} ${styleAccount.form_criteria}`,
  passwordStrengthBarClassName: stylePassword.password_bar,
  passwordStrengthLabelClassName: stylePassword.password_label,
  passwordCriteriaListClassName: `${stylePassword.password_criteria} ${styleAccount.form_criteria} d-none`,
  // order
  orderInfoContainerClassName: styleOrderHistory.order_info,
  OrderInfoIconClassName: styleOrderHistory.order_info_icon,
  orderItemClassName: styleOrderHistory.order_item,
  orderHeaderClassName: styleOrderHistory.order_item_header,
  orderInnerHeaderClassName: styleOrderHistory.order_item_innerHeader,
  orderTitleClassName: styleOrderHistory.order_item_title,
  orderDateClassName: styleOrderHistory.order_item_date,
  orderBodyClassName: styleOrderHistory.order_item_body,
  orderFooterClassName: styleOrderHistory.order_item_footer,
  totalCostClassName: styleOrderHistory.order_item_totalCost,
  buyerNoteContainerClassName: styleOrderHistory.order_item_containerDetail,
  buyerNoteLabelClassName: styleOrderHistory.order_item_labelDetail,
  buyerNoteClassName: styleOrderHistory.order_item_note,
  shippingContainerClassName: styleOrderHistory.order_item_containerDetail,
  shippingDetailsLabelClassName: styleOrderHistory.order_item_labelDetail,
  shippingDetailsValueClassName: styleOrderHistory.order_item_valueDetail,
  shippingMethodContainerClassName: styleOrderHistory.order_item_containerMethod,
  shippingMethodLabelClassName: styleOrderHistory.order_item_labelDetail,
  shippingMethodValueClassName: styleOrderHistory.order_item_valueDetail,
  paymentMethodContainerClassName: `${styleOrderHistory.order_item_containerMethod} ${styleOrderHistory.order_item_paymentMethod}`,
  paymentMethodLabelClassName: styleOrderHistory.order_item_labelDetail,
  orderControlClassName: styleOrderHistory.order_item_control,
  shippingTrackerButton: styleOrderHistory.order_item_controlButton,
  invoiceButtonClassName: styleOrderHistory.order_item_controlInvoice,
  orderedItemDetailUploadReceiptClassName: `${styleOrderHistory.order_item_controlButton} ${styleOrderHistory.order_item_controlButton_secondaryBg}`,
  orderedItemDetailDeliveredClassName: `${styleOrderHistory.order_item_controlButton} ${styleOrderHistory.order_item_controlButton_secondaryBg}`,
  totalPointsClassName: styleOrderHistory.order_item_totalPoints,
  orderedItemsLabelClassName: 'd-none',
  orderedItemsClassName: styleOrderHistory.order_item_orderedItems,
  orderedItemClassName: styleOrderHistory.order_item_orderedItem,
  orderedItemImageClassName: styleOrderHistory.order_item_orderedItemImg,
  orderedItemDetailClassName: styleOrderHistory.order_item_orderedItemDetail,
  orderedItemDetailTitleClassName: styleOrderHistory.order_item_orderedItemDetail_title,
  orderedItemDetailPriceClassName: styleOrderHistory.order_item_orderedItemDetail_price,
  orderedItemDetailNeedReviewClassName: styleOrderHistory.order_item_needReview,
  paymentStatusPaidClassName: styleOrderHistory.order_status,
  paymentStatusUnpaidClassName: styleOrderHistory.order_status,
  paymentStatusCancelledClassName: styleOrderHistory.order_status,
  paymentStatusReturnedClassName: styleOrderHistory.order_status,
  paymentStatusReadyToShipClassName: styleOrderHistory.order_status,
  paymentStatusShippedClassName: styleOrderHistory.order_status,
  paymentStatusDeliveredClassName: styleOrderHistory.order_status,
  paymentStatusCompletedClassName: styleOrderHistory.order_status,
  OrderInfoSearchHereClassName: styleOrderHistory.order_info_button,
  popupConfirmationOrderContainerClassName: styleOrderHistory.order_popup,
  popupConfirmationOrderContentClassName: styleOrderHistory.order_popup_content,
  popupConfirmationOrderTitleClassName: styleOrderHistory.order_popup_title,
  popupConfirmationOrderNoteClassName: 'd-none',
  popupConfirmationOrderDescriptionClassName: styleOrderHistory.order_popup_desc,
  popupConfirmationOrderWrapButtonClassName: styleOrderHistory.order_popup_wrapAction,
  popupConfirmationOrderButtonConfirmClassName: `${styleButton.btn} ${styleButton.btn_secondary}`,
  popupConfirmationOrderButtonNoClassName: `${styleButton.btn} ${styleButton.btn_primary}`,
  // tracker
  shipmentTrackingClassName: styleShipmentTracking.shipmentTracking,
  shipmentHeaderClassName: styleShipmentTracking.shipmentTracking_header,
  shipmentHeaderTextClassName: styleShipmentTracking.shipmentTracking_title,
  shipmentTextClassName: styleShipmentTracking.shipmentTracking_subTitle,
  shipmentCloseIconClassName: styleShipmentTracking.shipmentTracking_close,
  shipmentBodyClassName: styleShipmentTracking.shipmentTracking_body,
  shipmentListWrapperClassName: styleShipmentTracking.shipmentTracking_list,
  shipmentListClassName: styleShipmentTracking.shipmentTracking_item,
  shipmentStatusClassName: styleShipmentTracking.shipmentTracking_item_description,
  shipmentDateClassName: styleShipmentTracking.shipmentTracking_item_date,
  shipmentNoteClassName: styleShipmentTracking.shipmentTracking_item_note,
  shipmentFooterClassName: styleShipmentTracking.shipmentTracking_footer,
  // membership history
  membershipHistoryClassName: styleMembershipHistory.membershipHistory,
  linkContinueClassName: styleMembershipHistory.membershipHistory_header,
  pointHistoryItemClassName: styleMembershipHistory.membershipHistory_item,
  orderIDClassName: styleMembershipHistory.membershipHistory_item_header,
  transactionTypeClassName: styleMembershipHistory.membershipHistory_item_title,
  transactionDateClassName: styleMembershipHistory.membershipHistory_item_date,
  pointDeltaClassName: styleMembershipHistory.membershipHistory_item_point,
  membershipPaginationClassName: styleMembershipHistory.membershipHistory_pagination,
  itemPerPageClassName: styleForm.form_itemPerPage,
  itemPerPageLabelClassName: styleForm.form_itemPerPage_label,
  itemPerPageOptionsClassName: `${styleForm.form} w-100 ${styleMembershipHistory.form_perPage}`,
  buttonContinueClassName: 'membership-buttonContinueClassName',
  // setting notification
  settingNotifContainer: stylesNotif.notification,
  settingNotifHeader: "d-none",
  settingNotifDescription: stylesNotif.notification_desc,
  settingNotifMediaContainer: stylesNotif.notification_mediaContainer,
  settingNotifMedia: stylesNotif.notification_media,
  settingNotifMediaDisabled: stylesNotif.notification_mediaDisable,
  mediaParent: stylesNotif.notification_mediaParent,
  mediaLabelContainer: stylesNotif.notification_mediaLabel,
  mediaInnerLabelContainer: stylesNotif.notification_mediaInnerLabel,
  mediaDescription: stylesNotif.notification_mediaDesc,
  mediaCheckboxContainer: stylesNotif.notification_mediaCheckboxContainer,
  mediaCheckbox: stylesNotif.notification_mediaCheckbox,
  mediaCheckboxSlider: stylesNotif.notification_mediaCheckboxSlider,
  mediaDetailContainer: stylesNotif.notification_mediaDetailContainer,
  mediaDetailLabel: stylesNotif.notification_mediaDetailLabel,
  mediaDetailCheckboxContainer: stylesNotif.notification_mediaDetailCheckboxContainer,
  mediaDetailCheckbox: stylesNotif.notification_mediaDetailCheckbox,
  mediaDetailCheckboxLabel: stylesNotif.notification_mediaDetailCheckboxLabel,
  // Popup Cari Pesanan
  checkPaymentOrderContainerClassName: styleOrderHistory.order_searchOverlay,
  checkPaymentOrderContainerBodyClassName: styleOrderHistory.order_searchInner,
  checkPaymentOrderHeaderClassName: styleOrderHistory.order_searchHeader,
  checkPaymentOrderTitleClassName: styleOrderHistory.order_searchHeaderTitle,
  checkPaymentOrderCloseButtonClassName: styleOrderHistory.order_searchHeaderClose,
  checkPaymentOrderContentClassName: styleOrderHistory.order_searchContent,
  checkPaymentOrderDescriptionClassName: styleOrderHistory.order_searchDesc,
  checkPaymentOrderInputContentClassName: `${styleForm.form} ${styleOrderHistory.order_searchForm}`,
  checkPaymentOrderInputTitleClassName: styleOrderHistory.order_searchInputTitle,
  checkPaymentOrderSubmitButtonClassName: `${styleButton.btn} ${styleButton.btn_primary} ${styleOrderHistory.order_searchBtn}`
}

const classesMembershipPagination = {
  pagingClassName: stylePagination.pagination,
  itemClassName: stylePagination.pagination_item,
  activeClassName: stylePagination.pagination_active,
}

const AccountsPage: FC<any> = ({
  lng,
  lngDict,
  hasOtp,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()

  const [name, setName] = useState<string>('')

  const onError = (msg: string) => toast.error(msg)
  const onSuccessChPass = (msg: string) => toast.success(msg)

  const onSuccess = (msg: string, data: any) => {
    setName(data?.upsertProfile[0]?.firstName + ' ' + data?.upsertProfile[0]?.lastName)
    toast.success(msg)
  }

  const onFetchCompleted = (_: string, data: any) => {
    const { firstName, lastName } = data?.members[0]
    setName(`${firstName} ${lastName}`)
  }

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      layoutClassName="layout_fullHeight"
    >
      <div className={styleAccount.account_container}>
        <div className={styleAccount.account_breadcrumb}>
          <Breadcrumb
            steps={[{ label: i18n.t('breadcrumb.home') }, { label: i18n.t('breadcrumb.account') }]}
          />
        </div>
        <div className={styleAccount.account_content}>
          <div className={styleAccount.account_header}>
            <h2 className={styleAccount.account_header_title}>
              {i18n.t('account.myAccount')}
            </h2>
            <div className={styleAccount.account_header_img}>
              <RiUser3Line size={17} />
            </div>
            <span>{name}</span>
          </div>
        </div>
        <Account
          orderHistoryIsInfinite
          orderHistoryItemPerPage={1}
          classes={classesAccount}
          currency={ACTIVE_CURRENCY}
          onFetchCompleted={onFetchCompleted}
          onErrorMsg={onError}
          onSuccessMsg={onSuccess}
          onSuccessChPass={onSuccessChPass}
          orderHistoryIsCallPagination={true}
          paymentHrefPrefix="payment_notif"
          orderHistoryType="list"
          showSettingNotification={hasOtp}
          passwordViewIcon={<RiEyeCloseLine />}
          passwordHideIcon={<RiEye2Line />}
          passwordFulfilledCriteriaIcon={<RiCheckboxCircleFill color="#53B671" size={10} />}
          passwordUnfulfilledCriteriaIcon={<RiCheckboxCircleLine color="#BCBCBC" size={10} />}
          mapButtonCloseIcon={<RiCloseLine />}
          mapCenterIcon={<BiTargetLock />}
          membershipPaginationClasses={classesMembershipPagination}
          membershipPaginationNextLabel={<IoChevronForward />}
          membershipPaginationPrevLabel={<IoChevronBack />}
          icons={{
            accordionIcon: <BiChevronDown />,
            closeIcon: <RiCloseLine />,
            infoIcon: <RiInformationLine size={12} color="#444444" />,
            email: <RiMailUnreadFill size={20} />,
            whatsApp: <RiWhatsappFill color="#53B671" size={20} />,
            line: <RiLineLine color="#53B671" size={20} />,
            iconTracker: (
              <div>
                <img src="/icons/motorcycle.svg" alt="motorcycle" />
              </div>
            ),
          }}
          loadingComponent={
            <div className="w-100 d-flex align-items-center justify-content-center">
              <span className="spinner-border" style={{ width: 20, height: 20, marginRight: 12 }} />
              <span>{i18n.t('account.loading')}</span>
            </div>
          }
          emptyStateComponent={
            <div className={styleOrderHistory.order_empty}>
              <EmptyComponent
                title={i18n.t('account.noOrder')}
                icon={<RiShoppingBag2Line />}
              />
            </div>
          }
          logistixStyles={{
            menu: (provided) => ({ ...provided, zIndex: 3, marginTop: '1px' }),
            control: (provided, state) => ({
              ...provided,
              borderRadius: '37px',
              height: '58px',
              padding: '0 21px',
              width: '100%',
              paddingTop: '16px',
              border: state.isFocused ? '1px solid #998060' : '1px solid #E8E8E8',
              boxShadow: 'none',
            }),
            singleValue: (provided) => ({ ...provided, marginRight: '0', marginLeft: '-8px' }),
            input: (provided) => ({ ...provided, marginRight: '0', marginLeft: '-8px' }),
            indicatorsContainer: (provided) => ({ ...provided, display: 'none' }),
          }}
        />
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const { default: lngDict = {} } = await import(`locales/${params.lng}.json`)

  const brand = await useBrand(req)
  const hasOtp = await useWhatsAppOTPSetting(req)

  if (res) {
    const cookies = parseCookies(req)
    const auth = cookies.AUTH_KEY

    if (!auth) {
      res.writeHead(301, {
        Location: `/${cookies.ACTIVE_LNG || 'id'}/login`,
      })
      res.end()
    }
  }

  return {
    props: {
      lng: params.lng,
      lngDict,
      hasOtp,
      brand: brand || '',
    },
  }
}

export default AccountsPage
