/* library package */
import {
  FC,
  useState,
  useEffect
} from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import {
  RiQuestionFill,
  RiCloseLine
} from 'react-icons/ri'
import {
  FaChevronDown
} from 'react-icons/fa'
import {
  Products,
  ProductFilter,
  ProductCategory,
  useI18n,
  ProductSort,
} from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
import useQuery from 'lib/useQuery'
import useInfiniteScroll from 'lib/useInfiniteScroll'
import useWindowSize from 'lib/useWindowSize'
/* components */
import SEO from 'components/SEO'
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import EmptyComponent from 'components/EmptyComponent/EmptyComponent'
const Popup = dynamic(() => import('components/Popup'))
/* styles */
import styleButton from 'public/scss/components/Button.module.scss'
import styleProduct from 'public/scss/components/Product.module.scss'
import styleSort from 'public/scss/components/Sort.module.scss'
import styleFilter from 'public/scss/components/Filter.module.scss'
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
  sortClassName: styleSort.sort,
  sortOptionsClassName: styleSort.sort_options,
  sortOptionClassName: styleSort.sort_optionItem,
  sortOptionButtonClassName: styleSort.sort_optionButton
}

const classesProductFilter = {
  filtersClassName: 'w-100',
  filterClassName: styleFilter.filter,
  filterNameClassName: styleFilter.filter_name,
  filterOptionPriceClassName: styleFilter.filter_price,
  filterPriceLabelClassName: styleFilter.filter_priceLabel,
  filterPriceInputClassName: styleFilter.filter_priceInput,
  filterOptionClassName: styleFilter.filter_option,
  filterColorLabelClassName: styleFilter.filter_optionLabel,
  filterLabelClassName: styleFilter.filter_optionLabel,
  filterInputClassName: styleFilter.filter_optionColorInput,
  filterColorPreviewClassName: styleFilter.filter_optionColorPreview,
  filterColorInputClassName: styleFilter.filter_optionColorInput,
  filterCheckboxClassName: styleFilter.filter_optionCheckbox,
  filterSliderClassName: styleFilter.filter_slider,
  filterSliderRailClassName: styleFilter.filter_sliderRail,
  filterSliderHandleClassName: styleFilter.filter_sliderHandle,
  filterSliderTrackClassName: styleFilter.filter_sliderTrack,
  filterSliderTooltipClassName: styleFilter.filter_sliderTooltip,
  filterSliderTooltipContainerClassName: styleFilter.filter_sliderTooltipContainer,
  filterSliderTooltipTextClassName: styleFilter.filter_sliderTooltipText,
}

const classesProductCategory = {
  parentCategoryClassName: styleProducts.category,
  categoryItemClassName: styleProducts.category_list,
  categoryValueContainerClassName: styleProducts.category_listContainer,
  categoryValueClassName: styleProducts.category_listLink,
  categoryNameClassName: styleProducts.category_listItem,
  categoryNumberClassName: styleProducts.category_listTotalNumber,
  dropdownIconClassName: styleProducts.category_listIcon,
  childCategoryClassName: styleProducts.category
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

  const [openCustomize, setOpenCustomize] = useState<boolean>(false)
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

  useEffect(() => {
    setOpenCustomize(false)
  }, [categories])

  const toogleCustomize = () => setOpenCustomize(!openCustomize)
  const handleFilter = (selectedFilter: any) => {
    setFilterProduct(selectedFilter)
    setOpenCustomize(false)
  }

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
        <Breadcrumb
          steps={[{ label: i18n.t('breadcrumb.home') }, { label: i18n.t('products.title') }]}
        />
      </div>
      <div className="container">
        <div className={styleProducts.products_header}>
          <h6 className={styleProducts.products_headerTotalItem}>
            {i18n.t("products.show")} {pageInfo.totalItems} {i18n.t("products.item")}
          </h6>
          <div
            className={styleProducts.products_headerCustomize}
            onClick={() => toogleCustomize()}
          >
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
      <Popup
        title={i18n.t("product.filter")}
        visibleState={openCustomize}
        setVisibleState={setOpenCustomize}
        withCloseButton
        iconClose={<RiCloseLine size={24} />}
        withButtonLeft={{
          icon: <img src="/icons/refresh.svg" alt="refresh" />,
          onClick: () => {
            router.replace(`/${lng}/products`)
          }
        }}
      >
        {openCustomize &&
          <>
            <div className={styleProducts.products_sortLabel}>
              {i18n.t("products.sort")}
            </div>
            <ProductSort
              classes={classesProductSort}
              type="list"
              handleSort={(selectedSort: any) => {
                setSort(selectedSort)
                setOpenCustomize(false)
              }}
            />
            <div className={styleProducts.products_sortLabel}>
              {i18n.t("products.category")}
            </div>
            <ProductCategory
              classes={classesProductCategory}
              showCategoryNumber
              dropdownIcon={<FaChevronDown size={14} />}
            />
            <ProductFilter
              classes={classesProductFilter}
              withPriceMinimumSlider
              withPriceValueLabel
              withPriceInput
              withTooltip
              handleFilter={handleFilter}
            />
          </>
        }
      </Popup>
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
