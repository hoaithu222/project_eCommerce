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
      pending: "text-yellow-500",
      processing: "text-blue-500",
      shipped: "text-purple-500",
      delivered: "text-green-500",
      cancelled: "text-red-500",
    };
    return colors[status] || "text-gray-500";
  };
  console.log(order);

  return (
    <div key={order.id} className="bg-white mb-3 rounded-md shadow-md">
      <div className="flex items-center gap-3 p-3 bg-pink-50">
        <div className="flex items-center gap-3 ">
          <div className="w-20 h-20 rounded-full bg-sky-200 p-0.5 overflow-hidden">
            <img
              src={order?.shop?.logo_url}
              alt={order?.shop?.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <p className="text-xl font-semibold">{order?.shop?.name}</p>
          <Link
            to={`/shop/${order?.shop?.id}`}
            className="bg-white py-1.5 px-3 rounded-md text-red-300 border border-gray-300"
          >
            Xem shop
          </Link>
        </div>{" "}
        {order.status === "delivered" && (
          <div
            className={`ml-auto ${colors.button.gradientBlueToPink} ${colors.button.medium} cursor-pointer`}
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
      <div className="p-3">
        {order?.order_items?.map((item) => (
          <Link
            to={`/account/my-order/${order?.id}`}
            className="space-y-2 cursor-pointer"
            key={item?.id}
          >
            <div className="flex items-center space-x-2">
              <div className="w-28 h-28 rounded-md overflow-hidden border-2 border-gray-200">
                {item?.product && (
                  <img
                    src={item?.product.product_images[0].image_url}
                    alt={order?.shop?.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
              </div>
              <div>
                <h2 className="line-clamp-1">{item.product.name}</h2>
                {item?.product_variant && (
                  <div className="flex items-center gap-3 my-3">
                    {Object.entries(
                      item?.product_variant?.combination || {},
                    ).map(([key, value]) => (
                      <span
                        key={key}
                        className="inline-flex items-center text-sm px-2 py-1 rounded-full bg-red-100 text-gray-400"
                      >
                        {key}:{value}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-0.5">
                  <span>x</span>
                  <p>{item?.quantity}</p>
                </div>
              </div>
              <div className="flex justify-end flex-1">
                <p className="text-pink-500 font-semibold text-xl text-end">
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
          <p className="text-xl">Thành tiền:</p>
          <strong className="text-red-500 text-xl">
            {formatPriceVND(+order?.total_amount)}
          </strong>
        </div>
      </div>
      <div className="p-3 flex items-center gap-1">
        <FaRegMoneyBillAlt className="text-green-500" size={40} />
        <p className="text-green-500">Phương thức thanh toán :</p>
        <strong className="text-rose-300">
          {order.payment_method === "cod"
            ? "Thanh toán khi nhận hàng"
            : "Bạn đã thanh toán online rồi"}
        </strong>
      </div>
    </div>
  );
}
