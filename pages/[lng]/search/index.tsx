/* library package */
import { FC, useEffect, useRef, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { 
  ProductCategory, 
  Products, 
  useI18n 
} from '@sirclo/nexus'
import { RiQuestionFill, RiSearch2Line } from 'react-icons/ri'
/* library template */
import { useBrand } from 'lib/useBrand'
import useWindowSize from 'lib/useWindowSize'
import useQuery from 'lib/useQuery'
/* components */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import EmptyComponent from 'components/EmptyComponent/EmptyComponent'
import Loader from 'components/Loader/Loader'
/* style */
import styleProducts from 'public/scss/pages/Products.module.scss'
import styleProduct from 'public/scss/components/Product.module.scss'
import styleSearch from 'public/scss/pages/Search.module.scss'
import styleForm from 'public/scss/components/Form.module.scss'
import styleButton from 'public/scss/components/Button.module.scss'

const classesProducts = {
  productContainerClassName: `col-6 product_list ${styleProduct.product_itemContainer}`,
  stickerContainerClassName: `${styleProduct.product_sticker} ${styleProduct.product_stickerGrid}`,
  outOfStockLabelClassName: `${styleProduct.product_stickerLabel} ${styleProduct.product_stickerLabel__outofstock}`,
  saleLabelClassName: `${styleProduct.product_stickerLabel} ${styleProduct.product_stickerLabel__sale}`,
  comingSoonLabelClassName: `${styleProduct.product_stickerLabel} ${styleProduct.product_stickerLabel__comingsoon}`,
  openOrderLabelClassName: `${styleProduct.product_stickerLabel} ${styleProduct.product_stickerLabel__openorder}`,
  preOrderLabelClassName: `${styleProduct.product_stickerLabel} ${styleProduct.product_stickerLabel__preorder}`,
  newLabelClassName: `${styleProduct.product_stickerLabel} ${styleProduct.product_stickerLabel__new}`,
  productImageContainerClassName: styleProduct.product_link,
  productImageClassName: styleProduct.product_itemContainerImage,
  productLabelContainerClassName: styleProduct.product_label,
  productTitleClassName: styleProduct.product_label__title,
  productPriceClassName: styleProduct.product_labelPrice,
  salePriceClassName: styleProduct.product_labelPrice__sale,
  priceClassName: styleProduct.product_labelPrice__price,
}

const classesProductCategory = {
  parentCategoryClassName: `${styleProducts.category} p-0`,
  categoryItemClassName: styleProducts.category_list,
  categoryValueContainerClassName: `${styleProducts.category_listContainer} ${styleSearch.category_listContainer}`,
  categoryValueClassName: styleProducts.category_listLink,
  categoryNameClassName: `${styleProducts.category_listItem} ${styleSearch.category_listItem}`,
  categoryNumberClassName: styleProducts.category_listTotalNumber,
  imgClassName: 'w-100',
  dropdownIconClassName: 'd-none',
  childCategoryClassName: 'd-none',
}

const LoginPage: FC<any> = ({
  lng,
  lngDict,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const i18n: any = useI18n()
  const size = useWindowSize()

  const categories: string = useQuery('categories')
  const tagname: string | string[] = router.query.tagname || null
  const q: string | string[] = router.query.q || null

  const [searchValue, setSearchValue] = useState<string>('')
  const inputRef = useRef(null)

  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    itemPerPage: 8,
    totalItems: 0,
    curPage: 0,
  })

  useEffect(() => {
    if (q) setSearchValue(q as string)
  }, [q])

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push({
      query: {
        lng,
        q: searchValue,
      },
    })
  }

  return (
    <Layout 
      i18n={i18n} 
      lng={lng} 
      lngDict={lngDict} 
      brand={brand}
    >
      <div className={styleSearch.container}>
        <div className={styleSearch.container_search}>
          <form action="#" onSubmit={handleSubmit}>
            <div className={`${styleForm.form} ${styleSearch.search}`}>
              <input
                type="search"
                placeholder={i18n.t('header.searchPlaceholder')}
                ref={inputRef}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button type="submit">
                <RiSearch2Line color="#998060" />
              </button>
            </div>
          </form>
        </div>
        <div className={styleSearch.container_header}>
          <Breadcrumb
            steps={[{ label: i18n.t('breadcrumb.home') }, { label: i18n.t('breadcrumb.search') }]}
          />
        </div>
        <div className={styleSearch.container_content}>
          {!q ? (
            <>
              <ProductCategory
                isSelect
                showImages={true}
                heightImage={113}
                thumborSetting={{
                  width: 340,
                  format: 'webp',
                  quality: 90,
                }}
                classes={classesProductCategory}
                withOpenedSubCategory
                imageFallback={<div className={styleSearch.imageFallback}></div>}
              />
              <div>
                <button
                  className={`${styleButton.btn} ${styleButton.btn_secondary}`}
                  onClick={() => router.push(`/${lng}/products`)}
                >
                  {i18n.t('products.seeAllProduct')}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="container">
                <div className={styleProducts.products_header}>
                  <h6 className={styleProducts.products_headerTotalItem}>
                    {i18n.t('products.show')} {pageInfo.totalItems} {i18n.t('products.item')}
                  </h6>
                </div>
              </div>
              <div className={`container ${styleProducts.products}`}>
                <div className="row">
                  <Products
                    tagName={tagname}
                    pageNumber={pageInfo.pageNumber}
                    itemPerPage={pageInfo.itemPerPage}
                    getPageInfo={setPageInfo as any}
                    collectionSlug={categories}
                    withSeparatedVariant={true}
                    classes={classesProducts}
                    fullPath={`product/{id}`}
                    pathPrefix={`product`}
                    lazyLoadedImage={false}
                    thumborSetting={{
                      width: size.width < 768 ? 512 : 800,
                      format: 'webp',
                      quality: 85,
                    }}
                    emptyStateComponent={
                      <div className="col-12 my-3">
                        <EmptyComponent
                          icon={<RiQuestionFill color="#A8A8A8" size={20} />}
                          title={i18n.t('product.isEmpty')}
                        />
                      </div>
                    }
                    loadingComponent={
                      <div className="col-12">
                        <div className="d-flex justify-content-center align-center my-5">
                          <Loader color="text-secondary" withText />
                        </div>
                      </div>
                    }
                  />
                  <div className="col-12">
                    <button
                      className={`${styleButton.btn} ${styleButton.btn_secondary}`}
                      onClick={() => router.push({
                        pathname:`/${lng}/products`,
                        query:{ q }
                      })}
                    >
                      {i18n.t('products.seeAllProduct')}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
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

export default LoginPage
