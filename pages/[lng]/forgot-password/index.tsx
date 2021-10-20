/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { ResetPassword, useI18n } from '@sirclo/nexus'
import { toast } from 'react-toastify'
/* library template */
import { parseCookies } from 'lib/parseCookies'
import redirectIfAuthenticated from 'lib/redirectIfAuthenticated'
import { useBrand } from 'lib/useBrand'
/* components */
import Loader from 'components/Loader/Loader'
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styleLogin from 'public/scss/pages/Login.module.scss'
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
      layoutClassName='layout_fullHeight'
      withCopyright
      withFooter={false}
    >
      <div className={styleLogin.login_breadcrumb}>
        <Breadcrumb
          steps={[
            { label: i18n.t('breadcrumb.home') },
            { label: i18n.t('breadcrumb.forgotPassword') },
          ]}
        />
      </div>
      <div className={styleLogin.forgotPassword}>
        {isSuccess ? (
          <>
            <div className={styleLogin.forgotPassword_successTitle}>
              {i18n.t('forgotPassword.titleSuccessful')}
            </div>
            <div className={styleLogin.forgotPassword_successDesc}>
              {i18n.t('forgotPassword.requestSuccessful')}
            </div>
          </>
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
