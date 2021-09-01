import {
  FC,
  useState,
  useEffect
} from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useI18n } from "@sirclo/nexus";
import dynamic from "next/dynamic";
import {
  User,
  ShoppingCart,
  Search as IconSearch
} from 'react-feather';

const Popup = dynamic(() => import("../Popup/Popup"));
const PopupCart = dynamic(() => import("../Popup/PopupCart"));
const Search = dynamic(() => import("./Search"));
const PrivateComponent = dynamic(() => import("@sirclo/nexus").then((mod) => mod.PrivateComponent));

const ProfileMenu: FC<any> = ({
  lng,
  size,
  totalQuantity,
  styles
}) => {
  const router = useRouter();
  const i18n: any = useI18n();

  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);

  useEffect(() => {
    if (openCart) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [openCart])

  const searchProduct = (val: any) => {
    if (val !== "" && typeof val !== "undefined") {
      Router.push(`/${lng}/products?q=${val}`);
      setOpenSearch(false);
    } else {
      Router.push(`/${lng}/products`);
      setOpenSearch(false);
    }
  };

  const toogleSearch = () => setOpenSearch(!openSearch);

  const toogleCart = () => {
    if (router.pathname !== "/[lng]/payment_notif/[[...orderID]]") setOpenCart(!openCart);
  }

  const classesSearch = {
    searchContainer: styles.search_container,
    searchInputContainer: styles.search_inputContainer,
    searchInput: `form-control ${styles.sirclo_form_input} ${styles.search_inputText}`,
    searchClear: `btn ${styles.search_buttonClear}`,
    searchButton: styles.search_buttonSearch,
    searchForm: styles.search_form
  }

  return (
    <div className={styles.navbar_profile_menu}>
      <a
        className={styles.navbar_profile_menu__cart}
        onClick={(e) => e.preventDefault()}
        href="#"
      >
        <div
          className={`${styles.nav__icon} mr-2 mr-md-4`}
          onClick={toogleSearch}
        >
          <IconSearch
            size={size.width < 575 ? 18 : 24}
          />
        </div>
      </a>
      <PrivateComponent
        Auth={
          <div>
            <Link href="/[lng]/account" as={`/${lng}/account`}>
              <a>
                <User
                  size={size.width < 575 ? 18 : 24}
                />
              </a>
            </Link>
          </div>
        }
        NoAuth={
          <div>
            <Link href="/[lng]/login" as={`/${lng}/login`}>
              <a>
                <User
                  size={size.width < 575 ? 18 : 24}
                />
              </a>
            </Link>
          </div>
        }
      />
      <a
        className={styles.navbar_profile_menu__cart}
        onClick={(e) => e.preventDefault()}
        href="#"
      >
        <div
          className={`${styles.nav__icon} ml-2 ml-md-4`}
          onClick={toogleCart}
        >
          <ShoppingCart
            size={size.width < 575 ? 18 : 24}
          />
          <span className={styles.badge_cart} onClick={toogleCart}>{totalQuantity}</span>
        </div>
      </a>
      {openCart &&
        <PopupCart
          setPopup={setOpenCart}
          popupTitle={i18n.t("cart.title")}
          lng={lng}
        />
      }
      {openSearch &&
        <Popup
          withHeader
          setPopup={toogleSearch}
          mobileFull
          classPopopBody
          popupTitle={i18n.t("header.searchProduct")}
        >
          <Search
            classes={classesSearch}
            searchProduct={searchProduct}
            visibleState={openSearch}
          />
        </Popup>
      }
    </div>
  )
}

export default ProfileMenu;