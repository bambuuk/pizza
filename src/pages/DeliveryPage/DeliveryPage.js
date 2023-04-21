import { motion } from "framer-motion";
import { Helmet, HelmetProvider } from 'react-helmet-async';

import withLayout from "../../hocs/withLayout";
import DeliveryAndPayment from "../../components/DeliveryAndPayment/DeliveryAndPayment";

const DeliveryPage = () => {
  return (
    <HelmetProvider>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Helmet>
          <meta
            name="description"
            content="Інформація про доставку"
          />
          <title>Доставка</title>
        </Helmet>
        <DeliveryAndPayment />
      </motion.main>
    </HelmetProvider>
  )
}

export default withLayout(DeliveryPage, 'DeliveryAndPayment');