import { FC, useEffect, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Account, useI18n, useLogout } from '@sirclo/nexus'
import { IoArrowBackOutline } from 'react-icons/io5'
import { RiCloseLine } from 'react-icons/ri'
import { BiTargetLock } from 'react-icons/bi'
import { toast } from 'react-toastify'
import Link from 'next/link'
import SEO from 'components/SEO'
import Layout from 'components/Layout/Layout'
import { parseCookies } from 'lib/parseCookies'
import { useBrand } from 'lib/useBrand'
import {
  X as XIcon,
  AlertCircle,
  LogOut,
  Eye,
  EyeOff,
  CheckCircle,
  Crosshair,
  ChevronDown,
} from 'react-feather'
import styleAccount from 'public/scss/pages/Account.module.scss'
import styleButton from 'public/scss/components/Button.module.scss'
import styleForm from 'public/scss/components/Form.module.scss'
import stylesPopupConfirmationOrder from 'public/scss/components/popupConfirmationOrder.module.scss'
import stylesPopupCheckPaymentOrder from 'public/scss/components/CheckPaymentOrder.module.scss'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import { useRouter } from 'next/router'
import { RiUser3Line } from 'react-icons/ri'

const ACTIVE_CURRENCY = 'IDR'

const classesAccount = {
  // containerClassName: styleAccount.account_con,
  tabClassName: styleAccount.account_tab,
  tabItemClassName: styleAccount.account_tabItem,
  linkTabItemClassName: styleAccount.account_tabItem_link,
  linkTabItemActiveClassName: styleAccount.account_tabItem_active,
  tabPaneClassName: styleAccount.account_tabPane,
  /* my account classes */
  // myAccountClassName: styleAccount.myAccount,
  myAccountContentClassName: styleAccount.myAccount,
  myAccountBodyClassName: styleAccount.myAccount_list,
  myAccountFieldClassName: styleAccount.myAccount_list_item,
  myAccountLabelClassName: styleAccount.myAccount_list_label,
  myAccountValueClassName: styleAccount.myAccount_list_value,
  // loyaltyPointContainerClassName: styles.account_loyalty,
  /* order history classes */
  // orderHistoryContainerClassName: styles.table_orderhistory,
  // tableClassName: styles.table_history,
  // orderedItemDetailNeedReviewClassName: styles.table_itemDetailNeedReview,
  // orderedItemDetailDeliveredClassName: styles.table_orderedItemDetailDelivered,
  /* change password clases */
  // editAccountClassName: styleAccount.account_edit,
  inputContainerClassName: `${styleForm.form} ${styleAccount.account_input}`,
  // inputLabelClassName: styles.account_edit__label,
  inputDistrictClassName: styleAccount.form_inputCity,
  // changePasswordClassName: styles.account_changePassword,
  // passwordContainerClassName: `d-flex align-items-center position-relative w-100`,
  // passwordInputClassName: `form-control ${styles.sirclo_form_input}`,
  // passwordStrengthBarClassName: styles.passwordBar,
  // passwordStrengthBarContainerClassName: `${styles.passwordValidation} ${styles.marginAccount}`,
  // passwordCriteriaListClassName: `${styles.formPassword} ${styles.marginAccount} ${styles.formPasswordAccount} d-none`,
  // passwordCriteriaClassName: styles.formPasswordList,
  buttonClassName: `${styleButton.btn} ${styleButton.btn_primary} ${styleAccount.account_btn} `,
  /* map */
  mapAreaClassName: styleAccount.mapArea,
  mapSelectAreaClassName: `${styleAccount.account_btnLocation}`,
  mapPopupClassName: styleAccount.account_mapPopup,
  // mapPopupBackgroundClassName: styles.account_mapPopupContainer,
  mapClassName: styleAccount.account_mapPopupMaps,
  mapHeaderWrapperClassName: styleAccount.account_mapPopupHeader,
  mapHeaderTitleClassName: styleAccount.account_mapPopupHeaderTitle,
  mapHeaderCloseButtonClassName: styleAccount.account_mapPopupClose,
  // mapHeaderNoteClassName: styles.account_mapPopupNote,
  mapLabelAddressClassName: styleAccount.account_mapPopupLabelAddress,
  mapCenterButtonClassName: styleAccount.account_mapPopupCenterButton,
  mapButtonFooterClassName: `${styleButton.btn} ${styleButton.btn_primary} ${styleAccount.account_btn}`,
  /* tracking */
  // shippingTrackerButton: `btn ${styles.btn_primary}`,
  // shipmentTrackingClassName: `${styles.track_shipmentTracking} ${styles.account_shipmentTracking}`,
  // shipmentHeaderClassName: `${styles.track_shipmentHeader} ${styles.account_shipmentContainer}`,
  // shipmentBodyClassName: `${styles.track_shipmentBody} ${styles.account_shipmentContainer} d-flex justify-content-center`,
  // shipmentFooterClassName: `${styles.track_shipmentFooter} ${styles.account_shipmentContainer} d-flex justify-content-center text-center`,
  // shipmentHeaderTextClassName: styles.track_shipmentHeaderText,
  // shipmentTextClassName: styles.track_shipmentText,
  // shipmentNoteClassName: styles.track_shipmentNote,
  // shipmentListClassName: styles.track_shipmentList,
  // shipmentListWrapperClassName: styles.track_shipmentListWrapper,
  // shipmentCloseIconClassName: styles.track_shipmentCloseIcon,
  // shipmentTrackButtonClassName: styles.track_shipmentTrackButton,
  /* Membership History */
  membershipStatusClassName: styleAccount.membership_status,
  accordionClassName: styleAccount.membership_accordion,
  accordionToggleClassName: styleAccount.membership_accordion_toggle,
  accordionIconClassName: styleAccount.membership_accordion_icon,
  // totalPointsClassName: styles.membership_totalPoints,
  membershipProgressClassName: styleAccount.membership_progress,
  // membershipPromptClassName: styles.membership_prompt,
  // linkContinueClassName: styles.membership_linkContinue,
  // membershipHistoryClassName: styles.membership_history,
  // pointHistoryItemClassName: styles.membership_historyItem,
  // orderIDClassName: styles.membership_orderId,
  // transactionTypeClassName: styles.membership_transactionType,
  // transactionDateClassName: styles.membership_transactionDate,
  // pointDeltaClassName: styles.membership_point,
  // membershipPaginationClassName: styles.membership_pagination,
  // itemPerPageClassName: styles.membership_itemPerPage,
  // itemPerPageLabelClassName: styles.membership_itemPerPageLabel,
  // itemPerPageOptionsClassName: styles.membership_itemPerPageOptions,
  // buttonContinueClassName: `btn ${styles.btn_primary} ${styles.btn_long}`,
  //datepicker
  datePickerInputClassName: styleAccount.form_datePicker,
  // datePickerCalendarClassName: "date-picker__calendar",
  //popupConfirmationOrder
  // popupConfirmationOrderContainerClassName: stylesPopupConfirmationOrder.container,
  // popupConfirmationOrderContentClassName: stylesPopupConfirmationOrder.content,
  // popupConfirmationOrderTitleClassName: stylesPopupConfirmationOrder.title,
  // popupConfirmationOrderNoteClassName: stylesPopupConfirmationOrder.note,
  // popupConfirmationOrderDescriptionClassName: stylesPopupConfirmationOrder.description,
  // popupConfirmationOrderWrapButtonClassName: stylesPopupConfirmationOrder.wrapButton,
  // popupConfirmationOrderButtonConfirmClassName: stylesPopupConfirmationOrder.buttonNo,
  // popupConfirmationOrderButtonNoClassName: stylesPopupConfirmationOrder.buttonConfirm,
  //order history info
  // orderInfoContainerClassName: styles.membership_info_container,
  // OrderInfoIconClassName: styles.membership_info_icon,
  // orderInfoLabelClassName: styles.membership_info_label,
  // OrderInfoSearchHereClassName: styles.membership_info_button,
  //popupCheckPaymentOrder
  // checkPaymentOrderContainerClassName: stylesPopupCheckPaymentOrder.checkOrder_overlay,
  // checkPaymentOrderContainerBodyClassName: stylesPopupCheckPaymentOrder.checkOrder_container,
  // checkPaymentOrderHeaderClassName: stylesPopupCheckPaymentOrder.checkOrder_header,
  // checkPaymentOrderTitleClassName: stylesPopupCheckPaymentOrder.checkOrder_title,
  // checkPaymentOrderDescriptionClassName: stylesPopupCheckPaymentOrder.checkOrder_description,
  // checkPaymentOrderContentClassName: stylesPopupCheckPaymentOrder.checkOrder_content,
  // checkPaymentOrderInputContentClassName: stylesPopupCheckPaymentOrder.checkOrder_inputContent,
  // checkPaymentOrderInputTitleClassName: stylesPopupCheckPaymentOrder.checkOrder_inputTitle,
  // checkPaymentOrderInputClassName: stylesPopupCheckPaymentOrder.checkOrder_input,
  // checkPaymentOrderCloseButtonClassName: stylesPopupCheckPaymentOrder.checkOrder_closeButton,
  // checkPaymentOrderSubmitButtonClassName: stylesPopupCheckPaymentOrder.checkOrder_submitButton,
}

