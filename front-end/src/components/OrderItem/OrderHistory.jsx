import { useEffect, useState } from "react";
import { MdLocalShipping, MdOutlineLibraryBooks } from "react-icons/md";
import { formatDate } from "../../utils/formatDate";
import { FaClockRotateLeft, FaBan } from "react-icons/fa6";
import { TiDownload } from "react-icons/ti";
import { BsStarFill } from "react-icons/bs";

export default function OrderHistory({ orderItem }) {
  const [history, setHistory] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("");
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    if (orderItem?.order_history) {
      setHistory(orderItem.order_history);

      const lastStatus =
        orderItem.order_history[orderItem.order_history.length - 1]?.status;
      setCurrentStatus(lastStatus);
      setIsCancelled(lastStatus === "cancelled");
    }
  }, [orderItem]);

  const getTimelineStyles = (status) => {
    const statusOrder = {
      pending: 1,
      processing: 2,
      shipped: 3,
      delivering: 4,
      delivered: 5,
      cancelled: 5,
    };

    const currentStep = statusOrder[currentStatus] || 0;
    const stepNumber = statusOrder[status] || 0;

    const isActive = stepNumber <= currentStep;

    if (isCancelled && status !== "cancelled") {
      return {
        icon: `text-${stepNumber < currentStep ? "blue-500" : "gray-300"}`,
        border: `border-${stepNumber < currentStep ? "blue-500" : "gray-300"}`,
        line: `bg-${stepNumber < currentStep ? "blue-500" : "gray-300"}`,
      };
    }

    // Nếu là trạng thái cancelled, đổi màu thành đỏ
    if (status === "cancelled" && isCancelled) {
      return {
        icon: "text-red-500 text-4xl lg:text-6xl",
        border: "border-red-500 text-4xl lg:text-6xl",
        line: "bg-red-500 text-4xl lg:text-6xl",
      };
    }

    return {
      icon: `text-${isActive ? "blue-500" : "gray-300"}`,
      border: `border-${isActive ? "blue-500" : "gray-300"}`,
      line: `bg-${isActive ? "blue-500" : "gray-300"}`,
    };
  };

  const getHistoryDate = (status) => {
    const historyItem = history.find((item) => item.status === status);
    return historyItem ? formatDate(historyItem.created_at) : "";
  };

  const renderFinalStep = () => {
    if (isCancelled) {
      return (
        <div className="flex flex-col">
          <div className="flex items-center">
            <p
              className={`p-1 sm:p-2 lg:p-3 rounded-full border-4 ${getTimelineStyles("cancelled").border}`}
            >
              <FaBan
                className={getTimelineStyles("cancelled")
                  .icon`text-2xl lg:text-4xl`}
              />
            </p>
          </div>
          <p className="w-[90%] font-semibold text-red-500">
            Đơn hàng đã bị hủy
          </p>
          <p className="text-gray">{getHistoryDate("cancelled")}</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col">
        <div className="flex items-center">
          <p
            className={` p-1 sm:p-2 lg:p-3 rounded-full border-4 ${getTimelineStyles("delivered").border}`}
          >
            <BsStarFill className={getTimelineStyles("delivered").icon} />
          </p>
        </div>
        <p className="w-[90%] font-semibold text-xs sm:text-sm md:text-base">
          Giao hàng thành công
        </p>
        <p className="text-gray hidden md:block text-xs sm:text-sm md:text-base">
          {getHistoryDate("delivered")}
        </p>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center mx-auto p-2">
      <div className="flex mt-5 ">
        <div className="flex flex-col">
          <div className="flex items-center">
            <p
              className={`p-1 sm:p-2 lg:p-3 rounded-full border-4 ${getTimelineStyles("pending").border}`}
            >
              <MdOutlineLibraryBooks
                className={getTimelineStyles("pending").icon}
              />
            </p>
            <p
              className={`xs:10 w-12 sm:w-24 md:w-28 lg:w-24 xl:w-36  h-1 ${getTimelineStyles("pending").line}`}
            ></p>
          </div>
          <p className="w-[90%] font-semibold text-xs sm:text-sm md:text-base">
            Đơn hàng đang chờ xử lý
          </p>
          <p className="text-gray hidden md:block text-xs sm:text-sm md:text-base">
            {getHistoryDate("pending")}
          </p>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center">
            <p
              className={`p-1 sm:p-2 lg:p-3 rounded-full border-4 ${getTimelineStyles("processing").border}`}
            >
              <FaClockRotateLeft
                className={getTimelineStyles("processing").icon}
              />
            </p>
            <p
              className={`xs:10 w-12 sm:w-24 md:w-28 lg:w-24 xl:w-36  h-1 ${getTimelineStyles("processing").line}`}
            ></p>
          </div>
          <p className="w-[90%] font-semibold text-xs sm:text-sm md:text-base">
            Đơn hàng đang được xử lý
          </p>
          <p className="text-gray hidden md:block text-xs sm:text-sm md:text-base">
            {getHistoryDate("processing")}
          </p>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center">
            <p
              className={`p-1 sm:p-2 lg:p-3 rounded-full border-4 ${getTimelineStyles("shipped").border}`}
            >
              <TiDownload className={getTimelineStyles("shipped").icon} />
            </p>
            <p
              className={` w-16 sm:w-24 md:w-28 lg:w-24 xl:w-36  h-1 ${getTimelineStyles("shipped").line}`}
            ></p>
          </div>
          <p className="w-[90%] font-semibold text-xs sm:text-sm md:text-base ">
            Đơn hàng đã được gửi đi
          </p>
          <p className="text-gray hidden md:block text-xs sm:text-sm md:text-base">
            {getHistoryDate("shipped")}
          </p>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center">
            <p
              className={`p-1 sm:p-2 lg:p-3 rounded-full border-4 ${getTimelineStyles("delivering").border}`}
            >
              <MdLocalShipping
                className={getTimelineStyles("delivering").icon}
              />
            </p>
            <p
              className={`xs:10 w-12 sm:w-28 md:w-28 lg:w-24 xl:w-36 h-1 ${getTimelineStyles("delivering").line}`}
            ></p>
          </div>
          <p className="w-[90%] font-semibold text-xs sm:text-sm md:text-base">
            Đơn hàng đang giao hàng
          </p>
          <p className="text-gray hidden md:block text-xs sm:text-sm md:text-base">
            {getHistoryDate("delivering")}
          </p>
        </div>

        {renderFinalStep()}
      </div>
    </div>
  );
}
