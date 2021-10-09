/* Library Package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import {
  HiCheckCircle,
  HiChevronDown,
  HiChevronUp
} from 'react-icons/hi'
import { ThankYou, useI18n } from '@sirclo/nexus'
/* Library Template */
import { useBrand } from 'lib/useBrand'
/* Components */
import Layout from 'components/Layout/Layout'
import HeaderCheckout from 'components/Header/HeaderCheckout'
/* Styles */
import styleBtn from 'public/scss/components/Button.module.scss'
import styleOrderDetail from 'public/scss/components/OrderDetail.module.scss'
import styleBankAccount from 'public/scss/components/BankAccount.module.scss'
import styles from 'public/scss/pages/ThankYou.module.scss'

const classesThankYouPage = {
  // Thank you
  thankYouClassName: styles.thankYou_inner,
  thankYouMessageClassName: styles.thankYou_message,
  thankYouOrderID: styles.thankyou_orderID,
  buttonClassName: `${styleBtn.btn} ${styleBtn.btn_primary} mt-4`,
  // Order Detail
  detailContainerClassName: styleOrderDetail.orderDetail,
  detailHeaderClassName: styleOrderDetail.orderDetail_header,
  detailTitleClassName: styleOrderDetail.orderDetail_headerTitle,
  detailStatusClassName: styleOrderDetail.orderDetail_status,
  detailContentClassName: styleOrderDetail.orderDetail_content,
  detailHeaderDropdownClassName: styleOrderDetail.orderDetail_contentHeader,
  detailTotalAmountClassName: styleOrderDetail.orderDetail_contentTotalAmount,
  detailDropdownClassName: styleOrderDetail.orderDetail_contentDropdown,
  detailBodyDropdownClassName: styleOrderDetail.orderDetail_body,
  detailItemClassName: styleOrderDetail.orderDetail_item,
  detailItemImgClassName: styleOrderDetail.orderDetail_itemImage,
  detailItemLabelClassName: styleOrderDetail.orderDetail_itemLabel,
  detailItemPriceClassName: styleOrderDetail.orderDetail_itemPrice,
  detailPriceBreakdownClassName: styleOrderDetail.orderDetail_breakdown,
  detailFieldClassName: styleOrderDetail.orderDetail_breakdownField,
  detailTotalFieldClassName: styleOrderDetail.orderDetail_breakdownTotal,
  paymentStatusCancelledClassName: styleOrderDetail.orderDetail_statusCancelled,
  paymentStatusReturnedClassName: styleOrderDetail.orderDetail_statusCancelled,
  // Payment
  bankAccountInformationClassName: styles.thankYou_paymentInformation,
  bankAccountContainerClassName: styleBankAccount.bankAccount_container,
  bankAccountSectionClassName: styleBankAccount.bankAccount_section,
  bankAccountHeaderClassName: styleBankAccount.bankAccount_header,
  bankAccountTitleSectionClassName: styleBankAccount.bankAccount_titleSection,
  bankAccountLogoClassName: styleBankAccount.bankAccount_logo,
  bankAccountTitleClassName: styleBankAccount.bankAccount_title,
  bankAccountIconCollapseClassName: styleBankAccount.bankAccount_iconCollapse,
  bankAccountBodyClassName: styleBankAccount.bankAccount_body,
  bankAccountInfoAccountClassName: styleBankAccount.bankAccount_infoAccount,
  bankAccountNumberSectionClassname: styleBankAccount.bankAccount_accountNumber,
  bankAccountLabelAccountNumberClassName: styleBankAccount.bankAccount_labelAccount,
  bankAccountLabelAccountNameClassName: styleBankAccount.bankAccount_labelAccountName,
  bankAccountCopyButtonClassName: `btn ${styleBankAccount.bankAccount_copyButtonIcon}`,
}

const ThankYouPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const router: any = useRouter()

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      withHeader={false}
      withFooter={false}
      withCopyright
      layoutClassName='layout_fullHeight'
    >
      <HeaderCheckout
        i18n={i18n}
      />
      <div className={styles.thankYou_header}>
        <h3 className={styles.thankYou_headerTitle}>
          {i18n.t("thankYou.thanks")}
        </h3>
        <HiCheckCircle color="#53B671" size={30} />
      </div>
      <ThankYou
        thankYouImageURL={<span></span>}
        classes={classesThankYouPage}
        onSuccessMsg={(msg) => toast.success(msg)}
        withOrderDetails
        icon={{
          chevronUp: <HiChevronUp size={20} color="#3677C3" />,
          chevronDown: <HiChevronDown size={20} color="#3677C3" />
        }}
      />
      <div className={styles.thankYou_footer}>
        <button
          className={`${styleBtn.btn} ${styles.thankYou_footerBtn}`}
          onClick={() => router.push(`/${lng}/products`)}
        >
          {i18n.t("thankYou.continueShopping")}
        </button>
      </div>
    </Layout>
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
      brand: brand || ''
    }
  }
}

export default ThankYouPage
