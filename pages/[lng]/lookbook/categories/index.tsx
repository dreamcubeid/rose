import { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Router from "next/router";
import {
  Lookbook,
  isLookbookAllowed,
  useI18n
} from "@sirclo/nexus";
import { useBrand } from "lib/useBrand";
import useWindowSize from "lib/useWindowSize";
import Layout from "components/Layout/Layout";
import Placeholder from "components/Placeholder";

import styles from "public/scss/pages/Lookbook.module.scss";

const classesLookbook = {
  containerClassName: styles.lookbook,
  rowClassName: styles.lookbook_row,
  lookbookContainerClassName: styles.lookbook_item,
  imageClassName: `${styles.lookbook_itemImage} d-block mt-0 mx-auto w-100`,
  lookbookLabelContainerClassName: `${styles.lookbook_itemDetail}`,
  labelClassName: `d-flex flex-row align-items-center justify-content-start m-0 p-0`,
  linkClassName: `${styles.lookbook_itemButton}`,
};

const classesPlaceholderLookbook = {
  placeholderList: `${styles.lookbook_placeholder} d-block p-0 mt-0 mb-3 mx-auto w-100`
}

const LookbookCategory: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const size = useWindowSize();
  const LookbookAllowed = isLookbookAllowed();

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      withAllowed={LookbookAllowed}
    >
      <div className={`${styles.lookbook_wrapper} container`}>
        <div className="row">
          <div className="col-12 col-sm-8 offset-sm2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">

            <div className={`${styles.contact_info} ${styles.contact_info__top}`}>
              <h1>{i18n.t("lookbook.title")}</h1>
            </div>

            <Lookbook
              classes={classesLookbook}
              linkText={i18n.t("lookbook.seeCollection")}
              pathPrefix={`lookbook/categories`}
              loadingComponent={
                <div className="mt-3">
                  <Placeholder
                    classes={classesPlaceholderLookbook}
                    withList
                    listMany={5}
                  />
                </div>
              }
              emptyStateComponent={
                <p className="d-flex flex-row align-items-center justify-content-center text-align-center p-5">
                  {i18n.t("lookbook.isEmpty")}
                </p>
              }
              errorComponent={
                <div className={styles.lookbook_popup}>
                  <div className={styles.lookbook_popupContent}>
                    <h3>{i18n.t("lookbook.errorTitle")}</h3>
                    <p>{i18n.t("lookbook.errorDesc")}</p>
                  </div>
                  <div>
                    <button
                      className={`btn ${styles.btn_primary} py-3 px-5`}
                      onClick={() => Router.push("/[lng]", `/${lng}`)}
                    >
                      {i18n.t("lookbook.errorButton")}
                    </button>
                  </div>
                </div>
              }
              thumborSetting={{
                width: size.width < 768 ? 400 : 600,
                format: "webp",
                quality: 85,
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

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
}

export default LookbookCategory;
