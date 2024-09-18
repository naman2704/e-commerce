import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateAdminRoute = () => {
  const user = useSelector((state) => state.user.userInfo);
  const isAdmin = user?.role === "admin";
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default PrivateAdminRoute;
