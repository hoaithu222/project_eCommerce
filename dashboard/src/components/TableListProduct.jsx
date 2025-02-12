import React, { useState } from "react";
import { FcCancel, FcCheckmark } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { ChevronDown, ChevronUp } from "lucide-react";
import { formatPriceVND } from "../utils/formatPriceVND";
import { Link } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Loading from "../pages/Loading";

export default function TableListProduct({ data, fetchData }) {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [dataForm, setDataForm] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const toggleRow = (productId) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };
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
        }
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
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-400 to-pink-400">
            <tr>
              <th className="w-8 p-4"></th>
              <th className="p-4 text-left text-white font-semibold">Image</th>
              <th className="p-4 text-left text-white font-semibold">
                Tên sản phẩm
              </th>
              <th className="p-4 text-left text-white font-semibold">Giá</th>
              <th className="p-4 text-left text-white font-semibold">
                Kho hàng
              </th>
              <th className="p-4 text-left text-white font-semibold">
                Trạng thái
              </th>
              <th className="p-4 text-left text-white font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.map((product) => (
              <React.Fragment key={product.id}>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <button
                      onClick={() => toggleRow(product.id)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      {expandedRows.has(product.id) ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                  <td className="p-4 text-left text-gray-400 font-semibold">
                    <div className="relative group w-20 h-20 rounded-lg overflow-hidden border-2">
                      <img
                        src={
                          product?.product_images?.[0]?.image_url ||
                          "/default-image.jpg"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
                    </div>
                  </td>
                  <td className="p-4 w-[30%]">
                    <p className="text-black font-semibold hover:text-blue-400 line-clamp-1">
                      {product.name}
                    </p>
                    <p>ID Sản phẩm: {product.id}</p>
                  </td>
                  <td className="text-left">
                    {formatPriceVND(+product.base_price)}
                  </td>
                  <td className="text-center">{product.stock_quantity}</td>
                  <td>
                    {product.is_active ? (
                      <p className="text-green-300 text-sm">Đang hiển thị</p>
                    ) : (
                      <p className="text-red-400 text-sm">Đã ẩn</p>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center gap-4">
                      {product.is_active ? (
                        <button
                          className="flex items-center gap-2 px-3 py-1 bg-red-400 text-white rounded-xl hover:bg-red-500 transition-all duration-300 text-sm shadow-md hover:shadow-xl group"
                          onClick={() => handleUpdate(product)}
                        >
                          <FcCancel className="text-xl transform group-hover:rotate-12 transition-transform duration-300" />
                          <span>Ẩn</span>
                        </button>
                      ) : (
                        <button
                          className="flex items-center gap-2 px-3 py-1 bg-green-400 text-white rounded-xl hover:bg-green-500 transition-all duration-300 text-sm shadow-md hover:shadow-xl group"
                          onClick={() => handleUpdate(product)}
                        >
                          <FcCheckmark className="text-xl transform group-hover:scale-110 transition-transform duration-300" />
                          <span>Kích hoạt</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {expandedRows.has(product.id) && (
                  <tr>
                    <td colSpan="7" className="bg-gray-50 p-4">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-700">
                          Biến thể sản phẩm
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                          {product.product_variants?.map((variant) => (
                            <div
                              key={variant.id}
                              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                            >
                              <div className="grid grid-cols-5 gap-4">
                                <div className="space-y-1">
                                  <p className="text-sm text-gray-500">
                                    Mã SKU
                                  </p>
                                  <p className="font-medium">{variant.sku}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-gray-500">
                                    Thuộc tính
                                  </p>
                                  <div className="flex gap-2 flex-wrap">
                                    {Object.entries(variant.combination).map(
                                      ([key, value]) => (
                                        <span
                                          key={key}
                                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
                                        >
                                          {key}: {value}
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-gray-500">Giá</p>
                                  <p className="font-medium">
                                    {formatPriceVND(+variant.price)}
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-gray-500">Kho</p>
                                  <p className="font-medium">{variant.stock}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm text-gray-500">
                                    Hình ảnh
                                  </p>
                                  {variant.image_url ? (
                                    <img
                                      src={variant.image_url}
                                      alt={`${product.name} - ${variant.sku}`}
                                      className="w-16 h-16 object-cover rounded-lg"
                                    />
                                  ) : (
                                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                      <span className="text-gray-400 text-xs">
                                        No image
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {loading && <Loading />}
    </div>
  );
}
