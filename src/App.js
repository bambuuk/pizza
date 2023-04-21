import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import AnimatedRoutes from './components/AnimatedRoutes/AnimatedRoutes';
import './style/style.scss';

function App() {
  return (
    <BrowserRouter basename="/pizza">
    {/* <BrowserRouter> */}
      <Suspense>
        <AnimatedRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
