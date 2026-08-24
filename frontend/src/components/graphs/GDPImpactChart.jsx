import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function GDPImpactChart({ data }) {

  if (!data) return null;

  // ✅ SUPPORT BOTH BACKEND FORMATS

  const baselineGDP =
    data?.simulation_results?.baseline?.GDP ??
    data?.baselineGDP ??
    3.5; // fallback baseline

  const policyGDP =
    data?.simulation_results?.policy?.GDP ??
    data?.GDP ??
    0;

  const chartData = [
    { name: "Baseline", GDP: baselineGDP },
    { name: "Policy", GDP: policyGDP }
  ];

  return (

    <div className="bg-white p-6 rounded-xl shadow-sm">

      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        GDP Impact
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="GDP" fill="#070808" />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );
}