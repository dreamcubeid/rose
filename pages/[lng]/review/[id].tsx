/* library package */
import { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import {
  OrderReview,
  useI18n,
} from "@sirclo/nexus";
import {
  RiStarFill,
  RiStarLine
} from 'react-icons/ri'
import { toast } from "react-toastify";
/* library template */
import useWindowSize from "lib/useWindowSize";
import { useBrand } from "lib/useBrand";
/* components */
import Layout from "components/Layout/Layout";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
/* styles */
import styleReview from "public/scss/pages/Review.module.scss";
import styleForm from "public/scss/components/Form.module.scss";
import stylePagination from 'public/scss/components/Pagination.module.scss'
import styleButton from 'public/scss/components/Button.module.scss'

const classesOrderReview = {
  // header
  titleContainerClassName: styleReview.review_title,
  subTitleClassName: 'd-none',
  orderInfoContainerClassName: styleReview.review_orderInfo,
  orderInfoLineClassName: styleReview.review_orderInfoLine,
  buyerInfoContainerClassName: styleReview.orderReview_buyerInfo,
  buyerNameContainerClassName: styleForm.form,
  buyerNameClassname: `form-control ${styleReview.sirclo_form_input} ${styleReview.size_label}`,
  // checkbox
  buyerHideNameContainerClassName: styleReview.review_checkboxContainer,
  buyerHideNameLabelClassName: styleReview.review_labelCheckbox,
  buyerHideNameSwitchClassName: styleForm.form_checkbox,
  // tab
  reviewTabContainerClassName: styleReview.review_reviewTab,
  needsReviewTabContainerClassName: styleReview.review_reviewTabItem,
  reviewedTabContainerClassName: styleReview.review_reviewTabItem,
  activeTabClassName: styleReview.review_activeTab,
  needsReviewTabLabelClassName: styleReview.orderReview_tabLabel,
  reviewedTabLabelClassName: styleReview.orderReview_tabLabel,
  productInfoContainerClassName: styleReview.review_product,
  productImageClassName: styleReview.review_productImage,
  productNameClassName: styleReview.review_productDetailName,
  yourRatingTextClassName: styleReview.review_productDetailRating,
  productReviewButtonContainerClassName: styleReview.review_productButtonContainer,
  writeReviewButtonClassName: styleReview.review_productButton,
  // form
  formContainerClassName: styleReview.review_form,
  formGroupClassName: `${styleReview.review_formGroup} ${styleForm.form}`,
  formLabelClassName: styleReview.review_formLabel,
  starContainerClassName: styleReview.review_starContainer,
  starClassName: styleReview.review_star,
  imagesContainerClassName: styleReview.review_imagesContainer,
  mediaContainerClassName: styleReview.review_mediaThumbnail,
  imgClassName: styleReview.review_uploadImg,
  mediaRemoverClassName: styleReview.review_mediaRemover,
  containerClassName: styleReview.review_media,
  imgUploadClassName: styleReview.review_upload,
  itemPerPageClassName: `${styleForm.form_itemPerPage} ${styleReview.review_itemPerPage}`,
  itemPerPageLabelClassName: styleForm.form_itemPerPage_label,
  itemPerPageOptionsClassName: `${styleForm.form} w-100 mt-4 ${styleReview.review_itemPerPageOptions}`,
  openReviewButtonClassName: styleReview.review_productButton,
  popupConfirmationSubmitContainerClassName: styleReview.review_popup,
  popupConfirmationSubmitContentClassName: styleReview.review_popupContent,
  popupConfirmationSubmitTitleClassName: styleReview.review_popupTitle,
  popupConfirmationSubmitDescriptionClassName: styleReview.review_popupDesc,
  popupConfirmationSubmitWrapButtonClassName: styleReview.review_popupWrapButton,
  popupConfirmationSubmitButtonConfirmClassName: `${styleButton.btn} ${styleButton.btn_secondary}`,
  popupConfirmationSubmitButtonNoClassName: `${styleButton.btn} ${styleButton.btn_primary}`,
  reviewCardContainerClassName: styleReview.review_reviewCard,
  tileRatingClassName: styleReview.review_reviewCard_title,
  ratingContentClassName: styleReview.review_reviewCard_ratingContent,
  ratingDescriptionClassName: styleReview.review_reviewCard_ratingDesc,
  titleDescriptionClassName: styleReview.review_reviewCard_title,
  descriptionContentClassName: styleReview.review_reviewCard_content,
  titleImageClassName: styleReview.review_reviewCard_title,
  imageListClassName: styleReview.review_reviewCard_imageList,
  imageContentClassName: styleReview.review_reviewCard_imageContent,
  // image pop up
  reviewPopupContainerClassName: styleReview.review_containerImagePopup,
  reviewPopupContentClassName: styleReview.review_contentImagePopup,
  reviewPopupImagePopupClassName: styleReview.review_mainImagePopup,
  reviewPopupLeftButtonClassName: styleReview.review_popupLeftBtn,
  reviewPopupRightButtonClassName: styleReview.review_popupRightBtn,
  reviewPopupButtonCloseClassName: styleReview.review_popupCloseBtn,
  reviewPopupPreviewClassName: styleReview.review_previewImageContainer,
  reviewPopupImagePreviewClassName: styleReview.review_previewImagePopup,
};

const classesPagination = {
  pagingClassName: stylePagination.pagination,
  itemClassName: stylePagination.pagination_item,
  activeClassName: stylePagination.pagination_active,
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
    ...classesPagination
  }

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <div className={styleReview.review_container}>
        <div className={styleReview.review_header}>
          <Breadcrumb
            steps={[
              {
                label: i18n.t('breadcrumb.account'),
                linkProps: {
                  href: '/[lng]/account?tab=orderHistory',
                  as: `/${lng}/account?tab=orderHistory`,
                },
              },
              {
                label: i18n.t('breadcrumb.review')
              }
            ]}
          />
        </div>
        <div className={styleReview.review_body}>
          <OrderReview
            classes={newClassesOrderReview}
            orderID={id as string}
            itemPerPageOptions={[5, 10, 15]}
            filledRatingIcon={<RiStarFill color="998060" size={25}/>}
            unfilledRatingIcon={<RiStarLine color="998060"size={25}/>}
            onSuccessMsg={(msg) => toast.success(msg)}
            starColor="998060"
            onErrorMsg={(msg) => toast.error(msg)}
            thumborSetting={{
              width: size.width < 768 ? 375 : 500,
              format: "webp",
              quality: 85,
            }}
          />
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