import { motion } from "framer-motion";
import { Helmet, HelmetProvider } from 'react-helmet-async';

import withLayout from "../../hocs/withLayout";
import Contacts from "../../components/Contacts/Contacts";

const ContactsPage = () => {
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
            content="Інформація про наші контакти"
          />
          <title>Контакти</title>
        </Helmet>
        <Contacts />
      </motion.main>
    </HelmetProvider>
  )
}

export default withLayout(ContactsPage, 'ContactsPage');