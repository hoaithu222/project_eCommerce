import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MessageCircle,
  MapPin,
  Star,
  Users,
  ShoppingBag,
  Search,
} from "lucide-react";
import { MdCancel } from "react-icons/md";
import SummaryApi from "../common/SummaryApi";
import ProductItem from "../components/ProductItem";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { useSelector } from "react-redux";
import { MdOutlineAddCircle } from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export default function PageShopInfo() {
  const [shop, setShop] = useState({});
  const { user_follower } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [products, setProduct] = useState([]);
  const { id } = useParams();
  const [isFollower, setIsFollower] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user_follower && shop?.id) {
      const isCheck = user_follower.some((item) => item.shop_id === shop.id);
      setIsFollower(isCheck);
    }
  }, [user_follower, shop?.id]);

  const fetchShop = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SummaryApi.getShop.url}/${id}`, {
        method: SummaryApi.getShop.method,
      });
      const result = await response.json();
      if (result.success) {
        setShop(result.data);
        setProduct(result.data.products);
      }
    } catch (error) {
      console.error(error);
      toast.error("Không thể tải thông tin shop");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchShop();
  }, [id]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-80 bg-gray-200 animate-pulse">
          <div className="animate-spin rounded-full w-8 h-8 md:w-10 md:h-10 lg:h-12 lg:w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
        <div className="container mx-auto py-2 lg:py-4">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="relative h-52 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={shop.banner_url || "/api/placeholder/1200/400"}
            alt="Shop Banner"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 text-white">
          <div className="container mx-auto flex items-end  space-x-3 md:space-x-5 lg:space-x-8 p-4">
            <div className="relative group">
              <div className="h-20 w-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36  border-2 border-white rounded-full">
                <img
                  src={shop.logo_url || "/api/placeholder/120/120"}
                  alt="Shop Logo"
                  className=" w-full h-full rounded-full object-cover shadow-xl 
                         transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="flex-1 space-x-1 md:space-x-3 lg:space-y-4">
              <h1 className="text-base sm:text-xl md:text-3xl lg:text-4xl font-bold mb-0.5 lg:mb-2 drop-shadow-lg">
                {shop.name}
              </h1>
              <div className="flex md:flex-row flex-col   space-x-3 text-sm ">
                <div className=" flex items-center bg-black/30 px-1.5 py-0.5 lg:px-4 lg:py-2 rounded-full backdrop-blur-sm">
                  <Star className="mr-1 lg:mr-2 text-base sm:text-lg md:text-xl lg:text-2xl text-yellow-400" />
                  <span className="text-sm md:text-lg lg:text-xl font-semibold">
                    {shop.rating}/5.0
                  </span>
                </div>
                <div className="hidden md:flex items-center bg-black/30 px-1.5 py-0.5 lg:px-4 lg:py-4 rounded-full backdrop-blur-sm">
                  <Users className="mr-1 lg:mr-2 text-lg md:text-xl lg:text-2xl text-blue-400" />
                  <span className="text-sm md:text-lg lg:text-xl font-semibold">
                    {shop.followers} Người theo dõi
                  </span>
                </div>
                <div className=" items-center bg-black/30 px-1.5 py-0.5 lg:px-4 lg:py-2 rounded-full backdrop-blur-sm hidden md:flex">
                  <ShoppingBag className="mr-1 lg:mr-2 text-lg md:text-xl lg:text-2xl text-blue-400" />
                  <span className="text-sm md:text-lg lg:text-xl font-semibold">
                    {shop.products?.length} Sản phẩm
                  </span>
                </div>
              </div>
            </div>

            <div>
              {isFollower ? (
                <div
                  className="px-2 py-0.5 md:px-5 md:py-1.5 lg:px-8 lg:py-3 bg-rose-600 hover:bg-rose-700 rounded-full transition-all 
                           transform hover:scale-105 hover:shadow-lg font-semibold  flex items-center gap-1  cursor-pointer text-xs  md:text-lg"
                  onClick={handleUnfollower}
                >
                  <MdCancel />
                  Hủy theo dõi
                </div>
              ) : (
                <div
                  className="px-3 py-1 md:px-5 md:py-1.5 lg:px-8 lg:py-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-all 
                           transform hover:scale-105 hover:shadow-lg font-semibold text-xs md:text-lg flex items-center gap-1 cursor-pointer"
                  onClick={handleFollower}
                >
                  <MdOutlineAddCircle />
                  Theo dõi
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-2 md:py-4 lg:py-8">
        <div className="bg-white rounded-xl shadow-sm p-3 md:p-5 lg:p-8">
          <div className="flex justify-between items-center mb-4 lg:mb-8 gap-2">
            <h2 className=" text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
              Danh sách sản phẩm
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="pl-4 sm:pl-6 md:pl-8 lg:pl-10 pr-2 lg:pr-4 py-2 rounded-full border border-gray-200 focus:outline-none 
                         focus:border-blue-500 w-64 transition-all"
              />
              <Search
                className="absolute hidden top-1/2 sm:block lg:left-3 lg:top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>

          <div>
            {products?.length ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {products.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-16 bg-gray-50 rounded-lg">
                <ShoppingBag className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-lg">Hiện tại chưa có sản phẩm</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
