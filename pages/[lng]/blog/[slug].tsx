import { FC, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import {
  BlogSingle,
  BlogCategories,
  useI18n,
  BlogRecent
} from "@sirclo/nexus";
import Layout from "components/Layout/Layout";
import { useBrand } from "lib/useBrand";
import styles from "public/scss/pages/Blog.module.scss";

const Placeholder = dynamic(() => import("components/Placeholder"));
const Popup = dynamic(() => import("components/Popup/Popup"));
const SocialShare = dynamic(() => import("components/SocialShare"));

const classesBlogSingle = {
  blogContainerClassName: styles.blog_detail,
  headerClassName: styles.blog_detailHeader,
  headerContentClassName: styles.blog_detailHeaderContent,
  headerDetailClassName: styles.blog_detailMetaWrapper,
  headerEndClassName: "d-none",
  authorPicContainerClassName: "d-none",
  authorPicClassName: "d-none",
  authorInfoClassName: "d-none",
  createdByClassName: `d-flex flex-row align-items-center justify-content-start flex-nowrap w-100`,
  createdByInnerClassName: `${styles.blog_detailMeta} d-flex flex-row align-items-center justify-content-start flex-wrap`,
  authorClassName: "d-flex flex-row align-items-center justify-content-start order-2",
  dateClassName: "d-flex flex-row align-items-center justify-content-start order-1",
  blogContentClassName: styles.blog_detailContent
}

const classesBlogCategories = {
  containerClassName: styles.blog_category,
  categoryClassName: styles.blog_categoryItem,
  linkClassName: styles.blog_categoryLink,
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

const BlogSlug: FC<any> = ({
  lng,
  lngDict,
  slug,
  brand,
  urlSite
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const [totalCategories, setTotalCategories] = useState(null);
  const [showShare, setShowShare] = useState<boolean>(false);
  const toggleShare = () => setShowShare(!showShare);

  const router = useRouter();

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-8 offset-sm2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <BlogSingle
                classes={classesBlogSingle}
                ID={slug.toString()}
                timeIcon={
                  <div className={`${styles.blog_detailIcon} ${styles.blog_detailIcon__time}`}></div>
                }
                authorIcon={
                  <div className={`${styles.blog_detailIcon} ${styles.blog_detailIcon__author}`}></div>
                }
                loadingComponent={
                  <div className="row">
                    <div className="col-2">
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                    </div>
                    <div className="col-3">
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                    </div>
                    <div className="col-12 py-4">
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                    </div>
                  </div>
                }
              />

              <div className={`${styles.lookbook_nav} ${styles.blog_detailNavigation} d-flex flex-row align-items-center justify-content-between`}>
                <button onClick={() => router.back()}>
                  {i18n.t("global.back")}
                </button>
                <button onClick={() => toggleShare()} className={styles.blog_detailShare}>
                  {i18n.t("product.share")}
                </button>
              </div>

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

        {showShare && (
          <Popup
            withHeader
            setPopup={toggleShare}
            mobileFull={false}
            classPopopBody
            popupTitle={i18n.t("product.shareProduct")}
          >
            <div className="">
              <SocialShare i18n={i18n} urlSite={urlSite} />
            </div>
          </Popup>
        )}

      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const { slug } = params;
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  );

  const brand = await useBrand(req);

  const urlSite = `https://${req.headers.host}/${params.lng}/blog/${slug}`;

  return {
    props: {
      lng: params.lng,
      lngDict,
      slug: params.slug,
      brand: brand || '',
      urlSite: urlSite
    },
  };
}

export default BlogSlug;
