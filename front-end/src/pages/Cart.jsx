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
    <div className="container mx-auto mt-4 p-4 max-h-[96vh] overflow-y-auto hidden-scrollbar mb-24 relative">
      <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between">
        <h2
          className={`${colors.textColors.gradientGreenToPurple} text-3xl font-bold`}
        >
          Giỏ hàng của tôi
        </h2>
        <Link
          to="/"
          className={`${colors.button.medium} ${colors.button.gradientBlueToPink}`}
        >
          Về trang chủ
        </Link>
      </div>

      {data.length === 0 ? (
        <div className="mt-6 bg-white shadow-lg rounded-xl p-8 text-center">
          <p className="text-gray-500 text-lg">Giỏ hàng của bạn đang trống</p>
          <Link
            to="/"
            className="mt-4 inline-block px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {data.map((item, index) => {
            const shopProducts = item.products || [];
            const allShopProductsSelected = shopProducts.every((p) =>
              selectedItems.has(p.id),
            );

            return (
              <div
                key={`${index}-${item?.shop?.id}`}
                className="bg-white shadow-lg rounded-xl overflow-hidden transition-shadow hover:shadow-xl"
              >
                <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={allShopProductsSelected}
                      onChange={() =>
                        handleSelectShop(item.shop.id, shopProducts)
                      }
                      className="w-5 h-5 rounded border-gray-300 text-pink-500 focus:ring-pink-400"
                    />

                    <Link
                      to={`/shop/${item.shop.id}`}
                      className="flex items-center space-x-3 group"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-200 transition-transform group-hover:scale-105">
                        <img
                          src={item.shop.logo_url}
                          alt={item.shop.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-medium text-gray-900 group-hover:text-pink-500 transition-colors">
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

      <div className="fixed bg-white bottom-0 left-0 right-0 z-50 border-t border-gray-200 shadow-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={selectedItemsCount === totalItems && totalItems > 0}
                onChange={handleSelectAll}
                className="w-6 h-6 rounded border-gray-300 text-pink-500 focus:ring-pink-400"
              />
              <p className="text-gray-600">
                Chọn tất cả ({selectedItemsCount}/{totalItems})
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-gray-500">Tổng thanh toán:</p>
                <p className="text-xl font-bold text-pink-500">
                  {formatPriceVND(total)}
                </p>
              </div>
              <button
                onClick={handleCheckout}
                disabled={selectedItems.size === 0}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium 
                          hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105
                          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Mua hàng ({selectedItemsCount})
              </button>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
}
