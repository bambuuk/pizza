import { Link } from 'react-router-dom';
import pageNotFound from '../../resources/img/404.png';
import './page404.scss';

function Page404() {
  return (
    <div className="page404">
      <Link className="linkOnMainPage" to="/">
        <img className="img-404-page" src={pageNotFound} alt="404 error - page not found" />
        <p className="descr-404-page">Back to main page</p>
      </Link>
    </div>
  );
}

export default Page404;
