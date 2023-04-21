import { motion } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import TypesOfPayment from "../../components/TypesOfPayment/TypesOfPayment";
import withLayout from "../../hocs/withLayout";

const TypesOfPaymentPage = () => {
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
            content="Інформація про доступні типи оплати замовлення"
          />
          <title>Способи оплати</title>
        </Helmet>
        <TypesOfPayment />
      </motion.main>
    </HelmetProvider>
  )
}

export default withLayout(TypesOfPaymentPage, 'TypesOfPaymentPage');