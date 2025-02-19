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

export default function RevenueChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.getRevenueByMonth.url, {
        method: SummaryApi.getRevenueByMonth.method,
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
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Biểu đồ doanh thu</h3>
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
    </div>
  );
}
