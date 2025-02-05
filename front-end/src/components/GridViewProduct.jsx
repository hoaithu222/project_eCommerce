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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {data?.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative group aspect-square overflow-hidden">
            <img
              src={
                product?.product_images?.[0]?.image_url || "/default-image.jpg"
              }
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 pb-2" />
          </div>

          <div className="p-4 space-y-4">
            {/* Product Info */}
            <div>
              <h3 className="font-semibold text-lg text-black hover:text-blue-400 line-clamp-2 mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">ID Sản phẩm: {product.id}</p>
            </div>

            {/* Price and Stock */}
            <div className="flex justify-between items-center">
              <div className="text-rose-600 font-bold">
                {formatPriceVND(+product.base_price)}
              </div>
              <div className="text-gray-600">Kho: {product.stock_quantity}</div>
            </div>

            {/* Status */}
            <div>
              {product.is_active ? (
                <p className="text-green-300 text-sm">Đang hiển thị</p>
              ) : (
                <p className="text-red-400 text-sm">Đã ẩn</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              {product.is_active ? (
                <button
                  className="flex items-center gap-2 px-3 py-1 bg-red-400 text-white rounded-xl hover:bg-red-500 transition-all duration-300 text-sm shadow-md hover:shadow-xl group flex-1"
                  onClick={() => handleUpdate(product)}
                >
                  <FcCancel className="text-xl transform group-hover:rotate-12 transition-transform duration-300" />
                  <span>Ẩn</span>
                </button>
              ) : (
                <button
                  className="flex items-center gap-2 px-3 py-1 bg-green-400 text-white rounded-xl hover:bg-green-500 transition-all duration-300 text-sm shadow-md hover:shadow-xl group flex-1"
                  onClick={() => handleUpdate(product)}
                >
                  <FcCheckmark className="text-xl transform group-hover:scale-110 transition-transform duration-300" />
                  <span>Kích hoạt</span>
                </button>
              )}
              <Link
                to={`/shop-management/edit-product/${product.id}`}
                className="flex items-center gap-2 px-3 py-1 bg-indigo-400 text-white rounded-xl hover:bg-indigo-500 transition-all duration-300 text-sm shadow-md hover:shadow-xl group flex-1"
              >
                <CiEdit className="text-xl transform group-hover:scale-110 transition-transform duration-300" />
                <span>Sửa</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
      {loading && <Loading />}
    </div>
  );
};

export default GridViewProduct;
