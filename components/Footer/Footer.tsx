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
import { PrivateComponent, useI18n, useCart } from '@sirclo/nexus'
/* styles */
import styleFooter from 'public/scss/components/Footer.module.scss'

const Footer: FC<any> = () => {
	const i18n: any = useI18n()
	const {
		route,
		query: { lng },
	} = useRouter()

	const { data: dataCart } = useCart()

	return (
		<>
			<footer className={styleFooter.footer}>
				<nav className={`${styleFooter.footer_nav}`}>
					<Link href="/[lng]" as={`/${lng}`}>
						<a {...(route == '/[lng]' && { className: styleFooter.active })}>
							<div>
								<RiHomeFill color="#444444" />
								<span>{i18n.t('footer.home')}</span>
								<hr />
							</div>
						</a>
					</Link>
					<Link href="/[lng]/search" as={`/${lng}/search`}>
						<a {...(route == '/[lng]/search' && { className: styleFooter.active })}>
							<div>
								{route == '/[lng]/search' ? <RiSearchFill /> : <RiSearchLine />}
								<span>{i18n.t('footer.search')}</span>
								<hr />
							</div>
						</a>
					</Link>
					<Link href="/[lng]/cart" as={`/${lng}/cart`}>
						<a {...(route == '/[lng]/cart' && { className: styleFooter.active })}>
							<div className={styleFooter.footer_menu}>
								{route == '/[lng]/cart' ? <RiShoppingBag2Fill /> : <RiShoppingBag2Line />}
								<span>{i18n.t('footer.cart')}</span>
								{dataCart?.totalItem ? <span className={styleFooter.footer_badge}>{dataCart.totalItem}</span> : null}
								<hr />
							</div>
						</a>
					</Link>
					<PrivateComponent
						Auth={
							<Link href="/[lng]/account" as={`/${lng}/account`}>
								<a
									{...(route == '/[lng]/account' && {
										className: styleFooter.active,
									})}
								>
									<div>
										{route == '/[lng]/account' ? <RiUser3Fill /> : <RiUser3Line />}
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
										className: styleFooter.active,
									})}
								>
									<div>
										{route == '/[lng]/login' ? <RiUser3Fill /> : <RiUser3Line />}
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
