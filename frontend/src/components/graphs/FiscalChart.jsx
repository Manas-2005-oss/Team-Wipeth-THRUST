import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function FiscalChart({ data }) {
  const deficit =
    data?.deficit ??
    data?.fiscalDeficit ??
    0;

  const taxRevenue =
    data?.taxRevenue ??
    data?.tax_revenue ??
    data?.tax ??
    data?.revenue ??
    0;

  const govSpending =
    data?.govSpending ??
    data?.governmentSpending ??
    data?.gov_spending ??
    data?.spending ??
    0;

  const chartData = [
    {
      name: "Deficit",
      value: Number(deficit),
      color: "#25245f",
    },
    {
      name: "Tax Revenue",
      value: Number(taxRevenue),
      color: "#35347b",
    },
    {
      name: "Gov Spending",
      value: Number(govSpending),
      color: "#5b5a9d",
    },
  ];

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          {/* SOFT THEME GRID */}
          <CartesianGrid
            stroke="#dedee8"
            strokeDasharray="4 4"
            vertical={false}
          />

          {/* X AXIS */}
          <XAxis
            dataKey="name"
            axisLine={{
              stroke: "#dfe0e8",
            }}
            tickLine={false}
            tick={{
              fill: "#64748b",
              fontSize: 11,
            }}
          />

          {/* Y AXIS */}
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#64748b",
              fontSize: 11,
            }}
            width={55}
          />

          {/* THEME TOOLTIP */}
          <Tooltip
            cursor={{
              fill: "#25245f",
              fillOpacity: 0.04,
            }}
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #dedee8",
              borderRadius: "12px",
              boxShadow: "0 10px 25px rgba(37, 36, 95, 0.12)",
              padding: "10px 14px",
            }}
            labelStyle={{
              color: "#25245f",
              fontWeight: 700,
              marginBottom: "5px",
            }}
            itemStyle={{
              color: "#35347b",
              fontSize: "12px",
              fontWeight: 600,
            }}
            formatter={(value) => [
              Number(value).toLocaleString(),
              "Value",
            ]}
          />

          {/* CGE THEME BARS */}
          <Bar
            dataKey="value"
            radius={[8, 8, 2, 2]}
            maxBarSize={58}
            animationDuration={900}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`fiscal-bar-${index}`}
                fill={entry.color}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}