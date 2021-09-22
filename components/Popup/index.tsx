/* library package */
import { FC, ReactNode } from 'react'
/* component */
import styles from 'public/scss/components/PopupCustom.module.scss'

type TWithButtonLeft = {
  icon: ReactNode
  onClick: () => void
}

type PopupPropType = {
  children: ReactNode
  title?: string
  withCloseButton?: boolean
  withCloseBackground?: boolean
  iconClose?: any
  popupSize?: 'normal' | 'fluid' | 'full'
  customClassName?: string
  visibleState: boolean
  setVisibleState?: (param: boolean) => void
  withButtonLeft?: TWithButtonLeft
  withHeader?: boolean
  outsideClose?: boolean
}

const Popup: FC<PopupPropType> = ({
  children,
  title,
  withCloseButton = true,
  withCloseBackground = true,
  iconClose,
  popupSize = 'normal',
  customClassName = 'popup-customClassName',
  visibleState = false,
  setVisibleState,
  withButtonLeft,
  withHeader = true,
  outsideClose = true
}) => {

  const handleClose = () => withCloseBackground && setVisibleState(false)

  if (popupSize === 'fluid') customClassName += ` ${styles.popup__fluidHeight}`
  else if (popupSize === 'full') customClassName += ` ${styles.popup__fullHeight}`

  return (
    <>
      <div className={`
        ${styles.popup} 
        ${customClassName} 
        ${visibleState ? styles.popup__active : styles.popup__hidden}
      `}>
        <div className={`${styles.popupBackground}`} onClick={outsideClose && handleClose}></div>
        <div className={`
          ${styles.popupInner} 
          ${popupSize === 'normal' && styles.popupInner__normalHeight}`
        }>
          {withHeader &&
            <div className={styles.popupHeader}>
              {title &&
                <div className={`${styles.popupHeader_item} ${styles.popupHeader_item__center}`}>
                  {withButtonLeft &&
                    <button className={styles.popupHeader_buttonLeft} onClick={withButtonLeft.onClick}>
                      {withButtonLeft.icon}
                    </button>
                  }
                  <p className={`${styles.popupHeader_title}`}>
                    {title}
                  </p>
                </div>
              }

              {withCloseButton &&
                <div className={`${styles.popupHeader_item} ${styles.popupHeader_item__last}`}>
                  <button type="button" className={`${styles.popupHeader_close}`} onClick={handleClose}>
                    {iconClose &&
                      <div className={`${styles.popupHeader_icon}`}>
                        {iconClose}
                      </div>
                    }
                  </button>
                </div>
              }
            </div>
          }

          <div className={`${styles.popupBody}`}>
            {children}
          </div>

        </div>
      </div>
    </>
  )
}

export default Popup