const orderHistoryPaginationClasses = {
  // pagingClassName: styles.pagination,
  // activeClassName: styles.pagination_active,
  // itemClassName: styles.pagination_item,
}

const AccountsPage: FC<any> = ({
  lng,
  lngDict,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const router = useRouter()
  const logout = useLogout('login')

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
    <Layout i18n={i18n} lng={lng} lngDict={lngDict} brand={brand}>
      <div className={styleAccount.account_container}>
        <div className={styleAccount.account_breadcrumb}>
          <Breadcrumb
            steps={[{ label: i18n.t('breadcrumb.home') }, { label: i18n.t('breadcrumb.account') }]}
          />
        </div>
        <div className={styleAccount.account_content}>
          <div className={styleAccount.account_header}>
            <h2 className={styleAccount.account_header_title}>{i18n.t('account.myAccount')}</h2>
            <div className={styleAccount.account_header_img}>
              <RiUser3Line size={17} />
            </div>
            <span>{name}</span>
          </div>
          <Account
            classes={classesAccount}
            orderHistoryPaginationClasses={orderHistoryPaginationClasses}
            currency={ACTIVE_CURRENCY}
            onFetchCompleted={onFetchCompleted}
            onErrorMsg={onError}
            onSuccessMsg={onSuccess}
            onSuccessChPass={onSuccessChPass}
            orderHistoryIsCallPagination={true}
            orderHistoryItemPerPage={10}
            paymentHrefPrefix="payment_notif"
            logistixStyles={{ menu: (provided) => ({ ...provided, zIndex: 3 }) }}
            passwordViewIcon={<Eye />}
            passwordHideIcon={<EyeOff />}
            passwordFulfilledCriteriaIcon={<CheckCircle color="green" size={16} />}
            passwordUnfulfilledCriteriaIcon={<CheckCircle color="gray" size={16} />}
            mapButtonCloseIcon={<RiCloseLine />}
            mapCenterIcon={<BiTargetLock />}
            membershipPaginationClasses={orderHistoryPaginationClasses}
            icons={{
              accordionIcon: <ChevronDown size={20} color="#444444" />,
              closeIcon: <RiCloseLine />,
              infoIcon: <AlertCircle />,
              iconTracker: <img src="/images/motorcycle.svg" alt="motorcycle" />,
            }}
          />
        </div>
      </div>
      {/* </div> */}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const { default: lngDict = {} } = await import(`locales/${params.lng}.json`)

  const brand = await useBrand(req)

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
      brand: brand || '',
    },
  }
}

export default AccountsPage
