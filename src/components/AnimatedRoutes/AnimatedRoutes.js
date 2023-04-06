import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import MainPage from '../../pages/MainPage/MainPage';
import AboutUs from '../../pages/AboutUs/AboutUs';
import DeliveryPage from '../../pages/DeliveryPage/DeliveryPage';
import Page404 from '../../pages/Page404/Page404';
import ConfidentialityPage from '../../pages/ConfidentialityPage/ConfidentialityPage';
import TypesOfPaymentPage from '../../pages/TypesOfPaymentPage/TypesOfPaymentPage';
import PublicOfferPage from '../../pages/PublicOfferPage/PublicOfferPage';
import ContactsPage from '../../pages/ContactsPage/ContactsPage';

// const MainPage = lazy(() => import('../../pages/MainPage/MainPage'));
// const AboutUs = lazy(() => import('../../pages/AboutUs/AboutUs'));
// const DeliveryPage = lazy(() => import('../../pages/DeliveryPage/DeliveryPage'));
// const Page404 = lazy(() => import('../../pages/Page404/Page404'));
// const ConfidentialityPage = lazy(() => import('../../pages/ConfidentialityPage/ConfidentialityPage'));
// const TypesOfPaymentPage = lazy(() => import('../../pages/TypesOfPaymentPage/TypesOfPaymentPage'));
// const PublicOfferPage = lazy(() => import('../../pages/PublicOfferPage/PublicOfferPage'));
// const ContactsPage = lazy(() => import('../../pages/ContactsPage/ContactsPage'));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/confidentiality" element={<ConfidentialityPage />} />
        <Route path="/type-of-payment" element={<TypesOfPaymentPage />} />
        <Route path="/public-offer" element={<PublicOfferPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes;