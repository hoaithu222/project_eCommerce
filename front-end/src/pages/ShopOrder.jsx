import { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import { FaBoxOpen } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { statusOptions } from "../utils/statusOptions";
import Loading from "./Loading";
import { formatPriceVND } from "../utils/formatPriceVND";
import OrderShopItem from "../components/OrderShopItem";
import StatusFilter from "../components/StatusFilter";

const STATUS_FLOW = {
  pending: "processing",
  processing: "shipped",
  shipped: {
    success: "delivered",
    cancel: "cancelled",
  },
  delivered: "completed",
  cancelled: "cancelled",
};

const STATUS_COLORS = {
  pending: "text-yellow-500",
  processing: "text-blue-500",
  shipped: "text-purple-500",
  delivered: "text-green-500",
  cancelled: "text-red-500",
};

const ACTION_BUTTON_TEXT = {
  pending: "Xác nhận đã chuẩn bị hàng xong",
  processing: "Xác nhận đã được vận chuyển",
  shipped: {
    success: "Xác nhận đã ship thành công",
    cancel: "Đơn hàng đã bị hủy",
  },
};

export default function ShopOrder() {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showActionButtons, setShowActionButtons] = useState({});

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const filteredStatuses =
        selectedStatus === "all" ? Object.keys(STATUS_FLOW) : [selectedStatus];

      const response = await fetch(SummaryApi.orderShop.url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredStatuses),
      });

      const result = await response.json();
      if (result.success) {
        setOrders(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (
    orderId,
    currentStatus,
    action = "success",
  ) => {
    if (currentStatus === "completed" || currentStatus === "cancelled") {
      return;
    }

    setIsUpdating(true);
    try {
      const nextStatus =
        currentStatus === "shipped"
          ? STATUS_FLOW[currentStatus][action]
          : STATUS_FLOW[currentStatus];

      const response = await fetch(`${SummaryApi.updateOrder.url}/${orderId}`, {
        method: SummaryApi.updateOrder.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      const result = await response.json();
      if (result.success) {
        await fetchOrders();
        setShowActionButtons((prev) => ({
          ...prev,
          [orderId]: false,
        }));
      }
    } catch (error) {
      console.error("Failed to update order:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedStatus]);

  const toggleActionButtons = (orderId) => {
    setShowActionButtons((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const renderActionButtons = (order) => {
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
  };

  const renderOrderCard = (order) => {
    const lastHistoryEntry =
      order.order_history[order.order_history.length - 1];

    return (
      <div key={order.id} className="bg-white mb-3 rounded-md shadow-md">
        <div className="flex items-center gap-3 p-3 bg-pink-50">
          <div className="w-20 h-20 rounded-full bg-sky-200 p-0.5 overflow-hidden">
            <img
              src={order.user.avatar_url}
              alt={order.user.username}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <p className="text-xl font-semibold">{order.user.username}</p>
          {renderActionButtons(order)}
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
  };

  return (
    <div className="p-5 max-h-[96vh] overflow-y-auto hidden-scrollbar">
      <div className="w-full max-w-6xl mx-auto">
        <StatusFilter selected={selectedStatus} onSelect={setSelectedStatus} />
        <div className="mt-4">
          {orders.length === 0 ? (
            <div className="flex items-center min-h-screen justify-center mx-auto p-3">
              <div className="flex items-center justify-center flex-col border-dotted bg-white shadow-xl border border-pink-200 w-[50%] rounded-lg p-5">
                <FaBoxOpen className="text-blue-200 text-5xl" />
                <p className="text-rose-400">
                  Hiện tại bạn chưa có đơn hàng nào
                </p>
              </div>
            </div>
          ) : (
            orders.map(renderOrderCard)
          )}
        </div>
        {(isLoading || isUpdating) && <Loading />}
      </div>
    </div>
  );
}
