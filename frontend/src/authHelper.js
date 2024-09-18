import { getCookie } from "./utilities";
import { reLoginUser, setUser } from "./Redux/slices/userSlice";
import store from "./Redux/Store";

const handleUserRelogin = async (callback) => {
  const accessToken = getCookie("access_token");
  if (accessToken) {
    const loggedUserInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    if (loggedUserInfo) {
      store.dispatch(setUser({ userInfo: loggedUserInfo }));
    } else {
    }
    return true;
  } else {
    const refreshToken = getCookie("refresh_token");
    if (refreshToken) {
      store.dispatch(reLoginUser());
    } else {
      return false;
    }
  }
};

export default handleUserRelogin;
