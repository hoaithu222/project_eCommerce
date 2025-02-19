import { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import { FaBoxOpen } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { statusOptions } from "../utils/statusOptions";
import Loading from "./Loading";
import { formatPriceVND } from "../utils/formatPriceVND";
import colors from "../style/colors";
import StatusFilter from "../components/StatusFilter";

export default function MyOrder() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("all");
  const [loading, setLoading] = useState(false);
  const [statusCounts, setStatusCounts] = useState({});

  const navigate = useNavigate();

  const getFilteredStatus = () => {
    if (selected === "all") {
      return ["pending", "processing", "shipped", "delivered", "cancelled"];
    }
    return [selected];
  };

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.getMyOrder.url, {
        method: SummaryApi.getMyOrder.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getFilteredStatus()),
      });

      const result = await response.json();

      if (result.success) {
        setData(result.data);
        setStatusCounts(result.statusCounts);
      } else {
        console.error("Đã xảy ra lỗi", result.message);
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();

    const interval = setInterval(() => {
      fetchOrder();
    }, 10000);

    return () => clearInterval(interval);
  }, [selected]);

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

  return (
    <div className="w-full max-w-6xl mx-auto">
      <StatusFilter
        selected={selected}
        onSelect={setSelected}
        statusCounts={statusCounts}
      />

      <div className="mt-4">
        {data.length === 0 && (
          <div className="flex items-center min-h-screen justify-center mx-auto p-3">
            <div className="flex items-center justify-center flex-col border-dotted bg-white shadow-xl border border-pink-200 w-[50%] rounded-lg p-5">
              <FaBoxOpen className="text-blue-200 text-5xl" />
              <p className="text-rose-400">
                Hiện tại bạn chưa có đơn hàng nào vui lòng mua sắm
              </p>
            </div>
          </div>
        )}
        {data.map((order) => (
          <div key={order.id} className="bg-white mb-3 rounded-md shadow-md">
            <div className="flex items-center gap-3 p-3 bg-pink-50">
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-sky-200 p-0.5 overflow-hidden">
                  <img
                    src={order.shop.logo_url}
                    alt={order.shop.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <p className="text-xl font-semibold">{order.shop.name}</p>
                <Link
                  to={`/shop/${order.shop.id}`}
                  className="bg-white py-1.5 px-3 rounded-md text-red-300 border border-gray-300"
                >
                  Xem shop
                </Link>
              </div>
              {order.status === "delivered" ? (
                order.is_review ? (
                  <div
                    className={`ml-auto ${colors.button.gradientBlueToPink} ${colors.button.medium} cursor-pointer`}
                    onClick={() => {
                      navigate("/account/view-review", {
                        state: {
                          order,
                        },
                      });
                    }}
                  >
                    Xem đánh giá
                  </div>
                ) : (
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
                )
              ) : null}
            </div>
            <div className="p-3">
              {order.order_items.map((item) => (
                <Link
                  to={`/account/my-order/${order.id}`}
                  className="space-y-2 cursor-pointer"
                  key={item.id}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-28 h-28 rounded-md overflow-hidden border-2 border-gray-200">
                      {item.product && (
                        <img
                          src={item.product.product_images[0].image_url}
                          alt={order.shop.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      )}
                    </div>
                    <div>
                      <h2 className="line-clamp-1">{item.product.name}</h2>
                      {item.product_variant && (
                        <div className="flex items-center gap-3 my-3">
                          {Object.entries(
                            item.product_variant.combination || {},
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
                        <p>{item.quantity}</p>
                      </div>
                    </div>
                    <div className="flex justify-end flex-1">
                      <p className="text-pink-500 font-semibold text-xl text-end">
                        {formatPriceVND(+item.unit_price)}
                      </p>
                    </div>
                  </div>
                  <hr />
                </Link>
              ))}
            </div>
            <div className="p-4 mt-3 flex items-center justify-between">
              <div className="flex items-center justify-between">
                <div>
                  {order.order_history.length > 0 && (
                    <p
                      className={getStatusColor(
                        order.order_history[order.order_history.length - 1]
                          .status,
                      )}
                    >
                      {
                        order.order_history[order.order_history.length - 1]
                          .description
                      }
                    </p>
                  )}
                </div>
              </div>
              <div className="ml-auto flex gap-2 items-center">
                <p className="text-xl">Thành tiền:</p>
                <strong className="text-red-500 text-xl">
                  {formatPriceVND(+order.total_amount)}
                </strong>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && <Loading />}
    </div>
  );
}
