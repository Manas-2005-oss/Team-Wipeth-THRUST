import { useState } from "react";
import { Play, Sparkles, MessageSquare, Wand2 } from "lucide-react";

function EconomistControlPanel({ runSimulation }) {
  const [policyText, setPolicyText] = useState("");

  const handleRun = () => {
    if (!policyText.trim()) return;

    runSimulation(policyText);
  };

  return (
    <div
      className="
        w-full
        max-w-[330px]
        min-h-screen
        border-r
        border-[#dedee8]
        bg-gradient-to-b
        from-[#fdfcfb]
        via-[#f8f7f8]
        to-[#f1f0f6]
        p-5
      "
    >
      {/* HEADER */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-[#35347b]
              to-[#25245f]
              text-white
              shadow-[0_8px_20px_rgba(37,36,95,0.2)]
            "
          >
            <Sparkles size={19} />
          </div>

          <div>
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#25245f]/55
              "
            >
              AI POLICY ENGINE
            </p>

            <h3 className="mt-1 text-base font-bold text-[#25245f]">
              Policy Input
            </h3>
          </div>
        </div>

        <p className="mt-4 text-xs leading-5 text-slate-500">
          Describe the economic policy you want to analyze using natural
          language.
        </p>
      </div>

      {/* POLICY INPUT CARD */}
      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-[#dedee8]
          bg-white/80
          shadow-[0_8px_25px_rgba(37,36,95,0.05)]
        "
      >
        {/* CARD TITLE */}
        <div
          className="
            flex
            items-center
            gap-2
            border-b
            border-[#e9e8ef]
            bg-[#faf9fb]
            px-4
            py-3
          "
        >
          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              bg-[#eeedf5]
              text-[#25245f]
            "
          >
            <MessageSquare size={15} />
          </div>

          <div>
            <p className="text-xs font-bold text-[#25245f]">
              Economic Policy
            </p>

            <p className="text-[9px] text-slate-400">
              Natural language input
            </p>
          </div>
        </div>

        {/* TEXT AREA */}
        <div className="p-4">
          <textarea
            placeholder={`Describe your policy...

Example:
Increase income tax by 20% and use the additional revenue for infrastructure development.`}
            value={policyText}
            onChange={(e) => setPolicyText(e.target.value)}
            className="
              min-h-[170px]
              w-full
              resize-none
              rounded-xl
              border
              border-[#dedee8]
              bg-[#f9f9fb]
              p-3.5
              text-xs
              leading-6
              text-slate-600
              outline-none
              transition-all
              placeholder:text-slate-400
              focus:border-[#25245f]/50
              focus:bg-white
              focus:ring-4
              focus:ring-[#25245f]/5
            "
          />

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[9px] text-slate-400">
              {policyText.length} characters
            </span>

            <span
              className="
                rounded-md
                bg-[#eeedf5]
                px-2
                py-1
                text-[8px]
                font-bold
                uppercase
                tracking-wide
                text-[#25245f]/65
              "
            >
              AI Ready
            </span>
          </div>
        </div>
      </div>

      {/* EXAMPLE / HELP */}
      <div
        className="
          mt-4
          rounded-xl
          border
          border-[#dedee8]
          bg-[#f7f6fa]
          p-4
        "
      >
        <div className="flex items-center gap-2">
          <Wand2 size={14} className="text-[#25245f]" />

          <p className="text-[10px] font-bold text-[#25245f]">
            Policy Suggestions
          </p>
        </div>

        <p className="mt-2 text-[10px] leading-5 text-slate-500">
          You can describe tax reforms, subsidies, government spending,
          productivity changes, trade policies, or labour interventions.
        </p>
      </div>

      {/* RUN BUTTON */}
      <button
        onClick={handleRun}
        disabled={!policyText.trim()}
        className="
          mt-5
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-[#25245f]
          to-[#35347b]
          px-5
          py-3.5
          text-xs
          font-bold
          text-white
          shadow-[0_10px_22px_rgba(37,36,95,0.2)]
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:shadow-[0_14px_28px_rgba(37,36,95,0.28)]
          disabled:cursor-not-allowed
          disabled:opacity-40
          disabled:hover:translate-y-0
        "
      >
        <Play size={15} fill="currentColor" />

        Run Simulation
      </button>

      {/* BOTTOM STATUS */}
      <div
        className="
          mt-5
          flex
          items-center
          justify-center
          gap-2
          text-[9px]
          text-slate-400
        "
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#25245f]" />

        AI-powered economic analysis
      </div>
    </div>
  );
}

export default EconomistControlPanel;