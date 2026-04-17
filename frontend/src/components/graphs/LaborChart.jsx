import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function LaborChart({ data }) {

  if (!data) return null;

  const chartData = [
    {
      name: "Unemployment",
      value: data.simulation_results?.policy?.unemployment || 0
    },
    {
      name: "Wage",
      value: data.simulation_results?.policy?.wage || 0
    }
  ];

  return (

    <div className="chart-card">

      <h2 className="chart-title">Labor Market Impact</h2>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="value" fill="#2563eb" />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );
}