import { motion } from "framer-motion";
import withLayout from "../../hocs/withLayout";
import DeliveryAndPayment from "../../components/DeliveryAndPayment/DeliveryAndPayment";

const DeliveryPage = () => {
  return (
    <>
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <DeliveryAndPayment />
    </motion.main>
    </>
  )
}

export default withLayout(DeliveryPage, 'DeliveryAndPayment');