import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function SectorPieChart({ data }) {
  if (!data) return null;

  const agriculture =
    Number(
      data?.agriculture ??
        data?.Agriculture ??
        data?.[0] ??
        0
    );

  const manufacturing =
    Number(
      data?.manufacturing ??
        data?.Manufacturing ??
        data?.[1] ??
        0
    );

  const services =
    Number(
      data?.services ??
        data?.Services ??
        data?.[2] ??
        0
    );

  // Convert values to percentages
  const total = agriculture + manufacturing + services;

  const chartData =
    total > 0
      ? [
          {
            name: "Agriculture",
            value: (agriculture / total) * 100,
          },
          {
            name: "Manufacturing",
            value: (manufacturing / total) * 100,
          },
          {
            name: "Services",
            value: (services / total) * 100,
          },
        ]
      : [
          {
            name: "Agriculture",
            value: 0,
          },
          {
            name: "Manufacturing",
            value: 0,
          },
          {
            name: "Services",
            value: 0,
          },
        ];

  // CGE PROJECT THEME COLORS
  const COLORS = [
    "#25245f", // Deep Navy
    "#5b5a9d", // Indigo Purple
    "#9b99c7", // Soft Lavender
  ];

  return (
    <div
      className="
        relative
        w-full
        overflow-hidden
        rounded-[18px]
        border
        border-[#cfcddd]
        bg-[#f7f5f2]
        p-4
        shadow-[0_8px_24px_rgba(37,36,95,0.08)]
      "
    >
      {/* BACKGROUND DECORATION */}
      <div
        className="
          pointer-events-none
          absolute
          -left-20
          -top-20
          h-48
          w-48
          rounded-full
          bg-[#25245f]/5
        "
      />

      {/* HEADER */}
      <div
        className="
          relative
          z-10
          mb-2
          flex
          items-center
          justify-between
        "
      >
        <div>
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-[#6c6a91]
            "
          >
            Economic Structure
          </p>

          <h2
            className="
              mt-1
              text-lg
              font-bold
              text-[#25245f]
            "
          >
            Sector Distribution
          </h2>
        </div>

        <div
          className="
            rounded-full
            border
            border-[#d8d5e6]
            bg-[#e9e7f0]
            px-3
            py-1
            text-[9px]
            font-bold
            uppercase
            tracking-wider
            text-[#25245f]
          "
        >
          Sectors
        </div>
      </div>

      {/* CHART AREA */}
      <div
        className="
          relative
          z-10
          rounded-[14px]
          border
          border-[#d8d5e2]
          bg-[#eeedf3]
          p-2
        "
      >
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius={52}
              outerRadius={95}
              paddingAngle={3}
              cornerRadius={6}
              stroke="#f7f5f2"
              strokeWidth={3}
              labelLine={false}
              label={({ value }) =>
                value > 0 ? `${value.toFixed(1)}%` : ""
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`sector-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            {/* CENTER CONTENT */}
            <text
              x="50%"
              y="43%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#25245f"
              fontSize="13"
              fontWeight="700"
            >
              SECTOR
            </text>

            <text
              x="50%"
              y="51%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#777489"
              fontSize="10"
            >
              DISTRIBUTION
            </text>

            {/* THEME TOOLTIP */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#fdfcfb",
                border: "1px solid #cfcddd",
                borderRadius: "12px",
                boxShadow:
                  "0 12px 30px rgba(37, 36, 95, 0.18)",
                padding: "10px 14px",
              }}
              labelStyle={{
                color: "#25245f",
                fontWeight: 700,
                fontSize: "12px",
              }}
              itemStyle={{
                color: "#35347b",
                fontWeight: 600,
                fontSize: "12px",
              }}
              formatter={(value) => [
                `${Number(value).toFixed(1)}%`,
                "Share",
              ]}
            />

            {/* CUSTOM THEME LEGEND */}
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span
                  style={{
                    color: "#5f5c70",
                    fontSize: "11px",
                    fontWeight: 600,
                    marginLeft: "4px",
                  }}
                >
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* FOOTER */}
      <div
        className="
          relative
          z-10
          mt-3
          flex
          items-center
          justify-between
          px-1
        "
      >
        <div className="flex items-center gap-2">
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-[#25245f]
            "
          />

          <span className="text-[10px] text-[#777489]">
            Sector-wise economic contribution
          </span>
        </div>

        <span
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-wider
            text-[#6c6a91]
          "
        >
          CGE Model
        </span>
      </div>
    </div>
  );
}