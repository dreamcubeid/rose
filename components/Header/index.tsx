/* library package */
import {
  FC,
  useState,
  useEffect
} from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import {
  FiX,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi'
import { Logo, Widget } from '@sirclo/nexus'
/* library template */
import useWindowSize from 'lib/useWindowSize'
/* components */
import Placeholder from '../Placeholder'
const CollapsibleNav = dynamic(() => import('@sirclo/nexus').then((mod) => mod.CollapsibleNav))
/* styles */
import styles from 'public/scss/components/Header.module.scss'

const classesCollapsibleNav = {
  parentNavClassName: styles.menu,
  navItemClassName: styles.menu_item,
  selectedNavClassName: styles.menu_itemSelected,
  navValueClassName: styles.menu_item__value,
  dropdownIconClassName: styles.icon_down,
  childNavClassName: styles.menu_sub,
  subChildNavClassName: styles.menu_sub
}

const classesPlaceholderLogo = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_header__logo}`
}

const classesPlaceholderCollapsibleNav = {
  placeholderList: `${styles.placeholderItem} ${styles.placeholderItem_header__navMobile}`
}

const classesPlaceholderWidget = {
  placeholderTitle: `${styles.placeholderItem} ${styles.placeholderItem_header__widget}`
}

const Header: FC<any> = ({
  stickyClass
}) => {
  const router = useRouter()
  const size: any = useWindowSize()
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const [showAnnounce, setShowAnnounce] = useState<boolean>(true)
  const [countWidgetAnnouncement, setCountWidgetAnnouncement] = useState(null)

  useEffect(() => {
    setOpenMenu(false)
  }, [router.query])

  useEffect(() => {
    if (openMenu) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'initial';
  }, [openMenu])

  const toogleMenu = () => {
    setOpenMenu(!openMenu)
  }

  return (
    <>
      {(countWidgetAnnouncement === null || countWidgetAnnouncement > 0) &&
        <div className={styles.announce} style={{ display: showAnnounce ? 'flex' : 'none' }}>
          <span className={styles.announce_close}>
            <FiX
              color="#FFFFF"
              onClick={() => {
                setShowAnnounce(false)
                setCountWidgetAnnouncement(0)
              }}
            />
          </span>
          <Widget
            getItemCount={(itemCount: number) => setCountWidgetAnnouncement(itemCount)}
            pos="header-announcements"
            widgetClassName={styles.announce_items}
            loadingComponent={<Placeholder classes={classesPlaceholderWidget} withTitle />}
          />
        </div>
      }
      <header
        className={`
          ${styles.header} 
          ${!showAnnounce && styles.header_top}
          ${(stickyClass !== "transparent") && styles.header_scroll}
        `}>
        <div
          className={`
            container ${styles.header_navbar} 
            ${(stickyClass !== "transparent" || openMenu) && styles.header_sticky}`
          }
        >
          <LazyLoadComponent
            placeholder={
              <Placeholder classes={classesPlaceholderLogo} withImage={true} />
            }
          >
            <Logo
              imageClassName={styles.header_logo}
              lazyLoadedImage={false}
              thumborSetting={{
                width: size.width < 575 ? 200 : 400,
                quality: 90
              }}
            />
          </LazyLoadComponent>
          <div
            className={styles.header_menuIcon}
            onClick={toogleMenu}
          >
            {openMenu ?
              <FiX size={20} /> :
              <img
                src={`/icons/${(stickyClass !== "transparent") ? "menu-black.svg" : "menu-white.svg"}`}
                alt="menu"
              />
            }
          </div>
        </div>
        <div
          className={`
            ${styles.header_menus} 
            ${(countWidgetAnnouncement === 0) && styles.header_menusHeight} 
            ${openMenu && styles.header_menusActive}`
          }
        >
          {openMenu &&
            <CollapsibleNav
              dropdownIcon={<FiChevronDown />}
              dropdownOpenIcon={<FiChevronUp />}
              classes={classesCollapsibleNav}
              loadingComponent={
                <>
                  <Placeholder
                    classes={classesPlaceholderCollapsibleNav}
                    withList={true}
                    listMany={4}
                  />
                </>
              }
            />
          }
        </div>
      </header>
    </>
  )
}

export default Header