import { Area, AreaChart, ResponsiveContainer } from "recharts";

export default function StatCard({
  icon: Icon,
  title,
  value,
  trend,
  color,
  bgColor,
}) {
  const generateSparklineData = () => {
    return Array.from({ length: 10 }, (_, i) => ({
      value: Math.random() * 100 + 50,
    }));
  };
  const sparklineData = generateSparklineData();
  const isPositiveTrend = trend >= 0;
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className={`${bgColor} p-3 rounded-xl`}>
          <Icon className="text-white" size={24} />
        </div>
        <div
          className={`flex items-center ${
            isPositiveTrend ? "text-green-500" : "text-red-500"
          }`}
        >
          <span className="text-sm font-medium">
            {isPositiveTrend ? "+" : ""}
            {trend}%
          </span>
          {isPositiveTrend ? (
            <svg
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>
      </div>
      <h3 className="text-gray-600 font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold mb-4">{value}</p>
      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparklineData}>
            <defs>
              <linearGradient
                id={`gradient-${color}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={color} stopOpacity={0.2} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={`url(#gradient-${color})`}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
