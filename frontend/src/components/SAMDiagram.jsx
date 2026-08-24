import { useEffect, useRef } from "react";
import * as d3 from "d3";
import {
  sankey,
  sankeyLinkHorizontal,
  sankeyJustify,
} from "d3-sankey";

export default function SAMDiagram({ sam }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!sam?.nodes?.length || !sam?.links?.length) return;

    const svg = d3.select(svgRef.current);

    // Clear previous diagram
    svg.selectAll("*").remove();

    const width = 850;
    const height = 340;

    // Theme colors
    const nodeColors = [
      "#25245f",
      "#4b4a88",
      "#6d6ba8",
      "#8b88bc",
      "#5b5a9d",
    ];

    try {
      // More space on both sides for labels
      const leftPadding = 135;
      const rightPadding = 135;
      const topPadding = 25;
      const bottomPadding = 25;

      const sankeyGenerator = sankey()
        .nodeWidth(20)
        .nodePadding(25)
        .nodeAlign(sankeyJustify)
        .extent([
          [leftPadding, topPadding],
          [
            width - rightPadding,
            height - bottomPadding,
          ],
        ]);

      const graph = sankeyGenerator({
        nodes: sam.nodes.map((d) => ({
          ...d,
        })),
        links: sam.links.map((d) => ({
          ...d,
        })),
      });

      svg
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("width", "100%")
        .attr("height", "100%");

      // Background
      svg
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("rx", 14)
        .attr("fill", "#eeedf3");

      // Gradient definition
      const defs = svg.append("defs");

      const gradient = defs
        .append("linearGradient")
        .attr("id", "sankeyGradient")
        .attr("gradientUnits", "userSpaceOnUse");

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#25245f");

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#9b99c7");

      // LINKS
      svg
        .append("g")
        .attr("class", "links")
        .selectAll("path")
        .data(graph.links)
        .join("path")
        .attr("d", sankeyLinkHorizontal())
        .attr("fill", "none")
        .attr("stroke", "#5b5a9d")
        .attr("stroke-width", (d) =>
          Math.max(2, d.width)
        )
        .attr("stroke-opacity", 0.28)
        .attr("stroke-linecap", "round");

      // NODES
      const nodes = svg
        .append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(graph.nodes)
        .join("g");

      nodes
        .append("rect")
        .attr("x", (d) => d.x0)
        .attr("y", (d) => d.y0)
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) =>
          Math.max(4, d.y1 - d.y0)
        )
        .attr("rx", 5)
        .attr("fill", (d, index) =>
          nodeColors[index % nodeColors.length]
        )
        .attr("stroke", "#f7f5f2")
        .attr("stroke-width", 2);

      // LABELS
      nodes
        .append("text")
        .attr("x", (d) => {
          // Left side nodes
          if (d.x0 < width / 2) {
            return d.x0 - 12;
          }

          // Right side nodes
          return d.x1 + 12;
        })
        .attr("y", (d) =>
          (d.y0 + d.y1) / 2
        )
        .attr("dy", "0.35em")
        .attr("text-anchor", (d) =>
          d.x0 < width / 2
            ? "end"
            : "start"
        )
        .attr("fill", "#3f3d58")
        .attr("font-size", "12px")
        .attr("font-weight", "600")
        .attr("font-family", "Inter, Arial, sans-serif")
        .text((d) => d.name || "Node");

      // Node value display
      nodes
        .append("text")
        .attr("x", (d) =>
          d.x0 < width / 2
            ? d.x0 - 12
            : d.x1 + 12
        )
        .attr("y", (d) =>
          (d.y0 + d.y1) / 2 + 15
        )
        .attr("text-anchor", (d) =>
          d.x0 < width / 2
            ? "end"
            : "start"
        )
        .attr("fill", "#89869a")
        .attr("font-size", "9px")
        .attr("font-weight", "500")
        .text((d) => {
          if (d.value === undefined) return "";

          return `Value: ${Number(
            d.value
          ).toLocaleString()}`;
        });

      // HOVER EFFECT
      nodes
        .style("cursor", "pointer")
        .on("mouseenter", function (
          event,
          activeNode
        ) {
          svg
            .selectAll(".links path")
            .transition()
            .duration(200)
            .attr("stroke-opacity", (link) => {
              return link.source === activeNode ||
                link.target === activeNode
                ? 0.75
                : 0.06;
            });

          d3.select(this)
            .select("rect")
            .transition()
            .duration(200)
            .attr("stroke", "#25245f")
            .attr("stroke-width", 3);
        })
        .on("mouseleave", function () {
          svg
            .selectAll(".links path")
            .transition()
            .duration(200)
            .attr("stroke-opacity", 0.28);

          d3.select(this)
            .select("rect")
            .transition()
            .duration(200)
            .attr("stroke", "#f7f5f2")
            .attr("stroke-width", 2);
        });

    } catch (error) {
      console.error(
        "SAM Diagram Error:",
        error
      );
    }
  }, [sam]);

  if (!sam) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#eeedf3] text-sm text-[#777489]">
        No SAM data available
      </div>
    );
  }

  if (!sam.nodes?.length || !sam.links?.length) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#eeedf3] text-sm text-[#777489]">
        Invalid SAM data
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-hidden rounded-xl bg-[#eeedf3]">
      <svg
        ref={svgRef}
        className="block h-full w-full"
      />
    </div>
  );
}