import { useEffect, useState, useCallback } from "react";
import { formatPriceVND } from "../utils/formatPriceVND";
import SummaryApi from "../common/SummaryApi";
import { MdOutlineDeleteForever } from "react-icons/md";
import ConfirmBox from "./ConfirmBox";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

export default function CartItemProduct({
  data,
  onCartUpdate,
  isSelected,
  onSelectItem,
}) {
  const [product, setProduct] = useState({});
  const [productVariant, setProductVariant] = useState({});
  const [openConfirm, setOpenConfirm] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.cart_id) {
      setProduct(data.product || {});
      setQuantity(data.quantity || 1);

      if (data.product_variant) {
        setProductVariant(data.product_variant);
        setStock(data.product_variant.stock || 0);
      } else {
        setStock(data.product?.stock_quantity || 0);
      }
    }
  }, [data]);

  const debouncedUpdateQuantity = useCallback(
    debounce(async (newQuantity) => {
      if (isUpdating) return;

      setIsUpdating(true);
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(
          `${SummaryApi.updateCart.url}/${data.id}`,
          {
            method: SummaryApi.updateCart.method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ quantity: newQuantity }),
          },
        );
        const result = await response.json();
        if (result.success) {
          onCartUpdate();
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật số lượng:", error.message);
        setQuantity(data.quantity);
      } finally {
        setIsUpdating(false);
      }
    }, 500),
    [data.id, isUpdating],
  );

  const deleteItem = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${SummaryApi.deleteCart.url}/${data.id}`, {
        method: SummaryApi.deleteCart.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setOpenConfirm(false);
        onCartUpdate();
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error.message);
    }
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    if (quantity < stock && !isUpdating) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      debouncedUpdateQuantity(newQuantity);
    }
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (quantity > 1 && !isUpdating) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      debouncedUpdateQuantity(newQuantity);
    } else if (quantity === 1) {
      setOpenConfirm(true);
    }
  };
  const handleClick = (e) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };
  const totalPrice = data.price_at_time * quantity;

  return (
    <div className="border-b border-gray-100 p-4 hover:bg-sky-50">
      <div className="flex items-center space-x-6" onClick={handleClick}>
        <div
          className="items-center h-full  py-8"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelectItem(data.id)}
            className="w-5 h-5 rounded border-gray-300 text-pink-500 focus:ring-pink-400 cursor-pointer "
          />
        </div>

        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
          {product.id && (
            <img
              src={product?.product_images?.[0]?.image_url || "img.jpg"}
              alt={product.name || "Sản phẩm"}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-medium text-gray-900 line-clamp-2">
            {product.name}
          </h2>

          {Object.keys(productVariant).length > 0 && (
            <div className="mt-1 text-sm text-gray-500">
              <p className="font-medium">Phân loại hàng:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(productVariant.combination || {}).map(
                  ([key, value]) => (
                    <span
                      key={key}
                      className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100"
                    >
                      {key}: {value}
                    </span>
                  ),
                )}
              </div>
            </div>
          )}
        </div>

        <div className="text-lg font-medium text-gray-900">
          {formatPriceVND(+data.price_at_time)}
        </div>

        <div className="flex items-center space-x-2 border rounded-lg px-2 py-1">
          <button
            type="button"
            className={`w-8 h-8 flex items-center justify-center transition-colors
              ${
                isUpdating
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:text-pink-500"
              }`}
            onClick={handleDecrement}
            disabled={isUpdating}
          >
            -
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            type="button"
            className={`w-8 h-8 flex items-center justify-center transition-colors
              ${
                isUpdating
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:text-pink-500"
              }`}
            onClick={handleIncrement}
            disabled={isUpdating}
          >
            +
          </button>
        </div>

        <div className="text-lg font-medium text-pink-600">
          {formatPriceVND(totalPrice)}
        </div>

        <button
          type="button"
          onClick={(e) => {
            setOpenConfirm(true);
            e.stopPropagation();
          }}
          className="flex items-center space-x-1 text-pink-300 hover:text-pink-500 transition-colors"
        >
          <span>Xóa</span>
          <MdOutlineDeleteForever className="w-5 h-5" />
        </button>
      </div>

      {openConfirm && (
        <ConfirmBox
          close={() => setOpenConfirm(false)}
          cancel={() => setOpenConfirm(false)}
          confirm={deleteItem}
        />
      )}
    </div>
  );
}
