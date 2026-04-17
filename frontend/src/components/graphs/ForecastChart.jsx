import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function ForecastChart({ data }) {

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">GDP Forecast</h2>
        <p>No forecast data available</p>
      </div>
    );
  }

  const chartData = data.map(item => ({
    year: item.year,
    gdp: item.gdp
  }));

  return (
    <div className=" ">
      <h2 className="text-lg font-semibold mb-4"></h2>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={chartData}>

          {/* Gradient */}
          <defs>
            <linearGradient id="colorGDP" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

          <XAxis dataKey="year" />
          <YAxis />

          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }}
          />

          <Area
            type="monotone"
            dataKey="gdp"
            stroke="#2563eb"
            strokeWidth={3}
            fill="url(#colorGDP)"
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
            isAnimationActive={true}
            animationDuration={1200}
          />

        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}