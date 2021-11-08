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
  FiCalendar,
  FiClock
} from 'react-icons/fi'
import {
  RiQuestionFill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowDownSLine,
  RiCloseLine,
  RiChat1Line
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
import styleEstimate from 'public/scss/components/EstimateShipping.module.scss'
import styleProductDetail from 'public/scss/components/ProductDetail.module.scss'
import styleNotifyMe from 'public/scss/components/NotifyMe.module.scss'
import styleProduct from 'public/scss/components/Product.module.scss'
import styleOpenOrder from 'public/scss/components/OpenOrder.module.scss'
import styleRatingReview from 'public/scss/components/RatingReview.module.scss'

const classesProductDetail = {
  productDetailParentDivClassName: styleProductDetail.productDetail,
  imageRowClassName: styleProductDetail.productDetail_images,
  arrowClassName: styleProductDetail.productDetail_arrow,
  mainImageClassName: styleProductDetail.productDetail_image,
  propertyRowClassName: styleProductDetail.productDetail_content,
  detailTitleStarClassName: styleProductDetail.productDetail_star,
  detailTitleStarNumberClassName: styleProductDetail.productDetail_starNumber,
  detailTitleClassName: styleProductDetail.productDetail_title,
  salePriceClassName: styleProductDetail.productDetail_salePrice,
  priceClassName: styleProductDetail.productDetail_priceSale,
  variantContainerClassName: styleProductDetail.productDetail_containerVariant,
  variantOptionsContainerClassName: styleProductDetail.productDetail_variant,
  variantLabelClassName: styleProductDetail.productDetail_variantLabel,
  variantOptionsClassName: styleProductDetail.productDetail_variantOption,
  qtyBoxClassName: styleProductDetail.productDetail_innerQty,
  propertyFooterContainerClassname: styleProductDetail.productDetail_footerProperty,
  addToCartBtnClassName: `${styleProductDetail.btn} ${styleProductDetail.btn_primary}`,
  buyNowBtnClassName: `${styleProductDetail.btn} ${styleProductDetail.btn_secondary} mt-2`,
  descriptionClassName: styleProductDetail.productDetail_desc,
  additionalInfoClassName: 'd-none',
  accordionClassName: styleProductDetail.productDetail_descContainer,
  // Open Order
  openOrderClassName: styleOpenOrder.openOrder,
  openOrderTitleClassName: styleOpenOrder.openOrder_title,
  openOrderContainerClassName: styleOpenOrder.openOrder_container,
  openOrderDateClassName: styleOpenOrder.openOrder_containerDate,
  openOrderTimeClassName: styleOpenOrder.openOrder_containerTime,
  countDownContainerClassName: styleOpenOrder.openOrder_countdown,
  countDownItemClassName: styleOpenOrder.openOrder_countdownItem,
  countDownItemTextClassName: styleOpenOrder.openOrder_countdownItemText,
  openOrderTimeoutClassName: styleOpenOrder.openOrder_timeout,
  openOrderTimeoutDescClassName: styleOpenOrder.openOrder_timeoutDesc,
  openOrderTimeoutBtnClassName: `${styleOpenOrder.btn} ${styleOpenOrder.btn_secondary}`,
  // Notify Me
  notifyMeClassName: styleNotifyMe.notifyMe,
  notifyMeOptionsClassName: styleNotifyMe.notifyMe_options,
  notifyMeOptionClassName: styleNotifyMe.notifyMe_option,
  notifyMeRadioClassName: styleNotifyMe.notifyMe_radio,
  notifyMeRadioLabelClassName: styleNotifyMe.notifyMe_radioLabel,
  notifyMeInputWrapperClassName: styleNotifyMe.notifyMe_inputWrapper,
  notifyMeInputClassName: styleNotifyMe.notifyMe_input,
  notifyMeSubmitClassName: `${styleProductDetail.btn} ${styleProductDetail.btn_primary}`,
  // Estimate Shipping
  estimateShippingWrapperClassName: styleEstimate.wrapper,
  estimateShippingTitleClassName: styleEstimate.title,
  estimateShippingDetailClassName: styleEstimate.detail,
  estimateShippingCostClassName: styleEstimate.detail_cost,
  estimateShippingLogoClassName: styleEstimate.detail_logo,
  estimateShippingLogoImgClassName: styleEstimate.detail_logoImage,
  estimateShippingShowCourierClassName: styleEstimate.detail_showCourier,
  estimateShippingPopupContainerClassName: styleEstimate.popup,
  estimateShippingPopupContentClassName: styleEstimate.popup_inner,
  estimateShippingPopupHeaderClassName: styleEstimate.popup_header,
  estimateShippingPopupTitleClassName: styleEstimate.popup_headerTitle,
  estimateShippingPopupButtonCloseClassName: styleEstimate.popup_headerClose,
  estimateShippingPopupBodyClassName: styleEstimate.popup_body,
  estimateShippingPopupLineInfoClassName: styleEstimate.popup_bodyLineInfo,
  estimateShippingPopupLabelClassName: styleEstimate.popup_bodyLabel,
  estimateShippingPopupValueClassName: styleEstimate.popup_bodyValue,
  estimateShippingPopupProviderClassName: styleEstimate.popup_provider,
  estimateShippingPopupLineProviderClassName: styleEstimate.popup_providerLine,
  estimateShippingPopupProviderImgClassName: styleEstimate.popup_providerImage,
  estimateShippingPopupProviderLabelClassName: styleEstimate.popup_providerLabel,
  estimateShippingPopupProviderValueClassName: styleEstimate.popup_providerValue,
}

const classesProductReview = {
  reviewImageContainerClassName: styleRatingReview.ratingReview_imageContainer,
  reviewImageClassName: styleRatingReview.ratingReview_image,
  filtersClassName: styleRatingReview.ratingReview_filters,
  filterClassName: styleRatingReview.ratingReview_filter,
  activeFilterClassName: styleRatingReview.ratingReview_filterActive,
  filterLabelClassName: styleRatingReview.ratingReview_filterLabel,
  filterInputClassName: styleRatingReview.ratingReview_filterInput,
  filterIconClassName: styleRatingReview.ratingReview_filterIcon,
  sortClassName: styleRatingReview.ratingReview_sort,
  sortOptionsClassName: `form-control ${styleRatingReview.ratingReview_sortOptions}`,
  reviewListContainerClassName: styleRatingReview.ratingReview_container,
  reviewListStarContainerClassName: styleRatingReview.ratingReview_starContainer,
  reviewListDescriptionClassName: styleRatingReview.ratingReview_desc,
  reviewListImageContainerClassName: styleRatingReview.ratingReview_imageContainer,
  reviewListImageClassName: styleRatingReview.ratingReview_image,
  reviewListFooterClassName: styleRatingReview.ratingReview_footer,
  reviewListAuthorClassName: styleRatingReview.ratingReview_author,
  reviewListDateClassName: styleRatingReview.ratingReview_date,
  itemPerPageClassName: styleRatingReview.ratingReview_itemPerPage,
  itemPerPageLabelClassName: styleRatingReview.ratingReview_itemPerPageLabel,
  itemPerPageOptionsClassName: styleRatingReview.ratingReview_itemPerPageOptions,
  reviewPopupContainerClassName: styleRatingReview.ratingReview_popupContainer,
  reviewPopupContentClassName: styleRatingReview.ratingReview_popupContent,
  reviewPopupPreviewClassName: styleRatingReview.ratingReview_popupPreview,
  reviewPopupImagePreviewClassName: styleRatingReview.ratingReview_popupImagePreview,
  reviewPopupImagePopupClassName: styleRatingReview.ratingReview_popupImage,
  reviewPopupLeftButtonClassName: styleRatingReview.ratingReview_popupLeftButton,
  reviewPopupRightButtonClassName: styleRatingReview.ratingReview_popupRightButton,
  reviewPopupButtonCloseClassName: styleRatingReview.ratingReview_popupButtonClose
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
  pagingClassName: styleRatingReview.pagination,
  activeClassName: styleRatingReview.pagination_active,
  itemClassName: styleRatingReview.pagination_item
}

const classesPlaceholderProduct = {
  placeholderImage: `${styleProduct.placeholderItem} ${styleProduct.placeholderItem_product__cardDetail}`,
  placeholderList: `${styleProduct.placeholderItem} ${styleProduct.placeholderItem_product__list}`,
}

const classesPlaceholderRelateProduct = {
  placeholderImage: `${styleProduct.placeholderItem} ${styleProduct.productdetail_relatedProductItem}`,
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
  const [showRatingReview, setShowRatingReview] = useState<boolean>(false)
  const [totalAllReviews, setTotalAllReviews] = useState(null)
  const [totalItems, setTotalItems] = useState(null)

  useEffect(() => {
    if (showSuccessAddToCart || showModalErrorAddToCart || showPopupNotify || showModalErrorNotify) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [showSuccessAddToCart, showModalErrorAddToCart, showPopupNotify, showModalErrorNotify])

  useEffect(() => {
    if (showRatingReview) {
      const ratingReview = document.getElementById('ratingReview')
      ratingReview?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      })
    }
  }, [showRatingReview])

  const toggleRatingReview = () => setShowRatingReview(!showRatingReview)

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

      {(data?.published === false || data === null) ? (
        <div className={styleProductDetail.productDetail_empty}>
          <EmptyComponent
            icon={<RiQuestionFill color="#A8A8A8" size={20} />}
            title={i18n.t("product.isEmpty")}
            button={
              <button
                className={`${styleProductDetail.btn} ${styleProductDetail.btn_primary} mt-2`}
                onClick={() =>
                  router.push(`/[lng]/products`, `/${lng}/products`)
                }
              >
                {i18n.t("product.back")}
              </button>
            }
          />
        </div>
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
          activeDot={<div className={styleProductDetail.productDetail_imagesCustomDotsActive}></div>}
          inactiveDot={<div className={styleProductDetail.productDetail_imagesCustomDots}></div>}
          onComplete={(data: any) => setShowSuccessAddToCart(data?.saveCart?.lineItems[0])}
          onCompleteMsg={() => setShowPopupNotify(true)}
          onError={() => setShowModalErrorAddToCart(true)}
          onErrorMsg={(msg) => msg && toast.error(msg)}
          withEstimateShipping={true}
          prevIcon={<RiArrowLeftSLine color="#444444" size={25} />}
          nextIcon={<RiArrowRightSLine color="#444444" size={25} />}
          openOrderIconDate={
            <FiCalendar
              size={15}
              color="#998060"
              className={styleOpenOrder.openOrder_calendar}
            />
          }
          openOrderIconTime={
            <FiClock
              size={15}
              color="#998060"
              className={styleOpenOrder.openOrder_clock}
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
            <div className={styleProductDetail.productDetail_socialShare}>
              <SocialShare
                urlSite={urlSite}
                title={i18n.t("product.share")}
              />
            </div>
          }
          loadingComponent={
            <div className={styleProductDetail.productDetail_loading}>
              <Placeholder
                classes={classesPlaceholderProduct}
                withImage
              />
              <div className="container mt-3">
                <Placeholder
                  classes={classesPlaceholderProduct}
                  withList
                  listMany={3}
                />
              </div>
            </div>
          }
        />
      )}

      {(data?.published === true || data !== null) &&
        <div className="container">
          <div
            className={`
            ${styleProductDetail.ratingReview}
            ${!showRatingReview ? styleProductDetail.ratingReview_extra : styleProductDetail.ratingReview_extraBorder}
            ${totalItems > 0 && styleProductDetail.ratingReview_extraRevert}
          `}
            onClick={() => toggleRatingReview()}
          >
            <p className={styleProductDetail.ratingReview_title}>
              {i18n.t("product.review")}
            </p>
            <RiArrowDownSLine color="#444444" size={18} />
          </div>
        </div>
      }

      {brand?.settings?.reviewsAndRatingEnabled &&
        <div
          id="ratingReview"
          className={`
            ${styleRatingReview.ratingReview}
            ${showRatingReview && styleRatingReview.ratingReview_show}
            ${(allowedProductRecommendation && totalItems === 0) && styleRatingReview.ratingReview_extra}
          `}
        >
          <div className="container">
            <div className={styleRatingReview.ratingReview_header}>
              <RiChat1Line color="#444444" size={18} />
              <p className={styleRatingReview.ratingReview_headerTitle}>
                {totalAllReviews === null ? "..." : totalAllReviews}{" "}{i18n.t("product.ratingReviewTitle")}
              </p>
            </div>
            <ProductReviews
              productID={productId}
              productName={slug}
              classes={classesProductReview}
              reviewsPaginationClasses={classesPaginationProductReview}
              getTotalAllReviews={(totalItem: number) => setTotalAllReviews(totalItem)}
              itemPerPageOptions={[5, 10, 25, 50, 100]}
              iconClose={<RiCloseLine color="#444444" />}
              iconLeft={<RiArrowLeftSLine color="#444444" />}
              iconRight={<RiArrowRightSLine color="#444444" />}
              reviewsPrevLabel={<RiArrowLeftSLine color="#444444" />}
              reviewsNextLabel={<RiArrowRightSLine color="#444444" />}
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

      {(data?.published === true || data !== null) &&
        <>
          {allowedProductRecommendation && (totalItems > 0 || totalItems === null) &&
            <div className={`container ${styleProductDetail.upSell}`}>
              <h6 className={styleProductDetail.upSell_title}>
                {i18n.t("product.related")}
              </h6>
              <div className="row">
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
            </div>
          }
        </>
      }

      <Popup
        withHeader={false}
        visibleState={showSuccessAddToCart}
        setVisibleState={setShowSuccessAddToCart}
        outsideClose={false}
      >
        {showSuccessAddToCart &&
          <>
            <div className={styleProductDetail.productDetail_popupTitle}>
              <h3>
                {i18n.t("product.successAddToCart")}
              </h3>
            </div>
            <div className={styleProductDetail.productDetail_saveCartDetail}>
              <img
                src={showSuccessAddToCart?.imageURL}
                className={styleProductDetail.productDetail_saveCartImage}
              />
              <div className={styleProductDetail.productDetail_saveCartContent}>
                <h3 className={styleProductDetail.productDetail_saveCartDetailTitle}>
                  {showSuccessAddToCart?.title}
                </h3>
                <div className={styleProductDetail.productDetail_saveCartDetailPrice}>
                  {showSuccessAddToCart?.salePrice !== showSuccessAddToCart?.price &&
                    <span className={styleProductDetail.productDetail_salePrice}>
                      {formatPrice(showSuccessAddToCart?.price.value, "IDR")}
                    </span>
                  }
                  <span className={styleProductDetail.productDetail_salePriceNormal}>
                    {formatPrice(showSuccessAddToCart?.salePrice.value, "IDR")}
                  </span>
                </div>
              </div>
            </div>
            <div className={styleProductDetail.productDetail_saveCartFooter}>
              <button
                className={`${styleProductDetail.btn} ${styleProductDetail.btn_secondary} mr-2`}
                onClick={() => setShowSuccessAddToCart(false)}
              >
                {i18n.t("product.continueShopping")}
              </button>
              <button
                className={`${styleProductDetail.btn} ${styleProductDetail.btn_primary} ml-2`}
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
        outsideClose={false}
      >
        <>
          <div className={styleProductDetail.productDetail_popupTitle}>
            <h3>
              {i18n.t("product.tryAgain")}
            </h3>
          </div>
          <div className={styleProductDetail.productDetail_popupContent}>
            <p className={styleProductDetail.productDetail_popupDesc}>
              {i18n.t("cart.errorSKUDesc")}
            </p>
          </div>
          <button
            className={`${styleProductDetail.btn} ${styleProductDetail.btn_primary}`}
            onClick={() => setShowModalErrorAddToCart(false)}
          >
            {i18n.t("product.tryAgain")}
          </button>
        </>
      </Popup>

      <Popup
        withHeader={false}
        visibleState={showPopupNotify}
        setVisibleState={setShowPopupNotify}
        outsideClose={false}
      >
        <>
          <div className={styleProductDetail.productDetail_popupTitle}>
            <h3>
              {i18n.t("product.notifyTitleSuccess")}
            </h3>
          </div>
          <div className={styleProductDetail.productDetail_popupContent}>
            <p className={styleProductDetail.productDetail_popupDesc}>
              {i18n.t("product.notifySuccess")}
            </p>
          </div>
          <button
            className={`${styleProductDetail.btn} ${styleProductDetail.btn_primary}`}
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
          <div className={styleProductDetail.productDetail_popupTitle}>
            <h3>
              {i18n.t("product.notifyTitleFailed")}
            </h3>
          </div>
          <div className={styleProductDetail.productDetail_popupContent}>
            <p className={styleProductDetail.productDetail_popupDesc}>
              {i18n.t("product.notifyFailed")}
            </p>
          </div>
          <button
            className={`${styleProductDetail.btn} ${styleProductDetail.btn_primary}`}
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