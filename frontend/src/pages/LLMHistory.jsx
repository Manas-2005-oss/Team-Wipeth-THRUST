import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BrainCircuit,
  MoreVertical,
  Play,
  Trash2,
  User,
  X,
} from "lucide-react";

import {
  getLLMHistory,
  deleteLLMSession,
  getLLMSessionById,
} from "../services/llmHistory";

export default function History() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openMenu, setOpenMenu] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const loadHistory = async () => {
    try {
      setLoading(true);

      const data = await getLLMHistory();

      setHistory(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading LLM history:", error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleRunAgain = async (id) => {
    try {
      const session = await getLLMSessionById(id);

      if (!session) return;

      sessionStorage.setItem(
        "llmPrompt",
        session.prompt || ""
      );

      sessionStorage.setItem(
        "llmClosure",
        session.closure || ""
      );

      if (session.response) {
        sessionStorage.setItem(
          "llmResponse",
          typeof session.response === "string"
            ? session.response
            : JSON.stringify(session.response)
        );
      }

      setOpenMenu(null);

      navigate("/economist");
    } catch (error) {
      console.error("Error loading LLM session:", error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteLLMSession(deleteId);

      setHistory((previousHistory) =>
        previousHistory.filter(
          (item) => item.id !== deleteId
        )
      );

      setDeleteId(null);
      setOpenMenu(null);
    } catch (error) {
      console.error("Error deleting LLM session:", error);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #f7f5f2 0%, #efedf0 50%, #f8f7f5 100%)",
        color: "#252b4f",
        fontFamily:
          '"Inter", "Poppins", system-ui, -apple-system, sans-serif',
      }}
    >
      {/* ================= NAVBAR ================= */}

      <header
        className="sticky top-0 z-40 border-b"
        style={{
          height: "76px",
          background: "rgba(255,255,255,0.82)",
          borderColor: "#dedee6",
          backdropFilter: "blur(18px)",
        }}
      >
        <div className="h-full px-10 flex items-center justify-between">
          {/* Logo */}

          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/economist")}
          >
            <div
              className="flex items-center justify-center rounded-xl"
              style={{
                width: "44px",
                height: "44px",
                background:
                  "linear-gradient(135deg, #242957, #30376d)",
                color: "white",
                boxShadow:
                  "0 8px 20px rgba(37, 43, 79, 0.18)",
              }}
            >
              <BrainCircuit size={22} strokeWidth={1.8} />
            </div>

            <div>
              <h1
                className="leading-none"
                style={{
                  fontSize: "21px",
                  fontWeight: 500,
                  letterSpacing: "-0.3px",
                }}
              >
                CGE Simulator
              </h1>

              <p
                className="mt-1"
                style={{
                  fontSize: "12px",
                  color: "#788093",
                  fontWeight: 400,
                }}
              >
                Economic intelligence
              </p>
            </div>
          </div>

          {/* Right Side */}

          <div className="flex items-center gap-3">
            {/* Economist Mode Button */}

            <button
              onClick={() => navigate("/economist")}
              className="flex items-center gap-2 rounded-lg transition-all duration-200 hover:scale-[1.02]"
              style={{
                padding: "10px 18px",
                background:
                  "linear-gradient(135deg, #252a5c, #30366e)",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 500,
                boxShadow:
                  "0 8px 18px rgba(37, 42, 92, 0.18)",
              }}
            >
              <BrainCircuit size={18} strokeWidth={1.8} />

              Economist Mode
            </button>

            {/* Profile */}

            <button
              className="flex items-center justify-center rounded-full transition-transform hover:scale-105"
              style={{
                width: "42px",
                height: "42px",
                background:
                  "linear-gradient(135deg, #252a5c, #353b76)",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 500,
                boxShadow:
                  "0 7px 18px rgba(37, 42, 92, 0.16)",
              }}
              onClick={() => {
                navigate("/profile");
              }}
              title="Profile"
            >
              <User size={17} />
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main
        className="mx-auto"
        style={{
          maxWidth: "1120px",
          padding: "52px 30px 70px",
        }}
      >
        {/* Page Heading */}

        <section className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <BrainCircuit
              size={17}
              color="#525b93"
              strokeWidth={1.8}
            />

            <span
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "3px",
                color: "#626b8c",
              }}
            >
              AI-POWERED SIMULATION HISTORY
            </span>
          </div>

          <h2
            style={{
              fontSize: "32px",
              fontWeight: 500,
              letterSpacing: "-0.8px",
              color: "#252b4f",
              marginBottom: "12px",
            }}
          >
            Economist Mode History
          </h2>

          <p
            style={{
              maxWidth: "820px",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "#667084",
            }}
          >
            Review your previous AI-driven economic policy simulations and
            continue working from your saved Economist Mode sessions.
          </p>
        </section>

        {/* ================= CONTENT ================= */}

        {loading ? (
          <div
            className="flex items-center justify-center rounded-2xl"
            style={{
              minHeight: "200px",
              background: "rgba(255,255,255,0.65)",
              border: "1px solid #d9d9e2",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "#727b8f",
              }}
            >
              Loading history...
            </p>
          </div>
        ) : history.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center rounded-2xl text-center"
            style={{
              minHeight: "240px",
              background: "rgba(255,255,255,0.72)",
              border: "1px solid #d9d9e2",
              boxShadow:
                "0 10px 30px rgba(45, 49, 85, 0.05)",
            }}
          >
            <div
              className="flex items-center justify-center rounded-xl mb-4"
              style={{
                width: "52px",
                height: "52px",
                background: "#eef0f6",
                color: "#434c84",
              }}
            >
              <BrainCircuit size={24} />
            </div>

            <h3
              style={{
                fontSize: "17px",
                fontWeight: 500,
                color: "#252b4f",
              }}
            >
              No AI sessions found
            </h3>

            <p
              className="mt-2"
              style={{
                fontSize: "14px",
                color: "#7a8292",
              }}
            >
              Run a simulation in Economist Mode to see it here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {history.map((item) => (
              <div
                key={item.id}
                className="relative rounded-2xl transition-all duration-200"
                onClick={() =>
                  navigate(`/llm-history/${item.id}`)
                }
                style={{
                  background: "rgba(255,255,255,0.72)",
                  border: "1px solid #d8d9e1",
                  padding: "28px 30px",
                  cursor: "pointer",
                  boxShadow:
                    "0 8px 22px rgba(43, 47, 79, 0.05)",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform =
                    "translateY(-2px)";
                  event.currentTarget.style.boxShadow =
                    "0 14px 30px rgba(43, 47, 79, 0.09)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform =
                    "translateY(0)";
                  event.currentTarget.style.boxShadow =
                    "0 8px 22px rgba(43, 47, 79, 0.05)";
                }}
              >
                <div className="flex items-start gap-5">
                  {/* Icon */}

                  <div
                    className="flex items-center justify-center rounded-xl shrink-0"
                    style={{
                      width: "58px",
                      height: "58px",
                      background:
                        "linear-gradient(135deg, #ececf2, #e3e4eb)",
                      color: "#454e89",
                    }}
                  >
                    <BrainCircuit
                      size={25}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Content */}

                  <div className="flex-1 min-w-0">
                    <h3
                      style={{
                        fontSize: "21px",
                        fontWeight: 500,
                        color: "#252b4f",
                        letterSpacing: "-0.2px",
                      }}
                    >
                      {item.title || "AI Policy Analysis"}
                    </h3>

                    <p
                      className="mt-1"
                      style={{
                        fontSize: "13px",
                        color: "#727b8f",
                        fontWeight: 400,
                      }}
                    >
                      {formatDate(item.created_at)}
                    </p>

                    {/* Prompt Box */}

                    <div
                      className="mt-5 rounded-xl"
                      style={{
                        maxWidth: "720px",
                        padding: "16px 20px",
                        background:
                          "rgba(246,246,248,0.78)",
                        border: "1px solid #dedee5",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "10px",
                          letterSpacing: "2px",
                          fontWeight: 500,
                          color: "#6d7587",
                          marginBottom: "8px",
                        }}
                      >
                        POLICY PROMPT
                      </p>

                      <p
                        style={{
                          fontSize: "15px",
                          fontWeight: 400,
                          color: "#444d60",
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {item.prompt || "No policy prompt available"}
                      </p>
                    </div>
                  </div>

                  {/* Menu */}

                  <div
                    className="relative shrink-0"
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                  >
                    <button
                      onClick={() => {
                        setOpenMenu(
                          openMenu === item.id
                            ? null
                            : item.id
                        );
                      }}
                      className="flex items-center justify-center rounded-lg transition-colors hover:bg-slate-100"
                      style={{
                        width: "36px",
                        height: "36px",
                        color: "#687185",
                      }}
                    >
                      <MoreVertical size={20} />
                    </button>

                    {openMenu === item.id && (
                      <div
                        className="absolute right-0 top-11 z-50 overflow-hidden rounded-xl"
                        style={{
                          width: "170px",
                          background: "#ffffff",
                          border: "1px solid #dedfe7",
                          boxShadow:
                            "0 14px 35px rgba(32, 36, 70, 0.15)",
                        }}
                      >
                        <button
                          onClick={() =>
                            handleRunAgain(item.id)
                          }
                          className="w-full flex items-center gap-3 text-left transition-colors hover:bg-slate-50"
                          style={{
                            padding: "12px 15px",
                            fontSize: "13px",
                            fontWeight: 400,
                            color: "#30385e",
                          }}
                        >
                          <Play size={15} />

                          Run Again
                        </button>

                        <div
                          style={{
                            height: "1px",
                            background: "#ececf1",
                          }}
                        />

                        <button
                          onClick={() => {
                            setDeleteId(item.id);
                            setOpenMenu(null);
                          }}
                          className="w-full flex items-center gap-3 text-left transition-colors hover:bg-red-50"
                          style={{
                            padding: "12px 15px",
                            fontSize: "13px",
                            fontWeight: 400,
                            color: "#c23b3b",
                          }}
                        >
                          <Trash2 size={15} />

                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ================= DELETE MODAL ================= */}

      {deleteId && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{
            background: "rgba(20, 23, 45, 0.38)",
            backdropFilter: "blur(5px)",
          }}
        >
          <div
            className="relative w-full rounded-2xl"
            style={{
              maxWidth: "390px",
              background: "#ffffff",
              padding: "28px",
              boxShadow:
                "0 25px 70px rgba(20, 24, 50, 0.22)",
            }}
          >
            <button
              onClick={() => setDeleteId(null)}
              className="absolute flex items-center justify-center rounded-lg hover:bg-slate-100"
              style={{
                right: "15px",
                top: "15px",
                width: "32px",
                height: "32px",
                color: "#687185",
              }}
            >
              <X size={18} />
            </button>

            <h3
              style={{
                fontSize: "20px",
                fontWeight: 500,
                color: "#252b4f",
              }}
            >
              Delete AI session?
            </h3>

            <p
              className="mt-3"
              style={{
                fontSize: "14px",
                lineHeight: 1.6,
                color: "#727b8f",
              }}
            >
              This AI policy analysis session will be permanently removed.
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-7">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-lg transition-colors hover:bg-slate-100"
                style={{
                  padding: "10px 16px",
                  border: "1px solid #d8dae3",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "#4d5568",
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="rounded-lg transition-all hover:opacity-90"
                style={{
                  padding: "10px 16px",
                  background: "#c83f3f",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: 400,
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}