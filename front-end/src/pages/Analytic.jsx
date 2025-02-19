import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Overview from "../components/Analytic/Overview";
import RevenueChart from "../components/Analytic/RevenueChart";

export default function Analytic() {
  const { data: user } = useSelector((state) => state.user);
  const [shopId, setShopId] = useState(null);

  useEffect(() => {
    if (user?.Shop?.id) {
      setShopId(user.Shop.id);
    }
  }, [user]);

  if (!shopId) {
    return (
      <div className="p-5">
        <div className="bg-white p-5 shadow-lg rounded-lg">
          <p className="text-gray-500">Loading shop data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="bg-white p-5 shadow-lg rounded-lg space-y-6">
        <Overview shopId={shopId} />
        <RevenueChart shopId={shopId} />
      </div>
    </div>
  );
}
