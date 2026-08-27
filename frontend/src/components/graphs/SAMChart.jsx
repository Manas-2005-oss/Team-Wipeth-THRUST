import { useState } from "react";
import {
  Sankey,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ECONOMIST MODE THEME */
const nodeColors = [
  "#25245f",
  "#35347b",
  "#4c4aa3",
  "#6562b8",
  "#7976c8",
];

export default function SAMChart({ data }) {
  const [activeNode, setActiveNode] =
    useState(null);

  if (!data?.nodes?.length || !data?.links?.length) {
    return (
      <div className="flex h-[420px] w-full items-center justify-center rounded-xl border border-[#dedee8] bg-[#f7f6fa]">
        <p className="text-sm text-[#7b7890]">
          No SAM data available
        </p>
      </div>
    );
  }

  /*
    Check whether a node is directly
    connected to the hovered node.
  */
  const isNodeConnected = (index) => {
    if (activeNode === null) {
      return false;
    }

    if (index === activeNode) {
      return true;
    }

    return data.links.some((link) => {
      const source =
        typeof link.source === "object"
          ? link.source.index
          : Number(link.source);

      const target =
        typeof link.target === "object"
          ? link.target.index
          : Number(link.target);

      return (
        (source === activeNode &&
          target === index) ||
        (target === activeNode &&
          source === index)
      );
    });
  };

  return (
    <div className="h-[420px] w-full overflow-hidden rounded-xl border border-[#dedee8] bg-[#f7f6fa]">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <Sankey
          data={data}
          nodePadding={32}
          nodeWidth={24}
          linkCurvature={0.5}
          margin={{
            top: 32,
            bottom: 32,
            left: 125,
            right: 125,
          }}
          node={(props) => {
            const {
              x,
              y,
              width,
              height,
              index,
              payload,
            } = props;

            /*
              Use Recharts internal node index.
            */
            const currentIndex =
              payload?.index ?? index;

            const isActive =
              activeNode === currentIndex;

            const isConnected =
              isNodeConnected(currentIndex);

            const color =
              nodeColors[
                currentIndex %
                  nodeColors.length
              ];

            const isLeftSide =
              payload?.depth === 0;

            const nodeHeight =
              Math.max(height, 5);

            const labelX =
              isLeftSide
                ? x - 16
                : x + width + 16;

            const labelAnchor =
              isLeftSide
                ? "end"
                : "start";

            /*
              Highlight hovered and connected nodes.
            */
            const opacity =
              activeNode === null
                ? 1
                : isActive
                ? 1
                : isConnected
                ? 1
                : 0.22;

            const glowOpacity =
              isActive
                ? 0.32
                : isConnected
                ? 0.18
                : 0;

            return (
              <g
                style={{
                  cursor: "pointer",
                  opacity,
                  transition:
                    "opacity 280ms ease",
                }}
                onMouseEnter={() =>
                  setActiveNode(currentIndex)
                }
                onMouseLeave={() =>
                  setActiveNode(null)
                }
              >
                {/* OUTER NODE GLOW */}
                <rect
                  x={x - 10}
                  y={y - 10}
                  width={width + 20}
                  height={nodeHeight + 20}
                  rx={12}
                  fill={color}
                  opacity={glowOpacity}
                  style={{
                    pointerEvents: "none",
                    transition:
                      "opacity 280ms ease",
                  }}
                />

                {/* SECOND NODE GLOW */}
                <rect
                  x={x - 5}
                  y={y - 5}
                  width={width + 10}
                  height={nodeHeight + 10}
                  rx={9}
                  fill={color}
                  opacity={
                    isActive
                      ? 0.2
                      : isConnected
                      ? 0.1
                      : 0
                  }
                  style={{
                    pointerEvents: "none",
                    transition:
                      "opacity 280ms ease",
                  }}
                />

                {/* MAIN NODE */}
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={nodeHeight}
                  rx={6}
                  fill={color}
                  stroke={
                    isActive
                      ? "#ffffff"
                      : isConnected
                      ? "#e5e4f5"
                      : "#ffffff"
                  }
                  strokeWidth={
                    isActive
                      ? 4
                      : isConnected
                      ? 3
                      : 2
                  }
                  filter={
                    isActive
                      ? "drop-shadow(0px 5px 10px rgba(37,36,95,0.45))"
                      : isConnected
                      ? "drop-shadow(0px 3px 8px rgba(37,36,95,0.28))"
                      : "none"
                  }
                  style={{
                    transition:
                      "all 280ms ease",
                  }}
                />

                {/* NODE NAME */}
                <text
                  x={labelX}
                  y={
                    y +
                    nodeHeight / 2 -
                    3
                  }
                  textAnchor={labelAnchor}
                  fontSize={
                    isActive
                      ? "13"
                      : "12"
                  }
                  fontWeight={
                    isActive
                      ? "800"
                      : isConnected
                      ? "750"
                      : "700"
                  }
                  fill={
                    isActive ||
                    isConnected
                      ? color
                      : "#25245f"
                  }
                  fontFamily="Inter, Arial, sans-serif"
                  style={{
                    transition:
                      "all 280ms ease",
                  }}
                >
                  {payload?.name || "Node"}
                </text>

                {/* NODE VALUE */}
                <text
                  x={labelX}
                  y={
                    y +
                    nodeHeight / 2 +
                    14
                  }
                  textAnchor={labelAnchor}
                  fontSize="9"
                  fontWeight={
                    isActive ||
                    isConnected
                      ? "700"
                      : "500"
                  }
                  fill={
                    isActive ||
                    isConnected
                      ? "#4c4aa3"
                      : "#7b7890"
                  }
                  fontFamily="Inter, Arial, sans-serif"
                  style={{
                    transition:
                      "all 280ms ease",
                  }}
                >
                  {Number.isFinite(
                    Number(payload?.value)
                  )
                    ? `Value: ${Number(
                        payload.value
                      ).toLocaleString(
                        undefined,
                        {
                          maximumFractionDigits: 1,
                        }
                      )}`
                    : ""}
                </text>
              </g>
            );
          }}
          link={(props) => {
            const {
              sourceX,
              targetX,
              sourceY,
              targetY,
              sourceControlX,
              targetControlX,
              linkWidth,
              payload,
            } = props;

            const path = `
              M${sourceX},${sourceY}
              C${sourceControlX},${sourceY}
              ${targetControlX},${targetY}
              ${targetX},${targetY}
            `;

            const sourceIndex =
              payload?.source?.index ??
              Number(payload?.source);

            const targetIndex =
              payload?.target?.index ??
              Number(payload?.target);

            /*
              Check whether this line
              is connected to the
              currently hovered node.
            */
            const isActiveLink =
              activeNode !== null &&
              (
                sourceIndex === activeNode ||
                targetIndex === activeNode
              );

            return (
              <g>
                {/* BIG SOFT GLOW */}
                {isActiveLink && (
                  <path
                    d={path}
                    fill="none"
                    stroke="#7976c8"
                    strokeWidth={
                      Math.max(
                        linkWidth + 18,
                        20
                      )
                    }
                    strokeOpacity={0.38}
                    strokeLinecap="round"
                    filter="url(#connectionGlow)"
                    style={{
                      transition:
                        "all 280ms ease",
                    }}
                  />
                )}

                {/* MIDDLE GLOW */}
                {isActiveLink && (
                  <path
                    d={path}
                    fill="none"
                    stroke="#6562b8"
                    strokeWidth={
                      Math.max(
                        linkWidth + 9,
                        10
                      )
                    }
                    strokeOpacity={0.5}
                    strokeLinecap="round"
                    style={{
                      transition:
                        "all 280ms ease",
                    }}
                  />
                )}

                {/* MAIN FLOW LINE */}
                <path
                  d={path}
                  fill="none"
                  stroke={
                    isActiveLink
                      ? "#25245f"
                      : "#7976c8"
                  }
                  strokeWidth={
                    isActiveLink
                      ? Math.max(
                          linkWidth + 2,
                          4
                        )
                      : Math.max(
                          linkWidth,
                          2
                        )
                  }
                  strokeOpacity={
                    activeNode === null
                      ? 0.34
                      : isActiveLink
                      ? 0.95
                      : 0.035
                  }
                  strokeLinecap="round"
                  style={{
                    transition:
                      `
                        stroke 280ms ease,
                        stroke-opacity 280ms ease,
                        stroke-width 280ms ease
                      `,
                  }}
                />
              </g>
            );
          }}
        >
          {/* GLOW FILTER */}
          <defs>
            <filter
              id="connectionGlow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur
                stdDeviation="8"
                result="blur"
              />

              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <Tooltip
            contentStyle={{
              backgroundColor: "#25245f",
              border: "none",
              borderRadius: "10px",
              boxShadow:
                "0 10px 25px rgba(37,36,95,0.2)",
              color: "#ffffff",
              fontSize: "12px",
              padding: "10px 12px",
            }}
            labelStyle={{
              color: "#ffffff",
              fontWeight: 700,
            }}
            itemStyle={{
              color: "#e5e4f5",
            }}
          />
        </Sankey>
      </ResponsiveContainer>
    </div>
  );
}