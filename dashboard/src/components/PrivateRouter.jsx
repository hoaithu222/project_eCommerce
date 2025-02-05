import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const isLogin = sessionStorage.getItem("isLogin") === "true";
  const isPermission = sessionStorage.getItem("isPermission") === "true";

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  if (!isPermission) {
    return <Navigate to="/not-authorized" replace />;
  }

  return <Outlet />;
}
