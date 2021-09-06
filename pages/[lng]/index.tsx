/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import {
  getBanner,
  Products,
  useI18n,
  Widget
} from '@sirclo/nexus'
/* library template */
import useWindowSize from 'lib/useWindowSize'
import { parseCookies } from 'lib/parseCookies'
import { GRAPHQL_URI } from 'lib/Constants'
import { useBrand } from 'lib/useBrand'
/* components */
import Layout from 'components/Layout/Layout'
import BannerComponent from 'components/Banner'
import Instafeed from 'components/Instafeed'
import Placeholder from 'components/Placeholder'
/* styles */
import styleBanner from 'public/scss/components/Banner.module.scss'
import styleWidget from 'public/scss/components/Widget.module.scss'
import styleProduct from 'public/scss/components/Product.module.scss'
import styleButton from 'public/scss/components/Button.module.scss'
import stylePlaceholder from 'public/scss/components/Placeholder.module.scss'

const classesProducts = {
  productContainerClassName: styleProduct.product_item,
  stickerContainerClassName: styleProduct.product_sticker,
  outOfStockLabelClassName: `${styleProduct.product_stickerLabel} ${styleProduct.product_stickerLabel__outofstock}`,
  saleLabelClassName: `${styleProduct.product_stickerLabel} ${styleProduct.product_stickerLabel__sale}`,
  comingSoonLabelClassName: `${styleProduct.product_stickerLabel} ${styleProduct.product_stickerLabel__comingsoon}`,
  openOrderLabelClassName: `${styleProduct.product_stickerLabel} ${styleProduct.product_stickerLabel__openorder}`,
  preOrderLabelClassName: `${styleProduct.product_stickerLabel} ${styleProduct.product_stickerLabel__preorder}`,
  newLabelClassName: `${styleProduct.product_stickerLabel} ${styleProduct.product_stickerLabel__new}`,
  productImageContainerClassName: styleProduct.product_link,
  productImageClassName: styleProduct.product_link__image,
  productLabelContainerClassName: styleProduct.product_label,
  productTitleClassName: styleProduct.product_label__title,
  productPriceClassName: styleProduct.product_labelPrice,
  salePriceClassName: styleProduct.product_labelPrice__sale,
  priceClassName: styleProduct.product_labelPrice__price
}

const classesPlaceholderProduct = {
  placeholderImage: `${stylePlaceholder.placeholderItem} ${stylePlaceholder.placeholderItem_productCard}`,
}

const classesPlaceholderWidgetService = {
  placeholderImage: `${stylePlaceholder.placeholderItem} ${stylePlaceholder.placeholderItem_widgetService}`,
}

const Home: FC<any> = ({
  lng,
  lngDict,
  brand,
  dataBanners
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const router: any = useRouter()
  const size = useWindowSize()
  const [totalItem, setTotalItem] = useState(null)

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      withAnnouncement={true}
    >
      <div className={styleBanner.bannerCarousel}>
        <BannerComponent
          data={dataBanners?.data}
          size={size}
        />
      </div>
      <div className={styleWidget.widget_services}>
        <Widget
          pos="main-content-1"
          containerClassName={styleWidget.widget_servicesContainer}
          widgetClassName={styleWidget.widget_servicesItem}
          loadingComponent={
            <Placeholder classes={classesPlaceholderWidgetService} withImage />
          }
          thumborSetting={{
            width: size.width < 768 ? 300 : 500,
            format: "webp",
            quality: 85
          }}
        />
      </div>
      {(totalItem > 0 || totalItem === null) &&
        <div className={styleProduct.product_container}>
          <div className="container">
            <div className={styleProduct.product_containerItem}>
              <LazyLoadComponent>
                <Products
                  itemPerPage={8}
                  classes={classesProducts}
                  pathPrefix="product"
                  lazyLoadedImage={false}
                  getPageInfo={(pageInfo) => setTotalItem(pageInfo.totalItems)}
                  thumborSetting={{
                    width: size.width < 768 ? 512 : 800,
                    format: "webp",
                    quality: 85
                  }}
                  loadingComponent={
                    <div className="row">
                      <div className="col-6">
                        <Placeholder classes={classesPlaceholderProduct} withImage />
                      </div>
                      <div className="col-6">
                        <Placeholder classes={classesPlaceholderProduct} withImage />
                      </div>
                    </div>
                  }
                />
              </LazyLoadComponent>
            </div>
            <div className="text-center mt-4">
              <button
                className={`${styleButton.btn} ${styleButton.btn_secondary}`}
                onClick={() => router.push(`/${lng}/products`)}
              >
                {i18n.t("product.seeAll")}
              </button>
            </div>
          </div>
        </div>
      }
      <div className="container">
        <Widget
          pos="main-content-2"
          containerClassName={styleWidget.widget_banner}
          widgetClassName={styleWidget.widget_bannerItem}
          loadingComponent={
            <>
              <div className="col-12">
                <Placeholder classes={classesPlaceholderProduct} withImage />
              </div>
            </>
          }
          thumborSetting={{
            width: size.width < 768 ? 576 : 900,
            format: "webp",
            quality: 85
          }}
        />
      </div>
      {brand?.socmedSetting?.instagramToken &&
        <div className="container">
          <LazyLoadComponent>
            <Instafeed
              i18n={i18n}
              brand={brand}
              withFollowButton
            />
          </LazyLoadComponent>
        </div>
      }
    </Layout >
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}: any) => {

  const allowedUri: Array<string> = ['en', 'id', 'graphql', 'favicon.ico']

  if (allowedUri.indexOf(params.lng.toString()) == -1) {
    const cookies = parseCookies(req)

    res.writeHead(307, {
      Location: cookies.ACTIVE_LNG ? '/' + cookies.ACTIVE_LNG + '/' + params.lng : '/id/' + params.lng
    })

    res.end()
  }

  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  )

  const brand = await useBrand(req)
  const dataBanners = await getBanner(GRAPHQL_URI(req))

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || "",
      dataBanners
    }
  }
}

export default Home