/* library package */
import {
	FC,
	useState,
	useEffect
} from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Router from 'next/router'
import Link from 'next/link'
import { IoTrashBinOutline } from 'react-icons/io5'
import { RiShoppingBag2Line, RiInformationLine } from 'react-icons/ri'
import {
	useI18n,
	CartDetails,
	useCart
} from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
/* components */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import OrderSummaryBox from 'components/OrderSummaryBox'
import EmptyComponent from 'components/EmptyComponent/EmptyComponent'
import Loader from 'components/Loader/Loader'
/* styles */
import styeLayout from 'public/scss/components/Layout.module.scss'
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
	const { data: dataCart } = useCart()
	const [totalQuantity, setTotalQuantity] = useState<number>(0)
	const [invalidMsg, setInvalidMsg] = useState<string>('')
	const [SKUs, setSKUs] = useState<[]>([])

	useEffect(() => {
		setTotalQuantity(dataCart?.totalItem);
	}, [dataCart]);

	return (
		<Layout
			i18n={i18n}
			lng={lng}
			lngDict={lngDict}
			brand={brand}
			headerTitle={i18n.t('cart.title')}
			withFooter={(totalQuantity > 0) ? false : true}
			layoutClassName={styeLayout.layout_fullHeight}
		>
			<div className={styleCart.cart}>
				<div className={styleCart.cart_breadcrumb}>
					<Breadcrumb
						steps={[{ label: i18n.t('breadcrumb.home') }, { label: i18n.t('breadcrumb.cart') }]}
					/>
				</div>
				<div className={styleCart.cart_header}>
					<div>{`${i18n.t('cart.prefixItem')} ${SKUs.length} ${i18n.t('cart.item')}`}</div>
					<div>
						<Link href={`/${lng}/products`}>{i18n.t('cart.shopMore')}</Link>
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
							width: 150,
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
					{totalQuantity > 0 &&
						<OrderSummaryBox
							i18n={i18n}
							page="cart"
							withCartDetails={false}
						/>
					}
				</div>
			</div>
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	params
}) => {
	const { default: lngDict = {} } = await import(`locales/${params.lng}.json`)

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
