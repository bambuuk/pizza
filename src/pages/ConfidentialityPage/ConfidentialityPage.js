import { motion } from "framer-motion";
import { Helmet, HelmetProvider } from 'react-helmet-async';

import withLayout from "../../hocs/withLayout";
import Confidentiality from "../../components/Confidentiality/Confidentiality";

const ConfidentialityPage = () => {
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
            content="Інформація про конфіденційність"
          />
          <title>Конфіденційність</title>
        </Helmet>
        <Confidentiality />
      </motion.main>
    </HelmetProvider>
  )
}

export default withLayout(ConfidentialityPage, 'ConfidentialityPage');