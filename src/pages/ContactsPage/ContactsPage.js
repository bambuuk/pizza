import { motion } from "framer-motion";
import withLayout from "../../hocs/withLayout";
import Contacts from "../../components/Contacts/Contacts";

const ContactsPage = () => {
  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Contacts />
      </motion.main>
    </>
  )
}

export default withLayout(ContactsPage, 'ContactsPage');