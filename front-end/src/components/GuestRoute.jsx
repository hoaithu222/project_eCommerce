import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
  const isLogin = sessionStorage.getItem("isLogin");
  const accessToken = localStorage.getItem("accessToken");

  if (isLogin && accessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
}
