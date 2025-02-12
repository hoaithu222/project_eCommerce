import { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import colors from "../style/colors";
import { Link } from "react-router-dom";
import CartItemProduct from "../components/CartItemProduct";

export default function Cart() {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const token = localStorage.getItem("accessToken");

  const fetchCartWithShop = async () => {
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

  return (
    <div className="container mx-auto mt-4 p-4 max-h-[96vh] overflow-y-auto hidden-scrollbar mb-5">
      <div className="bg-white shadow-lg rounded-xl p-6 flex">
        <h2
          className={`${colors.textColors.gradientGreenToPurple} text-3xl font-bold`}
        >
          Giỏ hàng của tôi
        </h2>
      </div>

      <div className="mt-6 space-y-6">
        {data.map((item, index) => {
          const shopProducts = item.products || [];
          const allShopProductsSelected = shopProducts.every((p) =>
            selectedItems.has(p.id),
          );

          return (
            <div
              key={`${index}-${item?.shop?.id}`}
              className="bg-white shadow-lg rounded-xl overflow-hidden"
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
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-200">
                      <img
                        src={item.shop.logo_url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-medium text-gray-900 group-hover:text-pink-500 transition-colors">
                      {item.shop.name}
                    </p>
                  </Link>
                </div>
              </div>

              <div className="divide-y divide-gray-100 mb-3">
                {item.products.map((product, index) => (
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
    </div>
  );
}
