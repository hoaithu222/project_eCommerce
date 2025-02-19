import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

import OrderShopItem from "./OrderShopItem";
import OrderActionButtons from "./OrderActionButtons";
import { formatPriceVND } from "../utils/formatPriceVND";
import { STATUS_COLORS } from "../utils/orderConstants";

export default function OrderCard({
  order,
  showActionButtons,
  toggleActionButtons,
  handleStatusUpdate,
}) {
  const lastHistoryEntry = order.order_history[order.order_history.length - 1];

  return (
    <div className="bg-white mb-3 rounded-md shadow-md">
      <div className="flex items-center gap-3 p-3 bg-pink-50">
        {order.user.avatar_url ? (
          <div className="w-20 h-20 rounded-full bg-sky-200 p-0.5 overflow-hidden">
            <img
              src={order.user.avatar_url}
              alt={order.user.username}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        ) : (
          <FaRegUserCircle
            className="text-center text-sky-200 w-24 h-24"
            size={40}
          />
        )}
        <p className="text-xl font-semibold">{order.user.username}</p>
        <OrderActionButtons
          order={order}
          showActionButtons={showActionButtons}
          toggleActionButtons={toggleActionButtons}
          handleStatusUpdate={handleStatusUpdate}
        />
      </div>

      <div className="p-3">
        {order.order_items.map((item) => (
          <OrderShopItem key={item.id} item={item} />
        ))}
      </div>

      <div className="p-4 mt-3 flex items-center justify-between">
        {lastHistoryEntry && (
          <p className={STATUS_COLORS[lastHistoryEntry.status]}>
            {lastHistoryEntry.description}
          </p>
        )}
        <div className="ml-auto flex gap-2 items-center">
          <p className="text-xl">Thành tiền:</p>
          <strong className="text-red-500 text-xl">
            {formatPriceVND(+order.total_amount)}
          </strong>
        </div>
      </div>
    </div>
  );
}
