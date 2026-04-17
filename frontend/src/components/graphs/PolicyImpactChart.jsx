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

export default function PolicyImpactChart({ baseline, policy }) {

  if (!baseline || !policy) return null;

  const data = [
    { name: "GDP", Baseline: baseline.GDP || 0, Policy: policy.GDP || 0 },
    { name: "Inflation", Baseline: baseline.inflation || 0, Policy: policy.inflation || 0 },
    { name: "Unemployment", Baseline: baseline.unemployment || 0, Policy: policy.unemployment || 0 },
    { name: "Exports", Baseline: baseline.exports || 0, Policy: policy.exports || 0 },
    { name: "Imports", Baseline: baseline.imports || 0, Policy: policy.imports || 0 }
  ];

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        {/* Light Blue (Baseline) */}
        <Bar dataKey="Baseline" fill="#93c5fd" radius={[6, 6, 0, 0]} />

        {/* Dark Blue (Policy) */}
        <Bar dataKey="Policy" fill="#2563eb" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}