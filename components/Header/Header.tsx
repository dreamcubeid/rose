import {
  FC,
  useState,
  useEffect
} from "react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import {
  Logo,
  useCart,
  Widget,
  useI18n
} from "@sirclo/nexus";
import ProfileMenu from "./ProfileMenu";
import Placeholder from "../Placeholder";
import SideMenu from "../SideMenu/SideMenu";
import Loader from "components/Loader/Loader";
import useWindowSize from "lib/useWindowSize";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import {
  Menu,
  ChevronDown,
  ChevronUp,
  X
} from 'react-feather';
import styles from "public/scss/components/Header.module.scss";
import stylesPopup from "public/scss/components/CheckPaymentOrder.module.scss";

const CollapsibleNav = dynamic(() => import("@sirclo/nexus").then((mod) => mod.CollapsibleNav));
const CheckPaymentOrder = dynamic(() => import("@sirclo/nexus").then((mod) => mod.CheckPaymentOrder));
// const CurrencySelector = dynamic(() => import("@sirclo/nexus").then((mod) => mod.CurrencySelector));
// const LanguageSelector = dynamic(() => import("@sirclo/nexus").then((mod) => mod.LanguageSelector));

const classesCollapsibleNav = {
  parentNavClassName: styles.menu,
  navItemClassName: styles.menu_item,
  selectedNavClassName: styles.menu_itemSelected,
  navValueClassName: styles.menu_item__value,
  dropdownIconClassName: styles.icon_down,
  childNavClassName: styles.menu_sub,
  subChildNavClassName: styles.menu_sub
};

const classesCheckPaymentOrder = {
  checkPaymentOrderContainerClassName: stylesPopup.checkOrder_overlay,
  checkPaymentOrderContainerBodyClassName: stylesPopup.checkOrder_container,
  checkPaymentOrderHeaderClassName: stylesPopup.checkOrder_header,
  checkPaymentOrderTitleClassName: stylesPopup.checkOrder_title,
  checkPaymentOrderDescriptionClassName: stylesPopup.checkOrder_description,
  checkPaymentOrderContentClassName: stylesPopup.checkOrder_content,
  checkPaymentOrderInputContentClassName: stylesPopup.checkOrder_inputContent,
  checkPaymentOrderInputTitleClassName: stylesPopup.checkOrder_inputTitle,
  checkPaymentOrderInputClassName: stylesPopup.checkOrder_input,
  checkPaymentOrderCloseButtonClassName: stylesPopup.checkOrder_closeButton,
  checkPaymentOrderSubmitButtonClassName: stylesPopup.checkOrder_submitButton
}

// const classesLanguageSelector = {
//   languageContainerClassName: styles.menu_sub,
//   languageItemClassName: `${styles.menu_item} ${styles.menu_itemSelector}`,
//   languageButtonSelectedClassName: styles.menu_itemSelected
// }

// const classesCurrencySelector = {
//   currencyContainerClassName: styles.menu_sub,
//   currencyItemClassName: `${styles.menu_item} ${styles.menu_itemSelector}`,
//   currencyButtonSelectedClassName: styles.menu_itemSelected
// }

