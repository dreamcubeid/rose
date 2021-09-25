import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { IoArrowBackOutline } from 'react-icons/io5'
import { BlogSingle, useI18n, BlogRecent } from '@sirclo/nexus'
import Layout from 'components/Layout/Layout'
import { useBrand } from 'lib/useBrand'
import styleBlog from 'public/scss/pages/Blog.module.scss'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'

const Placeholder = dynamic(() => import('components/Placeholder'))
const Popup = dynamic(() => import('components/Popup/Popup'))
const SocialShare = dynamic(() => import('components/SocialShare'))

const classesBlogSingle = {
  blogContainerClassName: styleBlog.blog_detail,
  headerClassName: styleBlog.blog_detail_header,
  headerContentClassName: styleBlog.blog_detail_title,
  headerEndClassName: 'd-none',
  authorPicContainerClassName: 'd-none',
  authorPicClassName: 'd-none',
  authorInfoClassName: 'd-none',
  // createdByClassName: `d-flex flex-row align-items-center justify-content-start flex-nowrap w-100`,
  createdByInnerClassName: styleBlog.blog_detail_desc,
  // authorClassName: 'd-flex flex-row align-items-center justify-content-start order-2',
  // dateClassName: 'd-flex flex-row align-items-center justify-content-start order-1',
  blogContentClassName: styleBlog.blog_detail_content,
}

const classesBlogCategories = {
  // containerClassName: styles.blog_category,
  // categoryClassName: styles.blog_categoryItem,
  // linkClassName: styles.blog_categoryLink,
}

const classesPlaceholderBlogs = {
  // placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_blogsList}`,
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
  const [totalCategories, setTotalCategories] = useState(null)
  const [showShare, setShowShare] = useState<boolean>(false)
  const toggleShare = () => setShowShare(!showShare)
  const [title, setTitle] = useState<string>('')

  const router = useRouter()

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
          loadingComponent={<></>}
        />
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
              <>
                <Placeholder classes={classesPlaceholderBlogs} withImage />
                <Placeholder classes={classesPlaceholderBlogs} withImage />
                <Placeholder classes={classesPlaceholderBlogs} withImage />
              </>
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
