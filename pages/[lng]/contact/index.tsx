/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import { 
  useI18n, 
  Contact, 
  Widget, 
  isEnquiryAllowed 
} from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
/* components */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styleContact from 'public/scss/pages/Contact.module.scss'
import styleForm from 'public/scss/components/Form.module.scss'
import styleButton from 'public/scss/components/Button.module.scss'
import stylePlaceholder from 'public/scss/components/Placeholder.module.scss'

const Placeholder = dynamic(() => import('components/Placeholder'))

const classesContact = {
  containerClassName: styleContact.contact_body,
  mapClassName: 'd-none',
  inputContainerClassName: `${styleForm.form} my-4 ${styleContact.contact_form}`,
  titleClassName: 'd-none',
  buttonClassName: `${styleButton.btn} ${styleButton.btn_primary} `,
  widgetClassName: styleContact.contact_widget,
}

const classesPlaceholderContact = {
  placeholderList: `${stylePlaceholder.placeholderItem} ${stylePlaceholder.placeholderItem_widgetList}`,
}

const ContactPage: FC<any> = ({
  lng,
  lngDict,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const allowedEnquiry = isEnquiryAllowed()

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      headerTitle={i18n.t('contact.title')}
      withFooter={false}
      withAllowed={allowedEnquiry}
    >
      <div className={styleContact.contact_container}>
        <div className={styleContact.contact_header}>
          <Breadcrumb
            steps={[{ label: i18n.t('breadcrumb.home') }, { label: i18n.t('breadcrumb.contact') }]}
          />
        </div>
        <div className={styleContact.contact_info}>{i18n.t('contact.info')}</div>
        <Contact
          classes={classesContact}
          isAddressDetail={false}
          onCompleted={() => toast.success(i18n.t('contact.submitSuccess'))}
          onError={() => toast.error(i18n.t('contact.submitError'))}
          widget={
            <Widget
              pos="footer-4"
              widgetClassName={styleContact.contact_widgetInfo}
              loadingComponent={
                <Placeholder classes={classesPlaceholderContact} withList listMany={5} />
              }
            />
          }
        />
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
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

export default ContactPage
