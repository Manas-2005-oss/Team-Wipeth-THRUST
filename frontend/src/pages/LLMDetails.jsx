import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getLLMSessionById } from "../services/llmHistory";

export default function LLMDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    try {
      const data = await getLLMSessionById(id);
      setSession(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-10">
        Session not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="max-w-6xl mx-auto p-8">

        <button
          onClick={() => navigate("/llm-history")}
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-lg border hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="bg-white rounded-xl shadow-md p-8">

          <h1 className="text-3xl font-bold">
            {session.title}
          </h1>

          <p className="text-gray-500 mt-2">
            {new Date(session.created_at).toLocaleString()}
          </p>

          <div className="mt-8">

            <h2 className="text-xl font-semibold mb-3">
              Policy Prompt
            </h2>

            <div className="bg-slate-100 rounded-lg p-5">
              {session.prompt}
            </div>

          </div>

          <div className="mt-8">

            <h2 className="text-xl font-semibold mb-3">
              AI Response
            </h2>

            <pre className="bg-slate-100 rounded-lg p-5 overflow-auto">
              {JSON.stringify(session.response, null, 2)}
            </pre>

          </div>

        </div>

      </div>

    </div>
  );
}