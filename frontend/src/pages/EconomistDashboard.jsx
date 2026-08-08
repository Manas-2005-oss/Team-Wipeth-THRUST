import { useState, useEffect } from "react";
import EconomistNavbar from "../components/EconomistNavbar";

import ForecastChart from "../components/graphs/ForecastChart";
import SectorPieChart from "../components/graphs/SectorPieChart";
import TradeChart from "../components/graphs/TradeChart";
import FiscalChart from "../components/graphs/FiscalChart";
import SAMChart from "../components/graphs/SAMChart";

import SectorContributionChart from "../components/graphs/SectorContributionChart";
import GDPGrowthChart from "../components/graphs/GDPGrowthChart";
import PolicyImpactChart from "../components/graphs/PolicyImpactChart";
import LaborMarketChart from "../components/graphs/LaborMarketChart";

import { saveLLMSession } from "../services/llmHistory";

// Icons
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Globe,
  Activity,
  PieChart
} from "lucide-react";

export default function EconomistDashboard() {

  const [policy, setPolicy] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // closure selector (added)
  const [closure, setClosure] = useState("savings");

  const runSimulation = async () => {
    if (!policy.trim()) return;

    setLoading(true);

    try {

      const response = await fetch("http://localhost:8000/simulate-policy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          policy: policy,
          closure: closure
        })
      });

      const data = await response.json();
      console.log(data);

      setResults(data);

      // Save AI session
      await saveLLMSession({
        title:
          policy.length > 50
            ? policy.substring(0, 50) + "..."
            : policy,
        prompt: policy,
        response: data,
        closure: closure,
      });

    } catch (error) {

      console.error("Error:", error);

    }

    setLoading(false);
  };

  const graphCard = "bg-white border rounded-xl p-5 shadow-sm";

  useEffect(() => {
    const prompt = sessionStorage.getItem("llmPrompt");
    const savedClosure = sessionStorage.getItem("llmClosure");

    if (prompt) {
      setPolicy(prompt);
      sessionStorage.removeItem("llmPrompt");
    }

    if (savedClosure) {
      setClosure(savedClosure);
      sessionStorage.removeItem("llmClosure");
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 min-h-screen">

      <EconomistNavbar />

      <div className="p-10 max-w-7xl mx-auto space-y-10">

        {/* TITLE */}
        <h1 className="text-4xl font-bold tracking-wide text-gray-800 text-gray-800 text-center flex items-center justify-center gap-2 mt-20">
          AI-Driven Economic Policy Simulator
        </h1>

        {/* INPUT PANEL */}
        <div className="flex justify-center mt-10">
          <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl 
p-8 rounded-2xl w-full max-w-2xl space-y-6">

            {/* TEXTAREA */}
            <textarea
              className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Example: Increase import tariff by 10%"
              value={policy}
              onChange={(e) => setPolicy(e.target.value)}
            />

            {/* DROPDOWN */}
            <div>
              <label className="text-sm font-medium text-black-200 block mb-1">
                Macroeconomic Closure Rule
              </label>

              <select
                value={closure}
                onChange={(e) => setClosure(e.target.value)}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="savings">Savings-Investment Closure</option>
                <option value="government">Government Budget Closure</option>
                <option value="external">External Sector Closure</option>
              </select>
            </div>

            {/* BUTTON */}
            <div className="flex justify-center pt-2">
              <button
                onClick={runSimulation}
                disabled={loading}
                className={`px-8 py-2 rounded-md text-white flex items-center gap-2 transition-all duration-300
        ${loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-md"
                  }`}
              >
                <Activity size={16} />
                {loading ? "Running..." : "Run Simulation"}
              </button>
            </div>

          </div>
        </div>

        {/* KPI */}
        {results && (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">

            {[
              { title: "GDP", key: "GDP", type: "currency" },
              { title: "Unemployment", key: "unemployment", type: "percent" },
              { title: "Inflation", key: "inflation", type: "percent" },
              { title: "Exports", key: "exports", type: "currency" },
              { title: "Imports", key: "imports", type: "currency" },
              { title: "Trade Balance", key: "tradeBalance", type: "currency" },
            ].map((item) => {

              const value = results?.simulation_results?.policy?.[item.key] || 0;

              const baseline = results?.simulation_results?.baseline?.[item.key] || 0;
              const change = value - baseline;

              const isPositive = change >= 0;

              // ✅ GDP + Currency formatter (FIXED)
              const formatCurrency = (val) => {
                if (!val) return "$0.00";

                if (val >= 1e12) return `$${(val / 1e12).toFixed(2)}T`;
                if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;

                return `$${val.toFixed(2)}`;
              };

              return (
                <div
                  key={item.title}
                  className="group bg-white/60 backdrop-blur-xl border border-white/30
  p-5 rounded-xl flex justify-between items-center
  shadow-md hover:shadow-2xl hover:-translate-y-1
  transition-all duration-300 font-medium"
                >
                  <div>
                    <h3 className="text-black-500 text-sm">{item.title}</h3>

                    <p className="text-2xl font-bold text-gray-800 tracking-wide">
                      {item.type === "currency"
                        ? formatCurrency(value)
                        : `${value.toFixed(2)}%`}
                    </p>

                    {/* ✅ CHANGE VALUE */}
                    <p className={`text-xs ${isPositive ? "text-green-500 drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]" : "text-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]"}`}>
                      {isPositive ? "+" : ""}
                      {change.toFixed(2)}
                    </p>
                  </div>

                  {/* ✅ ANIMATED ICON */}
                  <div
                    className={`${isPositive ? "text-green-500 drop-shadow-[0_0_6px_rgba(34,197,94,0.6)] transition-transform duration-300 group-hover:scale-110" : "text-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.6)] transition-transform duration-300 group-hover:scale-110"
                      }`}
                  >
                    {isPositive ? <TrendingUp /> : <TrendingDown />}
                  </div>
                </div>
              );
            })}

          </div>

        )}

        {/* CLOSURE RULES DISPLAY */}
        {results?.closure_rules && (
          <div className="bg-white border p-5 rounded-lg">
            <h2 className="text-lg font-semibold text-black-700 mb-4 flex items-center gap-2">
              <Globe size={18} /> Model Closure Rules
            </h2>

            <div className="grid grid-cols-3 gap-6 text-center">

              <div>
                <p className="text-sm font-medium text-gray-500">Fiscal</p>
                <p className="font-medium">
                  {results.closure_rules.fiscal_closure || "—"}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Labor</p>
                <p className="font-medium">
                  {results.closure_rules.labor_closure || "—"}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">External</p>
                <p className="font-medium">
                  {results.closure_rules.external_closure || "—"}
                </p>
              </div>

            </div>
          </div>
        )}
        {/* TABS */}
        {results && (

          <div className="flex gap-10 border-b justify-center">

            {["overview", "sector", "trade"].map(tab => (

              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`capitalize pb-2 font-medium ${activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
                  }`}
              >

                {tab}

              </button>

            ))}

          </div>

        )}

        {/* CHARTS */}
        {results && (

          <div className="space-y-8">

            {/* OVERVIEW */}
            {activeTab === "overview" && (

              <div className="grid grid-cols-1 gap-6">

                {results?.gdp_forecast && (

                  <div className={graphCard}>
                    <h2 className="flex items-center gap-2 mb-2  font-medium text-black-600">
                      <TrendingUp size={16} /> GDP Forecast
                    </h2>

                    <ForecastChart data={results.gdp_forecast} />

                  </div>

                )}

                {results?.gdp_forecast && (

                  <div className={graphCard}>
                    <h2 className="flex items-center gap-2 mb-2 font-medium text-black-600">
                      <BarChart3 size={16} /> GDP Growth
                    </h2>

                    <GDPGrowthChart data={results.gdp_forecast} />

                  </div>

                )}

                {/* ✅ NEW: POLICY IMPACT CHART */}
                {results?.simulation_results && (

                  <div className={graphCard}>
                    <h2 className="flex items-center gap-2 mb-2 font-medium text-black-600">
                      <BarChart3 size={16} /> Policy Impact
                    </h2>

                    <PolicyImpactChart
                      baseline={results.simulation_results.baseline}
                      policy={results.simulation_results.policy}
                    />

                  </div>

                )}

                {/* ✅ NEW: LABOR MARKET CHART */}
                {results?.simulation_results && (

                  <div className={graphCard}>
                    <h2 className="flex items-center gap-2 mb-2 font-medium text-black-600">
                      <Activity size={16} /> Labor Market
                    </h2>

                    <LaborMarketChart
                      data={results.simulation_results.policy}
                    />

                  </div>

                )}

              </div>

            )}

            {/* SECTOR */}
            {activeTab === "sector" && (

              <div className="grid grid-cols-1 gap-6">

                {results?.sector_output && (

                  <div className={graphCard}>

                    <h2 className="flex items-center gap-2 mb-2 font-medium text-black-600">
                      <PieChart size={16} /> Sector Distribution
                    </h2>

                    <SectorPieChart data={results?.simulation_results?.policy?.sectorOutput} />

                  </div>

                )}

                {results?.sector_output && (

                  <div className={graphCard}>

                    <h2 className="flex items-center gap-2 mb-2 font-medium text-black-600">
                      <BarChart3 size={16} /> Sector Contribution
                    </h2>

                    <SectorContributionChart
                      data={results?.simulation_results?.policy?.sectorOutput}
                    />

                  </div>

                )}

                {(results?.sam_matrix || results?.SAM) && (

                  <div className={graphCard}>

                    <h2 className="flex items-center gap-2 mb-2 font-medium text-black-600">
                      <Globe size={16} /> SAM Matrix
                    </h2>

                    <SAMChart data={results.sam_matrix || results.SAM} />

                  </div>

                )}

              </div>

            )}

            {/* TRADE */}
            {activeTab === "trade" && (

              <div className="grid grid-cols-2 gap-6">

                <div className={graphCard}>

                  <h2 className="flex items-center gap-2 mb-2 font-medium text-black-600">
                    <Globe size={16} /> Trade Analysis
                  </h2>

                  <TradeChart data={results?.simulation_results?.policy} />

                </div>

                <div className={graphCard}>

                  <h2 className="flex items-center gap-2 mb-2 font-medium text-black-600">
                    <BarChart3 size={16} /> Fiscal Balance
                  </h2>

                  <FiscalChart data={results?.simulation_results?.policy} />

                </div>

              </div>

            )}

          </div>

        )}

      </div>

    </div>
  );
} 