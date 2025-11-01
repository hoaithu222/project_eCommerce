import { useEffect, useState } from "react";
import colors from "../../style/colors";
import SummaryApi from "../../common/SummaryApi";

export default function TopProduct() {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.getBestSellingProducts.url, {
        method: SummaryApi.getBestSellingProducts.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setProduct(result.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="shadow-xl rounded-2xl p-6 bg-white hover:shadow-2xl transition-all duration-300">
      <h2
        className={`${colors.textColors.gradientLimeToBlue} text-2xl font-bold mb-6`}
      >
        Top Sản Phẩm Bán Chạy
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-lime-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {products.map((item, index) => (
            <div
              key={`${item.product_id}-${index}`}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-lime-50 hover:to-blue-50 transition-all duration-300 group"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-lime-500 to-blue-500 text-white flex items-center justify-center font-bold shadow-lg">
                {index + 1}
              </div>

              <div className="relative w-24 h-24 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300 shadow-lg">
                {item.product.id && (
                  <img
                    src={item.product.product_images[0].image_url}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-gray-800 line-clamp-1 group-hover:text-lime-600 transition-colors duration-300">
                  {item.product.name}
                </h3>
                <div className="mt-2 flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-lime-500 to-blue-500 text-white text-sm font-medium shadow-md">
                    Đã bán {item._sum.quantity}
                  </div>
                  <div className="text-sm text-gray-500">trong tháng</div>
                </div>
              </div>

              <div className="w-6 h-6 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                →
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Chưa có sản phẩm bán chạy</p>
        </div>
      )}
    </div>
  );
}
