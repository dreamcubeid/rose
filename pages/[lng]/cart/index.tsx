/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Router from 'next/router'
import Link from 'next/link'
import { IoTrashBinOutline } from 'react-icons/io5'
import { RiShoppingBag2Line, RiInformationLine } from 'react-icons/ri'
import { CartDetails, useI18n } from '@sirclo/nexus'
/* library template */
import { parseCookies } from 'lib/parseCookies'
import { useBrand } from 'lib/useBrand'
/* components */
import Layout from 'components/Layout/Layout'
import EmptyComponent from 'components/EmptyComponent/EmptyComponent'
import Loader from 'components/Loader/Loader'
/* styles */
import styleCart from 'public/scss/components/CartDetail.module.scss'
import styleButton from 'public/scss/components/Button.module.scss'
import styleForm from 'public/scss/components/Form.module.scss'

const classesCartDetails = {
	className: styleCart.cart,
	cartHeaderClassName: 'd-none',
	itemClassName: styleCart.cartItem,
	itemImageClassName: styleCart.cartItem_image,
	selectedVariantContainerClassName: styleCart.cartItem_variant,
	itemTitleClassName: styleCart.cartItem_title,
	itemPriceClassName: styleCart.cartItem_price,
	itemRegularPriceClassName: styleCart.cartItem_regularPrice,
	itemSalePriceClassName: styleCart.cartItem_salePrice,
	itemDiscountNoteClassName: styleCart.cartItem_discNote,
	itemQtyClassName: styleCart.cartItem_qty,
	errorClassName: 'd-none',
	qtyBoxClassName: styleCart.cartItem_qtyBox,
	itemAmountClassName: styleCart.cartItem_totalPrice,
	itemEditClassName: 'd-none',
	itemRemoveClassName: styleCart.cartItem_remove,
	cartFooterClassName: `${styleCart.cartFooter} ${styleForm.form}`,
	cartFooterTitleClassName: 'd-none',
}

const Cart: FC<any> = ({
	lng,
	lngDict,
	brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const i18n: any = useI18n()
	const [invalidMsg, setInvalidMsg] = useState<string>('')
	const [SKUs, setSKUs] = useState<[]>([])

	return (
		<Layout
			i18n={i18n}
			lng={lng}
			lngDict={lngDict}
			brand={brand}
			headerTitle={i18n.t('cart.title')}
			withCart={false}
			withFooter={true}
		>
			<section className={styleCart.cart}>
				<div className={styleCart.cart_header}>
					<div>{`${i18n.t('cart.prefixItem')} ${SKUs.length} ${i18n.t('cart.item')}`}</div>
					<div>
						<Link href="/">+ Belanja lagi</Link>
					</div>
				</div>
				{invalidMsg && (
					<div className={styleCart.cart_error}>
						<div>
							<RiInformationLine width={13} height={13} />
						</div>
						<div className="ml-1">{invalidMsg}</div>
					</div>
				)}
				<div className={styleCart.cart_container}>
					<CartDetails
						getSKU={(SKUs: any) => setSKUs(SKUs)}
						classes={classesCartDetails}
						variantSeparator=", "
						withSeparatedVariant
						itemRedirectPathPrefix="product"
						isEditable={true}
						removeIcon={<IoTrashBinOutline />}
						onErrorMsg={(e) => console.log(e)}
						onInvalidMsg={(msg) => setInvalidMsg(msg)}
						thumborSetting={{
							width: 72,
							format: 'webp',
							quality: 85,
						}}
						loadingComponent={
							<div className="d-flex justify-content-center py-3 w-100">
								<Loader />
							</div>
						}
						emptyCartPlaceHolder={
							<div className={styleCart.cart_empty}>
								<EmptyComponent
									title={i18n.t('cart.isEmpty')}
									icon={<RiShoppingBag2Line />}
									button={
										<button
											className={`${styleButton.btn} ${styleButton.btn_primary}`}
											onClick={() => Router.push('/[lng]/products', `/${lng}/products`)}
										>
											{i18n.t('cart.shopNow')}
										</button>
									}
								/>
							</div>
						}
					/>
				</div>
			</section>
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
	const { default: lngDict = {} } = await import(`locales/${params.lng}.json`)

	if (process.env.IS_PROD !== 'false') {
		const cookies = parseCookies(req)
		res.writeHead(307, {
			Location: `/${cookies.ACTIVE_LNG || 'id'}`,
		})
		res.end()
	}

	const brand = await useBrand(req)

	return {
		props: {
			lng: params.lng,
			lngDict,
			brand: brand || '',
		},
	}
}

export default Cart
