import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import {
  useI18n,
  Testimonials,
  isTestimonialAllowed,
  isTestimonialFormAllowed,
  TestimonialForm,
} from '@sirclo/nexus'
import { useBrand } from 'lib/useBrand'
import ReCAPTCHA from 'react-google-recaptcha'
import Layout from 'components/Layout/Layout'
import Placeholder from 'components/Placeholder'
import styleTestimonials from 'public/scss/pages/Testimonials.module.scss'
import styleButton from 'public/scss/components/Button.module.scss'
import styleForm from 'public/scss/components/Form.module.scss'
import EmptyComponent from 'components/EmptyComponent/EmptyComponent'
import { RiQuestionFill } from 'react-icons/ri'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'

const Popup = dynamic(() => import('components/Popup/Popup'))

const classesTestimonials = {
  // containerClassName: `${styles.testimonials_container}`,
  // cardClassName: `${styles.testimonials_card}`,
  // imgClassName: `${styles.testimonials_img}`,
  // mainClassName: `${styles.testimonials_main}`,
  // contentClassName: `${styles.testimonials_content}`,
  // userClassName: `${styles.testimonials_user}`,
  // dateClassName: `${styles.testimonials_date}`,
}

const classesTestimonalsForm = {
  backdropClassName: 'd-none',
  formContainerClassName: styleTestimonials.testimonials_form,
  testimonialHeaderClassName: 'd-none',
  inputContainerClassName: `${styleForm.form} ${styleTestimonials.testimonials_input}`,
  imgUploadContainerClassName: styleTestimonials.testimonials_uploadContainer,
  imgUploadClassName: styleTestimonials.testimonials_upload,
  publishOptionClassName: styleTestimonials.testimonials_publishOption,
  optionClassName: styleTestimonials.testimonials_option,
  verificationContainerClassName: styleTestimonials.testimonials_verification,
  submitBtnClassName: `${styleButton.btn} ${styleButton.btn_primary} `,
}

const paginationClasses = {
  // pagingClassName: styles.pagination,
  // activeClassName: styles.pagination_active,
  // itemClassName: styles.pagination_item,
}

const classesPlaceholderTestimonials = {
  // placeholderList: `${styles.testimonials_placeholder}`,
  // placeholderImage: `${styles.testimonials_placeholderImage}`,
}

