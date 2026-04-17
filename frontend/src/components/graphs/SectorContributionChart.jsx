import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
  Cell
} from "recharts";

export default function SectorContributionChart({ data }) {

  if (!data) {
    return <p className="text-gray-500">No sector data available</p>;
  }

  // Extract sector values safely
  const agriculture = data?.agriculture || 0;
  const manufacturing = data?.manufacturing || 0;
  const services = data?.services || 0;

  // Calculate total GDP from sectors
  const total = agriculture + manufacturing + services;

  // Prevent divide-by-zero
  const formattedData =
    total > 0
      ? [
          {
            name: "Agriculture",
            value: (agriculture / total) * 100,
            color: "#22c55e"
          },
          {
            name: "Manufacturing",
            value: (manufacturing / total) * 100,
            color: "#f59e0b"
          },
          {
            name: "Services",
            value: (services / total) * 100,
            color: "#3b82f6"
          }
        ]
      : [];

  return (
    <div className="w-full h-[350px]">

      <ResponsiveContainer>

        <BarChart
          data={formattedData}
          layout="vertical"
          margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
        >

          <CartesianGrid strokeDasharray="3 3" />

          {/* Percentage scale */}
          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />

          <YAxis
            type="category"
            dataKey="name"
            width={120}
          />

          <Tooltip
            formatter={(value) => `${value.toFixed(1)}%`}
          />

          <Bar dataKey="value" radius={[0, 6, 6, 0]}>

            {formattedData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}

            <LabelList
              dataKey="value"
              position="right"
              formatter={(val) => `${val.toFixed(1)}%`}
            />

          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}