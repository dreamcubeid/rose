import { FC } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import {
  useI18n,
  Contact,
  Widget,
  isEnquiryAllowed
} from "@sirclo/nexus";
import Layout from "components/Layout/Layout";
import { useBrand } from "lib/useBrand";
import { toast } from "react-toastify";
import styleContact from "public/scss/pages/Contact.module.scss";
import styleForm from "public/scss/components/Form.module.scss";
import styleButton from "public/scss/components/Button.module.scss";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";

const Placeholder = dynamic(() => import("components/Placeholder"));

const classesContact = {
  containerClassName: styleContact.contact_body,
  mapClassName: 'd-none',
  inputContainerClassName: `${styleForm.form} my-4 ${styleContact.contact_form}`,
  titleClassName: "d-none",
  buttonClassName: `${styleButton.btn} ${styleButton.btn_primary} `,
  // inputClassName: ,
  // labelClassName: `d-flex flex-row align-items-center justify-content-start`,
  // buttonContainerClassName: `${styles.contact_buttonContainer} d-block mt-4`,
  widgetClassName: styleContact.contact_widget
};

const classesPlaceholderContact = {
  // placeholderList: `${styles.placeholderItem} ${styles.placeholderItem_contactWidget}`
}

const ContactPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const i18n: any = useI18n();
  const allowedEnquiry = isEnquiryAllowed()

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      headerTitle={i18n.t('contact.title')}
      withAllowed={allowedEnquiry}
    >
      <div className={styleContact.contact_container}>
        <div className={styleContact.contact_header}>
          <Breadcrumb
            steps={[{ label: i18n.t('breadcrumb.home') }, { label: i18n.t('breadcrumb.contact') }]}
          />
        </div>
        <Contact
          classes={classesContact}
          isAddressDetail={false}
          onCompleted={() => toast.success(i18n.t("contact.submitSuccess"))}
          onError={() => toast.error(i18n.t("contact.submitError"))}
          widget={
            <Widget
              pos="footer-4"
              widgetClassName={styleContact.contact_info}
              loadingComponent={
                <Placeholder
                  classes={classesPlaceholderContact}
                  withList
                  listMany={5}
                />
              }
            />
          }
        />
      </div>

      {/* <div className="container">
        <div className="row">
          <div className="col-12 col-sm-8 offset-sm2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">

            <div className={`${styles.contact_info} ${styles.contact_info__top}`}>
              <h1>{i18n.t("contact.title")}</h1>
              <Widget
                pos="footer-3"
                widgetClassName={styles.contact_info}
                loadingComponent={
                  <Placeholder
                    classes={classesPlaceholderContact}
                    withList
                    listMany={5}
                  />
                }
              />
            </div>

            <Contact
              classes={classesContact}
              isAddressDetail={false}
              onCompleted={() => toast.success(i18n.t("contact.submitSuccess"))}
              onError={() => toast.error(i18n.t("contact.submitError"))}
              widget={
                <Widget
                  pos="footer-4"
                  widgetClassName={styles.contact_info}
                  loadingComponent={
                    <Placeholder
                      classes={classesPlaceholderContact}
                      withList
                      listMany={5}
                    />
                  }
                />
              }
            />
          </div>
        </div>
      </div> */}
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

export default ContactPage;
