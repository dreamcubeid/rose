import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  Products,
  ProductFilter,
  ProductCategory,
  useI18n,
} from "@sirclo/nexus";
import useQuery from "lib/useQuery";
import useWindowSize from "lib/useWindowSize";
import convertToTextFromQuery from "lib/convertToTextFromQuery";
import SEO from "components/SEO";
import Layout from "components/Layout/Layout";
import EmptyComponent from "components/EmptyComponent/EmptyComponent";
import Placeholder from "components/Placeholder";
import { useBrand } from "lib/useBrand";
import { Sliders, ArrowUp } from "react-feather";
import styles from "public/scss/pages/Products.module.scss";

const Popup = dynamic(() => import("components/Popup/Popup"));

const classesProducts = {
  productContainerClassName: `col-6 col-md-3 products_list ${styles.product}`,
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
};

const classesProductSort = {
  sortClassName: `form-group ${styles.sirclo_form_select}`,
  sortOptionsClassName: `form-control ${styles.sirclo_form_input}`,
};

const classesProductFilterSort = {
  filterClassName: styles.products_filter,
  filterNameClassName: styles.products_filterName,
  filterOptionPriceClassName: styles.products_filterPrice,
  filterPriceLabelClassName: styles.products_filterPriceLabel,
  filterPriceInputClassName: styles.products_filterPriceInput,
  filterOptionClassName: styles.products_filterOption,
  filterColorLabelClassName: styles.products_filterOptionLabel,
  filterLabelClassName: styles.products_filterOptionLabel,
  filterCheckboxClassName: styles.products_filterOptionCheckbox,
  filterSliderClassName: styles.products_filterSlider,
  filterSliderRailClassName: styles.products_filterSliderRail,
  filterSliderHandleClassName: styles.products_filterSliderHandle,
  filterSliderTrackClassName: styles.products_filterSliderTrack,
  filterSliderTooltipClassName: styles.products_filterSliderTooltip,
  filterSliderTooltipContainerClassName: styles.products_filterSliderTooltipContainer,
  filterSliderTooltipTextClassName: styles.products_filterSliderTooltipText,
};

const classesProductCategory = {
  parentCategoryClassName: styles.category_order,
  categoryItemClassName: styles.category_list,
  categoryValueClassName: styles.category_list_link,
  categoryNameClassName: styles.category_list_item,
  categoryNumberClassName: "ml-1",
  dropdownIconClassName: "d-none",
};

const classesEmptyComponent = {
  emptyContainer: styles.products_empty,
  emptyTitle: styles.products_empty_title,
  emptyDesc: styles.products_empty_desc,
};

const classesPlaceholderCatProduct = {
  placeholderTitle: `${styles.placeholderItem} ${styles.placeholderItem_productCat__title}`,
};

const classesPlaceholderProduct = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_product__card}`,
};

const ProductsPage: FC<any> = ({
  lng,
  lngDict,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const i18n: any = useI18n();
  const size = useWindowSize();
  const categories: string = useQuery("categories");
  const tagname: string | string[] = router.query.tagname || null;

  const [openSort, setOpenSort] = useState<boolean>(false);
  const [sort, setSort] = useState(null);
  const [filterProduct, setFilterProduct] = useState({});

  const [currPage, setCurrPage] = useState(0);
  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    itemPerPage: 8,
    totalItems: 0,
  });
  const totalPage = Math.ceil(pageInfo.totalItems / pageInfo.itemPerPage);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = () => {
    const lastTestimonial = document.querySelector(
      ".products_list:last-child"
    ) as HTMLElement;

    if (lastTestimonial) {
      const lastTestimonialOffset =
        lastTestimonial.offsetTop + lastTestimonial.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      if (pageOffset > lastTestimonialOffset) {
        if (currPage < totalPage - 1) {
          setCurrPage(currPage + 1);
        }
      }
    }
  };

  useEffect(() => {
    setCurrPage(0);
  }, [filterProduct, categories]);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const toogleSort = () => setOpenSort(!openSort);
  const handleFilter = (selectedFilter: any) =>
    setFilterProduct(selectedFilter);

  return (
    <Layout i18n={i18n} lng={lng} lngDict={lngDict} brand={brand}>
      <SEO title={i18n.t("product.products")} />
      <div className={styles.category}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2">
              <ProductCategory
                classes={classesProductCategory}
                showCategoryNumber={false}
                loadingComponent={
                  <div className="container">
                    <div className="row">
                      <div className="col-4 col-md-2">
                        <Placeholder
                          classes={classesPlaceholderCatProduct}
                          withTitle
                        />
                      </div>
                      <div className="col-4 col-md-2">
                        <Placeholder
                          classes={classesPlaceholderCatProduct}
                          withTitle
                        />
                      </div>
                      <div className="col-4 col-md-2">
                        <Placeholder
                          classes={classesPlaceholderCatProduct}
                          withTitle
                        />
                      </div>
                      <div className="d-none d-md-block col-md-2">
                        <Placeholder
                          classes={classesPlaceholderCatProduct}
                          withTitle
                        />
                      </div>
                      <div className="d-none d-md-block col-md-2">
                        <Placeholder
                          classes={classesPlaceholderCatProduct}
                          withTitle
                        />
                      </div>
                      <div className="d-none d-md-block col-md-2">
                        <Placeholder
                          classes={classesPlaceholderCatProduct}
                          withTitle
                        />
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`container ${styles.products}`}>
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            <div className={styles.products_header}>
              <h3 className="text-capitalize">
                {categories
                  ? convertToTextFromQuery(categories)
                  : i18n.t("product.all")}
              </h3>
            </div>
            <div className="row">
              {Array.from(Array(currPage + 1)).map((_, i) => (
                <Products
                  key={i}
                  tagName={tagname}
                  pageNumber={i}
                  itemPerPage={8}
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
                    <div className="col-12">
                      <EmptyComponent
                        classes={classesEmptyComponent}
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
                    </div>
                  }
                  loadingComponent={
                    <>
                      <div className="col-6 col-md-3 mb-4">
                        <Placeholder
                          classes={classesPlaceholderProduct}
                          withImage={true}
                        />
                      </div>
                      <div className="col-6 col-md-3 mb-4">
                        <Placeholder
                          classes={classesPlaceholderProduct}
                          withImage={true}
                        />
                      </div>
                      <div className="d-none d-md-block col-md-3 mb-4">
                        <Placeholder
                          classes={classesPlaceholderProduct}
                          withImage={true}
                        />
                      </div>
                      <div className="d-none d-md-block col-md-3 mb-4">
                        <Placeholder
                          classes={classesPlaceholderProduct}
                          withImage={true}
                        />
                      </div>
                    </>
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.products_action}>
        <div
          className={`${styles.products_action_sort} mr-2`}
          onClick={toogleSort}
        >
          <span className="mr-2">
            <Sliders color="white" />
          </span>
          <span className={styles.products_action_sort__title}>
            {i18n.t("product.adjust")}
          </span>
        </div>
        <div className={styles.products_action_top} onClick={() => scrollTop()}>
          <span>
            <ArrowUp color="white" />
          </span>
        </div>
      </div>
      {openSort && (
        <Popup
          withHeader
          setPopup={toogleSort}
          popupTitle={i18n.t("product.adjust")}
        >
          <div className={styles.products_sortLabel}>
            {i18n.t("product.sort")}
          </div>
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
              setSort(selectedSort);
              setOpenSort(false);
            }}
          />
        </Popup>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { default: lngDict = {} } = await import(`locales/${params.lng}.json`);

  const brand = await useBrand(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ""
    }
  };
};

export default ProductsPage;
