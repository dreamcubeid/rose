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
import styles from "public/scss/pages/Contact.module.scss";

const Placeholder = dynamic(() => import("components/Placeholder"));

const classesContact = {
  containerClassName: `${styles.contact_container} d-flex flex-column align-items-start justify-content-start`,
  mapClassName: styles.contact_map,
  formContainerClassName: styles.contact_form,
  titleClassName: "d-none",
  inputContainerClassName: `${styles.sirclo_form_row}`,
  inputClassName: `form-control ${styles.sirclo_form_input}`,
  labelClassName: `d-flex flex-row align-items-center justify-content-start`,
  buttonContainerClassName: `${styles.contact_buttonContainer} d-block mt-4`,
  buttonClassName: `${styles.btn} ${styles.btn_primary} ${styles.btn_long} ${styles.btn_full_width} ${styles.btn_center}`,
  widgetClassName: styles.contact_widget
};

const classesPlaceholderContact = {
  placeholderList: `${styles.placeholderItem} ${styles.placeholderItem_contactWidget}`
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
      withAllowed={allowedEnquiry}
    >
      <div className="container">
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
      </div>
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
