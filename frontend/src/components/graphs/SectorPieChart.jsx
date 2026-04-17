import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function SectorPieChart({ data }) {

  if (!data) return null;

  const agriculture =
    data?.agriculture ??
    data?.Agriculture ??
    data?.[0] ??
    0;

  const manufacturing =
    data?.manufacturing ??
    data?.Manufacturing ??
    data?.[1] ??
    0;

  const services =
    data?.services ??
    data?.Services ??
    data?.[2] ??
    0;

  // convert to percentage
  const total = agriculture + manufacturing + services;

  const chartData = [
    { name: "Agriculture", value: (agriculture / total) * 100 },
    { name: "Manufacturing", value: (manufacturing / total) * 100 },
    { name: "Services", value: (services / total) * 100 }
  ];

  const COLORS = ["#2563eb", "#3b82f6", "#93c5fd"];

  return (
    <div className="">

      

      <ResponsiveContainer width="100%" height={300}>

        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            outerRadius={100}
            label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}