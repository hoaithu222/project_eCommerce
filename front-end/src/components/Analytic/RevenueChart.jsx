import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatPriceVND } from "../../utils/formatPriceVND";
import { useEffect, useState } from "react";
import SummaryApi from "../../common/SummaryApi";

export default function RevenueChart({ shopId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!shopId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${SummaryApi.getRevenueByMonth.url}/${shopId}`,
          {
            method: SummaryApi.getRevenueByMonth.method,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch revenue data");
        }

        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch revenue data");
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shopId]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Biểu đồ doanh thu</h3>
        <div className="h-[300px] flex items-center justify-center">
          Loading revenue data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Biểu đồ doanh thu</h3>
        <div className="h-[300px] flex items-center justify-center text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Biểu đồ doanh thu</h3>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => formatPriceVND(+value)} />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#e11d48"
              strokeWidth={2}
              name="Doanh thu"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[300px] flex items-center justify-center">
          No revenue data available
        </div>
      )}
    </div>
  );
}
