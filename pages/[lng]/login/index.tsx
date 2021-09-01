import { FC } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Eye, EyeOff } from "react-feather";
import { toast } from "react-toastify";
import {
  Login,
  useI18n,
  SingleSignOn
} from "@sirclo/nexus";
import { parseCookies } from "lib/parseCookies";
import redirectIfAuthenticated from "lib/redirectIfAuthenticated";
import { useBrand } from "lib/useBrand";
import { useGoogleAuth } from 'lib/useGoogleAuth';
import { useFacebookAuth } from "lib/useFacebookAuth";
import SEO from "components/SEO";
import Layout from "components/Layout/Layout";
import Loader from "components/Loader/Loader";
import LoaderPages from 'components/Loader/LoaderPages';
import styles from "public/scss/pages/Login.module.scss";

const loginClasses = {
  containerClassName: `${styles.login_item} ${styles.login_item__form} order-3`,
  inputContainerClassName: styles.sirclo_form_row,
  inputClassName: `form-control ${styles.sirclo_form_input}`,
  buttonClassName: `btn ${styles.btn_primary} ${styles.btn_long} ${styles.btn_full_width} ${styles.btn_center} text-uppercase mt-4`,
  footerClassName: `${styles.login_item} ${styles.login_item__link} text-center order-5`,
  forgotPasswordClass: `${styles.login_item} ${styles.login_item__link} text-center order-4`,
  forgotLinkClass: `${styles.login_forgotLink}`
}

const LoginPage: FC<any> = ({
  lng,
  lngDict,
  brand,
  hasGoogleAuth,
  hasFacebookAuth
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <SEO title={i18n.t("login.title")} />

      <section className={styles.login_wrapper}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 d-flex flex-column align-items-start justify-content-start flex-nowrap">

              <div className={`${styles.login_item} ${styles.login_item__title} order-1`}>
                <h3>{i18n.t("login.title")}</h3>
                <span>{i18n.t("login.welcome")}</span>
              </div>

              <Login
                classes={loginClasses}
                onCompletedMsg={(msg) => toast.success(msg)}
                onErrorMsg={(msg) => toast.error(msg)}
                passwordViewIcon={<Eye />}
                passwordHideIcon={<EyeOff />}
                loadingComponent={<Loader color="text-light" />}
              />

              {(hasGoogleAuth || hasFacebookAuth) &&
                <div className={`${styles.login_item} ${styles.login_item__sso} order-2`}>
                  <SingleSignOn
                    className={styles.login_item__ssoButton}
                    buttonText={`${i18n.t("login.login")} ${i18n.t("login.sso")}`}
                    loadingComponent={
                      <div className={`${styles.popup_overlay}`}>
                        <LoaderPages />
                      </div>
                    }
                  />
                  <label className="d-flex flex-row align-items-center justify-content-center flex-nowrap w-100">
                    <span className="d-flex flex-row align-items-center justify-content-start text-center">{i18n.t("testimonials.or")}</span>
                  </label>
                </div>
              }
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
  const hasGoogleAuth = await useGoogleAuth(req);
  const hasFacebookAuth = await useFacebookAuth(req);
  redirectIfAuthenticated(res, cookies, 'account');

  return {
    props: {
      lng: params.lng,
      lngDict,
      hasGoogleAuth,
      hasFacebookAuth,
      brand: brand || ""
    }
  };
}

export default LoginPage;