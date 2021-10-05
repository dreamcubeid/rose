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
} from 'react-icons/ri'
import { BiTargetLock } from 'react-icons/bi'
import { toast } from 'react-toastify'
/* library template */
import { useBrand } from 'lib/useBrand'
import { parseCookies } from 'lib/parseCookies'
/* components */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styleAccount from 'public/scss/pages/Account.module.scss'
import styleMap from 'public/scss/components/Map.module.scss'
import styleButton from 'public/scss/components/Button.module.scss'
import styleForm from 'public/scss/components/Form.module.scss'
import stylePassword from 'public/scss/components/Password.module.scss'

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
  datePickerInputClassName: styleAccount.form_datePicker,
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
}

const AccountsPage: FC<any> = ({
  lng,
  lngDict,
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
    >
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
        </div>
        <Account
          classes={classesAccount}
          currency={ACTIVE_CURRENCY}
          onFetchCompleted={onFetchCompleted}
          onErrorMsg={onError}
          onSuccessMsg={onSuccess}
          onSuccessChPass={onSuccessChPass}
          orderHistoryIsCallPagination={true}
          orderHistoryItemPerPage={10}
          paymentHrefPrefix="payment_notif"
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
          passwordViewIcon={<RiEyeCloseLine />}
          passwordHideIcon={<RiEye2Line />}
          passwordFulfilledCriteriaIcon={<RiCheckboxCircleFill color="#53B671" size={10} />}
          passwordUnfulfilledCriteriaIcon={<RiCheckboxCircleLine color="#BCBCBC" size={10} />}
          mapButtonCloseIcon={<RiCloseLine />}
          mapCenterIcon={<BiTargetLock />}
          icons={{
            accordionIcon: <BiChevronDown />,
            closeIcon: <RiCloseLine />,
            infoIcon: <RiInformationLine size={12} color="#444444" />,
            iconTracker: <img src="/images/motorcycle.svg" alt="motorcycle" />,
          }}
        />
      </div>
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
