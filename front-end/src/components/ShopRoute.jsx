import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../pages/Loading";

export default function ShopRoute({ children }) {
  const { data: user, loading } = useSelector((state) => state.user);
  if (loading) {
    return <Loading />;
  }

  if (!user || user.role !== "Shop") {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}
