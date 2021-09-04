import {
  FC,
  useState,
  useEffect,
  useRef
} from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {
  Logo,
  Widget,
  useI18n
} from "@sirclo/nexus";
import Placeholder from "../Placeholder";
import SideMenu from "../SideMenu/SideMenu";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import {
  Menu,
  ChevronDown,
  ChevronUp,
  X
} from 'react-feather';
import styles from "public/scss/components/Header.module.scss";

const CollapsibleNav = dynamic(() => import("@sirclo/nexus").then((mod) => mod.CollapsibleNav));

const classesCollapsibleNav = {
  parentNavClassName: styles.menu,
  navItemClassName: styles.menu_item,
  selectedNavClassName: styles.menu_itemSelected,
  navValueClassName: styles.menu_item__value,
  dropdownIconClassName: styles.icon_down,
  childNavClassName: styles.menu_sub,
  subChildNavClassName: styles.menu_sub
};

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
  lng,
  stickyClass
}) => {
  const i18n: any = useI18n();
  const router = useRouter();
  const [showAnnounce, setShowAnnounce] = useState<boolean>(true);
  const [countWidgetAnnouncement, setCountWidgetAnnouncement] = useState(null);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  const cartOuterDiv = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e) => {
    if (cartOuterDiv.current.contains(e.target)) {
      return;
    }
    setOpenCart(false);
  };

  useEffect(() => {
    setMobileMenu(false);
  }, [router?.query]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {(countWidgetAnnouncement === null || countWidgetAnnouncement > 0) &&
        <div className={styles.announce} style={{ display: showAnnounce ? 'flex' : 'none' }}>
          <span className={styles.announce__close}>
            <X
              className={styles.announce__close__icon}
              onClick={() => setShowAnnounce(false)}
            />
          </span>
          <Widget
            getItemCount={(itemCount: number) => setCountWidgetAnnouncement(itemCount)}
            pos="header-announcements"
            widgetClassName={styles.announce__items}
            loadingComponent={<Placeholder classes={classesPlaceholderWidget} withTitle />}
          />
        </div>
      }
      <header className={`${styles.header} ${(stickyClass !== "transparent" || mobileMenu) && styles.header__sticky}`} ref={cartOuterDiv}>
        <div
          className={`${styles.header_item} ${styles.header_item__menuTrigger}`}
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <div className={mobileMenu ? styles.icon_close__black : styles.icon_bar}></div>
        </div>
        <div className={`${styles.header_item} ${styles.header_item__brand}`}>
          <LazyLoadComponent>
            <Logo
              imageClassName={styles.header_logo}
              thumborSetting={{
                height: 120,
                format: 'webp',
                quality: 85
              }}
            />
          </LazyLoadComponent>
        </div>
        <div
          className={`${styles.header_item} ${styles.header_item__menuTrigger}`}
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <div className={mobileMenu ? styles.icon_close__black : styles.icon_bar}></div>
        </div>
      </header>

      <div className={`${styles.headerMobile} ${mobileMenu ? styles.headerMobile__active : ''}`}>
        <CollapsibleNav
          classes={classesCollapsibleNav}
          dropdownIcon={<X />}
          dropdownOpenIcon={<X />}
          loadingComponent={
            <div className={styles.headerMobile_loading}>
              {i18n.t("global.loading")}&hellip;
            </div>
          }
        />
      </div>
    </>
  );
};

export default Header;