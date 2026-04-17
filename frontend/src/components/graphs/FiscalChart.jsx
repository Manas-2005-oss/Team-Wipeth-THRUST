import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
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
    { name: "Deficit", value: deficit },
    { name: "Tax Revenue", value: taxRevenue },
    { name: "Gov Spending", value: govSpending }
  ];

  return (
    <div className="">

      

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          {/* 🔵 BLUE COLOR */}
          <Bar dataKey="value" fill="#2563eb" />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}