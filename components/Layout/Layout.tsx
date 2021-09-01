import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { withBrand, Newsletter } from "@sirclo/nexus";
import Head from "next/head";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SEO from "../SEO";
import { X as XIcon } from "react-feather";
import PageNotFound from "components/PageNotFound";
import styles from "public/scss/components/Newsletter.module.scss";

type LayoutPropType = {
  lngDict: any;
  i18n: any;
  lng: string;
  layoutClassName?: string;
  withHeader?: boolean;
  withFooter?: boolean;
  withAllowed?: boolean | undefined;
  [otherProp: string]: any;
};

const classesNewsletterPopup = {
  containerClassName: styles.newsletter_popupContainer,
  closeButtonClassName: styles.newsletter_close,
  formContainerClassName: styles.newsletter_form,
  labelClassName: "d-none",
  inputClassName: "form-control",
  buttonClassName: `btn mt-3 ${styles.btn_blue} ${styles.btn_center}`,
}

const Layout: React.FC<LayoutPropType> = ({
  lngDict,
  i18n,
  lng,
  layoutClassName = "",
  withHeader = true,
  withFooter = true,
  withAllowed = true,
  brand,
  ...props
}) => {

  useEffect(() => {
    i18n?.locale(lng, lngDict);
  }, [lng, lngDict]);

  useEffect(() => {
    if (brand?.googleAdsWebsiteMetaToken) getToken()
  }, [brand])

  const getToken = (): string => {
    const googleAdsWebsiteMetaToken = brand?.googleAdsWebsiteMetaToken
    const token: string = googleAdsWebsiteMetaToken.replace(/.*content="([^"]*)".*/, "$1")
    return token
  }

  return (
    <>
      <Head>
        {brand?.settings?.hideFromSearchEngine && (
          <meta name="robots" content="noindex, nofollow"></meta>
        )}
        <title>{brand?.settings?.websiteTitle}</title>
        {brand?.googleAdsWebsiteMetaToken &&
          <meta name="google-site-verification" content={getToken()} />
        }
        <link
          rel="shortcut icon"
          href={brand?.settings?.faviconURL}
          type="image/x-icon"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="preload"
          href="webfonts/Roboto-Regular.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="webfonts/Roboto-Black.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="webfonts/Roboto-Medium.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://thumbor.sirclocdn.com" />
        <link rel="preconnect" href="https://storage.googleapis.com" />
      </Head>
      <SEO
        title={brand?.settings?.websiteTitle}
        description={brand?.settings?.websiteDescription}
        image={brand?.logoURL}
      />
      {withHeader &&
        <Header lng={lng} />
      }
      <main className={layoutClassName}>
        {withAllowed ?
          props.children :
          <PageNotFound i18n={i18n} />
        }
      </main>
      <ToastContainer />
      <div className={styles.newsletter_overlay}>
        <Newsletter
          classes={classesNewsletterPopup}
          closeButton={<XIcon color="black" size="18" />}
          withForm
          buttonComponent={i18n.t("newsletter.subscribe")}
          onComplete={() => toast.success(i18n.t("newsletter.submitSuccess"))}
          onError={() => toast.error(i18n.t("newsletter.submitError"))}
        />
      </div>
      {withFooter &&
        <Footer brand={brand} />
      }
    </>
  );
};

export default withBrand(Layout);
