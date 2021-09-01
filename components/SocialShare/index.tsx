import { FC } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon
} from "react-share";
import styles from "public/scss/components/SocialShare.module.scss";

type TypeSocialShare = {
  i18n?: any,
  urlSite: string,
  size?: number
}

const SocialShare: FC<TypeSocialShare> = ({
  i18n,
  urlSite,
  size = 40
}) => {

  return (
    <div className={styles.socialShare}>
      <div className={styles.socialShare_item}>
        <FacebookShareButton url={urlSite}>
          <FacebookIcon size={size} />
        </FacebookShareButton>
        <span>{i18n.t("socialShare.facebook")}</span>
      </div>
      <div className={styles.socialShare_item}>
        <TwitterShareButton url={urlSite}>
          <TwitterIcon size={size} />
        </TwitterShareButton>
        <span>{i18n.t("socialShare.twitter")}</span>
      </div>
      <div className={styles.socialShare_item}>
        <LinkedinShareButton url={urlSite}>
          <LinkedinIcon size={size} />
        </LinkedinShareButton>
        <span>{i18n.t("socialShare.linkedin")}</span>
      </div>
      <div className={styles.socialShare_item}>
        <WhatsappShareButton url={urlSite}>
          <WhatsappIcon size={size} />
        </WhatsappShareButton>
        <span>{i18n.t("socialShare.whatsapp")}</span>
      </div>
      <div className={styles.socialShare_item}>
        <EmailShareButton url={urlSite}>
          <EmailIcon size={size} />
        </EmailShareButton>
        <span>{i18n.t("socialShare.email")}</span>
      </div>
      <div className={styles.socialShare_item}>
        <TelegramShareButton url={urlSite}>
          <TelegramIcon size={size} />
        </TelegramShareButton>
        <span>{i18n.t("socialShare.telegram")}</span>
      </div>
    </div>
  )
}

export default SocialShare;