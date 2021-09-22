/* library package */
import {
  FC,
  useState,
  useEffect
} from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  X as XIcon
} from 'react-feather'
import {
  RiQuestionFill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowDownSLine,
  RiCloseLine
} from 'react-icons/ri'
import {
  useI18n,
  ProductDetail,
  ProductReviews,
  getProductDetail,
  Products,
  isProductRecommendationAllowed
} from '@sirclo/nexus'
/* library template */
import useWindowSize from 'lib/useWindowSize'
import { useBrand } from 'lib/useBrand'
import { GRAPHQL_URI } from 'lib/Constants'
import { formatPrice } from 'lib/formatPrice'
/* components */
import SEO from 'components/SEO'
import Layout from 'components/Layout/Layout'
import Placeholder from 'components/Placeholder'
const EmptyComponent = dynamic(() => import('components/EmptyComponent/EmptyComponent'))
const Popup = dynamic(() => import('components/Popup'))
const SocialShare = dynamic(() => import('components/SocialShare'))
/* styles */
import stylesEstimate from 'public/scss/components/EstimateShipping.module.scss'
import styleProduct from 'public/scss/components/ProductDetail.module.scss'
import styleNotifyMe from 'public/scss/components/NotifyMe.module.scss'
import styles from 'public/scss/pages/ProductDetail.module.scss'

const classesProductDetail = {
  productDetailParentDivClassName: styleProduct.productDetail,
  imageRowClassName: styleProduct.productDetail_images,
  arrowClassName: styleProduct.productDetail_arrow,
  mainImageClassName: styleProduct.productDetail_image,
  propertyRowClassName: styleProduct.productDetail_content,
  detailTitleStarClassName: styleProduct.productDetail_star,
  detailTitleStarNumberClassName: styleProduct.productDetail_starNumber,
  detailTitleClassName: styleProduct.productDetail_title,
  salePriceClassName: styleProduct.productDetail_salePrice,
  priceClassName: styleProduct.productDetail_priceSale,
  variantContainerClassName: styleProduct.productDetail_containerVariant,
  variantOptionsContainerClassName: styleProduct.productDetail_variant,
  variantLabelClassName: styleProduct.productDetail_variantLabel,
  variantOptionsClassName: styleProduct.productDetail_variantOption,
  qtyBoxClassName: styleProduct.productDetail_innerQty,
  propertyFooterContainerClassname: styleProduct.productDetail_footerProperty,
  addToCartBtnClassName: `${styleProduct.btn} ${styleProduct.btn_primary}`,
  buyNowBtnClassName: `${styleProduct.btn} ${styleProduct.btn_secondary} mt-2`,
  descriptionClassName: styleProduct.productDetail_desc,
  additionalInfoClassName: 'd-none',
  accordionClassName: styleProduct.productDetail_descContainer,
  // Open Order
  openOrderClassName: styles.productdetail_openorder,
  openOrderTitleClassName: styles.productdetail_openorder_title,
  openOrderContainerClassName: styles.productdetail_openorder_container,
  openOrderDateClassName: styles.productdetail_openorder_container__date,
  openOrderTimeClassName: styles.productdetail_openorder_container__time,
  countDownContainerClassName: styles.productdetail_openorder_countdown,
  countDownItemClassName: styles.productdetail_openorder_countdownItem,
  countDownItemTextClassName: styles.productdetail_openorder_countdownItem__text,
  openOrderTimeoutClassName: styles.productdetail_openorder_timeout,
  openOrderTimeoutDescClassName: styles.productdetail_openorder_timeout__desc,
  openOrderTimeoutBtnClassName: `btn text-uppercase mt-3 ${styles.btn_primary} ${styles.btn_long}`,
  // Notify Me
  notifyMeClassName: styleNotifyMe.notifyMe,
  notifyMeOptionsClassName: styleNotifyMe.notifyMe_options,
  notifyMeOptionClassName: styleNotifyMe.notifyMe_option,
  notifyMeRadioClassName: styleNotifyMe.notifyMe_radio,
  notifyMeRadioLabelClassName: styleNotifyMe.notifyMe_radioLabel,
  notifyMeInputWrapperClassName: styleNotifyMe.notifyMe_inputWrapper,
  notifyMeInputClassName: styleNotifyMe.notifyMe_input,
  notifyMeSubmitClassName: `${styleProduct.btn} ${styleProduct.btn_primary}`,
  // Estimate Shipping
  estimateShippingWrapperClassName: stylesEstimate.wrapper,
  estimateShippingTitleClassName: stylesEstimate.title,
  estimateShippingDetailClassName: stylesEstimate.detail,
  estimateShippingLogoClassName: stylesEstimate.detail_logo,
  estimateShippingLogoImgClassName: stylesEstimate.detail_logoImage,
  estimateShippingShowCourierClassName: stylesEstimate.detail_showCourier,
  estimateShippingPopupContainerClassName: stylesEstimate.popup,
  estimateShippingPopupContentClassName: stylesEstimate.popup_inner,
  estimateShippingPopupHeaderClassName: stylesEstimate.popup_header,
  estimateShippingPopupTitleClassName: stylesEstimate.popup_headerTitle,
  estimateShippingPopupButtonCloseClassName: stylesEstimate.popup_headerClose,
  estimateShippingPopupBodyClassName: stylesEstimate.popup_body,
  estimateShippingPopupLineInfoClassName: stylesEstimate.popup_bodyLineInfo,
  estimateShippingPopupLabelClassName: stylesEstimate.popup_bodyLabel,
  estimateShippingPopupValueClassName: stylesEstimate.popup_bodyValue,
  estimateShippingPopupProviderClassName: stylesEstimate.popup_provider,
  estimateShippingPopupLineProviderClassName: stylesEstimate.popup_providerLine,
  estimateShippingPopupProviderImgClassName: stylesEstimate.popup_providerImage,
  estimateShippingPopupProviderLabelClassName: stylesEstimate.popup_providerLabel,
  estimateShippingPopupProviderValueClassName: stylesEstimate.popup_providerValue,
}

