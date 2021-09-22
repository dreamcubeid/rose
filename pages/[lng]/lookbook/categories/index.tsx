/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { RiQuestionFill } from 'react-icons/ri'
import { 
  Lookbook, 
  isLookbookAllowed, 
  useI18n 
} from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
/* components */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import EmptyComponent from 'components/EmptyComponent/EmptyComponent'
/* styles */
import styleLookbook from 'public/scss/pages/Lookbook.module.scss'
import stylePlaceHolder from 'public/scss/components/Placeholder.module.scss'

const classesLookbook = {
  containerClassName: styleLookbook.lookbook_content,
  lookbookContainerClassName: styleLookbook.lookbook_item,
  imageClassName: styleLookbook.lookbook_image,
  lookbookLabelContainerClassName: styleLookbook.lookbook_itemDetail,
  labelClassName: styleLookbook.lookbook_label,
  linkClassName: styleLookbook.lookbook_link,
}

const LookbookCategory: FC<any> = ({
  lng,
  lngDict,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const LookbookAllowed = isLookbookAllowed()

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      withAllowed={LookbookAllowed}
      headerTitle={i18n.t('lookbook.title')}
    >
      <div className={styleLookbook.lookbook_container}>
        <div className={styleLookbook.lookbook_breadcrumb}>
          <Breadcrumb
            steps={[{ label: i18n.t('breadcrumb.home') }, { label: i18n.t('breadcrumb.lookbook') }]}
          />
        </div>
        <Lookbook
          classes={classesLookbook}
          linkText={i18n.t('lookbook.seeCollection')}
          pathPrefix={`lookbook/categories`}
          loadingComponent={
            <>
              <div className={stylePlaceHolder.placeholderItem} style={{ height: 375 }} />
              <div className={stylePlaceHolder.placeholderItem} style={{ height: 375 }} />
            </>
          }
          emptyStateComponent={
            <div className={styleLookbook.lookbook_empty}>
              <EmptyComponent
                title={i18n.t('lookbook.isEmpty')}
                icon={<RiQuestionFill color="#BCBCBC" />}
                button={
                  <Link href="/[lng]" as={`/${lng}`}>
                    <a>{i18n.t('lookbook.back')}</a>
                  </Link>
                }
              />
            </div>
          }
          thumborSetting={{
            width: 600,
            format: 'webp',
            quality: 85,
          }}
        />
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const { default: lngDict = {} } = await import(`locales/${params.lng}.json`)

  const brand = await useBrand(req)

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || '',
    },
  }
}

export default LookbookCategory
