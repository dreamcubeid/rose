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
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { toast } from 'react-toastify'
import {
	useI18n,
	CartDetails,
	useCart,
	Products,
	isProductRecommendationAllowed
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
import styleCart from 'public/scss/components/CartDetail.module.scss'
import styleButton from 'public/scss/components/Button.module.scss'
import styleForm from 'public/scss/components/Form.module.scss'
import styleProduct from 'public/scss/components/Product.module.scss'

const classesCartDetails = {
	className: styleCart.cart,
	cartHeaderClassName: 'd-none',
	itemClassName: styleCart.cartItem,
	itemImageClassName: styleCart.cartItem_image,
	selectedVariantContainerClassName: styleCart.cartItem_variant,
	itemTitleClassName: styleCart.cartItem_title,
	itemPriceClassName: styleCart.cartItem_price,
	itemRegularPriceClassName: styleCart.cartItem_regularPrice,
	itemSalePriceWrapperClassName: styleCart.cartItem_salePriceWrapper,
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
	cartFooterTextareaClassName: styleForm.form_textarea,
}

const classesCrosselProducts = {
	productContainerClassName: `col-6 ${styleProduct.product_itemContainer}`,
	stickerContainerClassName: `${styleProduct.product_sticker} ${styleProduct.product_stickerGrid}`,
	outOfStockLabelClassName: `${styleProduct.product_stickerLabel} ${styleProduct.product_stickerLabel__outofstock}`,
	saleLabelClassName: `${styleProduct.product_stickerLabel} ${styleProduct.product_stickerLabel__sale}`,
	comingSoonLabelClassName: `${styleProduct.product_stickerLabel} ${styleProduct.product_stickerLabel__comingsoon}`,
	openOrderLabelClassName: `${styleProduct.product_stickerLabel} ${styleProduct.product_stickerLabel__openorder}`,
	preOrderLabelClassName: `${styleProduct.product_stickerLabel} ${styleProduct.product_stickerLabel__preorder}`,
	newLabelClassName: `${styleProduct.product_stickerLabel} ${styleProduct.product_stickerLabel__new}`,
	productImageContainerClassName: styleProduct.product_link,
	productImageClassName: styleProduct.product_itemContainerImage,
	productLabelContainerClassName: styleProduct.product_label,
	productTitleClassName: styleProduct.product_label__title,
	productPriceClassName: styleProduct.product_labelPrice,
	salePriceClassName: styleProduct.product_labelPrice__sale,
	priceClassName: styleProduct.product_labelPrice__price,
}

const paginationClasses = {
	pagingClassName: styleCart.crossSell_pagination,
	itemClassName: styleCart.crossSell_paginationItem
}

const Cart: FC<any> = ({
	lng,
	lngDict,
	brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const i18n: any = useI18n()
	const { data: dataCart } = useCart()
	const allowedProductRecommendation = isProductRecommendationAllowed()
	const [totalQuantity, setTotalQuantity] = useState<number>(0)
	const [invalidMsg, setInvalidMsg] = useState<string>('')
	const [SKUs, setSKUs] = useState<Array<string>>(null)
	const [pageInfo, setPageInfo] = useState({
		totalItems: null,
	})

	useEffect(() => {
		setTotalQuantity(dataCart?.totalItem)
	}, [dataCart])

	return (
		<Layout
			i18n={i18n}
			lng={lng}
			lngDict={lngDict}
			brand={brand}
			headerTitle={i18n.t('cart.title')}
			withFooter={(totalQuantity > 0) ? false : true}
			layoutClassName="layout_fullHeight"
		>
			<div className={styleCart.cart}>
				<div className={styleCart.cart_breadcrumb}>
					<Breadcrumb
						steps={[{ label: i18n.t('breadcrumb.home') }, { label: i18n.t('breadcrumb.cart') }]}
					/>
				</div>
        {!!dataCart?.totalItem &&
          <div className={styleCart.cart_header}>
            <div>{`${i18n.t('cart.prefixItem')} ${dataCart?.totalItem} ${i18n.t('cart.item')}`}</div>
            <div>
              <Link href={`/${lng}/products`}>{i18n.t('cart.shopMore')}</Link>
            </div>
          </div>
        }
				{invalidMsg && !!dataCart?.totalItem && (
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
						onErrorMsg={(msg) => toast.error(msg)}
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
							totalCrossSell={pageInfo.totalItems}
						/>
					}
					{allowedProductRecommendation && pageInfo.totalItems !== 0 && SKUs !== null &&
						<div className={`row ${styleCart.crossSell}`}>
							<div className="col-12">
								<h6 className={styleCart.crossSell_title}>
									{i18n.t("product.related")}
								</h6>
							</div>
							<Products
								SKUs={SKUs}
								classes={classesCrosselProducts}
								paginationClasses={paginationClasses}
								getCrossSellPageInfo={(pageInfo: any) => setPageInfo({ totalItems: pageInfo.totalItems })}
								itemPerPage={2}
								pathPrefix="product"
								newPagination
								lazyLoadedImage={false}
								buttonPrev={<FaArrowLeft size={14} />}
								buttonNext={<FaArrowRight size={14} />}
								thumborSetting={{
									width: 800,
									format: "webp",
									quality: 85,
								}}
								loadingComponent={
									<div className="col-12">
										<div className="d-flex justify-content-center align-center my-5">
											<Loader
												color="text-secondary"
												withText
											/>
										</div>
									</div>
								}
							/>
						</div>
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
