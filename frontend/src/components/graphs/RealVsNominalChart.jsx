import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function RealVsNominalChart({ data }) {
  if (!data) return null;

  const nominal = data.GDP;
  const real = nominal / (1 + data.inflation / 100);

  const chartData = [
    { name: "Nominal GDP", value: nominal },
    { name: "Real GDP", value: real }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
}