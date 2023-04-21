import { motion } from "framer-motion";
import { Helmet, HelmetProvider } from 'react-helmet-async';

import withLayout from "../../hocs/withLayout"
import PublicOffer from "../../components/PublicOffer/PublicOffer";

const PublicOfferPage = () => {
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
            content="Інформація про публічну оферту"
          />
          <title>Публічна оферта</title>
        </Helmet>
        <PublicOffer />
      </motion.main>
    </HelmetProvider>
  )
}

export default withLayout(PublicOfferPage, 'PublicOfferPage');