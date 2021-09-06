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
import styleAnnouncement from 'public/scss/components/Announcement.module.scss'
import styleHeader from 'public/scss/components/Header.module.scss'
import styleNav from 'public/scss/components/Navigation.module.scss'

const classesCollapsibleNav = {
  parentNavClassName: styleNav.menu,
  navItemClassName: styleNav.menu_item,
  selectedNavClassName: styleNav.menu_itemSelected,
  navValueContainerClassName: styleNav.menu_itemValueContainer,
  navValueClassName: styleNav.menu_itemValue,
  dropdownIconClassName: styleNav.menu_icon,
  childNavClassName: styleNav.menu_sub,
  subChildNavClassName: styleNav.menu_sub
}

const classesPlaceholderLogo = {
  placeholderImage: `${styleHeader.placeholderItem} ${styleHeader.placeholderItem_headerLogo}`
}

const classesPlaceholderCollapsibleNav = {
  placeholderList: `${styleHeader.placeholderItem} ${styleHeader.placeholderItem_headerNavigation}`
}

const classesPlaceholderWidget = {
  placeholderTitle: `${styleHeader.placeholderItem} ${styleHeader.placeholderItem_headerWidget}`
}

const Header: FC<any> = ({
  withAnnouncement,
  headerTitle,
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
    if (openMenu) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'initial'
  }, [openMenu])

  const toogleMenu = () => setOpenMenu(!openMenu)

  return (
    <>
      {((countWidgetAnnouncement === null || countWidgetAnnouncement > 0) && withAnnouncement) &&
        <div className={styleAnnouncement.announce} style={{ display: showAnnounce ? 'flex' : 'none' }}>
          <span className={styleAnnouncement.announce_close}>
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
            widgetClassName={styleAnnouncement.announce_items}
            loadingComponent={<Placeholder classes={classesPlaceholderWidget} withTitle />}
          />
        </div>
      }
      <header
        className={`
          ${styleHeader.header} 
          ${(!showAnnounce || !withAnnouncement) && styleHeader.header_top}
          ${(stickyClass !== "transparent") && styleHeader.header_scroll}
        `}>
        <div
          className={`
            container ${styleHeader.header_navbar} 
            ${(stickyClass !== "transparent" || openMenu) && styleHeader.header_sticky}`
          }
        >
          {headerTitle ?
            <h3 className={styleHeader.header_title}>
              {headerTitle}
            </h3> :
            <LazyLoadComponent
              placeholder={
                <Placeholder classes={classesPlaceholderLogo} withImage={true} />
              }
            >
              <Logo
                imageClassName={styleHeader.header_logo}
                lazyLoadedImage={false}
                thumborSetting={{
                  width: size.width < 575 ? 200 : 400,
                  quality: 90
                }}
              />
            </LazyLoadComponent>
          }
          <div
            className={styleHeader.header_menuIcon}
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
            ${styleHeader.header_menus} 
            ${(countWidgetAnnouncement === 0) && styleHeader.header_menusHeight} 
            ${openMenu && styleHeader.header_menusActive}`
          }
        >
          {openMenu &&
            <CollapsibleNav
              dropdownIcon={<FiChevronDown size={20} />}
              dropdownOpenIcon={<FiChevronUp size={20} />}
              classes={{
                ...classesCollapsibleNav,
                parentNavClassName: showAnnounce ? styleNav.menu : `${styleNav.menu} ${styleNav.menu_withoutWidget}`
              }}
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