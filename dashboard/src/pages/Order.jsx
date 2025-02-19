import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SummaryApi from "../common/SummaryApi";

const Order = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.getOverviewOrder.url, {
        method: SummaryApi.getOverviewOrder.method,
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

  const revenueData =
    data.revenueByDate?.map((item) => ({
      date: new Date(item.created_at).toLocaleDateString(),
      revenue: parseInt(item._sum.total_amount),
    })) || [];

  const orderStatuses =
    data.orderByStatus?.reduce((acc, curr) => {
      acc[curr.status] = curr._count.id;
      return acc;
    }, {}) || {};

  const totalOrders =
    data.orderByStatus?.reduce((sum, curr) => sum + curr._count.id, 0) || 0;

  const totalRevenue =
    data.revenueByDate?.reduce(
      (sum, curr) => sum + parseInt(curr._sum.total_amount),
      0
    ) || 0;

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-sky-400 hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Tổng số đơn hàng
          </h3>
          <p className="text-3xl font-bold text-blue-600">{totalOrders}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-sky-400 hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Tổng số doanh thu
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {totalRevenue.toLocaleString("vi-VN")} ₫
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-sky-400 hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Đơn hàng đang chờ xử lý
          </h3>
          <p className="text-3xl font-bold text-orange-600">
            {orderStatuses.pending || 0}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Phân phối trang thái đặt hàng
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded">
            <div className="text-xl font-bold text-green-600">
              {orderStatuses.delivered || 0}
            </div>
            <div className="text-sm text-gray-600">Đã giao thành công</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded">
            <div className="text-xl font-bold text-orange-600">
              {orderStatuses.pending || 0}
            </div>
            <div className="text-sm text-gray-600">Đang xử lý</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded">
            <div className="text-xl font-bold text-red-600">
              {orderStatuses.cancelled || 0}
            </div>
            <div className="text-sm text-gray-600">Đã hủy</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Revenue Trend
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                formatter={(value) => `${value.toLocaleString("vi-VN")} ₫`}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Order;