const classesPlaceholderLogo = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_header__logo}`
}

const classesPlaceholderCollapsibleNav = {
  placeholderList: `${styles.placeholderItem} ${styles.placeholderItem_header__navMobile}`
}

const classesPlaceholderWidget = {
  placeholderTitle: `${styles.placeholderItem} ${styles.placeholderItem_header__widget}`
}

const Header: FC<any> = ({ lng }) => {
  const i18n: any = useI18n();
  const { data: dataCart } = useCart();
  const router = useRouter();
  const size: any = useWindowSize();

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  // const [openLanguage, setOpenLanguage] = useState<boolean>(false);
  // const [openCurrency, setOpenCurrency] = useState<boolean>(false);
  const [showPopupCheckOrder, setShowOrderCheck] = useState<boolean>(false);
  const [showAnnounce, setShowAnnounce] = useState<boolean>(true);
  const [countWidgetAnnouncement, setCountWidgetAnnouncement] = useState(null);

  useEffect(() => {
    setOpenMenu(false);
  }, [router.query]);

  const toogleMenu = () => setOpenMenu(!openMenu);

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
      <header className={styles.header}>
        <nav className={`
        navbar 
        navbar-light
        ${styles.nav_lastino} 
      `}>
          <div className={`container ${styles.navbar_mobile}`}>
            <div className={styles.navbar_menu}>
              <Menu
                className={styles.navbar_menu__icon}
                onClick={toogleMenu}
                size={size.width < 575 ? 18 : 24}
              />
            </div>
            <div className={styles.navbar_logo}>
              <LazyLoadComponent
                placeholder={
                  <Placeholder classes={classesPlaceholderLogo} withImage={true} />
                }
              >
                <Logo
                  imageClassName={styles.navbar_logo__image}
                  thumborSetting={{
                    width: size.width < 575 ? 200 : 400,
                    quality: 90
                  }}
                  lazyLoadedImage={false}
                />
              </LazyLoadComponent>
            </div>
            <ProfileMenu
              lng={lng}
              size={size}
              totalQuantity={dataCart?.totalItem}
              styles={styles}
            />
          </div>
        </nav>
        {showPopupCheckOrder && 
          <CheckPaymentOrder
            classes={classesCheckPaymentOrder}
            icon={{
              loading: <Loader color="text-light" />,
              close: <X/>
            }}
            handleClose={() => setShowOrderCheck(!showPopupCheckOrder)}
            onErrorMsg={(msg) => toast.error(msg)}
            onSuccessMsg={(msg) => toast.success(msg)}
          />
        }

        {openMenu &&
          <SideMenu
            openSide={openMenu}
            toogleSide={toogleMenu}
            positionSide="left"
            withLogo
            logo={
              <Logo
                imageClassName={styles.sidemenu_logo}
                thumborSetting={{
                  width: size.width < 575 ? 200 : 400,
                  format: "webp",
                  quality: 90,
                }}
                lazyLoadedImage={false}
              />
            }
            withClose
          >
            <CollapsibleNav
              dropdownIcon={<ChevronDown className={styles.icon_down_mobile__svg} />}
              dropdownOpenIcon={<ChevronUp className={styles.icon_down_mobile__svg} />}
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
            <ul className={styles.menu}>
              <li className={styles.menu_item}>
                <span
                  className={`${styles.menu_itemTitle}`}
                  onClick={() => {
                    setOpenMenu(!openMenu);
                    setShowOrderCheck(!showPopupCheckOrder)
                  }}
                >
                  <span className={styles.menu_itemTitleLabel}>{i18n.t('paymentConfirm.heading')}</span>
                </span>
              </li>
            </ul>
            {/* <ul className={styles.menu}>
              <li className={styles.menu_item}>
                <span className={`${openLanguage && styles.menu_itemSelected} ${styles.menu_itemTitle}`}>
                  <span className={styles.menu_itemTitleLabel}>{i18n.t("header.language")}</span>
                  <span
                    className={styles.icon_down}
                    onClick={() => setOpenLanguage(!openLanguage)}
                  >
                    {openLanguage ?
                      <ChevronUp className={styles.icon_down_mobile__svg} /> :
                      <ChevronDown className={styles.icon_down_mobile__svg} />
                    }
                  </span>
                </span>
                {openLanguage &&
                  <LanguageSelector
                    classes={classesLanguageSelector}
                    type="list"
                    lng={`${lng}`}
                    separator=""
                    withCurrency={false}
                  />
                }
              </li>
            </ul> */}
            {/* <ul className={styles.menu}>
              <li className={styles.menu_item}>
                <span className={`${openCurrency && styles.menu_itemSelected} ${styles.menu_itemTitle}`}>
                  <span className={styles.menu_itemTitleLabel}>{i18n.t("header.currency")}</span>
                  <span
                    className={styles.icon_down}
                    onClick={() => setOpenCurrency(!openCurrency)}
                  >
                    {openCurrency ?
                      <ChevronUp className={styles.icon_down_mobile__svg} /> :
                      <ChevronDown className={styles.icon_down_mobile__svg} />
                    }
                  </span>
                </span>
                {openCurrency &&
                  <CurrencySelector
                    classes={classesCurrencySelector}
                    type="list"
                    separator=""
                  />
                }
              </li>
            </ul> */}
          </SideMenu>
        }
      </header>
    </>
  );
};

export default Header;