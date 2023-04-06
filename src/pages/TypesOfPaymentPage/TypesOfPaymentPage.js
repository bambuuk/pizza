import { motion } from 'framer-motion';
import TypesOfPayment from "../../components/TypesOfPayment/TypesOfPayment";
import withLayout from "../../hocs/withLayout";

const TypesOfPaymentPage = () => {
  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <TypesOfPayment />
      </motion.main>
    </>
  )
}

export default withLayout(TypesOfPaymentPage, 'TypesOfPaymentPage');