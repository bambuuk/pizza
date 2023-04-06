import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import pageNotFound from '../../resources/img/404.png';
import './page404.scss';

function Page404() {
  return (
    <motion.div 
      className="page404"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Link className="linkOnMainPage" to="/">
        <img className="img-404-page" src={pageNotFound} alt="404 error - page not found" />
        <p className="descr-404-page">Back to main page</p>
      </Link>
    </motion.div>
  );
}

export default Page404;
