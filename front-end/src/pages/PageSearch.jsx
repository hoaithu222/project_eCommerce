import { useLocation } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import ProductItem from "../components/ProductItem";
import { MdOutlineLightbulb } from "react-icons/md";
import { useEffect, useState, useCallback } from "react";

export default function PageSearch() {
  const { search } = useLocation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get decoded search term
  const getSearchTerm = () => {
    const searchParams = new URLSearchParams(search);
    const query = searchParams.get("q");
    return query ? decodeURIComponent(query) : "";
  };

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${SummaryApi.getProduct.url}${search}`, {
        method: SummaryApi.getProduct.method,
      });
      const result = await response.json();

      if (result.success) {
        setProducts(result.data);
      } else {
        console.error("Failed to fetch products:", result);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timeoutId = setTimeout(fetchData, 1000);
    return () => clearTimeout(timeoutId);
  }, [fetchData]);

  const searchTerm = getSearchTerm();

  return (
    <div className="container mx-auto px-4 py-2 lg:py-4">
      <div className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-400 to-pink-400 p-1 md:p-3 lg:p-4 text-white flex items-center gap-2 rounded-lg">
          <MdOutlineLightbulb className="text-xl md:text-2xl lg:text-3xl" />
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold">
            {searchTerm
              ? `Kết quả tìm kiếm: "${searchTerm}"`
              : "Kết quả tìm kiếm"}
          </h3>
        </div>

        {isLoading ? (
          <div className="text-center py-4">Đang tải...</div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 lg:gap-4 mt-2 lg:mt-4">
            {products?.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
