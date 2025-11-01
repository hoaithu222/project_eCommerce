import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import colors from "../style/colors";
import CheckoutAddress from "../components/Checkout/CheckoutAddress";
import InfoCheckout from "../components/Checkout/InfoCheckout";

// Import payment logos
import vnpayLogo from "../assets/img/logo_payment/vnpay.png";
import momoLogo from "../assets/img/logo_payment/mono.png";
import zalopayLogo from "../assets/img/logo_payment/zalopay.jpg";
import cod from "../assets/img/logo_payment/img.jpg";
import SummaryApi from "../common/SummaryApi";

export default function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data: user } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [orders, setOrders] = useState([]);
  const [addressId, setAddressId] = useState(null);

  const paymentMethods = [
    { id: "cod", name: "Thanh toán khi nhận hàng", logo: cod },
    // { id: "vnpay", name: "VNPAY", logo: vnpayLogo },
    // { id: "momo", name: "MOMO", logo: momoLogo },
    // { id: "zalopay", name: "ZALOPAY", logo: zalopayLogo },
  ];

  useEffect(() => {
    // Kiểm tra đăng nhập
    if (!user?.id) {
      navigate("/login", { state: { returnUrl: "/checkout" } });
      return;
    }

    // Kiểm tra có đơn hàng không
    if (!state || !Array.isArray(state)) {
      navigate("/cart");
      return;
    }

    // Lọc và set đơn hàng hợp lệ
    const validOrders = state.filter((item) => item.products?.length > 0);
    setOrders(validOrders);
  }, [user, state, navigate]);

  const validateForm = () => {
    if (!addressId) {
      setError("Vui lòng chọn địa chỉ giao hàng");
      return false;
    }
    if (!selectedPayment) {
      setError("Vui lòng chọn phương thức thanh toán");
      return false;
    }
    return true;
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      const orderRequests = orders.map((shopOrder) => {
        const shopTotal = shopOrder.products.reduce(
          (sum, product) => sum + product.price_at_time * product.quantity,
          0,
        );
        return {
          shop_id: shopOrder.shop.id,
          address_id: addressId,
          payment_method: selectedPayment,
          total_amount: shopTotal,
          shipping_fee: 0,
          status: "pending",
          products: shopOrder.products.map((product) => ({
            product_id: product.product.id,
            variant_id: product.variant_id,
            quantity: product.quantity,
            unit_price: product.price_at_time,
            subtotal: product.price_at_time * product.quantity,
          })),
        };
      });

      const responses = await Promise.all(
        orderRequests.map(async (order) => {
          const res = await fetch(SummaryApi.addOrder.url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(order),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || "Có lỗi xảy ra khi xử lý đơn hàng");
          }

          return data;
        }),
      );

      const hasErrors = responses.some((res) => !res.success);
      if (hasErrors) {
        throw new Error("Có lỗi xảy ra khi xử lý đơn hàng");
      }
      if (selectedPayment === "cod") {
        navigate("/order-success", {
          state: {
            orders: responses.map((res) => res.data),
          },
        });
      }
    } catch (err) {
      setError(err.message || "Đã có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressSelect = (id) => {
    setAddressId(id);
    setError(null);
  };

  return (
    <div className="container mx-auto my-3 space-y-2 md:my-4 lg:my-5 lg:space-y-4">
      {/* Header */}
      <div className="bg-white p-3 md:p-4 lg:p-5 shadow-xl rounded-xl flex items-center justify-between">
        <h2
          className={`${colors.textColors.gradientLimeToBlue} text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold`}
        >
          Thanh toán
        </h2>
        <button
          className={`${colors.button.medium} ${colors.button.gradientSunrise}`}
          onClick={() => navigate("/cart")}
        >
          Quay trở lại giỏ hàng
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-2 lg:px-4 py-1.5 lg:py-3 rounded-xl">
          {error}
        </div>
      )}

      <div className="bg-white p-1 md:p-3 lg:p-5 shadow-xl rounded-xl">
        <CheckoutAddress
          address={user?.user_addresses || []}
          onSelect={handleAddressSelect}
        />
      </div>

      <div className="bg-white shadow-xl rounded-xl">
        <InfoCheckout data={orders} />
      </div>

      <div className="bg-white p-3 md:p-5 lg:p-6 shadow-lg rounded-xl mb-6">
        <h2
          className={`${colors.textColors.gradientRainbow} text-sm sm:text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 lg:mb-6`}
        >
          Phương thức thanh toán
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => {
                setSelectedPayment(method.id);
                setError(null);
              }}
              className={`flex items-center p-1 lg:p-2 border rounded-lg cursor-pointer transition-all
                ${
                  selectedPayment === method.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
            >
              <div className="w-10 h-6 md:w-14 md:h-10  lg:w-16 lg:h-12 flex-shrink-0">
                <img
                  src={method.logo}
                  alt={method.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="ext-xs md:text-sm ml-2 lg:ml-4 font-medium text-gray-700">
                {method.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Submit button */}
      <div className="bg-white p-3 md:p-4 lg:p-6 shadow-lg rounded-xl">
        <button
          onClick={handleSubmitOrder}
          disabled={isLoading}
          className={`w-full py-2 lg:py-4 ${colors.button.large} ${colors.button.gradientSunrise} 
            ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}
            transition-opacity rounded-lg font-bold text-sm lg:text-lg`}
        >
          {isLoading ? "Đang xử lý..." : "Xác nhận mua hàng"}
        </button>
      </div>
    </div>
  );
}
