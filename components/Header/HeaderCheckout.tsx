/* library package */
import { FC } from 'react'
/* styles */
import styleCheckout from 'public/scss/components/Checkout.module.scss'

type TypeHeaderCheckout = {
  i18n: any
}

const HeaderCheckout: FC<any> = ({
  i18n
}: TypeHeaderCheckout) => {
  return (
    <div className={styleCheckout.checkout_header}>
      <h6 className={styleCheckout.checkout_header__title}>
        {i18n.t('global.checkoutTitle')}
      </h6>
    </div>
  )
}

export default HeaderCheckout