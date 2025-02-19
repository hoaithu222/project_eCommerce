import { useEffect, useState } from "react";
import SummaryApi from "../../common/SummaryApi";
import StatCard from "./StatCard";
import { BsBagHeartFill } from "react-icons/bs";
import { TbReportMoney } from "react-icons/tb";
import { RiProductHuntFill } from "react-icons/ri";
import { formatPriceVND } from "../../utils/formatPriceVND";

export default function Overview({ shopId }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!shopId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${SummaryApi.getOverview.url}/${shopId}`,
          {
            method: SummaryApi.getOverview.method,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch overview data");
        }

        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch overview data");
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shopId]);

  if (loading) {
    return <div className="p-4">Loading overview data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!data) {
    return <div className="p-4">No data available</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Thống kê chung</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={BsBagHeartFill}
          title="Tổng số đơn hàng"
          value={data.order || 0}
          trend={1.56}
          color="#10B981"
          bgColor="bg-emerald-500"
        />
        <StatCard
          icon={TbReportMoney}
          title="Doanh thu"
          value={formatPriceVND(+(data?.revenue?._sum?.total_amount || 0))}
          trend={-1.56}
          color="#F97316"
          bgColor="bg-orange-500"
        />
        <StatCard
          icon={RiProductHuntFill}
          title="Tổng số sản phẩm"
          value={data.totalProduct || 0}
          trend={0.89}
          color="#3B82F6"
          bgColor="bg-blue-500"
        />
      </div>
    </div>
  );
}
