import { useDispatch } from "react-redux";
import { logOut } from "../Redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.userInfo);
  console.log("logout user: ", user);
  const userRole = user?.role || "user";
  const handleLogout = () => {
    dispatch(logOut()); // Dispatch the logOut action
    userRole === "admin" ? navigate("/admin/login") : navigate("/login"); // Redirect the user to the login page after logout
  };
  return (
    <button
      className="flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 text-red-600 block mx-auto"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogOut;
