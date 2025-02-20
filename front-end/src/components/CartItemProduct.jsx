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
    <div className="border-b border-gray-100 p-2 hover:bg-sky-50">
      {/* Main container with improved responsive layout */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        {/* Checkbox and Image container */}
        <div className="flex items-center gap-4">
          <div className="py-2" onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelectItem(data.id)}
              className="w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-400 cursor-pointer"
            />
          </div>

          <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
            {product.id && (
              <img
                src={product?.product_images?.[0]?.image_url || "img.jpg"}
                alt={product.name || "Product"}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Product details container */}
        <div className="flex-1 space-y-2">
          <h2 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2">
            {product.name}
          </h2>

          {Object.keys(productVariant).length > 0 && (
            <div className="text-sm text-gray-500">
              <p className="text-xs font-medium mb-1">Variants:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(productVariant.combination || {}).map(
                  ([key, value]) => (
                    <span
                      key={key}
                      className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 text-xs"
                    >
                      {key}: {value}
                    </span>
                  ),
                )}
              </div>
            </div>
          )}
        </div>

        {/* Price and quantity controls */}
        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-2">
          <div className="text-sm sm:text-base font-medium text-gray-900">
            {formatPriceVND(+data.price_at_time)}
          </div>

          <div className="flex items-center border rounded-lg px-2 py-1">
            <button
              type="button"
              className={`w-6 h-6 flex items-center justify-center transition-colors
                ${isUpdating ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-pink-500"}`}
              onClick={handleDecrement}
              disabled={isUpdating}
            >
              -
            </button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <button
              type="button"
              className={`w-6 h-6 flex items-center justify-center transition-colors
                ${isUpdating ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-pink-500"}`}
              onClick={handleIncrement}
              disabled={isUpdating}
            >
              +
            </button>
          </div>

          <div className="text-sm sm:text-base font-medium text-pink-600">
            {formatPriceVND(totalPrice)}
          </div>

          <button
            type="button"
            onClick={(e) => {
              setOpenConfirm(true);
              e.stopPropagation();
            }}
            className="flex items-center gap-1 text-pink-300 hover:text-pink-500 transition-colors"
          >
            <span className="text-sm">Delete</span>
            <MdOutlineDeleteForever className="w-5 h-5" />
          </button>
        </div>
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
