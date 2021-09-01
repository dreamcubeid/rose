import {
  FC,
  useState,
  useEffect
} from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import Router from "next/router";
import {
  useI18n,
  ProductDetail,
  ProductReviews,
  getProductDetail,
  Products,
  isProductRecommendationAllowed
} from "@sirclo/nexus";
import SEO from "components/SEO";
import Layout from "components/Layout/Layout";
import Placeholder from "components/Placeholder";
import { GRAPHQL_URI } from "components/Constants";
import useWindowSize from "lib/useWindowSize";
import { useBrand } from "lib/useBrand";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar,
  Clock,
  Check,
  Share2,
  Bell,
  X as XIcon
} from "react-feather";
import styles from "public/scss/pages/ProductDetail.module.scss";
import stylesEstimate from "public/scss/components/EstimateShipping.module.scss";

const EmptyComponent = dynamic(
  () => import("components/EmptyComponent/EmptyComponent")
);
const Popup = dynamic(() => import("components/Popup/Popup"));
const PopupCart = dynamic(() => import("components/Popup/PopupCart"));
const SocialShare = dynamic(() => import("components/SocialShare"));

const classesProductDetail = {
  productDetailParentDivClassName: styles.productdetail,
  rowClassName: `row`,
  imageRowClassName: `col-12 col-md-6 ${styles.productdetail_images}`,
  arrowClassName: styles.productdetail_images_arrow,
  dotClassName: styles.productdetail_images_dots,
  mainImageClassName: `${styles.productdetail_images__image}`,
  thumbnailImageClassName: styles.thumbnail_img,
  propertyRowClassName: `col-12 col-md-6 ${styles.productdetail_content}`,
  detailTitleClassName: styles.productdetail_content_title,
  salePriceClassName: styles.productdetail_content_salePrice,
  priceClassName: styles.productdetail_content_priceSale,
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
  propertyInnerContainerClassName: styles.productdetail_content_inner,
  variantContainerClassName: styles.productdetail_content_containerVariant,
  variantOptionsContainerClassName: styles.productdetail_content_variant,
  variantLabelClassName: styles.variantLabel,
  variantOptionsClassName: styles.variantOption,
  qtyBoxClassName: styles.productdetail_content_innerQty,
  propertyFooterContainerClassname:  styles.productdetail_propertyFooterContainer,
  addToCartBtnClassName: `btn text-uppercase my-3 ${styles.btn_secondary} ${styles.btn_long} ${styles.btn_full_width}`,
  buyNowBtnClassName: `btn  text-uppercase ${styles.btn_long} ${styles.btn_primary} ${styles.btn_full_width}`,
  notifyMeClassName: styles.productdetail_notifyMe,
  notifyMeOptionsClassName: styles.productdetail_notifyMeOptions,
  notifyMeOptionClassName: styles.productdetail_notifyMeOption,
  notifyMeRadioClassName: styles.productdetail_notifyMeRadio,
  notifyMeRadioLabelClassName: styles.productdetail_notifyMeRadioLabel,
  notifyMeInputWrapperClassName: styles.productdetail_notifyMeInputWrapper,
  notifyMeLabelClassName: styles.productdetail_notifyMeLabel,
  notifyMeInputClassName: `form-control ${styles.sirclo_form_input}`,
  notifyMeSubmitClassName: `btn mt-3 ${styles.btn_primary} ${styles.btn_long} w-100`,
  descriptionClassName: styles.productdetail_content_desc,
  additionalInfoClassName: "d-none",
  accordionClassName: styles.productdetail_content_desc_container,
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
};

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
  productContainerClassName: ` mb-0 products_list ${styles.product} ${styles.productdetail_relatedProductItem}`,
  stickerContainerClassName: styles.product_sticker,
  outOfStockLabelClassName: `${styles.product_stickerLabel} ${styles.product_stickerLabel__outofstock}`,
  saleLabelClassName: `${styles.product_stickerLabel} ${styles.product_stickerLabel__sale}`,
  comingSoonLabelClassName: `${styles.product_stickerLabel} ${styles.product_stickerLabel__comingsoon}`,
  openOrderLabelClassName: `${styles.product_stickerLabel} ${styles.product_stickerLabel__openorder}`,
  preOrderLabelClassName: `${styles.product_stickerLabel} ${styles.product_stickerLabel__preorder}`,
  newLabelClassName: `${styles.product_stickerLabel} ${styles.product_stickerLabel__new}`,
  productImageContainerClassName: styles.product_link,
  productImageClassName: styles.product_link__image,
  productLabelContainerClassName: styles.product_label,
  productTitleClassName: styles.product_label__title,
  productPriceClassName: styles.product_labelPrice,
  salePriceClassName: styles.product_labelPrice__sale,
  priceClassName: styles.product_labelPrice__price,
}

