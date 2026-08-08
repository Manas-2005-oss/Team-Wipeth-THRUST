import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getSimulationById } from "../services/simulationHistory";

export default function SimulationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSimulation();
  }, []);

  async function loadSimulation() {
    try {
      const data = await getSimulationById(id);
      setSimulation(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">

      <button
        onClick={() => navigate("/history")}
        className="flex items-center gap-2 mb-8 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold">
          {simulation.policy_name}
        </h1>

        <p className="text-gray-500 mt-2">
          {new Date(simulation.created_at).toLocaleString()}
        </p>

        <div className="grid grid-cols-3 gap-8 mt-10">

          <div>
            <h3 className="text-gray-500">GDP</h3>
            <p className="text-3xl font-bold">{simulation.gdp}</p>
          </div>

          <div>
            <h3 className="text-gray-500">Inflation</h3>
            <p className="text-3xl font-bold">{simulation.inflation}</p>
          </div>

          <div>
            <h3 className="text-gray-500">Unemployment</h3>
            <p className="text-3xl font-bold">{simulation.unemployment}</p>
          </div>

        </div>

      </div>

    </div>
  );
}