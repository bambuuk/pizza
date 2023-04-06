import { motion } from "framer-motion";
import withLayout from "../../hocs/withLayout"
import PublicOffer from "../../components/PublicOffer/PublicOffer";

const PublicOfferPage = () => {
  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <PublicOffer />
      </motion.main>
    </>
  )
}

export default withLayout(PublicOfferPage, 'PublicOfferPage');