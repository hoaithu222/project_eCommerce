import { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import colors from "../style/colors";
import { Link, useNavigate } from "react-router-dom";
import CartItemProduct from "../components/CartItemProduct";
import { formatPriceVND } from "../utils/formatPriceVND";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Cart() {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("accessToken");
  const { data: user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const fetchCartWithShop = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(SummaryApi.getCartWithShop.url, {
        method: SummaryApi.getCartWithShop.method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartWithShop();
  }, []);

  const handleSelectItem = (itemId) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleSelectShop = (shopId, products) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      const productIds = products.map((p) => p.id);
      const allSelected = productIds.every((id) => prev.has(id));

      if (allSelected) {
        productIds.forEach((id) => newSet.delete(id));
      } else {
        productIds.forEach((id) => newSet.add(id));
      }

      return newSet;
    });
  };

  const handleSelectAll = () => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      const allProducts = data.flatMap((shop) => shop.products);
      const allProductIds = allProducts.map((p) => p.id);
      const allSelected = allProductIds.every((id) => prev.has(id));

      if (allSelected) {
        return new Set();
      } else {
        allProductIds.forEach((id) => newSet.add(id));
        return newSet;
      }
    });
  };

  const calculateTotal = () => {
    let total = 0;
    data.forEach((shop) => {
      shop.products.forEach((product) => {
        if (selectedItems.has(product.id)) {
          total += product.price_at_time * product.quantity;
        }
      });
    });
    return total;
  };
  const handleCheckout = async () => {
    if (selectedItems.size === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để mua hàng");
      return;
    }

    const selectedProducts = data.map((shop) => {
      return {
        shop: shop.shop,
        products: shop.products.filter((product) =>
          selectedItems.has(product.id),
        ),
      };
    });
    if (user.user_addresses.length === 0) {
      toast("Vui lòng thêm địa chỉ trước");
      navigate("/account/address");
    } else {
      navigate("/checkout", {
        state: selectedProducts,
      });
    }
  };

  const totalItems = data.reduce((acc, shop) => acc + shop.products.length, 0);
  const selectedItemsCount = selectedItems.size;
  const total = calculateTotal();

  return (
    <div className="container mx-auto mt-2 lg:mt-4 p-2 lg:p-4 max-h-[96vh] overflow-y-auto hidden-scrollbar mb-10  md:mb-20 lg:mb-24 relative">
      <div className="flex justify-between items-center p-2 bg-white rounded-xl shadow-lg md:p-4 lg:p-6">
        <h2
          className={`${colors.textColors.gradientGreenToPurple} text-lg sm-text-xl md:text-2xl lg:text-3xl font-bold`}
        >
          Giỏ hàng của tôi
        </h2>
        <Link
          to="/"
          className={`${colors.button.medium} ${colors.button.gradientBlueToBlue}`}
        >
          Về trang chủ
        </Link>
      </div>

      {data.length === 0 ? (
        <div className="p-3 mt-2 text-center bg-white rounded-xl shadow-lg md:mt-4 lg:mt-6 md:p-5 lg:p-8">
          <p className="text-lg text-gray-500">Giỏ hàng của bạn đang trống</p>
          <Link
            to="/"
            className="inline-block px-3 py-1 mt-2 text-white bg-blue-500 rounded-lg transition-colors lg:mt-4 lg:px-6 lg:py-2 hover:bg-blue-600"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="mt-2 space-y-2 md:mt-4 md:space-y-4 lg:mt-6 lg:space-y-6">
          {data.map((item, index) => {
            const shopProducts = item.products || [];
            const allShopProductsSelected = shopProducts.every((p) =>
              selectedItems.has(p.id),
            );

            return (
              <div
                key={`${index}-${item?.shop?.id}`}
                className="overflow-hidden bg-white rounded-xl shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="p-2 bg-gradient-to-r from-blue-50 to-purple-50 md:p-3 lg:p-4">
                  <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4">
                    <input
                      type="checkbox"
                      checked={allShopProductsSelected}
                      onChange={() =>
                        handleSelectShop(item.shop.id, shopProducts)
                      }
                      className="w-5 h-5 text-blue-500 rounded border-gray-300 focus:ring-blue-400"
                    />

                    <Link
                      to={`/shop/${item.shop.id}`}
                      className="flex items-center space-x-3 group"
                    >
                      <div className="overflow-hidden w-6 h-6 rounded-full border-2 border-blue-200 transition-transform md:h-8 md:w-8 lg:w-10 lg:h-10 group-hover:scale-105">
                        <img
                          src={item.shop.logo_url}
                          alt={item.shop.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <p className="font-medium text-gray-900 transition-colors group-hover:text-blue-500">
                        {item.shop.name}
                      </p>
                    </Link>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {item.products.map((product) => (
                    <CartItemProduct
                      key={product.id}
                      data={product}
                      onCartUpdate={fetchCartWithShop}
                      isSelected={selectedItems.has(product.id)}
                      onSelectItem={handleSelectItem}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="fixed right-0 bottom-0 left-0 z-50 bg-white border-t border-gray-200 shadow-xl">
        <div className="container p-2 mx-auto md:p-3 lg:p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4">
              <input
                type="checkbox"
                checked={selectedItemsCount === totalItems && totalItems > 0}
                onChange={handleSelectAll}
                className="w-6 h-6 text-blue-500 rounded border-gray-300 focus:ring-blue-400"
              />
              <p className="text-xs text-gray-600 lg:text-sm">
                Chọn tất cả ({selectedItemsCount}/{totalItems})
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-xs text-gray-500 lg:text-sm">
                  Tổng thanh toán:
                </p>
                <p className="text-sm font-bold text-blue-500 md:text-lg lg:text-xl">
                  {formatPriceVND(total)}
                </p>
              </div>
              <button
                onClick={handleCheckout}
                disabled={selectedItems.size === 0}
                className="px-4 py-1 font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg transition-all transform md:px-5 md:py-2 lg:px-8 lg:py-3 hover:from-blue-600 hover:to-purple-600 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Mua hàng ({selectedItemsCount})
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
