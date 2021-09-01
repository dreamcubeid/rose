import { ShipmentTracker } from "@sirclo/nexus";
import styles from "public/scss/pages/Track.module.scss";

const classesTrackerPage = {
  shipmentHeaderClassName: `${styles.track_shipmentHeader} ${styles.track_shipmentHeaderGuest}`,
  shipmentBodyClassName: `${styles.track_shipmentBody} ${styles.track_shipmentBodyGuest} d-flex justify-content-center`,
  shipmentFooterClassName: `${styles.track_shipmentFooter} d-flex justify-content-center text-center`,
  shipmentTrackingClassName: styles.track_shipmentTracking,
  shipmentHeaderTextClassName: styles.track_shipmentHeaderText,
  shipmentTextClassName: styles.track_shipmentText,
  shipmentNoteClassName: styles.track_shipmentNote,
  shipmentListClassName: styles.track_shipmentList,
  shipmentListWrapperClassName: styles.track_shipmentListWrapper,
  shipmentCloseIconClassName: styles.track_shipmentCloseIcon,
  shipmentTrackButtonClassName: `${styles.track_shipmentTrackButton} ${styles.track_shipmentTrackButtonGuest}`,
};

const TrackerPage = ({ order_token }) => {
  return (
    <ShipmentTracker
      token={order_token}
      iconTracker={
        <img
          className="mr-2"
          src={"/images/motorcycle.svg"}
          alt="motorcycle"
        />
      }
      classes={classesTrackerPage}
    />
  );
};

export async function getServerSideProps({ params }) {
  const lng = params.lng == "en" ? "en" : "id";

  const { default: lngDict = {} } = await import(
    `locales/${lng}.json`
  );

  return {
    props: { lng: lng, lngDict, order_token: params.token },
  };
}

export default TrackerPage;