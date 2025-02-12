import { useEffect, useState } from "react";
import { Star, Users, Store, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SummaryApi from "../common/SummaryApi";
import { useDispatch } from "react-redux";

export default function ProductShopInfo({ data }) {
  const [shop, setShop] = useState({});
  const { user_follower } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isFollower, setIsFollower] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user_follower && shop?.id) {
      const isCheck = user_follower.some((item) => item.shop_id === shop.id);
      setIsFollower(isCheck);
    }
  }, [user_follower, shop?.id]);
  useEffect(() => {
    if (data?.id) {
      setShop(data.shop);
    }
  }, [data]);
  const handleFollower = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(SummaryApi.followerShop.url, {
        method: SummaryApi.followerShop.method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ shop_id: shop.id }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);

        setIsFollower(true);
        dispatch({ type: "update_follower", payload: result.data });

        setShop((prev) => ({
          ...prev,
          followers: (prev.followers || 0) + 1,
        }));
      } else {
        toast.error(result.message || "Không thể theo dõi shop");
      }
    } catch (error) {
      console.error(error);
      toast.error("Đã xảy ra lỗi khi theo dõi shop");
    }
  };

  const handleUnfollower = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(SummaryApi.unfollowerShop.url, {
        method: SummaryApi.unfollowerShop.method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ shop_id: shop.id }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        setIsFollower(false);
        dispatch({ type: "update_unfollower", payload: result.data.shop_id });

        setShop((prev) => ({
          ...prev,
          followers: Math.max((prev.followers || 0) - 1, 0),
        }));
      } else {
        toast.error(result.message || "Không thể hủy theo dõi shop");
      }
    } catch (error) {
      console.error(error);
      toast.error("Đã xảy ra lỗi khi hủy theo dõi shop");
    }
  };

  return (
    <div className="bg-white p-6 shadow-lg my-4 rounded-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
        {/* Shop Logo */}
        <div className="relative group">
          <div className="absolute inset-0 bg-pink-100 rounded-full blur-md group-hover:blur-lg transition-all duration-300 opacity-50"></div>
          <div className="relative w-32 h-32 rounded-full p-2 bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-gray-100 overflow-hidden">
            <img
              src={shop.logo_url}
              alt={shop.name}
              className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Shop Info */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h3 className="text-xl font-semibold text-gray-800">{shop.name}</h3>
          <div className="flex gap-3">
            {isFollower ? (
              <button
                className="px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors duration-200 flex items-center gap-2"
                onClick={handleUnfollower}
              >
                <Heart className="w-4 h-4" />
                Hủy theo dõi
              </button>
            ) : (
              <button
                className="px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors duration-200 flex items-center gap-2"
                onClick={handleFollower}
              >
                <Heart className="w-4 h-4" />
                Theo dõi
              </button>
            )}

            <button
              className="px-6 py-2 border-2 border-pink-600 text-pink-600 rounded-full hover:bg-pink-50 transition-colors duration-200 flex items-center gap-2"
              onClick={() => {
                navigate(`/shop/${shop.id}`);
              }}
            >
              <Store className="w-4 h-4" />
              Xem shop
            </button>
          </div>
        </div>

        <div className="flex flex-col md:ml-auto gap-3 items-center md:items-start">
          <div className="flex items-center gap-2 text-gray-600">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="font-medium">{shop.rating || 0}</span>
            <span className="text-gray-500">Đánh giá</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-5 h-5 text-rose-400" />
            <span className="font-medium">{shop.followers || 0}</span>
            <span className="text-gray-500">Người theo dõi</span>
          </div>
        </div>
      </div>

      {shop.description && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-gray-600 text-sm leading-relaxed">
            {shop.description}
          </p>
        </div>
      )}
    </div>
  );
}
