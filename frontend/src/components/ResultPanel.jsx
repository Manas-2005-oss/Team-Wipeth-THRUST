import { useEffect, useState } from "react";

import SAMDiagram from "./SAMDiagram";
import PolicySummary from "./PolicySummary";
import ConvergenceChart from "./ConvergenceChart";
import ScenarioComparison from "./ScenarioComparison";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

/* ================= THEME ================= */

const COLORS = [
  "#25245f",
  "#5b5a9d",
  "#9b99c7",
];

const THEME = {
  primary: "#25245f",
  secondary: "#5b5a9d",
  tertiary: "#9b99c7",

  pageBg: "#eeedf3",
  cardBg: "#fdfcfb",
  chartBg: "#eeedf3",

  text: "#25245f",
  mutedText: "#777489",

  border: "#d8d5e2",
  grid: "#d8d5e2",

  positive: "#52745c",
  negative: "#a15b5b",
};

/* ================= MAIN COMPONENT ================= */

export default function ResultsPanel({ results }) {
  const [comparisonData, setComparisonData] =
    useState(null);

  /* ================= FETCH SCENARIOS ================= */

  useEffect(() => {
    if (!results) return;

    const fetchComparison = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/compare"
        );

        if (!res.ok) return;

        const data = await res.json();

        setComparisonData(data);
      } catch (err) {
        console.error(
          "Comparison fetch failed:",
          err
        );
      }
    };

    fetchComparison();
  }, [results]);

  /* ================= EXPORT ================= */

  const handleExport = () => {
    window.print();
  };

  if (!results || !results.policy) return null;

  const {
    baseline = {},
    policy = {},
    changes = {},
    SAM,
  } = results;

  /* ================= DATA ================= */

  const gdpTrendData = [
    {
      name: "Baseline",
      GDP: baseline?.GDP ?? 0,
    },
    {
      name: "Policy",
      GDP: policy?.GDP ?? 0,
    },
  ];

  const sectorData = [
    {
      name: "Agriculture",
      value:
        policy?.sectorOutput?.agriculture ?? 0,
    },
    {
      name: "Manufacturing",
      value:
        policy?.sectorOutput?.manufacturing ?? 0,
    },
    {
      name: "Services",
      value:
        policy?.sectorOutput?.services ?? 0,
    },
  ];

  const laborData = [
    {
      name: "Agriculture",
      value:
        (policy?.laborShare?.agriculture ?? 0) *
        100,
    },
    {
      name: "Manufacturing",
      value:
        (policy?.laborShare?.manufacturing ?? 0) *
        100,
    },
    {
      name: "Services",
      value:
        (policy?.laborShare?.services ?? 0) *
        100,
    },
  ];

  const macroData = [
    {
      name: "Inflation",
      value: policy?.inflation ?? 0,
    },
    {
      name: "Deficit",
      value: policy?.deficit ?? 0,
    },
  ];

  return (
    <div className="space-y-8">

      {/* ================= REPORT CONTENT ================= */}

      <div
        id="report-content"
        className="space-y-8"
      >

        {/* ================= KPI CARDS ================= */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-5">

          <Card
            title="GDP"
            value={policy?.GDP ?? 0}
            change={changes?.gdp_change}
          />

          <Card
            title="Unemployment"
            value={`${policy?.unemployment ?? 0}%`}
            change={
              changes?.unemployment_change
            }
          />

          <Card
            title="Inflation"
            value={`${policy?.inflation ?? 0}%`}
            change={
              changes?.inflation_change
            }
          />

          <Card
            title="Wage"
            value={`₹ ${Number(
              policy?.wage ?? 0
            ).toLocaleString("en-IN")}`}
            change={changes?.wage_change}
          />

          <Card
            title="Fiscal Deficit"
            value={policy?.deficit ?? 0}
            change={changes?.deficit_change}
          />

        </div>


        {/* ================= POLICY + CONVERGENCE ================= */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <ChartCard title="Policy Evaluation">

            <PolicySummary data={results} />

          </ChartCard>


          <ChartCard title="Equilibrium Convergence Curve">

            <ConvergenceChart
              convergence={results.convergence}
            />

          </ChartCard>

        </div>


        {/* ================= LABOR ALLOCATION ================= */}

        <ChartCard title="Labor Allocation">

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <PieChart>

              <Pie
                data={laborData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >

                {laborData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index % COLORS.length
                        ]
                      }
                    />
                  )
                )}

              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: THEME.cardBg,
                  border: `1px solid ${THEME.border}`,
                  borderRadius: "10px",
                }}
              />

            </PieChart>

          </ResponsiveContainer>

        </ChartCard>


        {/* ================= GDP + SECTOR ================= */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* GDP IMPACT */}

          <ChartCard
            title="GDP Impact (Baseline vs Policy)"
          >

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <LineChart data={gdpTrendData}>

                <CartesianGrid
                  stroke={THEME.grid}
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                  stroke={THEME.mutedText}
                />

                <YAxis
                  stroke={THEME.mutedText}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor:
                      THEME.cardBg,
                    border: `1px solid ${THEME.border}`,
                    borderRadius: "10px",
                  }}
                />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="GDP"
                  stroke={THEME.primary}
                  strokeWidth={3}
                  dot={{
                    fill: THEME.primary,
                    strokeWidth: 2,
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </ChartCard>


          {/* SECTOR OUTPUT */}

          <ChartCard title="Sector Output">

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <BarChart data={sectorData}>

                <CartesianGrid
                  stroke={THEME.grid}
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                  stroke={THEME.mutedText}
                />

                <YAxis
                  stroke={THEME.mutedText}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor:
                      THEME.cardBg,
                    border: `1px solid ${THEME.border}`,
                    borderRadius: "10px",
                  }}
                />

                <Bar
                  dataKey="value"
                  radius={[6, 6, 0, 0]}
                >

                  {sectorData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index % COLORS.length
                          ]
                        }
                      />
                    )
                  )}

                </Bar>

              </BarChart>

            </ResponsiveContainer>

          </ChartCard>

        </div>


        {/* ================= MACRO + SAM ================= */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* MACRO */}

          <ChartCard
            title="Inflation & Fiscal Pressure"
          >

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <BarChart data={macroData}>

                <CartesianGrid
                  stroke={THEME.grid}
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                  stroke={THEME.mutedText}
                />

                <YAxis
                  stroke={THEME.mutedText}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor:
                      THEME.cardBg,
                    border: `1px solid ${THEME.border}`,
                    borderRadius: "10px",
                  }}
                />

                <Bar
                  dataKey="value"
                  radius={[6, 6, 0, 0]}
                >

                  {macroData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          index === 0
                            ? THEME.secondary
                            : THEME.primary
                        }
                      />
                    )
                  )}

                </Bar>

              </BarChart>

            </ResponsiveContainer>

          </ChartCard>


          {/* SAM */}

          <ChartCard
            title="Social Accounting Matrix (SAM)"
          >

            <div className="h-[320px]">

              <SAMDiagram sam={SAM} />

            </div>

          </ChartCard>

        </div>


        {/* ================= SCENARIO COMPARISON ================= */}

        {comparisonData?.ranking?.length > 0 && (

          <ScenarioComparison
            data={comparisonData}
          />

        )}

      </div>


      {/* ================= EXPORT BUTTON ================= */}

      <div className="flex justify-center pt-4 print:hidden">

        <button
          onClick={handleExport}
          className="
            px-8
            py-3
            rounded-xl
            text-white
            font-semibold
            bg-[#25245f]
            hover:bg-[#35347b]
            shadow-lg
            transition-all
            duration-300
            hover:scale-105
          "
        >
          Export Full Dashboard (PDF)
        </button>

      </div>

    </div>
  );
}


