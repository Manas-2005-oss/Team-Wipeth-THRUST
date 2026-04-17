import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function GDPGrowthChart({ data }) {
  if (!data) return null;

  const growthData = data.map((item, i, arr) => ({
    year: item.year,
    growth:
      i === 0
        ? 0
        : (((item.gdp - arr[i - 1].gdp) / arr[i - 1].gdp) * 100).toFixed(2)
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={growthData}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="growth" stroke="#2563eb" />
      </LineChart>
    </ResponsiveContainer>
  );
}