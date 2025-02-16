import React from "react";
import { Link, useLocation } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { formatDate } from "../utils/formatDate";
import { formatPriceVND } from "../utils/formatPriceVND";
import colors from "../style/colors";

export default function OrderSuccess() {
  const location = useLocation();
  const orders = location.state?.orders || [];

  return (
    <div className="container mx-auto min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <TiTick className="text-white" size={55} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Đặt hàng thành công!
          </h2>
          <p className="text-gray-600">
            Cảm ơn bạn đã đặt hàng. Chi tiết đơn hàng của bạn dưới đây.
          </p>
        </div>
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={order.id || index}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="border-b pb-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">
                      Đơn hàng #{order.id || "Không có ID"}
                    </h3>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      {order.status === "pending"
                        ? "Chờ xử lý"
                        : order.status || "Không rõ"}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Ngày đặt: {formatDate(order.created_at)}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="font-medium text-gray-700">
                    Cửa hàng: {order.shop?.name || "Không có thông tin"}
                  </p>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Phương thức thanh toán:
                    </span>
                    <span className="font-medium">
                      {order.payment_method === "cod"
                        ? "Thanh toán khi nhận hàng"
                        : order.payment_method || "Không có thông tin"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className="font-medium">
                      {formatPriceVND(+order.shipping_fee)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giảm giá:</span>
                    <span className="font-medium">
                      {formatPriceVND(+order.discount_amount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Tổng tiền:</span>
                    <span className="text-rose-600">
                      {formatPriceVND(+order.total_amount)}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Thông tin người đặt:</h4>
                  <p className="text-gray-600">
                    {order.user?.username || "Không có tên"}
                  </p>
                  <p className="text-gray-600">
                    {order.user?.email || "Không có email"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Không có đơn hàng nào.</p>
        )}
      </div>
      <div className="flex items-center justify-center my-4 gap-4">
        <Link
          to="/account/my-order"
          className={`${colors.button.medium} ${colors.button.gradientSkyToOcean}`}
        >
          Xem danh sách đơn hàng
        </Link>
        <Link
          to="/products"
          className={`${colors.button.medium} ${colors.button.gradientVioletToYellow}`}
        >
          Tiết tục mua hàng
        </Link>
      </div>
    </div>
  );
}
