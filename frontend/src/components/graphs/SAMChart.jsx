import {
  Sankey,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const nodeColors = [
  "#3b82f6", // Labor
  "#8b5cf6", // Capital
  "#22c55e", // Agriculture
  "#f59e0b", // Manufacturing
  "#06b6d4"  // Services
];

export default function SAMChart({ data }) {

  if (!data) return null;

  return (
    <div className="">

       

      <ResponsiveContainer width="100%" height={420}>

        <Sankey
          data={data}
          nodePadding={50}
          nodeWidth={25}
          linkCurvature={0.5}
          margin={{ top: 20, bottom: 20, left: 50, right: 50 }}

          node={(props) => {
            const { x, y, width, height, index, payload } = props;
            return (
              <g>
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={nodeColors[index]}
                  rx={4}
                />
                <text
                  x={x + width / 2}
                  y={y - 8}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#374151"
                >
                  {payload.name}
                </text>
              </g>
            );
          }}

          link={(props) => {
            const { sourceX, targetX, sourceY, targetY, sourceControlX, targetControlX, linkWidth } = props;

            const path = `
              M${sourceX},${sourceY}
              C${sourceControlX},${sourceY}
              ${targetControlX},${targetY}
              ${targetX},${targetY}
            `;

            return (
              <path
                d={path}
                stroke="#94a3b8"
                strokeWidth={linkWidth}
                fill="none"
                opacity={0.7}
              />
            );
          }}
        >

          <Tooltip />

        </Sankey>

      </ResponsiveContainer>

    </div>
  );
}