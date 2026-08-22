import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    BarChart3,
    CalendarDays,
    ChevronDown,
    Filter,
    History as HistoryIcon,
    PlayCircle,
    Trash2,
    X,
    MoreVertical,
    User,
} from "lucide-react";

import {
    getSimulationHistory,
    deleteSimulation,
    getSimulationById,
} from "../services/simulationHistory";

export default function History() {
    const [openMenu, setOpenMenu] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const [timeframe, setTimeframe] = useState("Last 7 Days");
    const [modelType, setModelType] = useState("All Models");
    const [showFilters, setShowFilters] = useState(false);

    const navigate = useNavigate();

    /* =========================================================
       NAVIGATION
    ========================================================= */

    const goToModeSelection = () => {
        navigate("/mode-selection");
    };

    const goToProfile = () => {
        navigate("/profile");
    };

    useEffect(() => {
        loadHistory();
    }, []);

    /* =========================================================
       LOAD HISTORY
    ========================================================= */

    const loadHistory = async () => {
        try {
            setLoading(true);

            const data = await getSimulationHistory("user");

            setHistory(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to load simulation history:", err);
        } finally {
            setLoading(false);
        }
    };

    /* =========================================================
       RUN AGAIN
    ========================================================= */

    const handleRunAgain = async (id) => {
        try {
            const simulation = await getSimulationById(id);

            if (!simulation.inputs) {
                alert(
                    "This simulation was created before Run Again was available."
                );
                return;
            }

            sessionStorage.setItem(
                "simulationInputs",
                JSON.stringify(simulation.inputs)
            );

            navigate("/dashboard");
        } catch (err) {
            console.error("Failed to run simulation again:", err);
        }
    };

    /* =========================================================
       DELETE
    ========================================================= */

    const handleDelete = async () => {
        try {
            await deleteSimulation(deleteId);

            setDeleteId(null);
            setOpenMenu(null);

            await loadHistory();
        } catch (err) {
            console.error("Failed to delete simulation:", err);
        }
    };

    /* =========================================================
       FILTER HISTORY
    ========================================================= */

    const filteredHistory = history.filter((item) => {
        const date = new Date(item.created_at);
        const now = new Date();

        if (timeframe === "Last 7 Days") {
            const sevenDaysAgo = new Date();

            sevenDaysAgo.setDate(now.getDate() - 7);

            if (date < sevenDaysAgo) {
                return false;
            }
        }

        if (timeframe === "Last 30 Days") {
            const thirtyDaysAgo = new Date();

            thirtyDaysAgo.setDate(now.getDate() - 30);

            if (date < thirtyDaysAgo) {
                return false;
            }
        }

        if (timeframe === "This Quarter") {
            const currentMonth = now.getMonth();

            const quarterStartMonth =
                Math.floor(currentMonth / 3) * 3;

            const quarterStart = new Date(
                now.getFullYear(),
                quarterStartMonth,
                1
            );

            if (date < quarterStart) {
                return false;
            }
        }

        if (modelType !== "All Models") {
            const currentModel =
                item.model_type ||
                item.model ||
                item.modelType ||
                "";

            if (currentModel !== modelType) {
                return false;
            }
        }

        return true;
    });

    return (
        <div
            className="min-h-screen bg-[#f8f9fc] text-[#202124]"
            onClick={() => setOpenMenu(null)}
        >
            {/* =====================================================
                NAVBAR
                Dashboard removed
            ====================================================== */}

            <header className="h-[68px] bg-white border-b border-[#e6e8ef] flex items-center justify-between px-7 sticky top-0 z-40">

                {/* LOGO */}

                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#3120a0] flex items-center justify-center">
                        <BarChart3
                            size={19}
                            strokeWidth={2.4}
                            className="text-white"
                        />
                    </div>

                    <h1 className="text-[16px] font-bold text-[#24136f]">
                        CGE Simulator
                    </h1>
                </div>


                {/* NAVBAR */}

                <nav className="flex items-center gap-8 text-[13px]">

                    {/* Economist Mode */}

                    <button
                        onClick={goToModeSelection}
                        className="text-gray-500 hover:text-[#3120a0] transition"
                    >
                        Mode
                    </button>


                    {/* History */}

                    <button
                        className="text-[#3120a0] font-semibold"
                    >
                        History
                    </button>

                </nav>


                {/* PROFILE */}

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        goToProfile();
                    }}
                    className="flex items-center gap-2 group"
                    title="Profile"
                >

                    <div className="w-9 h-9 rounded-full bg-[#ddd7f9] border-2 border-transparent group-hover:border-[#3120a0] flex items-center justify-center text-[#3120a0] font-semibold text-xs transition">

                        <User size={17} />

                    </div>

                    <ChevronDown
                        size={15}
                        className="text-gray-500 group-hover:text-[#3120a0] transition"
                    />

                </button>

            </header>


            <div className="flex min-h-[calc(100vh-68px)]">


                {/* =====================================================
                    SIDEBAR
                    Dashboard removed
                ====================================================== */}

                <aside className="hidden md:flex w-[190px] bg-[#f1f3f6] border-r border-[#e1e4ea] flex-col">

                    <div className="p-4 space-y-1">

                        {/* Simulate */}

                        <button
                            onClick={goToModeSelection}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[13px] text-gray-600 hover:bg-white hover:text-[#3120a0] transition"
                        >

                            <PlayCircle size={17} />

                            Simulate

                        </button>


                        {/* History */}

                        <button
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white text-[#3120a0] font-semibold shadow-sm"
                        >

                            <HistoryIcon size={17} />

                            History

                        </button>

                    </div>


                    {/* Profile at bottom */}

                    <div className="mt-auto p-4">

                        <button
                            onClick={goToProfile}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[13px] text-gray-600 hover:bg-white hover:text-[#3120a0] transition"
                        >

                            <User size={17} />

                            Profile

                        </button>

                    </div>

                </aside>


                {/* =====================================================
                    MAIN CONTENT
                ====================================================== */}

                <main className="flex-1 overflow-hidden">

                    <div className="max-w-[1120px] mx-auto px-6 lg:px-10 py-8">


                        {/* BACK */}

                        <button
                            onClick={goToModeSelection}
                            className="inline-flex items-center gap-2 text-[12px] text-gray-500 hover:text-[#3120a0] mb-7 transition"
                        >

                            <ArrowLeft size={15} />

                            Back to Mode Selection

                        </button>


                        {/* HEADER */}

                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-7">

                            <div className="relative pl-5">

                                <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#3422a4] rounded-full" />


                                <div className="text-[10px] uppercase tracking-[0.18em] text-[#3422a4] font-bold mb-2">
                                    ARCHIVE
                                </div>


                                <h2 className="text-[32px] lg:text-[36px] font-bold tracking-[-0.03em] text-[#202124]">
                                    AI Policy History
                                </h2>


                                <p className="text-[13px] text-gray-500 mt-2">
                                    Review, analyze, and re-run past economic
                                    simulations generated via natural language
                                    policies.
                                </p>

                            </div>


                            <div className="flex items-center gap-3">

                                <button
                                    onClick={() =>
                                        setShowFilters(!showFilters)
                                    }
                                    className={`flex items-center gap-2 px-5 py-3 rounded-full text-[11px] font-semibold transition ${
                                        showFilters
                                            ? "bg-[#3120a0] text-white"
                                            : "bg-[#eef0f5] text-gray-600 hover:bg-[#e6e8ef]"
                                    }`}
                                >

                                    <Filter size={14} />

                                    Filter by Date

                                </button>


                                <button
                                    onClick={() => {
                                        setTimeframe("Last 7 Days");
                                        setModelType("All Models");
                                    }}
                                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#eef0f5] text-gray-600 text-[11px] font-semibold hover:bg-[#e6e8ef] transition"
                                >

                                    Reset Filters

                                </button>

                            </div>

                        </div>


                        {/* MOBILE FILTER */}

                        {showFilters && (

                            <div className="lg:hidden bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">

                                <div className="flex items-center justify-between mb-4">

                                    <h3 className="font-semibold text-sm">
                                        Filters
                                    </h3>


                                    <button
                                        onClick={() =>
                                            setShowFilters(false)
                                        }
                                    >

                                        <X size={17} />

                                    </button>

                                </div>


                                <div className="flex flex-wrap gap-2">

                                    {[
                                        "Last 7 Days",
                                        "Last 30 Days",
                                        "This Quarter",
                                        "All Time",
                                    ].map((item) => (

                                        <button
                                            key={item}
                                            onClick={() =>
                                                setTimeframe(item)
                                            }
                                            className={`px-3 py-2 rounded-lg text-xs ${
                                                timeframe === item
                                                    ? "bg-[#3120a0] text-white"
                                                    : "bg-gray-100 text-gray-600"
                                            }`}
                                        >

                                            {item}

                                        </button>

                                    ))}

                                </div>

                            </div>

                        )}


                        {/* =====================================================
                            CONTENT
                        ====================================================== */}

                        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-5">


                            {/* FILTER SIDEBAR */}

                            <aside className="hidden lg:block">


                                {/* TIMEFRAME */}

                                <div className="bg-white rounded-xl border border-[#e6e8ee] p-5 mb-4">

                                    <div className="flex items-center gap-2 mb-4">

                                        <CalendarDays
                                            size={15}
                                            className="text-[#3120a0]"
                                        />

                                        <h3 className="text-[13px] font-bold">
                                            Timeframe
                                        </h3>

                                    </div>


                                    <div className="space-y-3">

                                        {[
                                            "Last 7 Days",
                                            "Last 30 Days",
                                            "This Quarter",
                                            "All Time",
                                        ].map((item) => (

                                            <button
                                                key={item}
                                                onClick={() =>
                                                    setTimeframe(item)
                                                }
                                                className="flex items-center gap-2.5 text-left w-full text-[11px] text-gray-600"
                                            >

                                                <span
                                                    className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                                                        timeframe === item
                                                            ? "border-[#3120a0]"
                                                            : "border-gray-300"
                                                    }`}
                                                >

                                                    {timeframe === item && (

                                                        <span className="w-1.5 h-1.5 bg-[#3120a0] rounded-full" />

                                                    )}

                                                </span>

                                                {item}

                                            </button>

                                        ))}

                                    </div>

                                </div>


                                {/* MODEL TYPE */}

                                <div className="bg-white rounded-xl border border-[#e6e8ee] p-5 mb-4">

                                    <div className="flex items-center gap-2 mb-4">

                                        <BarChart3
                                            size={15}
                                            className="text-[#17695f]"
                                        />

                                        <h3 className="text-[13px] font-bold">
                                            Model Type
                                        </h3>

                                    </div>


                                    <div className="space-y-3">

                                        {[
                                            "All Models",
                                            "Standard CGE",
                                            "Dynamic recursive",
                                        ].map((item) => (

                                            <button
                                                key={item}
                                                onClick={() =>
                                                    setModelType(item)
                                                }
                                                className="flex items-center gap-2.5 text-left w-full text-[11px] text-gray-600"
                                            >

                                                <span
                                                    className={`w-3 h-3 rounded-[3px] border ${
                                                        modelType === item
                                                            ? "bg-[#17695f] border-[#17695f]"
                                                            : "border-gray-300"
                                                    }`}
                                                />

                                                {item}

                                            </button>

                                        ))}

                                    </div>

                                </div>


                                {/* TOTAL RUNS */}

                                <div className="rounded-xl bg-[#3020a1] p-5 text-white shadow-md">

                                    <div className="text-[9px] uppercase tracking-[0.12em] opacity-70">
                                        TOTAL RUNS
                                    </div>


                                    <div className="text-[34px] leading-none font-bold mt-2">
                                        {history.length.toLocaleString()}
                                    </div>


                                    <div className="text-[10px] mt-3 opacity-80">
                                        Simulation history
                                    </div>

                                </div>

                            </aside>


                            {/* HISTORY LIST */}

                            <section>

                                {loading ? (

                                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">

                                        <div className="w-7 h-7 border-2 border-[#3120a0] border-t-transparent rounded-full animate-spin mx-auto mb-3" />

                                        <p className="text-sm text-gray-500">
                                            Loading simulations...
                                        </p>

                                    </div>

                                ) : filteredHistory.length === 0 ? (

                                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">

                                        <div className="w-12 h-12 rounded-full bg-[#efedff] flex items-center justify-center mx-auto mb-4">

                                            <HistoryIcon
                                                size={22}
                                                className="text-[#3120a0]"
                                            />

                                        </div>


                                        <h3 className="font-bold text-lg">
                                            No simulations found
                                        </h3>


                                        <p className="text-sm text-gray-500 mt-2">
                                            Try changing your filters or run
                                            a new policy simulation.
                                        </p>

                                    </div>

                                ) : (

                                    <div className="space-y-4">

                                        {filteredHistory.map((item) => (

                                            <div
                                                key={item.id}
                                                onClick={() =>
                                                    navigate(
                                                        `/history/${item.id}`
                                                    )
                                                }
                                                className="group bg-white rounded-xl border border-[#e4e7ed] overflow-visible cursor-pointer hover:shadow-md transition-all duration-200"
                                            >

                                                {/* CARD HEADER */}

                                                <div className="p-5 pb-4">

                                                    <div className="flex justify-between items-start gap-4">

                                                        <div className="flex-1">

                                                            <div className="flex items-center gap-2 mb-2">

                                                                <span className="text-[10px] font-semibold text-gray-400">

                                                                    SIM-
                                                                    {String(
                                                                        item.id
                                                                    ).padStart(
                                                                        4,
                                                                        "0"
                                                                    )}

                                                                </span>


                                                                <span className="w-1 h-1 rounded-full bg-gray-300" />


                                                                <span className="text-[10px] text-gray-400">

                                                                    {new Date(
                                                                        item.created_at
                                                                    ).toLocaleDateString(
                                                                        undefined,
                                                                        {
                                                                            month: "short",
                                                                            day: "numeric",
                                                                            year: "numeric",
                                                                        }
                                                                    )}

                                                                </span>


                                                                <span className="text-[10px] text-gray-400">
                                                                    •
                                                                </span>


                                                                <span className="text-[10px] text-gray-400">

                                                                    {new Date(
                                                                        item.created_at
                                                                    ).toLocaleTimeString(
                                                                        undefined,
                                                                        {
                                                                            hour: "2-digit",
                                                                            minute: "2-digit",
                                                                        }
                                                                    )}

                                                                </span>

                                                            </div>


                                                            <h3 className="text-[17px] font-bold text-[#202124] group-hover:text-[#3120a0] transition-colors">

                                                                {
                                                                    item.policy_name
                                                                }

                                                            </h3>

                                                        </div>


                                                        {/* THREE DOT MENU */}

                                                        <div
                                                            className="relative"
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        >

                                                            <button
                                                                onClick={() =>
                                                                    setOpenMenu(
                                                                        openMenu ===
                                                                            item.id
                                                                            ? null
                                                                            : item.id
                                                                    )
                                                                }
                                                                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition"
                                                            >

                                                                <MoreVertical
                                                                    size={18}
                                                                />

                                                            </button>


                                                            {openMenu ===
                                                                item.id && (

                                                                <div className="absolute right-0 top-10 w-44 bg-white rounded-xl border border-gray-200 shadow-xl z-30 overflow-hidden">

                                                                    <button
                                                                        onClick={() =>
                                                                            navigate(
                                                                                `/history/${item.id}`
                                                                            )
                                                                        }
                                                                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-[12px] text-gray-700 hover:bg-gray-50"
                                                                    >

                                                                        <HistoryIcon
                                                                            size={
                                                                                14
                                                                            }
                                                                        />

                                                                        Open

                                                                    </button>


                                                                    <button
                                                                        onClick={() =>
                                                                            handleRunAgain(
                                                                                item.id
                                                                            )
                                                                        }
                                                                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-[12px] text-gray-700 hover:bg-gray-50"
                                                                    >

                                                                        <PlayCircle
                                                                            size={
                                                                                14
                                                                            }
                                                                        />

                                                                        Run Again

                                                                    </button>


                                                                    <button
                                                                        onClick={() => {

                                                                            setDeleteId(
                                                                                item.id
                                                                            );

                                                                            setOpenMenu(
                                                                                null
                                                                            );

                                                                        }}
                                                                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-[12px] text-red-600 hover:bg-red-50"
                                                                    >

                                                                        <Trash2
                                                                            size={
                                                                                14
                                                                            }
                                                                        />

                                                                        Delete

                                                                    </button>

                                                                </div>

                                                            )}

                                                        </div>

                                                    </div>


                                                    {/* DESCRIPTION */}

                                                    {item.description && (

                                                        <div className="mt-4 bg-[#f6f7fa] rounded-lg border-l-[3px] border-[#d8d9df] px-4 py-3">

                                                            <p className="text-[11px] italic leading-relaxed text-gray-600">

                                                                "
                                                                {
                                                                    item.description
                                                                }
                                                                "

                                                            </p>

                                                        </div>

                                                    )}

                                                </div>


                                                {/* CARD STATS */}

                                                <div className="px-5 pb-5">

                                                    <div className="border-t border-gray-100 pt-4 grid grid-cols-2 md:grid-cols-4 gap-5">

                                                        <div>

                                                            <p className="text-[9px] uppercase tracking-[0.1em] text-gray-400 font-semibold mb-1">
                                                                GDP
                                                            </p>

                                                            <p className="text-[16px] font-bold text-[#3120a0]">
                                                                {item.gdp ??
                                                                    "—"}
                                                            </p>

                                                        </div>


                                                        <div>

                                                            <p className="text-[9px] uppercase tracking-[0.1em] text-gray-400 font-semibold mb-1">
                                                                Inflation
                                                            </p>

                                                            <p className="text-[16px] font-bold text-[#17695f]">
                                                                {item.inflation ??
                                                                    "—"}
                                                            </p>

                                                        </div>


                                                        <div>

                                                            <p className="text-[9px] uppercase tracking-[0.1em] text-gray-400 font-semibold mb-1">
                                                                Unemployment
                                                            </p>

                                                            <p className="text-[16px] font-bold text-[#202124]">
                                                                {item.unemployment ??
                                                                    "—"}
                                                            </p>

                                                        </div>


                                                        <div className="flex justify-end items-end">

                                                            <button
                                                                onClick={(e) => {

                                                                    e.stopPropagation();

                                                                    navigate(
                                                                        `/history/${item.id}`
                                                                    );

                                                                }}
                                                                className="bg-[#3120a0] hover:bg-[#271886] text-white text-[11px] font-semibold rounded-md px-5 py-2.5 transition flex items-center gap-2"
                                                            >

                                                                View Report

                                                                <ArrowLeft
                                                                    size={13}
                                                                    className="rotate-180"
                                                                />

                                                            </button>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        ))}

                                    </div>

                                )}

                            </section>

                        </div>

                    </div>

                </main>

            </div>


            {/* =====================================================
                DELETE MODAL
            ====================================================== */}

            {deleteId && (

                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-[100] p-5"
                    onClick={() => setDeleteId(null)}
                >

                    <div
                        className="bg-white rounded-2xl p-7 w-full max-w-[410px] shadow-2xl"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center mb-4">

                            <Trash2
                                size={20}
                                className="text-red-600"
                            />

                        </div>


                        <h2 className="text-xl font-bold text-gray-900">
                            Delete Simulation?
                        </h2>


                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                            This action cannot be undone. The selected
                            simulation will be permanently removed from your
                            history.
                        </p>


                        <div className="flex justify-end gap-3 mt-7">

                            <button
                                onClick={() =>
                                    setDeleteId(null)
                                }
                                className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>


                            <button
                                onClick={handleDelete}
                                className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition"
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