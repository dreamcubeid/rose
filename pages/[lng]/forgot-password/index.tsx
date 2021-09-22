import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { ResetPassword, useI18n } from '@sirclo/nexus'
import SEO from 'components/SEO'
import Layout from 'components/Layout/Layout'
import Loader from 'components/Loader/Loader'
import { parseCookies } from 'lib/parseCookies'
import redirectIfAuthenticated from 'lib/redirectIfAuthenticated'
import { useBrand } from 'lib/useBrand'
import { toast } from 'react-toastify'
import styleLogin from 'public/scss/pages/Login.module.scss'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import styleForm from 'public/scss/components/Form.module.scss'
import styleButton from 'public/scss/components/Button.module.scss'

const classesResetPassword = {
  containerClassName: styleLogin.login_containerForm,
  inputContainerClassName: `${styleLogin.login_inputContainer} ${styleForm.form}`,
  buttonClassName: `${styleButton.btn} ${styleButton.btn_primary}`,
  spinnerClassName: 'spinner-border text-light spinner-border-sm',
}

const ForgotPassword: FC<any> = ({
  lng,
  lngDict,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      headerTitle={i18n.t('resetPassword.title')}
    >
      <div className={styleLogin.login}>
        <div className={styleLogin.login_breadcrumb}>
          <Breadcrumb
            steps={[
              { label: i18n.t('breadcrumb.home') },
              { label: i18n.t('breadcrumb.forgotPassword') },
            ]}
          />
        </div>
        {isSuccess ? (
          <div className={styleLogin.forgotPassword}>
            <div className={styleLogin.forgotPassword_successTitle}>
              {i18n.t('forgotPassword.titleSuccessful')}
            </div>
            <div className={styleLogin.forgotPassword_successDesc}>
              {i18n.t('forgotPassword.requestSuccessful')}
            </div>
          </div>
        ) : (
          <>
            <div className={styleLogin.login_forgotPasswordDesc}>
              <span>{i18n.t('resetPassword.enterEmailBody')}</span>
            </div>
            <div className={styleLogin.login_container}>
              <ResetPassword
                classes={classesResetPassword}
                onErrorMsg={(msg) => toast.error(msg)}
                loadingComponent={<Loader color="text-light" />}
                onSuccessMsg={() => setIsSuccess(true)}
              />
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const { default: lngDict = {} } = await import(`locales/${params.lng}.json`)

  const brand = await useBrand(req)

  const cookies = parseCookies(req)
  redirectIfAuthenticated(res, cookies, 'account')

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || '',
    },
  }
}

export default ForgotPassword
