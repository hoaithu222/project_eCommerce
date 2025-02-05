import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
  const isLogin = sessionStorage.getItem("isLogin") === "true";
  const isPermission = sessionStorage.getItem("isPermission") === "true";

  if (isLogin && isPermission) {
    return <Navigate to="/" replace />;
  }

  return children;
}
