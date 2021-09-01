import { FC, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Router from "next/router";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Eye,
  EyeOff,
  Calendar,
  CheckCircle
} from "react-feather";
import {
  Register,
  useI18n,
  SingleSignOn
} from "@sirclo/nexus";
import { parseCookies } from "lib/parseCookies";
import redirectIfAuthenticated from "lib/redirectIfAuthenticated";
import { useBrand } from "lib/useBrand";
import { useGoogleAuth } from "lib/useGoogleAuth";
import { useFacebookAuth } from "lib/useFacebookAuth";
import SEO from "components/SEO";
import Layout from "components/Layout/Layout";
import Loader from "components/Loader/Loader";
import LoaderPages from 'components/Loader/LoaderPages';
import styles from "public/scss/pages/Login.module.scss";

const classesRegister = {
  containerClassName: `${styles.login_item} ${styles.login_item__form} order-3`,
  basicInfoContainerClassName: "d-block m-0 p-0",
  deliveryAddressContainerClassName: "col-12",
  headerLabelClassName: `${styles.login_label__header} d-flex flex-row align-item-center justify-content-start`,
  inputContainerClassName: `${styles.sirclo_form_row} sirclo_form__city`,
  inputClassName: `form-control ${styles.sirclo_form_input}`,
  datePickerInputClassName: "date-picker__input",
  datePickerCalendarClassName: "date-picker__calendar",
  passwordStrengthBarClassName: styles.passwordBar,
  passwordStrengthBarContainerClassName: styles.passwordValidation,
  passwordCriteriaListClassName: `${styles.formPassword} d-none`,
  passwordCriteriaClassName: styles.formPasswordList,
  labelRequiredClassName: `${styles.login_label__required} d-flex flex-row align-items-center justify-content-start mb-2`,
  verificationContainerClassName: "d-block m-0 p-0",
  buttonClassName: `btn ${styles.btn_primary} ${styles.btn_long} ${styles.btn_full_width} ${styles.btn_center} text-uppercase mt-4`,
};

const RegisterPage: FC<any> = ({
  lng,
  lngDict,
  brand,
  hasGoogleAuth,
  hasFacebookAuth
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();

  const [isVerified, setIsVerified] = useState<boolean>(false);

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <SEO title={i18n.t("register.register")} />

      <section className={styles.login_wrapper}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 d-flex flex-column align-items-start justify-content-start flex-nowrap">

              <div className={`${styles.login_item} ${styles.login_item__title} order-1`}>
                <h3>{i18n.t("register.newAccount")}</h3>
                <span>{i18n.t("register.promo")}</span>
              </div>

              <Register
                classes={classesRegister}
                withHeaderLabel={true}
                onErrorMsg={(msg) => toast.error(msg)}
                onSuccessMsg={(msg) => toast.success(msg)}
                redirectPage={() => Router.push(`/[lng]/login`, `/${lng}/login`)}
                passwordViewIcon={<Eye />}
                passwordHideIcon={<EyeOff />}
                passwordFulfilledCriteriaIcon={<CheckCircle color="green" size={16} />}
                passwordUnfulfilledCriteriaIcon={<CheckCircle color="gray" size={16} />}
                datePickerCalendarIcon={<Calendar />}
                withVerification={true}
                isVerified={isVerified}
                loadingComponent={<Loader color="text-light" />}
                verificationComponent={
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_SITEKEY_RECAPTCHA}
                    onChange={() => setIsVerified(true)}
                  />
                }
              />

              {(hasGoogleAuth || hasFacebookAuth) &&
                <div className={`${styles.login_item} ${styles.login_item__sso} order-2`}>
                  <SingleSignOn
                    className={styles.login_item__ssoButton}
                    buttonText={`${i18n.t("login.register")} ${i18n.t("login.sso")}`}
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
}

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

export default RegisterPage;
