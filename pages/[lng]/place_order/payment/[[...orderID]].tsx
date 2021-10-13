/* Library Package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { HiXCircle, HiExclamationCircle } from 'react-icons/hi'
import { useI18n, usePaymentLink } from '@sirclo/nexus'
/* Library Template */
import { useBrand } from 'lib/useBrand'
/* Components */
import Layout from 'components/Layout/Layout'
import HeaderCheckout from 'components/Header/HeaderCheckout'
/* Styles */
import styleBtn from 'public/scss/components/Button.module.scss'
import styles from 'public/scss/pages/PaymentStatus.module.scss'

type TypePaymentStatus = {
  title?: string
  contentDesc?: string
}

const PaymentStatus: FC<any> = ({
  lng,
  lngDict,
  brand,
  orderID,
  status
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const router: any = useRouter()
  const { data } = usePaymentLink(orderID)

  const statusPayment = {
    FAILED: 'failed',
    UNFINISH: 'unfinish',
    NOTFOUND: 'orderNotFound'
  }

  let paymentStatus: TypePaymentStatus

  if (data === undefined || status === '') status = 'orderNotFound'

  switch (status) {
    case statusPayment.FAILED:
      paymentStatus = {
        title: i18n.t('paymentStatus.titleFailed'),
        contentDesc: i18n.t('paymentStatus.failedDesc')
      }
      break
    case statusPayment.UNFINISH:
      paymentStatus = {
        title: i18n.t('paymentStatus.titleUnfinish'),
        contentDesc: i18n.t('paymentStatus.unfinishDesc')
      }
      break
    default:
      paymentStatus = {
        title: i18n.t('paymentStatus.orderNotFound'),
        contentDesc: i18n.t('paymentStatus.orderNotFoundDesc')
      }
  }

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
      <div className={styles.paymentStatus}>
        <div className={styles.paymentStatus_header}>
          <h3 className={styles.paymentStatus_headerTitle}>
            {paymentStatus?.title}
          </h3>
          {status === statusPayment.FAILED || status === statusPayment.NOTFOUND ?
            <HiXCircle color="#CC4534" size={30} /> :
            <HiExclamationCircle color="#F2C14F" size={30} />
          }
        </div>
        <div className={styles.paymentStatus_content}>
          <p className={styles.paymentStatus_contentDesc}>
            {paymentStatus?.contentDesc}
          </p>
        </div>
        <div className={styles.paymentStatus_action}>
          {status !== statusPayment.NOTFOUND &&
            <button
              className={`${styleBtn.btn} ${styleBtn.btn_primary} mb-2`}
              onClick={() => {
                window.location.href = data.orders[0].paymentLinks[0]
              }}
            >
              {i18n.t('paymentStatus.tryAgain')}
            </button>
          }
          {status !== statusPayment.UNFINISH &&
            <button
              className={`
                ${styleBtn.btn} ${styleBtn.btn_primary} 
                ${status === statusPayment.FAILED && styles.paymentStatus_btnFailed}
              `}
              onClick={() => router.push('/[lng]/products', `/${lng}/products`)}
            >
              {i18n.t('paymentStatus.continueShopping')}
            </button>
          }
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  )

  const brand = await useBrand(req)
  const [orderID, status] = params?.orderID as string[]

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || '',
      orderID: orderID || '',
      status: status || '',
    }
  }
}

export default PaymentStatus