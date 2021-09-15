/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import Router from 'next/router'
import { toast } from 'react-toastify'
import ReCAPTCHA from 'react-google-recaptcha'
import { Calendar, CheckCircle } from 'react-feather'
import { RiEyeCloseLine, RiEye2Line } from 'react-icons/ri'
import { 
  Register, 
  useI18n, 
  SingleSignOn 
} from '@sirclo/nexus'
/* library template */
import { parseCookies } from 'lib/parseCookies'
import redirectIfAuthenticated from 'lib/redirectIfAuthenticated'
import { useBrand } from 'lib/useBrand'
import { useGoogleAuth } from 'lib/useGoogleAuth'
import { useFacebookAuth } from 'lib/useFacebookAuth'
/* components */
import SEO from 'components/SEO'
import Layout from 'components/Layout/Layout'
import Loader from 'components/Loader/Loader'
import LoaderPages from 'components/Loader/LoaderPages'
import Breadcrumbs from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styleLogin from 'public/scss/pages/Login.module.scss'
import styleForm from 'public/scss/components/Form.module.scss'
import styleButton from 'public/scss/components/Button.module.scss'

const classesRegister = {
  containerClassName: styleLogin.login_containerForm,
  basicInfoContainerClassName: 'w-100',
  headerLabelClassName: 'd-none',
  inputContainerClassName: `${styleLogin.login_inputContainer} ${styleForm.form}`,
  passwordContainerClassName: `${styleLogin.login_passwordContainer}`,
  passwordStrengthBarContainerClassName: 'd-none',
  passwordCriteriaListClassName: `d-none`,
  labelRequiredClassName: 'd-none',
  verificationContainerClassName: 'mt-2 mb-4 p-0',
  buttonClassName: `${styleButton.btn} ${styleButton.btn_primary}`,
}

const RegisterPage: FC<any> = ({
  lng,
  lngDict,
  brand,
  hasGoogleAuth,
  hasFacebookAuth,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()

  const [isVerified, setIsVerified] = useState<boolean>(false)

  return (
    <Layout 
      i18n={i18n} 
      lng={lng} 
      lngDict={lngDict} 
      brand={brand}>
      <SEO title={i18n.t('register.register')} />
      <div className={styleLogin.login}>
        <div className={styleLogin.login_breadcrumb}>
          <Breadcrumbs
            steps={[{ label: i18n.t('breadcrumb.home') }, { label: i18n.t('breadcrumb.login') }]}
          />
        </div>
        <div className={styleLogin.login_header}>
          <h3>{i18n.t('register.newAccount')}</h3>
        </div>
        <div className={styleLogin.login_container}>
          <Register
            classes={classesRegister}
            withHeaderLabel={true}
            onErrorMsg={(msg) => toast.error(msg)}
            onSuccessMsg={(msg) => toast.success(msg)}
            redirectPage={() => Router.push(`/[lng]/login`, `/${lng}/login`)}
            passwordViewIcon={<RiEyeCloseLine />}
            passwordHideIcon={<RiEye2Line />}
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
          <div className={styleLogin.login_loginContainer}>
            <Link href="/[lng]/login" as={`/${lng}/login`}>
              <a>{i18n.t('placeOrder.haveAnAccount')}</a>
            </Link>
          </div>
          {(hasGoogleAuth || hasFacebookAuth) && (
            <div>
              <label className={styleLogin.login_separator}>
                <span>{i18n.t('login.or')}</span>
              </label>
              <div className={styleLogin.login_containerAuth}>
                <SingleSignOn
                  className={styleLogin.login_containerAuth_item}
                  buttonText={`${i18n.t('login.login')} ${i18n.t('login.sso')}`}
                  loadingComponent={
                    <div>
                      <LoaderPages />
                    </div>
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const { default: lngDict = {} } = await import(`locales/${params.lng}.json`)

  const brand = await useBrand(req)

  const cookies = parseCookies(req)
  const hasGoogleAuth = await useGoogleAuth(req)
  const hasFacebookAuth = await useFacebookAuth(req)
  redirectIfAuthenticated(res, cookies, 'account')

  return {
    props: {
      lng: params.lng,
      lngDict,
      hasGoogleAuth,
      hasFacebookAuth,
      brand: brand || '',
    },
  }
}

export default RegisterPage
