import withLayout from "../../hocs/withLayout"
import DeliveryAndPayment from "../../components/DeliveryAndPayment/DeliveryAndPayment";

const DeliveryPage = () => {
  return (
    <>
      <DeliveryAndPayment />
    </>
  )
}

export default withLayout(DeliveryPage, 'DeliveryAndPayment');