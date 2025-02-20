import { useEffect, useState } from "react";
import { formatPriceVND } from "../../utils/formatPriceVND";
import { Link, useNavigate } from "react-router-dom";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import colors from "../../style/colors";

export default function OrderInfo({ orderItem }) {
  const [order, setOrder] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (orderItem.id) {
      setOrder(orderItem);
    }
  }, [orderItem]);
  const getStatusColor = (status) => {
    const colors = {
      pending: "text-yellow-500 text-xs md:text-base",
      processing: "text-blue-500 text-xs md:text-base",
      shipped: "text-purple-500 text-xs md:text-base",
      delivered: "text-green-500 text-xs md:text-base",
      cancelled: "text-red-500 text-xs md:text-base",
    };
    return colors[status] || "text-gray-500";
  };
  console.log(order);

  return (
    <div
      key={order.id}
      className="bg-white mb-1.5 md:mb-3 rounded-md shadow-md"
    >
      <div className="flex items-center gap-1 p-1 lg:gap-1.5 lg:p-1.5 md:gap-3 md:p-3 bg-pink-50">
        <div className="flex items-center gap-1 md:gap-2 lg:gap-3 ">
          <div className="h-8 w-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-sky-200 p-0.5 overflow-hidden">
            <img
              src={order?.shop?.logo_url}
              alt={order?.shop?.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <p className="text-sm md:text-lg lg:text-xl font-semibold">
            {order?.shop?.name}
          </p>
          <Link
            to={`/shop/${order?.shop?.id}`}
            className="bg-white px-1.5 py-0.5 lg:py-1.5 lg:px-3 rounded-md text-red-300 border border-gray-300 text-sm md:text-lg lg:text-xl"
          >
            Xem shop
          </Link>
        </div>{" "}
        {order.status === "delivered" && (
          <div
            className={`ml-auto ${colors.button.gradientBlueToPink} ${colors.button.medium} cursor-pointer text-sm md:text-lg lg:text-xl`}
            onClick={() => {
              navigate("/account/review", {
                state: {
                  order,
                },
              });
            }}
          >
            Đánh giá
          </div>
        )}
      </div>
      <div className="p-1 md:p-2 lg:p-3">
        {order?.order_items?.map((item) => (
          <Link
            to={`/account/my-order/${order?.id}`}
            className="space-y-1 lg:space-y-2 cursor-pointer"
            key={item?.id}
          >
            <div className="flex items-center space-x-2">
              <div className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-md overflow-hidden border-2 border-gray-200">
                {item?.product && (
                  <img
                    src={item?.product.product_images[0].image_url}
                    alt={order?.shop?.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
              </div>
              <div>
                <h2 className="line-clamp-1 text-xs md:text-base">
                  {item.product.name}
                </h2>
                {item?.product_variant && (
                  <div className="flex items-center gap-1 my-1 md:gap-2 lg:gap-3 md:my-2 lg:my-3">
                    {Object.entries(
                      item?.product_variant?.combination || {},
                    ).map(([key, value]) => (
                      <span
                        key={key}
                        className="inline-flex items-center text-xs md:text-sm px-2 py-1 rounded-full bg-red-100 text-gray-400"
                      >
                        {key}:{value}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-0.5 text-xs md:text-base">
                  <span>Số lượng</span>
                  <p>{item?.quantity}</p>
                </div>
              </div>
              <div className="flex justify-end flex-1">
                <p className="text-pink-500 font-semibold text-sm md:text-lg lg:text-xl text-end">
                  {formatPriceVND(+item?.unit_price)}
                </p>
              </div>
            </div>
            <hr />
          </Link>
        ))}
      </div>
      <div className="p-3 flex items-center justify-between">
        <div>
          {order?.order_history?.length > 0 && (
            <p
              className={getStatusColor(
                order?.order_history[order?.order_history.length - 1].status,
              )}
            >
              {
                order?.order_history[order?.order_history?.length - 1]
                  ?.description
              }
            </p>
          )}
        </div>
        <div className="ml-auto flex gap-2 items-center">
          <p className="text-sm md:text-lg lg:text-xl">Thành tiền:</p>
          <strong className="text-red-500 text-sm md:text-lg lg:text-xl">
            {formatPriceVND(+order?.total_amount)}
          </strong>
        </div>
      </div>
      <div className="p-3 flex items-center gap-1">
        <FaRegMoneyBillAlt className="text-green-500" size={40} />
        <p className="text-green-500 text-xs md:text-base">
          Phương thức thanh toán :
        </p>
        <strong className="text-rose-300 text-xs md:text-base">
          {order.payment_method === "cod"
            ? "Thanh toán khi nhận hàng"
            : "Bạn đã thanh toán online rồi"}
        </strong>
      </div>
    </div>
  );
}
