import { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import {
  OrderReview,
  useI18n,
} from "@sirclo/nexus";
import Layout from "components/Layout/Layout";
import useWindowSize from "lib/useWindowSize";
import SEO from "components/SEO";
import { useBrand } from "lib/useBrand";
import { toast } from "react-toastify";
import { ChevronDown, ChevronUp } from "react-feather";
import styles from "public/scss/pages/Review.module.scss";

const classesOrderReview = {
  titleContainerClassName: styles.orderReview_titleContainer,
  titleClassName: styles.orderReview_title,
  subTitleClassName: styles.orderReview_subtitle,
  orderInfoContainerClassName: styles.orderReview_orderInfo,
  orderInfoLineClassName: styles.orderReview_orderInfoLine,
  buyerInfoContainerClassName: styles.orderReview_buyerInfo,
  buyerNameLabelClassName: styles.orderReview_buyerNameLabel,
  buyerNameClassname: `form-control ${styles.sirclo_form_input} ${styles.size_label}`,
  buyerHideNameContainerClassName: styles.orderReview_buyerHide,
  reviewTabContainerClassName: styles.orderReview_reviewTab,
  needsReviewTabContainerClassName: styles.orderReview_tabItem,
  reviewedTabContainerClassName: styles.orderReview_tabItem,
  activeTabClassName: styles.orderReview_activeTab,
  needsReviewTabLabelClassName: styles.orderReview_tabLabel,
  reviewedTabLabelClassName: styles.orderReview_tabLabel,
  productInfoContainerClassName: styles.orderReview_productInfo,
  productImageClassName: styles.orderReview_productImage,
  productDetailContainerClassName: styles.orderReview_productDetail,
  productNameClassName: styles.orderReview_productDetailName,
  yourRatingTextClassName: styles.orderReview_productDetailRating,
  productReviewButtonContainerClassName: styles.orderReview_productButton,
  writeReviewButtonClassName: `btn ${styles.btn_danger}`,
  itemPerPageClassName: styles.orderReview_itemPerPage,
  itemPerPageOptionsClassName: styles.orderReview_itemPerPageOptions,
  formContainerClassName: styles.orderReview_form,
  formGroupClassName: styles.orderReview_formGroup,
  formLabelClassName: styles.orderReview_formLabel,
  starContainerClassName: styles.orderReview_starContainer,
  starClassName: styles.orderReview_star,
  containerClassName: styles.orderReview_media,
  imagesContainerClassName: styles.orderReview_mediaImages,
  mediaContainerClassName: styles.orderReview_mediaThumbnail,
  imgClassName: styles.orderReview_mediaImage,
  mediaRemoverClassName: styles.orderReview_mediaRemove,
  imgUploadClassName: styles.orderReview_mediaUpload,
  popupConfirmationSubmitContainerClassName: styles.orderReview_popup,
  popupConfirmationSubmitContentClassName: styles.orderReview_popupContent,
  popupConfirmationSubmitTitleClassName: styles.orderReview_popupTitle,
  popupConfirmationSubmitDescriptionClassName: styles.orderReview_popupDesc,
  popupConfirmationSubmitWrapButtonClassName: styles.orderReview_popupActionButton,
  openReviewButtonClassName: `btn ${styles.btn_outerBlack}`,
  reviewCardContainerClassName: styles.orderReview_reviewCard,
  tileRatingClassName: styles.orderReview_reviewCardtitleRating,
  ratingContentClassName: styles.orderReview_ratingContent,
  ratingDescriptionClassName: styles.orderReview_ratingDesc,
  titleDescriptionClassName: styles.orderReview_titleDesc,
  descriptionContentClassName: styles.orderReview_descContent,
  titleImageClassName: styles.orderReview_titleImages,
  imageContentClassName: styles.orderReview_imageContent,
  imageListClassName: styles.orderReview_imageList
};

const paginationClasses = {
  pagingClassName: styles.pagination,
  activeClassName: styles.pagination_active,
  itemClassName: styles.pagination_item,
}

const ReviewPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const router = useRouter();
  const size = useWindowSize();
  const { id } = router.query;

  const newClassesOrderReview = {
    ...classesOrderReview,
    ...paginationClasses
  }

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <SEO title={i18n.t("orderReview.title")} />
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            <div className={styles.orderReview}>
              <OrderReview
                classes={newClassesOrderReview}
                orderID={id as string}
                itemPerPageOptions={[5, 10, 15]}
                arrowIconDown={<ChevronDown color="black" size={20} />}
                arrowIconUp={<ChevronUp color="black" size={20} />}
                onSuccessMsg={(msg) => toast.success(msg)}
                onErrorMsg={(msg) => toast.error(msg)}
                thumborSetting={{
                  width: size.width < 768 ? 375 : 500,
                  format: "webp",
                  quality: 85,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  );

  const brand = await useBrand(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ''
    },
  };
};

export default ReviewPage;