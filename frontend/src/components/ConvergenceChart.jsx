import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ConvergenceChart({ convergence }) {
  if (!convergence || !convergence.history) return null;

  const chartData = convergence.history.map((value, index) => ({
    iteration: index + 1,
    difference: Number(value),
  }));

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{
            top: 15,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          {/* THEME GRID */}
          <CartesianGrid
            stroke="#dedee8"
            strokeDasharray="4 4"
            vertical={false}
          />

          {/* X AXIS */}
          <XAxis
            dataKey="iteration"
            stroke="#94a3b8"
            tick={{
              fill: "#64748b",
              fontSize: 11,
            }}
            axisLine={{
              stroke: "#dfe0e8",
            }}
            tickLine={false}
            label={{
              value: "Iteration",
              position: "insideBottom",
              offset: -2,
              fill: "#64748b",
              fontSize: 11,
            }}
          />

          {/* Y AXIS */}
          <YAxis
            stroke="#94a3b8"
            tick={{
              fill: "#64748b",
              fontSize: 11,
            }}
            axisLine={false}
            tickLine={false}
            width={55}
          />

          {/* THEME TOOLTIP */}
          <Tooltip
            cursor={{
              stroke: "#25245f",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
            contentStyle={{
              background: "#ffffff",
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
          />

          {/* CONVERGENCE LINE */}
          <Line
            type="monotone"
            dataKey="difference"
            stroke="#25245f"
            strokeWidth={3}
            dot={{
              r: 3,
              fill: "#ffffff",
              stroke: "#35347b",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              fill: "#25245f",
              stroke: "#eeedf5",
              strokeWidth: 3,
            }}
            name="Difference"
            animationDuration={900}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}