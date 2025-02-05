import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
  const isLogin = sessionStorage.getItem("isLogin");
  const accessToken = localStorage.getItem("accessToken");
  // Nếu người dùng đã đăng nhập, chuyển hướng
  if (isLogin && accessToken) {
    return <Navigate to="/" />;
  }
  return children;
}
