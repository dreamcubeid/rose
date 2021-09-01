import { FC } from "react";
import { X } from 'react-feather';
import styles from "public/scss/components/SideMenu.module.scss";

type SideMenuPropsType = {
  withClose?: boolean
  withTitle?: boolean,
  withLogo?: boolean,
  title?: string,
  logo?: any,
  openSide: any,
  toogleSide: any,
  positionSide: string
}

const SideMenu: FC<SideMenuPropsType> = ({
  withClose = false,
  withTitle = false,
  withLogo = false,
  title,
  logo,
  openSide,
  toogleSide,
  positionSide,
  children
}) => {
  return (
    <>
      <div className={`
        ${styles.sidemenu} 
        ${openSide ? `${styles[positionSide]}` : ""} 
      `}>
        <div className={styles.header_side_menu}>
          {withLogo && logo}
          {withTitle &&
            <h6>{title}</h6>
          }
          {withClose &&
            <X onClick={toogleSide} size={30} />
          }
        </div>
        {children}
      </div>
      <div className="bg-outside" style={{ display: openSide ? 'block' : 'none' }} onClick={toogleSide}></div>
    </>
  )
}

export default SideMenu;