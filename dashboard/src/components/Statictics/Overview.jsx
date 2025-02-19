import React, { useEffect, useState } from "react";
import { BsBagHeartFill } from "react-icons/bs";
import { TbReportMoney } from "react-icons/tb";
import { FiUserPlus } from "react-icons/fi";
import { RiProductHuntFill } from "react-icons/ri";
import { FaShopLock } from "react-icons/fa6";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import RevenueChart from "./RevenueChart";
import StatisticsChart from "./StatisticsChart";
import SummaryApi from "../../common/SummaryApi";
import { formatPriceVND } from "../../utils/formatPriceVND";
import StatCard from "./StatCard";
import { MdFiberNew } from "react-icons/md";

export default function Overview() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.getOverview.url, {
        method: SummaryApi.getOverview.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-8 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={BsBagHeartFill}
          title="Tổng số đơn hàng"
          value={data.totalOrders}
          trend={1.56}
          color="#10B981"
          bgColor="bg-emerald-500"
        />
        <StatCard
          icon={TbReportMoney}
          title="Doanh thu"
          value={formatPriceVND(+data.totalRevenue || 0)}
          trend={-1.56}
          color="#F97316"
          bgColor="bg-orange-500"
        />
        <StatCard
          icon={FiUserPlus}
          title="Tổng số khách hàng"
          value={data.totalUsers}
          trend={2.56}
          color="#EC4899"
          bgColor="bg-pink-500"
        />
        <StatCard
          icon={RiProductHuntFill}
          title="Tổng số sản phẩm"
          value={data.totalProducts}
          trend={0.89}
          color="#3B82F6"
          bgColor="bg-blue-500"
        />
        <StatCard
          icon={FaShopLock}
          title="Tổng số shop"
          value={data.totalShop}
          trend={1.26}
          color="#8B5CF6"
          bgColor="bg-purple-500"
        />
        <StatCard
          icon={MdFiberNew}
          title="Tổng số khách hàng mới trong tháng"
          value={data.getNewCustomers}
          trend={1.26}
          color="#8B5CF6"
          bgColor="bg-purple-500"
        />
      </div>

      <RevenueChart />
      <StatisticsChart />
    </div>
  );
}