const classesPaginationProductReview = {
  pagingClassName: styles.pagination,
  activeClassName: styles.pagination_active,
  itemClassName: styles.pagination_item
}

const classesEmptyComponent = {
  emptyContainer: styles.productdetail_empty,
  emptyTitle: styles.productdetail_empty_title,
  emptyDesc: styles.productdetail_empty_desc,
};

const classesPlaceholderProduct = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_product__cardDetail}`,
  placeholderTitle: `${styles.placeholderItem} ${styles.placeholderItem_product__title}`,
  placeholderList: `${styles.placeholderItem} ${styles.placeholderItem_product__list}`,
};

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
  const i18n: any = useI18n();
  const size = useWindowSize();

  const [productId, setProductId] = useState(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showShare, setShowShare] = useState<boolean>(false);
  const [showPopupNotify, setShowPopupNotify] = useState<boolean>(false);
  const [showModalErrorAddToCart, setShowModalErrorAddToCart] = useState<boolean>(false);
  const [showModalErrorNotify, setShowModalErrorNotify] = useState<boolean>(false);
  const [totalAllReviews, setTotalAllReviews] = useState(null);
  const [totalItems, setTotalItems] = useState(null);

  useEffect(() => {
    if (showCart) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [showCart]);

  const allowedProductRecommendation = isProductRecommendationAllowed();
  const toogleErrorAddToCart = () => setShowModalErrorAddToCart(!showModalErrorAddToCart);
  const tooglePopup = () => setShowPopup(!showPopup);
  const toogleCart = () => setShowCart(!showCart);
  const toogleShare = () => setShowShare(!showShare);

  // IS PROD VARIABLE
  const IS_PROD = process.env.IS_PROD;

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      {data && (
        <SEO
          title={data?.details[0]?.name || ""}
          description={data?.SEOs[0]?.description || ""}
          keywords={data?.SEOs[0]?.keywords?.join(", ") || ""}
          image={data?.imageURLs || ""}
        />
      )}
      {showPopup && (
        <Popup withHeader={false} setPopup={tooglePopup} mobileFull={false}>
          <div className={styles.productdetail_popup}>
            <div className={styles.productdetail_popup_content}>
              <div className={styles.productdetail_popup_content__icon}>
                <Check color="white" size={40} />
              </div>
              <h3>{i18n.t("product.successAddToCart")}</h3>
            </div>
            <div>
              <button
                className={`btn ${styles.btn_primary} ${styles.btn_long} ${styles.btn_full_width} mb-3`}
                onClick={() => {
                  setShowPopup(false);
                  setShowCart(true);
                }}
              >
                {i18n.t("product.viewCart")}
              </button>
            </div>
            <div>
              <button
                className={`btn ${styles.btn_blue}`}
                onClick={() => setShowPopup(false)}
              >
                {i18n.t("product.continueShopping")}
              </button>
            </div>
          </div>
        </Popup>
      )}
      {showCart && (
        <PopupCart
          setPopup={toogleCart}
          popupTitle={i18n.t("cart.title")}
          lng={lng}
        />
      )}
      {showModalErrorAddToCart && (
        <Popup
          withHeader
          setPopup={toogleErrorAddToCart}
          mobileFull={false}
          classPopopBody
        >
          <div className={styles.productdetail_popupError}>
            <h3 className={styles.productdetail_popupErrorTitle}>
              {i18n.t("cart.errorSKUTitle")}
            </h3>
            <p className={styles.productdetail_popupErrorDesc}>
              {i18n.t("cart.errorSKUDesc")}{" "}
            </p>
          </div>
        </Popup>
      )}
      {showShare && (
        <Popup
          withHeader
          setPopup={toogleShare}
          mobileFull={false}
          classPopopBody
          popupTitle={i18n.t("product.shareProduct")}
        >
          <div className={styles.productdetail_share}>
            <SocialShare i18n={i18n} urlSite={urlSite} />
          </div>
        </Popup>
      )}
      {showPopupNotify && (
        <Popup
          withHeader={false}
          mobileFull={false}
          classPopopBody
          popupTitle={i18n.t("product.notify")}
        >
          <div className={styles.productdetail_popupError}>
            <h3 className={styles.productdetail_popupErrorTitle}>
              {i18n.t("product.notifyTitleSuccess")}
            </h3>
            <p className={styles.productdetail_popupErrorDesc}>
              {i18n.t("product.notifySuccess")}
            </p>
            <button
              className={`btn mt-3 ${styles.btn_secondary}`}
              onClick={() => {
                setShowPopupNotify(false);
                Router.push("/[lng]/products", `/${lng}/products`);
              }}>
              {i18n.t("product.continueShopping")}
            </button>
          </div>
        </Popup>
      )}
      {showModalErrorNotify && (
        <Popup
          withHeader={false}
          mobileFull={false}
          classPopopBody
          popupTitle={i18n.t("product.notify")}
        >
          <div className={styles.productdetail_popupError}>
            <h3 className={styles.productdetail_popupErrorTitle}>
              {i18n.t("product.notifyTitleFailed")}
            </h3>
            <p className={styles.productdetail_popupErrorDesc}>
              {i18n.t("product.notifyFailed")}
            </p>
            <button
              className={`btn mt-3 ${styles.btn_secondary}`}
              onClick={() => setShowModalErrorNotify(false)}>
              {i18n.t("product.back")}
            </button>
          </div>
        </Popup>
      )}
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            {data === null ? (
              <EmptyComponent
                classes={classesEmptyComponent}
                title={i18n.t("product.isEmpty")}
                button={
                  <button
                    className={`btn mt-2 ${styles.btn_primary} ${styles.btn_long}`}
                    onClick={() =>
                      Router.push(`/[lng]/products`, `/${lng}/products`)
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
                ratingIcon={<span className="ratingStar">&#x2605;</span>}
                accordionIcon={<ChevronDown />}
                enableArrow={size.width && size.width < 576 ? true : false}
                enableDots={size.width && size.width < 576 ? true : false}
                onComplete={() => setShowPopup(true)}
                onCompleteMsg={() => setShowPopupNotify(true)}
                onError={() => setShowModalErrorAddToCart(true)}
                onErrorMsg={(msg) => msg && toast.error(msg)}
                withEstimateShipping={IS_PROD === "false" ? true : false}
                prevIcon={<span className={styles.productdetail_images_arrowPrev} />}
                nextIcon={<span className={styles.productdetail_images_arrowNext} />}
                notifyIcon={<Bell color="white" />}
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
                  <>
                    <button
                      className={`btn text-uppercase mt-3 ${styles.btn_secondary}`}
                      onClick={toogleShare}
                    >
                      <div className={styles.productdetail_buttonShare}>
                        <Share2 color="#2296CB" size={20} />
                        <span>{i18n.t("product.share")}</span>
                      </div>
                    </button>
                  </>
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
          </div>
        </div>
      </div>

      {brand?.settings?.reviewsAndRatingEnabled &&
        <div className={styles.ratingReview}>
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-8 offset-lg-2">
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
                        classes={classesEmptyComponent}
                        desc={i18n.t("product.isEmptyReview")}
                      />
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      }
      {allowedProductRecommendation && (totalItems > 0 || totalItems === null) &&
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2">
              <div className={styles.productdetail_relatedProductHeader}>
                <h6 className={styles.productdetail_relatedProductTitle}>{i18n.t("product.related")}</h6>
              </div>
              <div className={styles.productdetail_relatedProduct}>
                <LazyLoadComponent>
                  <Products
                    filter={{ openOrderScheduled: false, published: true }}
                    classes={classesProductRelate}
                    slug={slug}
                    getPageInfo={(pageInfo: any) => setTotalItems(pageInfo.totalItems)}
                    itemPerPage={4}
                    isButton
                    fullPath={`product/{id}`}
                    pathPrefix={`product`}
                    lazyLoadedImage={false}
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
                    thumborSetting={{
                      width: size.width < 768 ? 350 : 600,
                      format: "webp",
                      quality: 85
                    }}
                  />
                </LazyLoadComponent>
              </div>
            </div>
          </div>
        </div>
      }
    </Layout>
  );
};

export async function getServerSideProps({ req, params }) {
  const { slug } = params;
  const data = await getProductDetail(GRAPHQL_URI(req), slug);
  const brand = await useBrand(req);

  const { default: lngDict = {} } = await import(`locales/${params.lng}.json`);

  const urlSite = `https://${req.headers.host}/${params.lng}/product/${slug}`;

  return {
    props: {
      lng: params.lng,
      slug,
      lngDict,
      data: data || null,
      brand: brand || "",
      urlSite: urlSite,
    },
  };
}

export default Product;
