/* library package */
import {
  FC,
  useState,
  useEffect
} from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import { withBrand, Newsletter } from '@sirclo/nexus'
/* components */
import Header from '../Header'
import Footer from '../Footer/Footer'
import SEO from '../SEO'
import PageNotFound from 'components/PageNotFound'
import Copyright from 'components/Copyright'
/* styles */
import styleNewsletter from 'public/scss/components/Newsletter.module.scss'
import styleForm from 'public/scss/components/Form.module.scss'
import styleButton from 'public/scss/components/Button.module.scss'

type LayoutPropType = {
  lngDict: any
  i18n: any
  lng: string
  layoutClassName?: string
  withAnnouncement?: boolean
  withHeader?: boolean
  headerTitle?: string
  withFooter?: boolean
  withCopyright?: boolean
  withAllowed?: boolean | undefined
  [otherProp: string]: any
}

const classesNewsletterPopup = {
  containerClassName: styleNewsletter.newsletter_popupContainer,
  closeButtonClassName: styleNewsletter.newsletter_close,
  formContainerClassName: styleForm.form,
  buttonClassName: `${styleButton.btn} ${styleButton.btn_primary} mt-4`,
}

const Layout: FC<LayoutPropType> = ({
  lngDict,
  i18n,
  lng,
  layoutClassName = "",
  withAnnouncement = false,
  withHeader = true,
  headerTitle,
  withFooter = true,
  withCopyright = false,
  withAllowed = true,
  brand,
  ...props
}) => {
  const router: any = useRouter()
  const [isSticky, setSticky] = useState<boolean>(false)

  const handleScroll = () => {
    const offset = window.scrollY
    setSticky(offset > 0)
  }

  useEffect(() => {
    i18n?.locale(lng, lngDict)
  }, [lng, lngDict])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    }
  }, [])

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
          href="webfonts/Inter-Regular.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="webfonts/Inter-SemiBold.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="webfonts/Lora-Medium.ttf"
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
          withAnnouncement={withAnnouncement}
          headerTitle={headerTitle}
          stickyClass={stickyMechanic(router.pathname)}
        />
      }
      <main className={layoutClassName}>
        {withAllowed ?
          props.children :
          <PageNotFound i18n={i18n} />
        }
        {withFooter &&
          <Footer brand={brand} />
        }
        {withCopyright &&
          <Copyright brand={brand} />
        }
      </main>
      <ToastContainer />
      <div className={styleNewsletter.newsletter_overlay}>
        <Newsletter
          classes={classesNewsletterPopup}
          closeButton={i18n.t("newsletter.close")}
          withForm
          buttonComponent={i18n.t("newsletter.subscribe")}
          onComplete={() => toast.success(i18n.t("newsletter.submitSuccess"))}
          onError={() => toast.error(i18n.t("newsletter.submitError"))}
        />
      </div>
    </>
  )
}

export default withBrand(Layout)