const TestimonialsPage: FC<any> = ({
  lng,
  lngDict,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const testimonialAllowed = isTestimonialAllowed()
  const testimonialFormAllowed = isTestimonialFormAllowed()

  const [totalItem, setTotalItems] = useState<number>(null)
  const [showAdd, setShowAdd] = useState<boolean>(false)
  const [isVerified, setIsVerified] = useState<boolean>(false)

  const toogleShowAdd = () => setShowAdd(!showAdd)

  return (
    <Layout i18n={i18n} lng={lng} lngDict={lngDict} brand={brand} withAllowed={testimonialAllowed}>
      <div className={styleTestimonials.testimonials_container}>
        <div className={styleTestimonials.testimonials_header}>
          <Breadcrumb
            steps={[
              { label: i18n.t('breadcrumb.home') },
              { label: i18n.t('breadcrumb.testimoni') },
            ]}
          />
        </div>
        <div className={styleTestimonials.testimonials_body}>
          {!(totalItem > 0 || totalItem === null) ? (
            <>
              {/* <div className={styles.testimonials_qtyAdd}>
              <p>
                {i18n.t('testimonial.weHave')}
                <strong>{totalItem}</strong>
                {i18n.t('testimonial.weHave2')}
              </p>
              <button className={styles.testimonials_qtyAddButton} onClick={toogleShowAdd}>
                {i18n.t('testimonial.add')}
              </button>
            </div>
            <div className={styles.testimonials_list}>
              <Testimonials
                itemPerPage={5}
                getPageInfo={(pageInfo: any) => setTotalItems(pageInfo.totalItems)}
                withImage
                classes={classesTestimonials}
                callPagination
                paginationClasses={paginationClasses}
                loadingComponent={[1, 2, 3].map((_, i) => (
                  <div className={styles.testimonials_placeholderContainer}>
                    <Placeholder
                      key={i}
                      classes={classesPlaceholderTestimonials}
                      withImage={true}
                      withList
                      listMany={3}
                    />
                  </div>
                ))}
              />
            </div> */}
            </>
          ) : (
            <div>
              <EmptyComponent
                title={i18n.t('testimonial.isEmpty')}
                icon={<RiQuestionFill color="BCBCBC" size={15} />}
                button={
                  <button
                    className={`${styleButton.btn} ${styleButton.btn_primary}`}
                    onClick={toogleShowAdd}
                  >
                    {i18n.t('testimonial.add')}
                  </button>
                }
              />
            </div>
          )}
          {showAdd && testimonialFormAllowed && (
            <div>
              <div>{i18n.t('testimonial.add')}</div>
              <TestimonialForm
                classes={classesTestimonalsForm}
                uploadIcon={i18n.t('testimonial.inputImage')}
                onUploadImageCompleted={() => toast.success(i18n.t('testimonial.successUpload'))}
                onUploadImageError={(error: any) => toast.error(error)}
                onCreateTestimonialCompleted={(_) => {
                  setShowAdd(false)
                  toast.success(i18n.t('testimonial.createSuccess'))
                }}
                onCreateTestimonialError={(_) => toast.error(i18n.t('testimonial.createError'))}
                withVerification={true}
                isVerified={isVerified}
                verificationComponent={
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_SITEKEY_RECAPTCHA}
                    onChange={() => setIsVerified(true)}
                  />
                }
              />
            </div>
          )}
        </div>
      </div>
      {/* <div className={`${styles.testimonials} container`}>
        <div className={styles.testimonials_header}>
          <h4>{i18n.t('testimonial.title')}</h4>
          {totalItem > 0 && <p>{i18n.t('testimonial.desc')}</p>}
        </div>
        {!(totalItem > 0 || totalItem === null) ? (
          <>
            <div className={styles.testimonials_qtyAdd}>
              <p>
                {i18n.t('testimonial.weHave')}
                <strong>{totalItem}</strong>
                {i18n.t('testimonial.weHave2')}
              </p>
              <button className={styles.testimonials_qtyAddButton} onClick={toogleShowAdd}>
                {i18n.t('testimonial.add')}
              </button>
            </div>
            <div className={styles.testimonials_list}>
              <Testimonials
                itemPerPage={5}
                getPageInfo={(pageInfo: any) => setTotalItems(pageInfo.totalItems)}
                withImage
                classes={classesTestimonials}
                callPagination
                paginationClasses={paginationClasses}
                loadingComponent={[1, 2, 3].map((_, i) => (
                  <div className={styles.testimonials_placeholderContainer}>
                    <Placeholder
                      key={i}
                      classes={classesPlaceholderTestimonials}
                      withImage={true}
                      withList
                      listMany={3}
                    />
                  </div>
                ))}
              />
            </div>
          </>
        ) : (
          <div className={styles.testimonials_empty}>
            <EmptyComponent
              title={i18n.t('testimonial.isEmpty')}
              icon={<RiQuestionFill color="BCBCBC" size={15} />}
              button={
                <button
                  className={`${styleButton.btn} ${styleButton.btn_primary}`}
                  onClick={toogleShowAdd}
                >
                  {i18n.t('testimonial.add')}
                </button>
              }
            />
          </div>
        )}
        {showAdd && testimonialFormAllowed && (
          <Popup withHeader setPopup={toogleShowAdd} popupTitle={i18n.t('testimonial.add')}>
            <TestimonialForm
              classes={classesTestimonalsForm}
              uploadIcon={i18n.t('testimonial.inputImage')}
              onUploadImageCompleted={() => toast.success(i18n.t('testimonial.successUpload'))}
              onUploadImageError={(error: any) => toast.error(error)}
              onCreateTestimonialCompleted={(_) => {
                setShowAdd(false)
                toast.success(i18n.t('testimonial.createSuccess'))
              }}
              onCreateTestimonialError={(_) => toast.error(i18n.t('testimonial.createError'))}
              withVerification={true}
              isVerified={isVerified}
              verificationComponent={
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_SITEKEY_RECAPTCHA}
                  onChange={() => setIsVerified(true)}
                />
              }
            />
          </Popup>
        )}
      </div> */}
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

export default TestimonialsPage
