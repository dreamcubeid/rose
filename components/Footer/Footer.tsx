/* library package */
import { FC } from 'react'
import {
	RiHomeFill,
	RiSearchLine,
	RiShoppingBag2Line,
	RiUser3Line,
} from 'react-icons/ri'
import Link from 'next/link'
import { PrivateComponent, useI18n } from '@sirclo/nexus'
import { useRouter } from 'next/router'
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
								<RiSearchLine />
								<span>{i18n.t('footer.search')}</span>
								<hr />
							</div>
						</a>
					</Link>
					<Link href="/[lng]/cart" as={`/${lng}/cart`}>
						<a {...(route == '/[lng]/cart' && { className: styles.active })}>
							<div>
								<RiShoppingBag2Line />
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
										<RiUser3Line />
										<span>{i18n.t('footer.account')}</span>
										<hr />
									</div>
								</a>
							</Link>
						}
						NoAuth={
							<Link href="/[lng]/login" as={`/${lng}/login`}>
								<a
									{...(route == '/[lng]/account' && {
										className: styles.active,
									})}
								>
									<div>
										<RiUser3Line />
										<span>{i18n.t('footer.account')}</span>
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
