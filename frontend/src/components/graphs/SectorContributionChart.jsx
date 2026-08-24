import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
  Cell,
} from "recharts";

export default function SectorContributionChart({ data }) {
  if (!data) {
    return (
      <div className="flex h-[350px] items-center justify-center">
        <p className="text-sm text-slate-400">
          No sector data available
        </p>
      </div>
    );
  }

  // Extract sector values safely
  const agriculture = Number(data?.agriculture) || 0;
  const manufacturing = Number(data?.manufacturing) || 0;
  const services = Number(data?.services) || 0;

  // Calculate total
  const total =
    agriculture +
    manufacturing +
    services;

  // Economist Mode theme colors
  const formattedData =
    total > 0
      ? [
          {
            name: "Agriculture",
            value: (agriculture / total) * 100,
            color: "#25245f",
          },
          {
            name: "Manufacturing",
            value: (manufacturing / total) * 100,
            color: "#4c4aa3",
          },
          {
            name: "Services",
            value: (services / total) * 100,
            color: "#7976c8",
          },
        ]
      : [];

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData}
          layout="vertical"
          margin={{
            top: 15,
            right: 45,
            left: 10,
            bottom: 15,
          }}
        >
          {/* SOFT ECONOMIST MODE GRID */}
          <CartesianGrid
            stroke="#dedee8"
            strokeDasharray="3 3"
            horizontal={false}
          />

          {/* PERCENTAGE AXIS */}
          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
            tick={{
              fill: "#7b7890",
              fontSize: 11,
            }}
            axisLine={{
              stroke: "#dedee8",
            }}
            tickLine={false}
          />

          {/* SECTOR NAMES */}
          <YAxis
            type="category"
            dataKey="name"
            width={110}
            tick={{
              fill: "#25245f",
              fontSize: 11,
              fontWeight: 600,
            }}
            axisLine={false}
            tickLine={false}
          />

          {/* CUSTOM TOOLTIP */}
          <Tooltip
            formatter={(value) => {
              const number = Number(value) || 0;

              return [
                `${number.toFixed(1)}%`,
                "Contribution",
              ];
            }}
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #dedee8",
              borderRadius: "12px",
              boxShadow:
                "0 10px 25px rgba(37,36,95,0.12)",
              fontSize: "12px",
            }}
            labelStyle={{
              color: "#25245f",
              fontWeight: 700,
              marginBottom: "4px",
            }}
          />

          <Bar
            dataKey="value"
            radius={[0, 7, 7, 0]}
            animationDuration={900}
          >
            {formattedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
              />
            ))}

            <LabelList
              dataKey="value"
              position="right"
              formatter={(value) =>
                `${(Number(value) || 0).toFixed(1)}%`
              }
              style={{
                fill: "#25245f",
                fontSize: 11,
                fontWeight: 700,
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}