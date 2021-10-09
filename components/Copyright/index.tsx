/* Libray Package */
import { FC, useState } from 'react'
import { Widget, isCopyrightAllowed } from '@sirclo/nexus'
/* Styles */
import styles from 'public/scss/components/Copyright.module.scss'

const CopyrightComp: FC<any> = ({
  brand
}) => {
  const allowedCopyright = isCopyrightAllowed()
  const [item, setItem] = useState(null)

  return (
    <>
      {!allowedCopyright ?
        <div className={styles.copyright}>
          <div className="text-center">
            {brand?.settings?.websiteTitle || ""}
            {(brand?.settings?.websiteTitle && !allowedCopyright) && ` - `}
            POWERED BY&nbsp;<a href="https://store.sirclo.com" target="_blank">SIRCLO</a>
          </div>
        </div> :
        <>
          {item > 0 || item == null &&
            <div className={styles.copyright}>
              <Widget
                pos="copyright-and-policy"
                getItemCount={(item: number) => setItem(item)}
                thumborSetting={{
                  width: 1,
                  format: 'webp',
                  quality: 5,
                }}
              />
            </div>
          }
        </>
      }
    </>
  )
}

export default CopyrightComp