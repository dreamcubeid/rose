/* library package */
import { ShipmentTracker } from '@sirclo/nexus'
/* style */
import styleShipmentTracking from 'public/scss/components/shipmentTracking.module.scss'

const classesTrackerPage = {
  shipmentTrackingClassName: styleShipmentTracking.shipmentTracking,
  shipmentHeaderClassName: styleShipmentTracking.shipmentTracking_header,
  shipmentHeaderTextClassName: styleShipmentTracking.shipmentTracking_title,
  shipmentTextClassName: styleShipmentTracking.shipmentTracking_subTitle,
  shipmentCloseIconClassName: styleShipmentTracking.shipmentTracking_close,
  shipmentBodyClassName: styleShipmentTracking.shipmentTracking_body,
  shipmentListWrapperClassName: styleShipmentTracking.shipmentTracking_list,
  shipmentListClassName: styleShipmentTracking.shipmentTracking_item,
  shipmentStatusClassName: styleShipmentTracking.shipmentTracking_item_description,
  shipmentDateClassName: styleShipmentTracking.shipmentTracking_item_date,
  shipmentNoteClassName: styleShipmentTracking.shipmentTracking_item_note,
  shipmentFooterClassName: styleShipmentTracking.shipmentTracking_footer,
}

const TrackerPage = ({ order_token }) => {
  return (
    <ShipmentTracker
      token={order_token}
      iconTracker={<img className="mr-2" src={'/icons/motorcycle.svg'} alt="motorcycle" />}
      classes={classesTrackerPage}
    />
  )
}

export async function getServerSideProps({ params }) {
  const { default: lngDict = {} } = await import(`locales/${params.lng}.json`)

  return {
    props: {
      lng: params.lng,
      lngDict,
      order_token: params.token
    },
  }
}

export default TrackerPage
