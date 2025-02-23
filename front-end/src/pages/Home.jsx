import { useEffect } from "react";
import HomeBanner from "../components/HomeBanner";
import ListCategory from "../components/ListCategory";
import Product from "../components/Product";
import { useDispatch } from "react-redux";
import { fetchProduct } from "../store/actions/fetchProduct";
import TopProduct from "../components/TopProduct";

export default function Home() {
  const dispath = useDispatch();
  useEffect(() => {
    dispath(fetchProduct({ _limit: 20, _page: 1, is_active: true }));
  }, []);
  return (
    <div className="w-full gap-4">
      <HomeBanner />
      <ListCategory />
      <TopProduct />
      <Product />
    </div>
  );
}
