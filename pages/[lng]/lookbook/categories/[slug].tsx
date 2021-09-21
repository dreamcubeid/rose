import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { isLookbookAllowed, LookbookSingle, useI18n } from '@sirclo/nexus'
import { useBrand } from 'lib/useBrand'
import useWindowSize from 'lib/useWindowSize'
import Layout from 'components/Layout/Layout'
import Placeholder from 'components/Placeholder'

import styleLookbook from 'public/scss/pages/Lookbook.module.scss'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'

const classesLookbookSingle = {
  containerClassName: `w-100`,
  rowClassName: styleLookbook.lookbook_detail,
  imageClassName: 'd-none',
  thumbnailImageClassName: styleLookbook.lookbook_detail_img,
  // activeClassName: '',
}

const classesPlaceholderLookbook = {
  // placeholderList: `${styles.lookbook_placeholder} d-block p-0 mt-0 mb-3 mx-auto w-100`,
}

const LookbookSinglePage: FC<any> = ({
  lng,
  lngDict,
  slug,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const router = useRouter()
  const size = useWindowSize()
  const LookbookAllowed = isLookbookAllowed()

  const [title, setTitle] = useState<string>('')

  return (
    <Layout i18n={i18n} lng={lng} lngDict={lngDict} brand={brand} withAllowed={LookbookAllowed}>
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
          loadingComponent={
            <></>
            // <div className="mt-3">
            //   <Placeholder classes={classesPlaceholderLookbook} withList listMany={5} />
            // </div>
          }
          emptyStateComponent={
            <></>
            // <p className="d-flex flex-row align-items-center justify-content-center text-align-center p-5">
            //   {i18n.t('lookbook.isEmpty')}
            // </p>
          }
          mode="thumbnail"
          thumborSetting={{
            width: size.width < 768 ? 400 : 600,
            format: 'webp',
            quality: 85,
          }}
        />

        {/* <div
              className={`${styles.lookbook_nav} d-flex flex-row align-items-center justify-content-between`}
            >
              <button onClick={() => router.back()}>{i18n.t('global.back')}</button>
            </div>
          </div> */}
        {/* </div> */}
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
