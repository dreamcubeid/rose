import { FC } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TelegramShareButton,
} from "react-share";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaTelegram
} from "react-icons/fa";
import styles from "public/scss/components/SocialShare.module.scss";

type TypeSocialShare = {
  urlSite: string
  title?: string
  size?: string | number | undefined
  color?: string
}

const SocialShare: FC<TypeSocialShare> = ({
  urlSite,
  title,
  size = 16,
  color = '#BCBCBC'
}) => {
  const iconProps = {
    size,
    color
  }

  return (
    <div className={styles.socialShare}>
      <div className={styles.socialShare_title}>
        {title}
      </div>
      <div className={styles.socialShare_logo}>
        <div className={styles.socialShare_item}>
          <FacebookShareButton url={urlSite}>
            <FaFacebook {...iconProps} />
          </FacebookShareButton>
        </div>
        <div className={styles.socialShare_item}>
          <TwitterShareButton url={urlSite}>
            <FaTwitter {...iconProps} />
          </TwitterShareButton>
        </div>
        <div className={styles.socialShare_item}>
          <LinkedinShareButton url={urlSite}>
            <FaLinkedin {...iconProps} />
          </LinkedinShareButton>
        </div>
        <div className={styles.socialShare_item}>
          <WhatsappShareButton url={urlSite}>
            <FaWhatsapp {...iconProps} />
          </WhatsappShareButton>
        </div>
        <div className={styles.socialShare_item}>
          <EmailShareButton url={urlSite}>
            <FaEnvelope {...iconProps} />
          </EmailShareButton>
        </div>
        <div className={styles.socialShare_item}>
          <TelegramShareButton url={urlSite}>
            <FaTelegram {...iconProps} />
          </TelegramShareButton>
        </div>
      </div>
    </div>
  )
}

export default SocialShare;