/* library package */
import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
	RiHomeFill,
	RiSearchLine,
	RiSearchFill,
	RiShoppingBag2Line,
	RiShoppingBag2Fill,
	RiUser3Line,
	RiUser3Fill,
} from 'react-icons/ri'
import { PrivateComponent, useI18n } from '@sirclo/nexus'
/* styles */
import styles from 'public/scss/components/Footer.module.scss'

const Footer: FC<any> = () => {
	const i18n: any = useI18n()
	const {
		route,
		query: { lng },
	} = useRouter()

	return (
		<>
			<footer className={styles.footer}>
				<nav className={`${styles.footer_nav}`}>
					<Link href="/[lng]" as={`/${lng}`}>
						<a {...(route == '/[lng]' && { className: styles.active })}>
							<div>
								<RiHomeFill />
								<span>{i18n.t('footer.home')}</span>
								<hr />
							</div>
						</a>
					</Link>
					<Link href="/">
						<a>
							<div>
								{route == '/[lng]' ? <RiSearchFill /> : <RiSearchLine />}
								<span>{i18n.t('footer.search')}</span>
								<hr />
							</div>
						</a>
					</Link>
					<Link href="/[lng]/cart" as={`/${lng}/cart`}>
						<a {...(route == '/[lng]/cart' && { className: styles.active })}>
							<div>
								{route == '/[lng]/cart' ? (
									<RiShoppingBag2Fill />
								) : (
									<RiShoppingBag2Line />
								)}
								<span>{i18n.t('footer.cart')}</span>
								<hr />
							</div>
						</a>
					</Link>
					<PrivateComponent
						Auth={
							<Link href="/[lng]/account" as={`/${lng}/account`}>
								<a
									{...(route == '/[lng]/account' && {
										className: styles.active,
									})}
								>
									<div>
										{route == '/[lng]/account' ? (
											<RiUser3Fill />
										) : (
											<RiUser3Line />
										)}
										<span>{i18n.t('footer.account')}</span>
										<hr />
									</div>
								</a>
							</Link>
						}
						NoAuth={
							<Link href="/[lng]/login" as={`/${lng}/login`}>
								<a
									{...(route == '/[lng]/login' && {
										className: styles.active,
									})}
								>
									<div>
										{route == '/[lng]/login' ? (
											<RiUser3Fill />
										) : (
											<RiUser3Line />
										)}
										<span>{i18n.t('footer.login')}</span>
										<hr />
									</div>
								</a>
							</Link>
						}
					/>
				</nav>
			</footer>
		</>
	)
}

export default Footer
