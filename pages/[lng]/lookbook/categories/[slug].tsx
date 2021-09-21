/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { 
  isLookbookAllowed, 
  LookbookSingle, 
  useI18n 
} from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
import useWindowSize from 'lib/useWindowSize'
/* components */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styleLookbook from 'public/scss/pages/Lookbook.module.scss'

const classesLookbookSingle = {
  containerClassName: `w-100`,
  rowClassName: styleLookbook.lookbook_detail,
  imageClassName: 'd-none',
  thumbnailImageClassName: styleLookbook.lookbook_detail_img,
}

const LookbookSinglePage: FC<any> = ({
  lng,
  lngDict,
  slug,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const size = useWindowSize()
  const LookbookAllowed = isLookbookAllowed()

  const [title, setTitle] = useState<string>('')

  return (
    <Layout 
      i18n={i18n} 
      lng={lng} 
      lngDict={lngDict} 
      brand={brand} 
      withAllowed={LookbookAllowed}
    >
      <div className={styleLookbook.lookbook_container}>
        <div className={styleLookbook.lookbook_breadcrumb}>
          <Breadcrumb
            steps={[
              { label: i18n.t('breadcrumb.home') },
              {
                label: i18n.t('breadcrumb.lookbook'),
                linkProps: {
                  href: '/[lng]/lookbook/categories',
                  as: `/${lng}/lookbook/categories`,
                },
              },
              { label: title },
            ]}
          />
        </div>

        <div className={styleLookbook.lookbook_detail_title}>
          <h1>{title}</h1>
        </div>

        <LookbookSingle
          classes={classesLookbookSingle}
          slug={slug}
          getTitle={setTitle}
          loadingComponent={<></>}
          emptyStateComponent={<></>}
          mode="thumbnail"
          thumborSetting={{
            width: size.width < 768 ? 400 : 600,
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
      slug: params.slug,
      lngDict,
      brand: brand || '',
    },
  }
}

export default LookbookSinglePage