const classesProductReview = {
  reviewImageContainerClassName: styles.ratingReview_imageContainer,
  reviewImageClassName: styles.ratingReview_image,
  filtersClassName: styles.ratingReview_filters,
  filterClassName: styles.ratingReview_filter,
  activeFilterClassName: styles.ratingReview_filterActive,
  filterLabelClassName: styles.ratingReview_filterLabel,
  filterInputClassName: styles.ratingReview_filterInput,
  filterIconClassName: styles.ratingReview_filterIcon,
  sortClassName: styles.ratingReview_sort,
  sortOptionsClassName: `form-control ${styles.ratingReview_sortOptions}`,
  reviewListContainerClassName: styles.ratingReview_container,
  reviewListStarContainerClassName: styles.ratingReview_starContainer,
  reviewListDescriptionClassName: styles.ratingReview_desc,
  reviewListImageContainerClassName: styles.ratingReview_imageContainer,
  reviewListImageClassName: styles.ratingReview_image,
  reviewListFooterClassName: styles.ratingReview_footer,
  reviewListAuthorClassName: styles.ratingReview_author,
  reviewListDateClassName: styles.ratingReview_date,
  itemPerPageClassName: styles.ratingReview_itemPerPage,
  itemPerPageLabelClassName: styles.ratingReview_itemPerPageLabel,
  itemPerPageOptionsClassName: styles.ratingReview_itemPerPageOptions,
  reviewPopupContainerClassName: styles.ratingReview_popupContainer,
  reviewPopupContentClassName: styles.ratingReview_popupContent,
  reviewPopupPreviewClassName: styles.ratingReview_popupPreview,
  reviewPopupImagePreviewClassName: styles.ratingReview_popupImagePreview,
  reviewPopupImagePopupClassName: styles.ratingReview_popupImage,
  reviewPopupLeftButtonClassName: styles.ratingReview_popupLeftButton,
  reviewPopupRightButtonClassName: styles.ratingReview_popupRightButton,
  reviewPopupButtonCloseClassName: styles.ratingReview_popupButtonClose
}

