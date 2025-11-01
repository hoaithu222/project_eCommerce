import { useEffect, useState } from "react";
import { formatPriceVND } from "../../utils/formatPriceVND";

export default function InfoCheckout({ data }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  // Tính tổng tiền cho từng shop
  const calculateShopTotal = (products) => {
    return products.reduce((total, product) => {
      return total + product.price_at_time * product.quantity;
    }, 0);
  };

  // Tính tổng tiền cho tất cả đơn hàng
  const calculateGrandTotal = () => {
    return orders.reduce((total, shop) => {
      return total + calculateShopTotal(shop.products);
    }, 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="flex items-center p-3 sm:p-3 md:p-4 lg:p-5 border-b border-gray-200">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold bg-gradient-to-r from-green-500 to-purple-600 bg-clip-text text-transparent">
          Sản phẩm
        </h2>
      </div>

      <div className="divide-y divide-gray-100">
        {orders.map((shopOrder, shopIndex) => (
          <div key={`shop-${shopIndex}`} className="pb-2 lg:pb-4 ">
            {/* Shop header */}
            <div className="flex items-center gap-2 lg:gap-4 bg-sky-50 p-2 lg:p-4">
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 p-0.5 bg-blue-300 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={shopOrder.shop.logo_url}
                  alt={shopOrder.shop.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className=" text-sm lg:text-lg font-medium text-gray-800">
                {shopOrder.shop.name}
              </h3>
            </div>

            {/* Products list */}
            <div className="p-2 lg:p-4 space-y-2 md:space-y-3 lg:space-y-4">
              {shopOrder.products.map((product, productIndex) => (
                <div
                  key={`product-${productIndex}`}
                  className="flex flex-col md:flex-row items-start md:items-center p-2 lg:p-4 space-y-2 md:space-y-3 lg:space-y-4 bg-gray-50 rounded-lg"
                >
                  {/* Product info */}
                  <div className="flex items-center w-[64%] gap-3">
                    <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 border border-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={product.product.product_images[0].image_url}
                        alt={product.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-grow space-y-2">
                      <h2 className="text-sm lg:text-lg font-medium line-clamp-1">
                        {product.product.name}
                      </h2>
                      {product.variant_id && (
                        <div className="space-y-0 lg:space-y-1">
                          <p className="text-xs lg:text-sm text-gray-600">
                            Phân loại hàng:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(
                              product.product_variant?.combination || {},
                            ).map(([key, value]) => (
                              <span
                                key={key}
                                className="inline-flex items-center text-sm text-gray-600 px-2 py-1 rounded-full bg-rose-100"
                              >
                                {key}: {value}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price info */}
                  <div className="flex flex-col md:flex-row items-end md:items-center gap-1 md:gap-3 lg:gap-4 ml-auto">
                    <p className="text-gray-600">
                      {formatPriceVND(+product.price_at_time)}
                    </p>
                    <p>x</p>
                    <p className="text-gray-600">{product.quantity}</p>
                    <p className="text-orange-500 whitespace-nowrap">
                      {formatPriceVND(
                        +product.price_at_time * product.quantity,
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Shop total */}
            <div className="flex justify-end px-2 pt-2 lg:px-4 lg:pt-4">
              <div className="text-right">
                <p className="text-xs lg:text-sm text-gray-600">
                  Tổng tiền shop ({shopOrder.products.length} sản phẩm)
                </p>
                <p className="text-sm lg:text-xl font-bold text-red-500">
                  {formatPriceVND(calculateShopTotal(shopOrder.products))}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grand total */}
      <div className="border-t border-gray-200 p-2 lg:p-4 bg-gray-50">
        <div className="flex justify-end items-center gap-4">
          <p className="text-sm lg:text-xl text-gray-600">Tổng thanh toán:</p>
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-red-600">
            {formatPriceVND(calculateGrandTotal())}
          </p>
        </div>
      </div>
    </div>
  );
}
