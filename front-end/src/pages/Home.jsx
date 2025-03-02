import { useEffect } from "react";
import HomeBanner from "../components/HomeBanner";
import ListCategory from "../components/ListCategory";
import Product from "../components/Product";
import { useDispatch } from "react-redux";
import { fetchProduct } from "../store/actions/fetchProduct";
import TopProduct from "../components/TopProduct";
import { setupAxiosInterceptors } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { fetchUser } from "../store/actions/fetchUser";
import { fetchCart } from "../store/actions/fetchCart";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct({ _limit: 20, _page: 1, is_active: true }));
  }, []);

  const { logout } = useAuth();

  useEffect(() => {
    setupAxiosInterceptors(logout);
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(fetchUser());
      dispatch(fetchCart(token));
    }
  }, [dispatch, logout]);
  return (
    <div className="w-full gap-4">
      <HomeBanner />
      <ListCategory />
      <TopProduct />
      <Product />
    </div>
  );
}
