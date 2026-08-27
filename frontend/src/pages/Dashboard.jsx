import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import LeftPanel from "../components/LeftPanel";
import ResultsPanel from "../components/ResultPanel";
import SimulationHistory from "../components/SimulationHistory";


import {
  saveSimulation,
  getSimulationHistory, getSimulationById,
  deleteSimulation,
} from "../services/simulationHistory";

export default function Dashboard() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  // Load history when dashboard opens
  useEffect(() => {
    loadHistory();
  }, []);

  // Function to fetch simulation history
  const loadHistory = async () => {
    try {
      const historyData = await getSimulationHistory("user");
      console.log("History:", historyData);
      setHistory(historyData);
    } catch (err) {
      console.error("History Error:", err);
    }
  };

  const handleRun = async (inputs) => {
    try {
      setLoading(true);
      setError(null);

      // 1️⃣ Run Simulation
      const response = await fetch("http://127.0.0.1:8000/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      if (!response.ok) {
        throw new Error("Simulation failed");
      }

      const data = await response.json();

      setResults(data);
      window.simulationData = data;

      // Save simulation to Supabase
      await saveSimulation({
        mode: "user",
        policyName: `Scenario_${Date.now()}`,
        results: data,
        inputs: inputs,
      });

      // Refresh history immediately
      await loadHistory();

      // 2️⃣ Save Scenario to FastAPI
      await fetch(
        `http://127.0.0.1:8000/save_scenario/Scenario_${Date.now()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        }
      );

      setLoading(false);
    } catch (err) {
      console.error("Simulation error:", err);
      setError("Failed to connect to backend.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Policy Input Panel */}
      <LeftPanel onRun={handleRun} />

      <div className="p-8">
        {loading && (
          <div className="text-blue-600 text-lg font-semibold">
            Running Simulation...
          </div>
        )}

        {error && (
          <div className="text-red-600 font-semibold">
            {error}
          </div>
        )}

        {!loading && !results && !error && (
          <div className="text-gray-400 text-xl text-center mt-8">
            Click "Run Simulator" to generate economic results.
          </div>
        )}

        {!loading && results && (
          <ResultsPanel results={results} />
        )}

       
      </div>
    </div>
  );
}