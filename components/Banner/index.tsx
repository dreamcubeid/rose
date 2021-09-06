/* library package */
import { FC } from 'react'
import Carousel from '@brainhubeu/react-carousel'
import { Banner } from '@sirclo/nexus'
/* library template */
import { useSizeBanner } from 'lib/useSizeBanner'
/* components */
import Placeholder from 'components/Placeholder'
/* styles */
import styles from 'public/scss/components/Banner.module.scss'

const classesBanner = {
  imageContainerClassName: styles.bannerCarousel_header,
  linkClassName: styles.bannerCarousel_link,
  imageClassName: styles.bannerCarousel_image
}

const classesPlaceholderBanner = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_banner}`
}

const BannerComponent: FC<any> = ({
  data,
  size,
}) => (
  <>
    <Banner
      data={data}
      Carousel={Carousel}
      infinite
      dots
      autoPlay={5000}
      lazyLoadedImage={false}
      classes={classesBanner}
      thumborSetting={{
        width: useSizeBanner(size.width),
        format: "webp",
        quality: 90,
      }}
      loadingComponent={
        <Placeholder classes={classesPlaceholderBanner} withImage />
      }
    />
  </>
)

export default BannerComponent