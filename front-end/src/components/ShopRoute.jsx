import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ShopRoute({ children }) {
  const { data: user } = useSelector((state) => state.user);

  if (!user || user.role !== "Shop") {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}
