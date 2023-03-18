import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Spinner from './components/Spinner/Spinner';
import './style/style.scss';

const MainPage = lazy(() => import('./pages/MainPage/MainPage.js'));
const Page404 = lazy(() => import('./pages/Page404/Page404.js'));
const AboutUs = lazy(() => import('./pages/AboutUs/AboutUs'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
