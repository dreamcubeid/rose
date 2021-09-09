/* library package */
import {
  FC,
  useState,
  useEffect
} from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { RiQuestionFill } from 'react-icons/ri'
import {
  Products,
  ProductFilter,
  ProductCategory,
  useI18n,
} from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
import useQuery from 'lib/useQuery'
import useInfiniteScroll from 'lib/useInfiniteScroll'
import useWindowSize from 'lib/useWindowSize'
/* components */
import SEO from 'components/SEO'
import Layout from 'components/Layout/Layout'
import EmptyComponent from 'components/EmptyComponent/EmptyComponent'
const Popup = dynamic(() => import('components/Popup/Popup'))
/* styles */
import styleButton from 'public/scss/components/Button.module.scss'
import styleProduct from 'public/scss/components/Product.module.scss'
import styleProducts from 'public/scss/pages/Products.module.scss'
import Loader from 'components/Loader/Loader'

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

const classesProductSort = {
  sortClassName: `form-group ${styleProducts.sirclo_form_select}`,
  sortOptionsClassName: `form-control ${styleProducts.sirclo_form_input}`,
}

const classesProductFilterSort = {
  filterClassName: styleProducts.products_filter,
  filterNameClassName: styleProducts.products_filterName,
  filterOptionPriceClassName: styleProducts.products_filterPrice,
  filterPriceLabelClassName: styleProducts.products_filterPriceLabel,
  filterPriceInputClassName: styleProducts.products_filterPriceInput,
  filterOptionClassName: styleProducts.products_filterOption,
  filterColorLabelClassName: styleProducts.products_filterOptionLabel,
  filterLabelClassName: styleProducts.products_filterOptionLabel,
  filterCheckboxClassName: styleProducts.products_filterOptionCheckbox,
  filterSliderClassName: styleProducts.products_filterSlider,
  filterSliderRailClassName: styleProducts.products_filterSliderRail,
  filterSliderHandleClassName: styleProducts.products_filterSliderHandle,
  filterSliderTrackClassName: styleProducts.products_filterSliderTrack,
  filterSliderTooltipClassName: styleProducts.products_filterSliderTooltip,
  filterSliderTooltipContainerClassName: styleProducts.products_filterSliderTooltipContainer,
  filterSliderTooltipTextClassName: styleProducts.products_filterSliderTooltipText,
}

const classesProductCategory = {
  parentCategoryClassName: styleProducts.category_order,
  categoryItemClassName: styleProducts.category_list,
  categoryValueClassName: styleProducts.category_list_link,
  categoryNameClassName: styleProducts.category_list_item,
  categoryNumberClassName: "ml-1",
  dropdownIconClassName: "d-none",
}

const ProductsPage: FC<any> = ({
  lng,
  lngDict,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const i18n: any = useI18n()
  const size = useWindowSize()

  const categories: string = useQuery("categories")
  const tagname: string | string[] = router.query.tagname || null

  const [openSort, setOpenSort] = useState<boolean>(false)
  const [sort, setSort] = useState(null)
  const [filterProduct, setFilterProduct] = useState({})

  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    itemPerPage: 6,
    totalItems: 0,
  })

  const { currPage, setCurrPage } = useInfiniteScroll(pageInfo, "product_list")

  useEffect(() => {
    setCurrPage(0)
  }, [filterProduct, categories, tagname, sort])

  const toogleSort = () => setOpenSort(!openSort)
  const handleFilter = (selectedFilter: any) => setFilterProduct(selectedFilter)

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      headerTitle={i18n.t("products.title")}
    >
      <SEO title={i18n.t("product.products")} />
      <div className="container mt-5 pt-4 pb-3">
        <span>Beranda / Semua Product</span>
      </div>
      <div className="container">
        <div className={styleProducts.products_header}>
          <h6 className={styleProducts.products_headerTotalItem}>
            {i18n.t("products.show")} {pageInfo.totalItems} {i18n.t("products.item")}
          </h6>
          <div className={styleProducts.products_headerCustomize}>
            <img src="/icons/filter.svg" alt="customize" />
            {i18n.t("products.customize")}
          </div>
        </div>
      </div>
      <div className={`container ${styleProducts.products}`}>
        <div className="row">
          {Array.from(Array(currPage + 1)).map((_, i) => (
            <Products
              key={i}
              tagName={tagname}
              pageNumber={i}
              itemPerPage={pageInfo.itemPerPage}
              getPageInfo={setPageInfo as any}
              collectionSlug={categories}
              sort={sort}
              filter={filterProduct}
              withSeparatedVariant={true}
              classes={classesProducts}
              fullPath={`product/{id}`}
              pathPrefix={`product`}
              lazyLoadedImage={false}
              thumborSetting={{
                width: size.width < 768 ? 512 : 800,
                format: "webp",
                quality: 85,
              }}
              emptyStateComponent={
                <div className="col-12 my-3">
                  <EmptyComponent
                    icon={<RiQuestionFill color="#A8A8A8" size={20} />}
                    title={i18n.t("product.isEmpty")}
                  />
                </div>
              }
              loadingComponent={
                <div className="col-12">
                  <div className="d-flex justify-content-center align-center my-5">
                    <Loader
                      color="text-secondary"
                      withText
                    />
                  </div>
                </div>
              }
            />
          ))}
          {(pageInfo.totalItems === 0) &&
            <div className="col-12">
              <button
                className={`${styleButton.btn} ${styleButton.btn_secondary}`}
                onClick={() => router.push(`/${lng}/products`)}
              >
                {i18n.t("products.seeAllProduct")}
              </button>
            </div>
          }
        </div>
      </div>
      {openSort && (
        <Popup
          withHeader
          setPopup={toogleSort}
          popupTitle={i18n.t("product.adjust")}
        >
          <div className={styleProducts.products_sortLabel}>
            {i18n.t("product.sort")}
          </div>
          <ProductCategory
            classes={classesProductCategory}
            showCategoryNumber={false}
          />
          <ProductFilter
            withSort
            sortType="dropdown"
            sortClasses={classesProductSort}
            classes={classesProductFilterSort}
            withPriceMinimumSlider
            withPriceValueLabel
            withPriceInput
            withTooltip
            handleFilter={handleFilter}
            handleSort={(selectedSort: any) => {
              setSort(selectedSort)
              setOpenSort(false)
            }}
          />
        </Popup>
      )}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { default: lngDict = {} } = await import(`locales/${params.lng}.json`)

  const brand = await useBrand(req)

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ""
    }
  }
}

export default ProductsPage
