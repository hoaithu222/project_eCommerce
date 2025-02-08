import { useParams } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import { useEffect, useState } from "react";
import ProductGeneralInfo from "../components/ProductGeneralInfo";
import ProductShopInfo from "../components/ProductShopInfo";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState();
  const fetchDetailProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SummaryApi.getProduct.url}/${id}`, {
        method: SummaryApi.getProduct.method,
      });
      const result = await response.json();
      if (result.success) {
        setProduct(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDetailProduct();
  }, []);
  return (
    <div className="mx-auto  container my-4">
      <div>
        <ProductGeneralInfo data={product} />
        <ProductShopInfo data={product} />
      </div>
    </div>
  );
}