/* ================= KPI CARD ================= */

function Card({
  title,
  value,
  change,
}) {
  const numericChange = Number(change ?? 0);

  const isPositive = numericChange >= 0;

  const showPercent =
    title === "GDP" ||
    title === "Wage";

  return (
    <div
      className="
        bg-[#fdfcfb]
        p-5
        rounded-2xl
        shadow-md
        border
        border-[#d8d5e2]
      "
    >

      <h3 className="text-sm text-[#777489]">
        {title}
      </h3>


      <p
        className="
          text-2xl
          font-bold
          mt-2
          text-[#25245f]
        "
      >
        {value}
      </p>


      <p
        className={`
          text-sm
          mt-2
          ${
            isPositive
              ? "text-[#52745c]"
              : "text-[#a15b5b]"
          }
        `}
      >
        {isPositive ? "▲" : "▼"}

        {" "}

        {Math.abs(numericChange)}

        {showPercent ? "%" : ""}

      </p>

    </div>
  );
}


/* ================= CHART CARD ================= */

function ChartCard({
  title,
  children,
}) {
  return (
    <div
      className="
        bg-[#fdfcfb]
        p-6
        rounded-2xl
        shadow-md
        border
        border-[#d8d5e2]
      "
    >

      <h2
        className="
          text-lg
          font-semibold
          mb-4
          text-[#25245f]
        "
      >
        {title}
      </h2>

      {children}

    </div>
  );
}