import React from "react";
import { ACTION_BUTTON_TEXT } from "../utils/orderConstants";

export default function OrderActionButtons({
  order,
  showActionButtons,
  toggleActionButtons,
  handleStatusUpdate,
}) {
  const isOrderFinalized =
    order.status === "cancelled" || order.status === "completed";

  if (isOrderFinalized) {
    return (
      <button
        className="bg-white py-1.5 px-3 rounded-md border border-gray-300 text-gray-400 cursor-not-allowed"
        disabled
      >
        {order.status === "cancelled" ? "Đã hủy" : "Hoàn thành"}
      </button>
    );
  }

  if (order.status === "shipped") {
    return (
      <div className="relative ml-auto">
        <button
          className="bg-white py-1.5 px-3 rounded-md border border-gray-300 text-red-300 hover:bg-red-50"
          onClick={() => toggleActionButtons(order.id)}
        >
          Cập nhật trạng thái
        </button>

        {showActionButtons[order.id] && (
          <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <button
              className="w-full px-4 py-2 text-left hover:bg-green-50 text-green-600"
              onClick={() =>
                handleStatusUpdate(order.id, order.status, "success")
              }
            >
              {ACTION_BUTTON_TEXT.shipped.success}
            </button>
            <button
              className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600"
              onClick={() =>
                handleStatusUpdate(order.id, order.status, "cancel")
              }
            >
              {ACTION_BUTTON_TEXT.shipped.cancel}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      className="bg-white py-1.5 px-3 rounded-md border border-gray-300 ml-auto text-red-300 hover:bg-red-50"
      onClick={() => handleStatusUpdate(order.id, order.status)}
    >
      {ACTION_BUTTON_TEXT[order.status]}
    </button>
  );
}
