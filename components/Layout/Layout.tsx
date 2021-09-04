/* library package */
import {
  FC,
  useState,
  useEffect
} from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import { X as XIcon } from 'react-feather'
import { withBrand, Newsletter } from '@sirclo/nexus'
/* components */
import Header from '../Header'
import Footer from '../Footer/Footer'
import SEO from '../SEO'
import PageNotFound from 'components/PageNotFound'
/* styles */
import styleNewsletter from 'public/scss/components/Newsletter.module.scss'

type LayoutPropType = {
  lngDict: any
  i18n: any
  lng: string
  layoutClassName?: string
  withHeader?: boolean
  withFooter?: boolean
  withAllowed?: boolean | undefined
  [otherProp: string]: any
}

const classesNewsletterPopup = {
  containerClassName: styleNewsletter.newsletter_popupContainer,
  closeButtonClassName: styleNewsletter.newsletter_close,
  formContainerClassName: styleNewsletter.newsletter_form,
  labelClassName: "d-none",
  inputClassName: "form-control",
  buttonClassName: `btn mt-3 ${styleNewsletter.btn_blue} ${styleNewsletter.btn_center}`,
}

const Layout: FC<LayoutPropType> = ({
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
  const router: any = useRouter()
  const [isSticky, setSticky] = useState<boolean>(false)

  const handleScroll = () => {
    const offset = window.scrollY
    setSticky(offset > 25)
  }

  useEffect(() => {
    i18n?.locale(lng, lngDict)
  }, [lng, lngDict])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    }
  }, []);

  useEffect(() => {
    if (brand?.googleAdsWebsiteMetaToken) getToken()
  }, [brand])

  const stickyMechanic = (pathname: string) => {
    let className = 'transparent'
    let stickyNavPathCategories = ['/[lng]', '/[lng]/lookbook/categories']
    let stickyNavPathHome = ['/[lng]', '/[lng]']
    let stickyActive = stickyNavPathCategories.includes(pathname) || stickyNavPathHome.includes(pathname)

    if (!stickyActive) className = 'notSticky'
    else if (isSticky && stickyActive) className = 'notSticky'

    return className
  }

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
        <Header
          lng={lng}
          stickyClass={stickyMechanic(router.pathname)}
        />
      }
      <main className={layoutClassName}>
        {withAllowed ?
          props.children :
          <PageNotFound i18n={i18n} />
        }
      </main>
      <ToastContainer />
      <div className={styleNewsletter.newsletter_overlay}>
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
  )
}

export default withBrand(Layout)
