import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function LaborMarketChart({ data }) {

  if (!data) return null;

  const unemployment = data.unemployment || 0;
  const employment = 100 - unemployment;

  const chartData = [
    {
      name: "Labor Market",
      Employment: employment,
      Unemployment: unemployment
    }
  ];

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />

        {/* Employment */}
        <Bar
          dataKey="Employment"
          fill="#2563eb"
          radius={[6, 6, 0, 0]}
        />

        {/* Unemployment */}
        <Bar
          dataKey="Unemployment"
          fill="#93c5fd"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}