import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getLLMHistory, deleteLLMSession, getLLMSessionById, } from "../services/llmHistory";
import { MoreVertical } from "lucide-react";


export default function History() {
    const [openMenu, setOpenMenu] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const data = await getLLMHistory();
            setHistory(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-black">

            <div className="max-w-6xl mx-auto px-8 py-10">

                {/* Back Button */}
                <button
                    onClick={() => navigate("/economist")}
                    className="flex items-center gap-2 mb-8 px-4 py-2 rounded-lg
               border border-slate-300 hover:bg-slate-100
               transition-all duration-200"
                >
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </button>

                <h1 className="text-4xl font-bold mb-2">
                    AI Policy Sessions
                </h1>

                <p className="text-slate-400 mb-10">
                    Access your previous AI policy analysis sessions.
                </p>

                {loading ? (
                    <p>Loading...</p>
                ) : history.length === 0 ? (
                    <div className="bg-white rounded-xl p-10 text-center">
                        No simulations found.
                    </div>
                ) : (
                    history.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => navigate(`/llm-history/${item.id}`)}
                            className=" bg-white rounded-xl p-6 mb-4 border border-slate-200 shadow-sm hover:shadow-lg hover:scale-[1.01] cursor-pointer
                                 transition-all duration-200"
                        >
                            <div className="flex justify-between items-start relative">

                                <div>
                                    <h2 className="text-xl font-semibold">
                                        {item.title}
                                    </h2>

                                    <p className="text-sm text-slate-500 mt-1">
                                        {new Date(item.created_at).toLocaleString()}
                                    </p>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        if (openMenu === item.id) {
                                            setOpenMenu(null);
                                        } else {
                                            setOpenMenu(item.id);
                                        }

                                    }}
                                    className="hover:bg-gray-100 p-2 rounded-full"
                                >
                                    <MoreVertical size={20} />
                                </button>
                                {
                                    openMenu === item.id && (

                                        <div
                                            className="absolute right-0 top-10 bg-white shadow-xl rounded-xl border w-48 z-50"
                                        >



                                            <button
                                                onClick={async (e) => {
                                                    e.stopPropagation();

                                                    try {
                                                        const session = await getLLMSessionById(item.id);

                                                        sessionStorage.setItem(
                                                            "llmPrompt",
                                                            session.prompt
                                                        );
                                                        sessionStorage.setItem(
                                                            "llmClosure",
                                                            session.closure
                                                        );

                                                        navigate("/economist");

                                                    } catch (err) {
                                                        console.error(err);
                                                    }
                                                }}
                                                className="w-full text-left px-4 py-3 hover:bg-gray-100"
                                            >
                                                 Run Again
                                            </button>

                                            <button
                                                onClick={async (e) => {
                                                    e.stopPropagation();

                                                    const confirmDelete = window.confirm(
                                                        "Delete this AI session?"
                                                    );

                                                    if (!confirmDelete) return;

                                                    try {
                                                        await deleteLLMSession(item.id);

                                                        setOpenMenu(null);

                                                        loadHistory();

                                                    } catch (err) {
                                                        console.error(err);
                                                    }
                                                }}
                                                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                                            >
                                                 Delete
                                            </button>

                                        </div>

                                    )
                                }
                            </div>

                            <div className="mt-5">

                                <p className="text-slate-600 line-clamp-2">
                                    {item.prompt}
                                </p>

                            </div>


                        </div>

                    ))

                )}
                {deleteId && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 w-[400px] shadow-xl">

                            <h2 className="text-xl font-bold">
                                Delete Simulation?
                            </h2>

                            <p className="text-gray-500 mt-2">
                                This action cannot be undone.
                            </p>

                            <div className="flex justify-end gap-3 mt-6">

                                <button
                                    onClick={() => setDeleteId(null)}
                                    className="px-4 py-2 rounded-lg border"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={async () => {
                                        try {
                                            await deleteLLMSession(deleteId);
                                            setDeleteId(null);
                                            loadHistory();
                                        } catch (err) {
                                            console.error(err);
                                        }
                                    }}
                                    className="px-4 py-2 rounded-lg bg-red-600 text-white"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}