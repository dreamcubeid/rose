import { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { SetNewPassword, useI18n } from "@sirclo/nexus";
import SEO from "components/SEO";
import Layout from "components/Layout/Layout";
import Loader from "components/Loader/Loader";
import { useBrand } from "lib/useBrand";
import { toast } from "react-toastify";
import {
  Eye,
  EyeOff,
  CheckCircle
} from "react-feather";
import styles from "public/scss/pages/ResetPassword.module.scss";

const classesSetNewPassword = {
  containerClassName: styles.resetPassword_innerForm,
  inputContainerClassName: styles.sirclo_form_row,
  inputClassName: `form-control mb-4 ${styles.sirclo_form_input}`,
  passwordViewButtonClassName: `${styles.sirclo_form_input_btn}`,
  passwordStrengthBarClassName: styles.passwordBar,
  passwordStrengthBarContainerClassName: styles.passwordValidation,
  passwordCriteriaListClassName: styles.formPassword,
  passwordCriteriaClassName: styles.formPasswordList,
  buttonClassName: `btn 
  ${styles.btn_primary} ${styles.btn_long} 
  ${styles.btn_full_width} ${styles.btn_center}`,
  errorClassName: styles.resetPassword_error
}

const ResetPasswordPage: FC<any> = ({
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
      <SEO title={i18n.t("resetPassword.setNew")} />
      <section>
        <div className="container">
          <div className={styles.resetPassword_container}>
            <div className={styles.resetPassword_inner}>
              <div className={styles.resetPassword_inner_title}>
                <h3>{i18n.t("resetPassword.setNew")}</h3>
              </div>
              <SetNewPassword
                classes={classesSetNewPassword}
                onErrorMsg={toast.error}
                onSuccessMsg={toast.success}
                passwordViewIcon={<Eye />}
                passwordHideIcon={<EyeOff />}
                passwordFulfilledCriteriaIcon={<CheckCircle color="green" size={16} />}
                passwordUnfulfilledCriteriaIcon={<CheckCircle color="gray" size={16} />}
                loadingComponent={<Loader color="text-light" />}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  );

  const brand = await useBrand(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ""
    }
  };
}

export default ResetPasswordPage;
