import TypesOfPayment from "../../components/TypesOfPayment/TypesOfPayment";
import withLayout from "../../hocs/withLayout";

const TypesOfPaymentPage = () => {
  return (
    <>
      <TypesOfPayment />
    </>
  )
}

export default withLayout(TypesOfPaymentPage, 'TypesOfPaymentPage');