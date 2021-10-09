/* library package */
import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { RiQuestionFill } from 'react-icons/ri'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { useI18n, Blogs, BlogCategories, getBlogHeaderImage, isBlogAllowed } from '@sirclo/nexus'
/* library template */
import { GRAPHQL_URI } from 'lib/Constants'
import { useBrand } from 'lib/useBrand'
/* components */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styleBlog from 'public/scss/pages/Blog.module.scss'
import stylePlaceHolder from 'public/scss/components/Placeholder.module.scss'
import stylePagination from 'public/scss/components/Pagination.module.scss'

const EmptyComponent = dynamic(() => import('components/EmptyComponent/EmptyComponent'))

const classesBlogs = {
  blogsContainerClassName: styleBlog.blog_items,
  blogContainerClassName: `blog_list ${styleBlog.blog_item}`,
  categoryClassName: 'd-none',
  contentContainerClassName: 'd-none',
  imageContainerClassName: styleBlog.blog_item_imageContainer,
  descriptionClassName: styleBlog.blog_item_content,
  titleClassName: styleBlog.blog_item_title,
  authorClassName: styleBlog.blog_item_author,
  descriptionInnerFooterClassName: styleBlog.blog_item_innerFooter,
  dateClassName: styleBlog.blog_item_innerFooterDate,
}

const classesBlogCategories = {
  containerClassName: styleBlog.blog_category,
  categoryClassName: styleBlog.blog_categoryItem,
  linkClassName: '',
}

const classesPagination = {
  pagingClassName: stylePagination.pagination,
  itemClassName: stylePagination.pagination_item,
  activeClassName: stylePagination.pagination_active,
}

const Blog: FC<any> = ({
  lng,
  lngDict,
  headerImage,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const router = useRouter()
  const page: string | string[] = router.query.page || '0'

  const [totalCategories, setTotalCategories] = useState(null)
  const BlogAllowed = isBlogAllowed()
  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    itemPerPage: 5,
    totalItems: 0,
  })
  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      headerTitle={i18n.t('blog.title')}
      withAllowed={BlogAllowed}
    >
      <div className={styleBlog.blog_container}>
        <div className={styleBlog.blog_header}>
          <Breadcrumb
            steps={[{ label: i18n.t('breadcrumb.home') }, { label: i18n.t('breadcrumb.blog') }]}
          />
        </div>
        <div className={styleBlog.blog_body}>
          {headerImage ? (
            <div
              style={{
                height: '211px',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundImage: `url(${headerImage})`,
              }}
            />
          ) : null}
          <div className={styleBlog.blog_categoryContainer}>
            <ul className={styleBlog.blog_category}>
              <Link href="/[lng]/blog" as={`/${lng}/blog`}>
                <li className={styleBlog.blog_categoryItem}>{i18n.t('blog.allBlog')}</li>
              </Link>
            </ul>
            {(totalCategories > 0 || totalCategories === null) && (
              <BlogCategories
                classes={classesBlogCategories}
                getCategoriesCount={(categoriesCount) => {
                  setTotalCategories(categoriesCount)
                }}
              />
            )}
          </div>
          <div>
            <Blogs
              classes={classesBlogs}
              paginationClasses={classesPagination}
              pageNumber={+page}
              itemPerPage={pageInfo.itemPerPage}
              getPageInfo={setPageInfo as any}
              thumborSetting={{
                width: 64,
                format: 'webp',
                quality: 85,
              }}
              paginationNextLabel={<IoChevronForward />}
              paginationPrevLabel={<IoChevronBack />}
              showAuthorBeforeDate
              LoadingComponent={
                <div className={stylePlaceHolder.placeholderItem} style={{ height: 550 }} />
              }
              emptyStateComponent={
                <div className={styleBlog.blog_empty}>
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
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const { default: lngDict = {} } = await import(`locales/${params.lng}.json`)

  const brand = await useBrand(req)
  const headerImage = await getBlogHeaderImage(GRAPHQL_URI(req))

  return {
    props: {
      lng: params.lng,
      lngDict,
      headerImage,
      brand: brand || '',
    },
  }
}

export default Blog
