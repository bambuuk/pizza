import { motion } from "framer-motion";
import withLayout from "../../hocs/withLayout";
import InfoAboutUs from "../../components/InfoAboutUs/InfoAboutUs";

const AboutUs = () => {
  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <InfoAboutUs />
      </motion.main>
    </>
  )
}

export default withLayout(AboutUs, 'AboutUs');