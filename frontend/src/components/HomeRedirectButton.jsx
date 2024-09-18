import { Link, useLocation } from "react-router-dom";
import Button from "./Button";

const HomeRedirectButton = () => {
  const location = useLocation();
  return (
    <nav className="w-fit fixed top-0 right-0">
      {location.pathname !== "/" && (
        <Link to="/">
          <Button label="Home" bgColor="bg-blue-500" />
        </Link>
      )}
    </nav>
  );
};

export default HomeRedirectButton;
