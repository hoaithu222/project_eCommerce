import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import SummaryApi from "../../common/SummaryApi";

const mockStatData = [
  { month: "Jan", orders: 150, users: 120 },
  { month: "Feb", orders: 220, users: 150 },
  { month: "Mar", orders: 280, users: 200 },
  { month: "Apr", orders: 310, users: 250 },
  { month: "May", orders: 350, users: 280 },
  { month: "Jun", orders: 420, users: 320 },
];

export default function StatisticsChart() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.getOrdersAndUsersByMonth.url, {
        method: SummaryApi.getOrdersAndUsersByMonth.method,
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
      <h3 className="text-xl font-semibold mb-4">
        Thống kê đơn hàng & người dùng
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mockStatData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="orders" fill="#4ade80" name="Đơn hàng" />
          <Bar dataKey="users" fill="#ec4899" name="Người dùng mới" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
