import { useRef, FC } from 'react';
import { X } from 'react-feather';
import styles from 'public/scss/components/Popup.module.scss';
import useOutsideClick from 'lib/useOutsideClick';

export type PopupPropsType = {
  withHeader: boolean,
  setPopup?: any,
  popupTitle?: string
  mobileFull?: boolean,
  classPopopBody?: boolean
}

const Popup: FC<PopupPropsType> = ({
  withHeader,
  setPopup,
  popupTitle,
  mobileFull = true,
  classPopopBody,
  children
}) => {

  const cartOuterDiv = useRef<HTMLDivElement>(null);

  useOutsideClick(cartOuterDiv, () => setPopup(false));

  return (
    <div className={styles.popup_overlay}>
      <div ref={cartOuterDiv} className={mobileFull ? styles.popup_containerFull : styles.popup_container}>
        {withHeader &&
          <div className={styles.popup_header}>
            <h6>{popupTitle}</h6>
            <span className={styles.close_button} onClick={() => setPopup(false)}>
              <X className={styles.close_icon} />
            </span>
          </div>
        }
        <div className={`${styles.popup_body} ${classPopopBody ? styles.popup_bodyMaxHeight : ""}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Popup;