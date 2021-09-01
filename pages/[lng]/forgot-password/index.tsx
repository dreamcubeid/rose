import { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ResetPassword, useI18n } from "@sirclo/nexus";
import SEO from "components/SEO";
import Layout from "components/Layout/Layout";
import Loader from "components/Loader/Loader";
import { parseCookies } from "lib/parseCookies";
import redirectIfAuthenticated from "lib/redirectIfAuthenticated";
import { useBrand } from "lib/useBrand";
import { toast } from "react-toastify";
import styles from "public/scss/pages/Login.module.scss";

const classesResetPassword = {
  containerClassName: `${styles.login_item} ${styles.login_item__form}`,
  inputContainerClassName: styles.sirclo_form_row,
  inputClassName: `form-control ${styles.sirclo_form_input}`,
  buttonClassName: `btn 
    ${styles.btn_primary} ${styles.btn_long} 
    ${styles.btn_full_width} ${styles.btn_center}`,
  spinnerClassName: "spinner-border text-light spinner-border-sm",
}

const ForgotPassword: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <SEO title={i18n.t("resetPassword.title")} />
      <section className={styles.login_wrapper}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 d-flex flex-column align-items-start justify-content-start flex-nowrap">
              <div className={`${styles.login_item} ${styles.login_item__title}`}>
                <h3>{i18n.t("resetPassword.title")}</h3>
                <span>{i18n.t("resetPassword.enterEmailBody")}</span>
              </div>
              <ResetPassword
                classes={classesResetPassword}
                onErrorMsg={(msg) => toast.error(msg)}
                loadingComponent={<Loader color="text-light" />}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  );

  const brand = await useBrand(req);

  const cookies = parseCookies(req);
  redirectIfAuthenticated(res, cookies, 'account');

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ""
    }
  };
}

export default ForgotPassword;