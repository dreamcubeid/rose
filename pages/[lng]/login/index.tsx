import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { RiEyeCloseLine, RiEye2Line } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { Login, useI18n, SingleSignOn } from '@sirclo/nexus'
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
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styleLogin from 'public/scss/pages/Login.module.scss'
import styleForm from 'public/scss/components/Form.module.scss'
import styleButton from 'public/scss/components/Button.module.scss'

const loginClasses = {
	containerClassName: styleLogin.login_containerForm,
	inputContainerClassName: `${styleLogin.login_inputContainer} ${styleForm.form}`,
	passwordContainerClassName: `${styleLogin.login_passwordContainer}`,
	buttonClassName: `${styleButton.btn} ${styleButton.btn_primary}`,
	footerClassName: `${styleButton.btn} ${styleButton.btn_secondary} ${styleLogin.login_footer}`,
	forgotPasswordClass: styleLogin.login_forgotContainer,
}

const LoginPage: FC<any> = ({
	lng,
	lngDict,
	brand,
	hasGoogleAuth,
	hasFacebookAuth,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const i18n: any = useI18n()

	return (
		<Layout i18n={i18n} lng={lng} lngDict={lngDict} brand={brand}>
			<SEO title={i18n.t('login.title')} />
			<div className={styleLogin.login}>
				<div className={styleLogin.login_breadcrumb}>
					<Breadcrumb
						steps={[{ label: i18n.t('breadcrumb.home') }, { label: i18n.t('breadcrumb.login') }]}
					/>
				</div>
				<div className={styleLogin.login_header}>
					<h3>{i18n.t('login.title')}</h3>
				</div>
				<div className={styleLogin.login_container}>
					<Login
						classes={loginClasses}
						onCompletedMsg={(msg) => toast.success(msg)}
						onErrorMsg={(msg) => toast.error(msg)}
						passwordViewIcon={<RiEye2Line />}
						passwordHideIcon={<RiEyeCloseLine />}
						loadingComponent={<Loader color="text-light" />}
					/>
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

export default LoginPage
