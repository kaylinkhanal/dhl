import { BiError, BiHome } from "react-icons/bi";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-texts">
        <h1>
          404
          <BiError />
        </h1>
        <h2>Oops! This is not the page you are looking for.</h2>
        <Link to="/">Go Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
