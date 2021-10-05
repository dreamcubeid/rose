/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { IoArrowBackOutline } from 'react-icons/io5'
import {
  BlogSingle,
  useI18n,
  BlogRecent
} from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
/* components */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import SocialShare from 'components/SocialShare'
/* styles */
import styleBlog from 'public/scss/pages/Blog.module.scss'

const classesBlogSingle = {
  blogContainerClassName: styleBlog.blog_detail,
  headerClassName: styleBlog.blog_detail_header,
  headerContentClassName: styleBlog.blog_detail_title,
  headerEndClassName: 'd-none',
  authorPicContainerClassName: 'd-none',
  authorPicClassName: 'd-none',
  authorInfoClassName: 'd-none',
  createdByInnerClassName: styleBlog.blog_detail_desc,
  blogContentClassName: styleBlog.blog_detail_content,
}

const classesBlogRecent = {
  containerClassName: styleBlog.blog_items,
  blogRecentClassName: styleBlog.blog_item,
  imageClassName: styleBlog.blog_item_imageContainer,
  labelContainerClassName: 'm-0',
  titleClassName: styleBlog.blog_item_title,
  dateClassName: styleBlog.blog_item_innerFooter,
}

const BlogSlug: FC<any> = ({
  lng,
  lngDict,
  slug,
  brand,
  urlSite,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const [title, setTitle] = useState<string>('')

  return (
    <Layout i18n={i18n} lng={lng} lngDict={lngDict} brand={brand}>
      <div className={styleBlog.blog_container}>
        <div className={styleBlog.blog_header}>
          <Breadcrumb
            steps={[
              { label: i18n.t('breadcrumb.home') },
              {
                label: i18n.t('breadcrumb.blog'),
                linkProps: {
                  href: '/[lng]/blog',
                  as: `/${lng}/blog`,
                },
              },
              { label: title },
            ]}
          />
        </div>
        <BlogSingle
          getTitle={setTitle}
          classes={classesBlogSingle}
          ID={slug.toString()}
          timeIcon={','}
          authorIcon={i18n.t('blog.by')}
          loadingComponent={
            <div className="w-100 text-center">
              <span className="spinner-border" />
            </div>
          }
        />
        <div className={styleBlog.blog_shareContainer}>
          <div>
            <SocialShare
              urlSite={urlSite}
              title={i18n.t("article.share")}
              />
          </div>
        </div>
        <div className={styleBlog.blog_recent}>
          <div className={styleBlog.blog_recent_title}>{i18n.t('blog.recentPost')}</div>

          <BlogRecent
            classes={classesBlogRecent}
            limit={5}
            linkPrefix="blog"
            thumborSetting={{
              width: 100,
              format: 'webp',
              quality: 85,
            }}
            loadingComponent={
              <div className="w-100 text-center">
                <span className="spinner-border" />
              </div>
            }
          />
          <div className={styleBlog.blog_footer}>
            <Link href="/[lng]/blog" as={`/${lng}/blog`}>
              <a>
                <IoArrowBackOutline color="#998060" size={12} />
                <span>{i18n.t('blog.back')}</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const { slug } = params
  const { default: lngDict = {} } = await import(`locales/${params.lng}.json`)

  const brand = await useBrand(req)

  const urlSite = `https://${req.headers.host}/${params.lng}/blog/${slug}`

  return {
    props: {
      lng: params.lng,
      lngDict,
      slug: params.slug,
      brand: brand || '',
      urlSite: urlSite,
    },
  }
}

export default BlogSlug
