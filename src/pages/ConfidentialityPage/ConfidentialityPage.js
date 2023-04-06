import { motion } from "framer-motion";
import withLayout from "../../hocs/withLayout";
import Confidentiality from "../../components/Confidentiality/Confidentiality";

const ConfidentialityPage = () => {
  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Confidentiality />
      </motion.main>
    </>
  )
}

export default withLayout(ConfidentialityPage, 'ConfidentialityPage');