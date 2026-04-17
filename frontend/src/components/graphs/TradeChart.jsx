import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function TradeChart({ data }) {

  if (!data) return null;

  // ✅ HANDLE MULTIPLE BACKEND FORMATS

  const exportsVal =
    data?.exports ??

    data?.Exports ??
    data?.simulation_results?.policy?.exports ??
    
    0;

  const importsVal =
    data?.imports ??
    data?.Imports ??
    data?.simulation_results?.policy?.imports ??
    0;

  const balanceVal =
    data?.tradeBalance ??
    data?.trade_balance ??
    data?.simulation_results?.policy?.tradeBalance ??
    0;

  const chartData = [
    { name: "Exports", value: exportsVal },
    { name: "Imports", value: importsVal },
    { name: "Balance", value: balanceVal }
  ];

  return (
    <div className="">

      

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip
            formatter={(value) => value.toFixed(2)}
          />

          <Bar dataKey="value" fill="#2563eb" />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}