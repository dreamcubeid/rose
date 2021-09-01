import { FC } from "react";
import dynamic from "next/dynamic";
import {
  isCopyrightAllowed,
  Widget,
  SocialMediaIcons
} from "@sirclo/nexus";
import useWindowSize from "lib/useWindowSize";
import styles from "public/scss/components/Footer.module.scss";

const Placeholder = dynamic(() => import("components/Placeholder"));

const socialMediaIcons = {
  facebook: <img src="/images/facebook.svg" alt="facebook" />,
  twitter: <img src="/images/twitter.svg" alt="twitter" />,
  instagram: <img src="/images/instagram.svg" alt="instagram" />,
  youtube: <img src="/images/youtube.svg" alt="youtube" />,
  tiktok: <img src="/images/tiktok.svg" alt="tiktok" />
};

const classesMediaSocial = {
  socialMediaIconContainer: styles.socialIcon,
  socialMediaIcon: styles.socialIcon_item,
}

const classesPlaceholderWidget = {
  placeholderList: `${styles.placeholderItem} ${styles.placeholderItem_widgetFooterMenu}`,
}

const Footer: FC<any> = ({ brand }) => {
  const size: any = useWindowSize();
  const allowedCopyright = isCopyrightAllowed();

  return (
    <>
      <div className={styles.widgetFooter}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2">
              <Widget
                pos="footer-1"
                containerClassName="row"
                widgetClassName="col-12 col-lg-4"
                loadingComponent={
                  <div className="row">
                    <div className="col-12">
                      <Placeholder
                        classes={classesPlaceholderWidget}
                        withList
                        listMany={4}
                      />
                    </div>
                  </div>
                }
                thumborSetting={{
                  width: size.width < 768 ? 576 : 1200,
                  format: "webp",
                  quality: 85
                }}
              />
              <hr className={styles.footer_line} />
              <SocialMediaIcons
                socialMediaIcons={socialMediaIcons}
                classes={classesMediaSocial}
              />
            </div>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <div className={`container ${styles.footer_bottom} uppercase`}>
          {allowedCopyright ?
            <>
              {brand?.settings?.websiteTitle || ""}
              {(brand?.settings?.websiteTitle && allowedCopyright) && ` - `}
              POWERED BY&nbsp;<a href="https://store.sirclo.com" target="_blank">SIRCLO</a>
            </>
            : 
            <Widget 
              pos="copyright-and-policy" 
              thumborSetting={{
                width: 1,
                format: 'webp',
                quality: 5,
              }}
            />
          }
        </div>
      </footer>
    </>
  );
}

export default Footer;