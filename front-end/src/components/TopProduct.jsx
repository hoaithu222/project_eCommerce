import { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import colors from "../style/colors";
import { useNavigate } from "react-router-dom";
import LoadingSkeletonProduct from "./LoadingSkeletonProduct";

export default function TopProduct() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${SummaryApi.getProduct.url}?&_limit=5&_sort=sales_count&_order=desc`,
        {
          method: SummaryApi.getProduct.method,
        },
      );
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container mx-auto p-3">
      <div className="bg-white shadow-xl rounded-md p-2 md:p-3 lg:p-5">
        <div className="flex items-center">
          <h2
            className={`${colors.textColors.gradientLimeToPink} text-lg md:text-3xl lg:text-4xl font-semibold`}
          >
            Top các sản phẩm bán chạy nhất
          </h2>
        </div>
        <div className="mt-3 sm:mt-6 space-y-2 md:space-y-4 lg:space-y-6">
          {data.map((product, index) => (
            <div
              className="flex gap-2 md:gap-3 lg:gap-4 items-center hover:bg-slate-50"
              key={`${product}-${index}`}
              onClick={() => handleClick(product.id)}
            >
              <div
                className={`flex items-center justify-center w-5 h-5 rounded-full ${colors.gradients.frostToFlame} `}
              >
                <p className={` text-white text-xs sm:text-base `}>{index}</p>
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 border-2 border-gray-200 rounded-md">
                <img
                  src={product?.product_images[0]?.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-x-2 space-y-2 sm:space-x-3 sm:space-y-3 lg:space-x-4 lg:space-y-4 w-[70%]">
                <p className="text-xs sm:text-base md:text-lg lg:text-xl hover:text-sky-200 line-clamp-1">
                  {product.name}
                </p>
                <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
                  <p
                    className={`text-white ${colors.gradients.frostToFlame} px-1.5 py-0.5  lg:px-2 lg:py-0.5 rounded-full text-xs sm:text-base  `}
                  >
                    Đã bán {product.sales_count}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {loading && <LoadingSkeletonProduct />}
    </div>
  );
}
