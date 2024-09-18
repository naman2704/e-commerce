import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCookie } from "../src/utilities";

const AuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isUserLoggedIn = Boolean(getCookie("access_token"));
  useEffect(() => {
    if (
      isUserLoggedIn &&
      (location.pathname === "/login" ||
        location.pathname === "/admin/login" ||
        location.pathname === "/register")
    ) {
      navigate("/");
    }
  }, [isUserLoggedIn, location, navigate]);
  return null;
};

export default AuthRedirect;
