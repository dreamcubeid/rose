import React, { FC } from 'react';
import Link from 'next/link';
import { useI18n } from '@sirclo/nexus';
import styles from "public/scss/components/Breadcrumbs.module.scss";

type BreadcrumbPropsType = {
  currentStep: number;
}

const Breadcrumb: FC<BreadcrumbPropsType> = ({
  currentStep
}) => {
  const i18n: any = useI18n();
  const steps = [{
    text: i18n.t('placeOrder.userInformation'),
    route: '/place_order'
  }, {
    text: i18n.t('shipping.shippingMethod'),
    route: '/shipping_method'
  }, {
    text: i18n.t('payment.title'),
    route: '/payment_method'
  },
  ];
  return (
    <div className={styles.breadcrumbs}>
      {
        steps.map((step, index) => (
          <React.Fragment key={index}>
            <Link
              href={`/[lng]${step.route}`} as={`/${i18n.activeLocale}${step.route}`}
            >
              <span
                className={`
                  ${styles.breadcrumbs_class} 
                  ${index == currentStep - 1 ? styles.breadcrumbs_activeClass : ''}
                `}
              >
                <span
                  className={`
                    ${styles.breadcrumbs_class_number} 
                    ${index == currentStep - 1 ? styles.breadcrumbs_activeNumber : ''}
                  `}
                >
                  {index + 1}
                </span>
                <span className={styles.breadcrumbs_class_label}>{step.text}</span>
              </span>
            </Link>
          </React.Fragment>))
      }
    </div>
  )
}

export default Breadcrumb;