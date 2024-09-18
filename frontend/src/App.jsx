import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ErrorBoundary from "./ErrorBoundary";
import Register from "./components/Register";
import Home from "./components/Home";
import HomeRedirectButton from "./components/HomeRedirectButton";
import AdminLogin from "./AdminLogin";
import { ToastContainer } from "react-toastify";
import { setUser } from "./Redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { StrictMode } from "react";
import { AuthRedirect, PrivateAdminRoute } from "../Routes";
import Users from "./components/Users";
import EditCategories from "./components/EditCategories";
import handleUserRelogin from "authHelper";

function App() {
  const dispatch = useDispatch();
  const isUserLoggedIn = Boolean(getCookie("access_token"));
  console.log("isUserLoggedIn: ", isUserLoggedIn);
  (function setUserInfo() {
    const loggedUserInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    if (loggedUserInfo) {
      dispatch(setUser({ userInfo: loggedUserInfo }));
    }
  })();
  return (
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <AuthRedirect />
          <HomeRedirectButton />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home userLoggedIn={isUserLoggedIn} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/register" element={<Register />} />
            {/* Protected Admin Routes */}
            <Route path="/admin" element={<PrivateAdminRoute />}>
              <Route path="/admin/users" element={<Users />} />
              <Route
                path="/admin/updateCategories"
                element={<EditCategories />}
              />
            </Route>
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
}

export default App;
