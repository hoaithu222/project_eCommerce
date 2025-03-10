import React from "react";
import { PiStarThin } from "react-icons/pi";
import { BsFillStarFill } from "react-icons/bs";
import { formatPriceVND } from "../utils/formatPriceVND";
import { useNavigate } from "react-router-dom";

export default function ProductItem({ product, loading }) {
  const navigate = useNavigate();
  if (loading) {
    return (
      <div className="border border-gray-300 rounded-lg overflow-hidden p-3 animate-pulse">
        <div className="w-full h-64 lg:h-72 bg-gray-200"></div>
        <div className="p-2 lg:p-4 bg-gray-300 my-2 w-3/4"></div>
        <div className="p-2 lg:p-4 bg-gray-300 my-2 w-1/2"></div>
        <div className="p-2 lg:p-4 bg-gray-300 my-2 w-1/4"></div>
      </div>
    );
  }
  return (
    <div
      className="group border border-gray-300 rounded-lg overflow-hidden relative transition-all duration-300 hover:shadow-lg"
      onClick={() => {
        navigate(`/product/${product.id}`);
      }}
    >
      <div className="w-full h-48  md:h-72 overflow-hidden relative">
        <img
          src={product.product_images[0]?.image_url || "image.png"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-1.5 lg:p-3 space-x-1 lg:space-y-2">
        <h3 className="line-clamp-2 text-sm sm:text-lg lg:text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <strong className="text-rose-500 text-sm sm:text-lg lg:text-xl font-bold">
            {formatPriceVND(+product.base_price)}
          </strong>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <BsFillStarFill className="text-yellow-500" />
            <span className="text-xs lg:text-sm">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-xs lg:text-sm">
            Đã bán {+product.sales_count}
          </span>
        </div>
      </div>
      <span className="text-red-600 bg-pink-200 rounded-md absolute top-0 right-0 p-1 font-medium text-xs lg:text-sm">
        -50%
      </span>
    </div>
  );
}
