/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { GiftCard, useI18n } from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
/* components */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styleGift from 'public/scss/pages/GiftCard.module.scss'
import styleForm from 'public/scss/components/Form.module.scss'
import styleButton from 'public/scss/components/Button.module.scss'

const classesGiftCard = {
  containerClassName: styleGift.gift_body,
  inputContainerClassName: `${styleForm.form} ${styleGift.gift_form}`,
  note: 'd-none',
  buttonClassName: `${styleButton.btn} ${styleButton.btn_primary}`
}

const GiftCardPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const i18n: any = useI18n()

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      withFooter={false}
      headerTitle={i18n.t("giftCard.title")}
    >
      <div className={styleGift.gift_container}>
        <div className={styleGift.gift_header}>
          <Breadcrumb
            steps={[
              { label: i18n.t('breadcrumb.home') },
              {
                label: i18n.t('breadcrumb.giftCard'),
              },
            ]}
          />
        </div>
        <div className={styleGift.gift_info}>{i18n.t("giftCard.info")}</div>
        <GiftCard
          classes={classesGiftCard}
        />
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req
}) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  )

  const brand = await useBrand(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ''
    }
  }
}

export default GiftCardPage;
