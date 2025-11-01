import { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa6";
import SummaryApi from "../common/SummaryApi";

import StatusFilter from "../components/StatusFilter";
import OrderCard from "../components/OrderCard";

import Loading from "./Loading";
import { STATUS_FLOW } from "../utils/orderConstants";

export default function ShopOrder() {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showActionButtons, setShowActionButtons] = useState({});
  const [statusCounts, setStatusCounts] = useState({});

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
      setStatusCounts(result.statusCounts);

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

  const toggleActionButtons = (orderId) => {
    setShowActionButtons((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  useEffect(() => {
    fetchOrders();
  }, [selectedStatus]);

  return (
    <div className="p-5 max-h-[96vh] overflow-y-auto hidden-scrollbar">
      <div className="mx-auto w-full max-w-6xl">
        <StatusFilter
          selected={selectedStatus}
          onSelect={setSelectedStatus}
          statusCounts={statusCounts}
        />
        <div className="mt-4">
          {orders.length === 0 ? (
            <div className="flex justify-center items-center p-3 mx-auto min-h-screen">
              <div className="flex items-center justify-center flex-col border-dotted bg-white shadow-xl border border-blue-200 w-[50%] rounded-lg p-5">
                <FaBoxOpen className="text-5xl text-blue-200" />
                <p className="text-rose-400">
                  Hiện tại bạn chưa có đơn hàng nào
                </p>
              </div>
            </div>
          ) : (
            orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                showActionButtons={showActionButtons}
                toggleActionButtons={toggleActionButtons}
                handleStatusUpdate={handleStatusUpdate}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
}
