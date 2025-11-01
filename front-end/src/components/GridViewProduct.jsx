import React, { useState } from "react";
import { FcCancel, FcCheckmark } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { formatPriceVND } from "../utils/formatPriceVND";
import { useDispatch } from "react-redux";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-toastify";
import Loading from "../pages/Loading";

const GridViewProduct = ({ data, fetchData }) => {
  const [dataForm, setDataForm] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleUpdate = async (product) => {
    const token = localStorage.getItem("accessToken");
    setLoading(true);
    try {
      const updatedData = { ...product, is_active: !product.is_active };
      setDataForm(updatedData);
      const response = await fetch(
        `${SummaryApi.updateProduct.url}/${product.id}`,
        {
          method: SummaryApi.updateProduct.method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        },
      );
      const dataResponse = await response.json();
      if (dataResponse.success) {
        toast.success("Đã cập nhật trạng thái thành công");
        dispatch({ type: "update_product", payload: dataResponse.data });
        fetchData();
      } else {
        toast.error(dataResponse.message || "Cập nhật trạng thái thất bại");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái");
    }
    setLoading(false);
  };
  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data?.map((product) => (
        <div
          key={product.id}
          className="overflow-hidden bg-white rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-xl"
        >
          <div className="overflow-hidden relative group aspect-square">
            <img
              src={
                product?.product_images?.[0]?.image_url || "/default-image.jpg"
              }
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 pb-2 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
          </div>

          <div className="p-4 space-y-4">
            {/* Product Info */}
            <div>
              <h3 className="mb-1 text-lg font-semibold text-black hover:text-blue-400 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">ID Sản phẩm: {product.id}</p>
            </div>

            {/* Price and Stock */}
            <div className="flex justify-between items-center">
              <div className="font-bold text-rose-600">
                {formatPriceVND(+product.base_price)}
              </div>
              <div className="text-gray-600">Kho: {product.stock_quantity}</div>
            </div>

            {/* Status */}
            <div>
              {product.is_active ? (
                <p className="text-sm text-green-300">Đang hiển thị</p>
              ) : (
                <p className="text-sm text-red-400">Đã ẩn</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 items-center pt-2">
              {product.is_active ? (
                <button
                  className="flex flex-1 gap-2 items-center px-3 py-1 text-sm text-white bg-red-400 rounded-xl shadow-md transition-all duration-300 hover:bg-red-500 hover:shadow-xl group"
                  onClick={() => handleUpdate(product)}
                >
                  <FcCancel className="text-xl transition-transform duration-300 transform group-hover:rotate-12" />
                  <span>Ẩn</span>
                </button>
              ) : (
                <button
                  className="flex flex-1 gap-2 items-center px-3 py-1 text-sm text-white bg-green-400 rounded-xl shadow-md transition-all duration-300 hover:bg-green-500 hover:shadow-xl group"
                  onClick={() => handleUpdate(product)}
                >
                  <FcCheckmark className="text-xl transition-transform duration-300 transform group-hover:scale-110" />
                  <span>Kích hoạt</span>
                </button>
              )}
              <Link
                to={`/shop-management/edit-product/${product.id}`}
                className="flex flex-1 gap-2 items-center px-3 py-1 text-sm text-white bg-indigo-400 rounded-xl shadow-md transition-all duration-300 hover:bg-indigo-500 hover:shadow-xl group"
              >
                <CiEdit className="text-xl transition-transform duration-300 transform group-hover:scale-110" />
                <span>Sửa</span>
              </Link>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
};

export default GridViewProduct;
