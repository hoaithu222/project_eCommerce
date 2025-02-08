import { useParams } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import { useEffect, useState } from "react";

export default function PageShopInfo() {
  const [shop, setShop] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const fetchShop = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SummaryApi.getShop.url}/${id}`, {
        method: SummaryApi.getShop.method,
      });
      const result = await response.json();
      if (result.success) {
        setShop(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchShop();
  }, []);
  return (
    <div className="mt-10 container mx-auto">
      <div className="bg-white shadow-md rounded-sm overflow-hidden">
        {/* Banner */}
        <div className="relative h-40">
          <img
            src={shop.banner_url}
            alt="banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Nội dung */}
        <div className="grid grid-cols-3 p-5 items-center">
          {/* Logo + Theo dõi */}
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 shadow-lg">
              <img
                src={shop.logo_url}
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Theo dõi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
