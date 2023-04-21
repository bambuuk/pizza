import { motion } from "framer-motion";
import { Helmet, HelmetProvider } from 'react-helmet-async';

import withLayout from "../../hocs/withLayout";
import InfoAboutUs from "../../components/InfoAboutUs/InfoAboutUs";

const AboutUs = () => {
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
            content="Інформація про нас"
          />
          <title>Про нас</title>
        </Helmet>
        <InfoAboutUs />
      </motion.main>
    </HelmetProvider>
  )
}

export default withLayout(AboutUs, 'AboutUs');