import { FC, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import {
  useI18n,
  Blogs,
  BlogCategories,
  getBlogHeaderImage,
  BlogRecent,
  isBlogAllowed
} from "@sirclo/nexus";
import useWindowSize from "lib/useWindowSize";
import { useBrand } from "lib/useBrand";
import Layout from "components/Layout/Layout";
import { GRAPHQL_URI } from "components/Constants";
import styles from "public/scss/pages/Blog.module.scss";

const EmptyComponent = dynamic(() => import("components/EmptyComponent/EmptyComponent"));
const Placeholder = dynamic(() => import("components/Placeholder"));

const classesBlogs = {
  blogsContainerClassName: styles.blog,
  blogContainerClassName: styles.blog_item,
  categoryClassName: styles.blog_itemCategory,
  imageContainerClassName: styles.blog_itemImageContainer,
  imageClassName: styles.blog_itemImage,
  descriptionClassName: styles.blog_itemContent,
  titleClassName: styles.blog_itemTitle,
  authorClassName: styles.blog_itemAuthor,
  descriptionInnerFooterClassName: styles.blog_itemInnerFooter,
  dateClassName: styles.blog_itemInnerFooterDate,
  authorPicClassName: "d-none"
}

const classesBlogCategories = {
  containerClassName: styles.blog_category,
  categoryClassName: styles.blog_categoryItem,
  linkClassName: styles.blog_categoryLink,
}

const classesEmptyComponent = {
  emptyContainer: styles.blog_empty,
  emptyTitle: styles.blog_emptyTitle
};

const classesPagination = {
  pagingClassName: styles.pagination,
  activeClassName: styles.pagination_active,
  itemClassName: styles.pagination_item
}

const classesPlaceholderBlogs = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_blogsList}`
}

const classesBlogRecent = {
  containerClassName: styles.blog_recent,
  blogRecentClassName: styles.blog_recentItem,
  imageClassName: styles.blog_recentItemImage,
  labelContainerClassName: styles.blog_recentItemContent,
  titleClassName: styles.blog_recentItemContentTitle,
  dateClassName: styles.blog_recentItemContentDate
}

const Blog: FC<any> = ({
  lng,
  lngDict,
  headerImage,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const size = useWindowSize();

  const [totalCategories, setTotalCategories] = useState(null);
  const BlogAllowed = isBlogAllowed();

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      withAllowed={BlogAllowed}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-8 offset-sm2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <div
              className={`${styles.blog_headerContainer} ${!headerImage && styles.blog_headerWithoutBackground}`}
              style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${headerImage})` }}
            >
              <h1 className={styles.blog_headerTitle}>
                {i18n.t("blog.title")}
              </h1>
            </div>
            <Blogs
              classes={classesBlogs}
              paginationClasses={classesPagination}
              withPagination
              itemPerPage={4}
              thumborSetting={{
                width: size.width < 768 ? 375 : 512,
                format: "webp",
                quality: 85,
              }}
              LoadingComponent={
                <>
                  <Placeholder classes={classesPlaceholderBlogs} withImage />
                  <Placeholder classes={classesPlaceholderBlogs} withImage />
                  <Placeholder classes={classesPlaceholderBlogs} withImage />
                </>
              }
              emptyStateComponent={
                <EmptyComponent
                  classes={classesEmptyComponent}
                  title={i18n.t("blog.isEmpty")}
                />
              }
            />
            {(totalCategories > 0 || totalCategories === null) &&
              <>
                <h2 className={styles.blog_titleSide}>
                  {i18n.t("blog.categories")}
                </h2>
                <BlogCategories
                  classes={classesBlogCategories}
                  getCategoriesCount={(categoriesCount) => setTotalCategories(categoriesCount)}
                />
              </>
            }
            <h2 className={styles.blog_titleSide}>
              {i18n.t("blog.recentPost")}
            </h2>
            <BlogRecent
              classes={classesBlogRecent}
              limit={5}
              linkPrefix="blog"
              thumborSetting={{
                width: 100,
                format: "webp",
                quality: 85
              }}
              loadingComponent={
                <>
                  <Placeholder classes={classesPlaceholderBlogs} withImage />
                  <Placeholder classes={classesPlaceholderBlogs} withImage />
                  <Placeholder classes={classesPlaceholderBlogs} withImage />
                </>
              }
            />
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
  const headerImage = await getBlogHeaderImage(GRAPHQL_URI(req));

  return {
    props: {
      lng: params.lng,
      lngDict,
      headerImage,
      brand: brand || ""
    },
  };
}

export default Blog;