const classesProductRelate = {
  productContainerClassName: `col-6 ${styleProduct.product_itemContainer}`,
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

const classesPaginationProductReview = {
  pagingClassName: styles.pagination,
  activeClassName: styles.pagination_active,
  itemClassName: styles.pagination_item
}

const classesPlaceholderProduct = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_product__cardDetail}`,
  placeholderTitle: `${styles.placeholderItem} ${styles.placeholderItem_product__title}`,
  placeholderList: `${styles.placeholderItem} ${styles.placeholderItem_product__list}`,
}

const classesPlaceholderRelateProduct = {
  placeholderImage: `${styles.placeholderItem} ${styles.productdetail_relatedProductItem}`,
}

const Product: FC<any> = ({
  lng,
  lngDict,
  slug,
  data,
  brand,
  urlSite
}) => {
  const i18n: any = useI18n()
  const router: any = useRouter()
  const size = useWindowSize()
  const allowedProductRecommendation = isProductRecommendationAllowed()

  const [productId, setProductId] = useState(null)
  const [showSuccessAddToCart, setShowSuccessAddToCart] = useState<any>(null)
  const [showPopupNotify, setShowPopupNotify] = useState<boolean>(false)
  const [showModalErrorAddToCart, setShowModalErrorAddToCart] = useState<boolean>(false)
  const [showModalErrorNotify, setShowModalErrorNotify] = useState<boolean>(false)
  const [totalAllReviews, setTotalAllReviews] = useState(null)
  const [totalItems, setTotalItems] = useState(null)

  useEffect(() => {
    if (showSuccessAddToCart || showModalErrorAddToCart || showPopupNotify || showModalErrorNotify) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [showSuccessAddToCart, showModalErrorAddToCart, showPopupNotify, showModalErrorNotify])

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      layoutClassName="layout_fullHeight"
    >
      {data && (
        <SEO
          title={data?.details[0]?.name || ""}
          description={data?.SEOs[0]?.description || ""}
          keywords={data?.SEOs[0]?.keywords?.join(", ") || ""}
          image={data?.imageURLs || ""}
        />
      )}

      {data === null ? (
        <EmptyComponent
          icon={<RiQuestionFill color="#A8A8A8" size={20} />}
          title={i18n.t("product.isEmpty")}
          button={
            <button
              className={`btn mt-2 ${styles.btn_primary} ${styles.btn_long}`}
              onClick={() =>
                router.push(`/[lng]/products`, `/${lng}/products`)
              }
            >
              {i18n.t("product.back")}
            </button>
          }
        />
      ) : (
        <ProductDetail
          slug={slug}
          withButtonBuyNow
          lazyLoadedImage={false}
          classes={classesProductDetail}
          getProductID={(id) => setProductId(id)}
          ratingIcon={<span className="ratingStar">&#x2605</span>}
          accordionIcon={<RiArrowDownSLine color="#444444" size={18} />}
          closeIcon={<RiCloseLine color="#444444" size={18} />}
          estimateIconClose={<RiCloseLine color="#444444" size={25} />}
          enableArrow
          enableDots
          activeDot={<div className={styleProduct.productDetail_imagesCustomDotsActive}></div>}
          inactiveDot={<div className={styleProduct.productDetail_imagesCustomDots}></div>}
          onComplete={(data: any) => setShowSuccessAddToCart(data?.saveCart?.lineItems[0])}
          onCompleteMsg={() => setShowPopupNotify(true)}
          onError={() => setShowModalErrorAddToCart(true)}
          onErrorMsg={(msg) => msg && toast.error(msg)}
          withEstimateShipping={true}
          prevIcon={<RiArrowLeftSLine color="#444444" size={25} />}
          nextIcon={<RiArrowRightSLine color="#444444" size={25} />}
          openOrderIconDate={
            <Calendar
              className={styles.productdetail_openorder_container__icon}
            />
          }
          openOrderIconTime={
            <Clock
              className={styles.productdetail_openorder_container__icon}
            />
          }
          isButton={{
            0: true,
            1: true,
          }}
          thumborSetting={{
            width: 800,
            format: "webp",
            quality: 85,
          }}
          customDetailComponent={
            <div className={styleProduct.productDetail_socialShare}>
              <SocialShare
                urlSite={urlSite}
                title={i18n.t("product.share")}
              />
            </div>
          }
          loadingComponent={
            <div className={styles.productdetail_placeholder}>
              <div className="row">
                <div className="col-12 col-md-6">
                  <Placeholder
                    classes={classesPlaceholderProduct}
                    withImage
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Placeholder
                    classes={classesPlaceholderProduct}
                    withTitle
                  />
                  <Placeholder
                    classes={classesPlaceholderProduct}
                    withList
                    listMany={3}
                  />
                </div>
              </div>
            </div>
          }
        />
      )}

      {brand?.settings?.reviewsAndRatingEnabled &&
        <div className={styles.ratingReview}>
          <div className="container">
            <h2 className={styles.ratingReview_titleSection}>
              {i18n.t("product.ratingReviewTitle")}{" "}({totalAllReviews === null ? "..." : totalAllReviews})
            </h2>
            <ProductReviews
              productID={productId}
              productName={slug}
              classes={classesProductReview}
              reviewsPaginationClasses={classesPaginationProductReview}
              getTotalAllReviews={(totalItem: number) => setTotalAllReviews(totalItem)}
              itemPerPageOptions={[5, 10, 25, 50, 100]}
              iconClose={<XIcon color="black" />}
              iconLeft={<ChevronLeft color="black" />}
              iconRight={<ChevronRight color="black" />}
              reviewsNextLabel={<ChevronRight color="black" />}
              reviewsPrevLabel={<ChevronLeft color="black" />}
              thumborSetting={{
                width: size.width < 575 ? 350 : 500,
                format: 'webp',
                quality: 85,
              }}
              customEmptyComponentReviews={
                <div className="col-12">
                  <EmptyComponent
                    icon={<RiQuestionFill color="#A8A8A8" size={20} />}
                    title={i18n.t("product.isEmpty")}
                  />
                </div>
              }
            />
          </div>
        </div>
      }

      {allowedProductRecommendation && (totalItems > 0 || totalItems === null) &&
        <div className={`row ${styleProduct.upSell}`}>
          <div className="col-12">
            <h6 className={styleProduct.upSell_title}>
              {i18n.t("product.related")}
            </h6>
          </div>
          <Products
            filter={{ openOrderScheduled: false, published: true }}
            classes={classesProductRelate}
            slug={slug}
            getPageInfo={(pageInfo: any) => setTotalItems(pageInfo.totalItems)}
            itemPerPage={2}
            isButton
            fullPath={`product/{id}`}
            pathPrefix='product'
            lazyLoadedImage={false}
            thumborSetting={{
              width: size.width < 768 ? 350 : 600,
              format: "webp",
              quality: 85
            }}
            loadingComponent={
              <>
                <Placeholder
                  classes={classesPlaceholderRelateProduct}
                  withImage
                />
                <Placeholder
                  classes={classesPlaceholderRelateProduct}
                  withImage
                />
                <Placeholder
                  classes={classesPlaceholderRelateProduct}
                  withImage
                />
              </>
            }
          />
        </div>
      }

      <Popup
        withHeader={false}
        visibleState={showSuccessAddToCart}
        setVisibleState={setShowSuccessAddToCart}
        outsideClose={false}
      >
        {showSuccessAddToCart &&
          <>
            <div className={styleProduct.productDetail_popupTitle}>
              <h3>
                {i18n.t("product.successAddToCart")}
              </h3>
            </div>
            <div className={styleProduct.productDetail_saveCartDetail}>
              <img
                src={showSuccessAddToCart?.imageURL}
                className={styleProduct.productDetail_saveCartImage}
              />
              <div className={styleProduct.productDetail_saveCartContent}>
                <h3 className={styleProduct.productDetail_saveCartDetailTitle}>
                  {showSuccessAddToCart?.title}
                </h3>
                <div className={styleProduct.productDetail_saveCartDetailPrice}>
                  {showSuccessAddToCart?.salePrice !== showSuccessAddToCart?.price &&
                    <span className={styleProduct.productDetail_salePrice}>
                      {formatPrice(showSuccessAddToCart?.price.value, "IDR")}
                    </span>
                  }
                  <span className={styleProduct.productDetail_salePriceNormal}>
                    {formatPrice(showSuccessAddToCart?.salePrice.value, "IDR")}
                  </span>
                </div>
              </div>
            </div>
            <div className={styleProduct.productDetail_saveCartFooter}>
              <button
                className={`${styleProduct.btn} ${styleProduct.btn_secondary} mr-2`}
                onClick={() => setShowSuccessAddToCart(false)}
              >
                {i18n.t("product.continueShopping")}
              </button>
              <button
                className={`${styleProduct.btn} ${styleProduct.btn_primary} ml-2`}
                onClick={() => router.push("/[lng]/cart", `/${lng}/cart`)}
              >
                {i18n.t("product.viewCart")}
              </button>
            </div>
          </>
        }
      </Popup>

      <Popup
        withHeader={false}
        visibleState={showModalErrorAddToCart}
        setVisibleState={setShowModalErrorAddToCart}
      >
        <>
          <div className={styleProduct.productDetail_popupTitle}>
            <h3>
              {i18n.t("product.successAddToCart")}
            </h3>
          </div>
          <div className={styleProduct.productDetail_popupContent}>
            <p className={styleProduct.productDetail_popupDesc}>
              {i18n.t("cart.errorSKUDesc")}
            </p>
          </div>
        </>
      </Popup>

      <Popup
        withHeader={false}
        visibleState={showPopupNotify}
        setVisibleState={setShowPopupNotify}
        outsideClose={false}
      >
        <>
          <div className={styleProduct.productDetail_popupTitle}>
            <h3>
              {i18n.t("product.notifyTitleSuccess")}
            </h3>
          </div>
          <div className={styleProduct.productDetail_popupContent}>
            <p className={styleProduct.productDetail_popupDesc}>
              {i18n.t("product.notifySuccess")}
            </p>
          </div>
          <button
            className={`${styleProduct.btn} ${styleProduct.btn_primary}`}
            onClick={() => {
              setShowPopupNotify(false)
              router.push("/[lng]/products", `/${lng}/products`)
            }}
          >
            {i18n.t("product.continueShopping")}
          </button>
        </>
      </Popup>

      <Popup
        withHeader={false}
        visibleState={showModalErrorNotify}
        setVisibleState={setShowModalErrorNotify}
        outsideClose={false}
      >
        <>
          <div className={styleProduct.productDetail_popupTitle}>
            <h3>
              {i18n.t("product.notifyTitleFailed")}
            </h3>
          </div>
          <div className={styleProduct.productDetail_popupContent}>
            <p className={styleProduct.productDetail_popupDesc}>
              {i18n.t("product.notifyFailed")}
            </p>
          </div>
          <button
            className={`${styleProduct.btn} ${styleProduct.btn_primary}`}
            onClick={() => setShowPopupNotify(false)}
          >
            {i18n.t("product.tryAgain")}
          </button>
        </>
      </Popup>
    </Layout>
  )
}

export async function getServerSideProps({ req, params }) {
  const { slug } = params
  const data = await getProductDetail(GRAPHQL_URI(req), slug)
  const brand = await useBrand(req)

  const { default: lngDict = {} } = await import(`locales/${params.lng}.json`)

  const urlSite = `https://${req.headers.host}/${params.lng}/product/${slug}`

  return {
    props: {
      lng: params.lng,
      slug,
      lngDict,
      data: data || null,
      brand: brand || "",
      urlSite: urlSite,
    }
  }
}

export default Product