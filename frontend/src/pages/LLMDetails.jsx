import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Bot,
  Calendar,
  MessageSquare,
  Copy,
  Check,
  Sparkles,
  FileText,
  Activity,
  ChevronRight,
  BrainCircuit,
} from "lucide-react";
import { motion } from "framer-motion";
import { getLLMSessionById } from "../services/llmHistory";

export default function LLMDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadSession();
  }, [id]);

  const loadSession = async () => {
    try {
      setLoading(true);

      const data = await getLLMSessionById(id);

      setSession(data);
    } catch (error) {
      console.error("Failed to load session:", error);
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = () => {
    if (!session?.response) {
      return "No AI response available for this session.";
    }

    if (typeof session.response === "string") {
      return session.response;
    }

    return JSON.stringify(session.response, null, 2);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatResponse());

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f3f0] pt-24">
        <div className="flex min-h-[70vh] items-center justify-center px-4">

          <div className="flex flex-col items-center">

            <div className="relative flex h-16 w-16 items-center justify-center">

              <div className="absolute h-16 w-16 animate-ping rounded-2xl bg-[#25245f]/10" />

              <div
                className="
                  relative z-10
                  flex h-14 w-14
                  items-center justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-[#35347b]
                  to-[#25245f]
                  shadow-[0_12px_30px_rgba(37,36,95,0.25)]
                "
              >
                <BrainCircuit
                  size={23}
                  className="animate-pulse text-white"
                />
              </div>

            </div>

            <h2 className="mt-5 text-base font-bold text-[#25245f]">
              Loading Policy Analysis
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Retrieving your archived simulation session...
            </p>

          </div>

        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#f5f3f0] pt-24">
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">

          <div
            className="
              flex h-16 w-16
              items-center justify-center
              rounded-2xl
              bg-[#eeedf5]
              text-[#25245f]
            "
          >
            <FileText size={26} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#25245f]">
            Session Not Found
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            The requested policy analysis session could not be found.
          </p>

          <button
            onClick={() => navigate("/llm-history")}
            className="
              mt-6
              flex items-center gap-2
              rounded-xl
              bg-gradient-to-r
              from-[#25245f]
              to-[#34337a]
              px-5 py-3
              text-xs font-semibold
              text-white
              shadow-[0_8px_20px_rgba(37,36,95,0.2)]
              transition
              hover:scale-[1.02]
            "
          >
            <ArrowLeft size={15} />
            Back to History
          </button>

        </div>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-[radial-gradient(circle_at_top_right,_rgba(81,80,150,0.08),_transparent_28%),linear-gradient(180deg,#f8f7f5_0%,#f3f4f8_100%)]
        px-4 pb-8 pt-24
        sm:px-6
        lg:px-8
      "
    >
      <div className="mx-auto w-full max-w-[1450px]">

        {/* TOP NAVIGATION */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 flex items-center justify-between"
        >
          <button
            onClick={() => navigate("/llm-history")}
            className="
              group
              flex items-center gap-2
              rounded-lg
              border border-[#dfe0e8]
              bg-white/80
              px-4 py-2.5
              text-xs font-semibold
              text-slate-600
              shadow-[0_3px_12px_rgba(15,23,42,0.04)]
              backdrop-blur-sm
              transition-all
              hover:border-[#25245f]/30
              hover:bg-[#f4f3f8]
              hover:text-[#25245f]
            "
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />

            Back to History
          </button>

          <div className="hidden items-center gap-2 text-[10px] text-slate-400 sm:flex">
            <span>Policy Workspace</span>

            <ChevronRight size={12} />

            <span className="text-[#25245f]">
              Session Details
            </span>
          </div>
        </motion.div>


        {/* MAIN PAGE HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="
            relative
            mb-5
            overflow-hidden
            rounded-[20px]
            border border-[#dedee8]
            bg-gradient-to-r
            from-white
            via-[#faf9fb]
            to-[#f0eff7]
            px-5 py-5
            shadow-[0_8px_25px_rgba(37,36,95,0.05)]
            sm:px-7
          "
        >

          <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            {/* TITLE */}
            <div className="flex items-start gap-3.5">

              <div
                className="
                  flex h-11 w-11 shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-[#35347b]
                  to-[#25245f]
                  text-white
                  shadow-[0_8px_18px_rgba(37,36,95,0.2)]
                "
              >
                <Sparkles size={19} />
              </div>

              <div className="min-w-0">

                <div className="mb-1.5 flex items-center gap-2">

                  <span
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-[#25245f]/60
                    "
                  >
                    AI-Powered Policy Analysis
                  </span>

                  <span className="h-1 w-1 rounded-full bg-[#25245f]/30" />

                  <span className="text-[9px] text-slate-400">
                    Archived Session
                  </span>

                </div>

                <h1 className="max-w-4xl truncate text-xl font-bold tracking-tight text-[#25245f] sm:text-2xl">
                  {session.title || "Untitled Policy Session"}
                </h1>

                <p className="mt-1 text-[11px] text-slate-500">
                  Review the submitted policy and generated economic analysis.
                </p>

              </div>

            </div>


            {/* DATE CARD */}
            <div
              className="
                flex shrink-0 items-center gap-3
                rounded-xl
                border border-[#dfdfe8]
                bg-white/70
                px-3.5 py-3
                shadow-sm
                backdrop-blur-sm
              "
            >

              <div
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-lg
                  bg-[#eeedf5]
                  text-[#25245f]
                "
              >
                <Calendar size={15} />
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-wider text-slate-400">
                  Created
                </p>

                <p className="mt-0.5 text-[10px] font-semibold text-slate-600">
                  {new Date(session.created_at).toLocaleString()}
                </p>
              </div>

            </div>

          </div>


          {/* DECORATIVE BACKGROUND */}
          <div
            className="
              absolute -right-20 -top-24
              h-64 w-64
              rounded-full
              bg-[#25245f]/[0.035]
            "
          />

          <div
            className="
              absolute -bottom-20 right-40
              h-48 w-48
              rounded-full
              bg-[#7a78b8]/[0.05]
            "
          />

        </motion.div>


        {/* MAIN CONTENT */}
        <div className="grid items-start gap-5 xl:grid-cols-[0.82fr_1.18fr]">


          {/* POLICY PROMPT */}
          <motion.section
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="
              overflow-hidden
              rounded-[20px]
              border border-[#dedee8]
              bg-white/90
              shadow-[0_8px_25px_rgba(37,36,95,0.05)]
              backdrop-blur-sm
            "
          >

            {/* CARD HEADER */}
            <div
              className="
                flex items-center justify-between
                border-b border-[#e9e8ef]
                bg-gradient-to-r
                from-[#fcfcfd]
                to-[#f7f6fa]
                px-5 py-4
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-xl
                    bg-[#eeedf5]
                    text-[#25245f]
                  "
                >
                  <MessageSquare size={17} />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-[#25245f]">
                    Policy Prompt
                  </h2>

                  <p className="text-[10px] text-slate-400">
                    Original policy configuration
                  </p>
                </div>

              </div>

              <span
                className="
                  rounded-lg
                  border border-[#25245f]/10
                  bg-[#eeedf5]
                  px-2.5 py-1
                  text-[9px]
                  font-bold
                  tracking-wide
                  text-[#25245f]
                "
              >
                INPUT
              </span>

            </div>


            {/* PROMPT CONTENT */}
            <div className="p-5">

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-xl
                  border border-[#e2e1e9]
                  bg-gradient-to-br
                  from-[#faf9fb]
                  to-[#f3f2f7]
                  p-5
                "
              >

                <div
                  className="
                    absolute bottom-0 left-0 top-0
                    w-[3px]
                    bg-[#25245f]
                  "
                />

                <p
                  className="
                    whitespace-pre-wrap
                    pl-2
                    text-[13px]
                    leading-7
                    text-slate-600
                  "
                >
                  {session.prompt || "No policy prompt available."}
                </p>

              </div>

            </div>


            {/* FOOTER */}
            <div
              className="
                flex items-center gap-2
                border-t border-[#e9e8ef]
                bg-[#fcfcfd]
                px-5 py-3
              "
            >

              <div className="h-1.5 w-1.5 rounded-full bg-[#25245f]" />

              <span className="text-[10px] text-slate-400">
                Submitted for AI-driven economic analysis
              </span>

            </div>

          </motion.section>


          {/* AI RESPONSE */}
          <motion.section
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="
              overflow-hidden
              rounded-[20px]
              border border-[#dedee8]
              bg-white/90
              shadow-[0_8px_25px_rgba(37,36,95,0.05)]
              backdrop-blur-sm
            "
          >

            {/* CARD HEADER */}
            <div
              className="
                flex items-center justify-between
                border-b border-[#e9e8ef]
                bg-gradient-to-r
                from-[#fcfcfd]
                to-[#f4f3f8]
                px-5 py-4
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-xl
                    bg-gradient-to-br
                    from-[#35347b]
                    to-[#25245f]
                    text-white
                    shadow-md
                  "
                >
                  <Bot size={18} />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-[#25245f]">
                    AI Economic Analysis
                  </h2>

                  <p className="text-[10px] text-slate-400">
                    Generated policy analysis and recommendations
                  </p>
                </div>

              </div>


              {/* COPY BUTTON */}
              <button
                onClick={handleCopy}
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-lg
                  border border-[#dedee8]
                  bg-white
                  text-slate-400
                  shadow-sm
                  transition-all
                  hover:border-[#25245f]/30
                  hover:bg-[#eeedf5]
                  hover:text-[#25245f]
                "
                title="Copy response"
              >
                {copied ? (
                  <Check
                    size={16}
                    className="text-green-600"
                  />
                ) : (
                  <Copy size={16} />
                )}
              </button>

            </div>


            {/* AI RESPONSE CONTENT */}
            <div className="p-5">

              <div
                className="
                  max-h-[560px]
                  overflow-auto
                  rounded-xl
                  border border-[#e2e1e9]
                  bg-gradient-to-b
                  from-[#fbfbfd]
                  to-[#f7f7fa]
                  p-5
                "
              >

                {/* RESPONSE LABEL */}
                <div
                  className="
                    mb-4
                    flex items-center gap-2
                    border-b border-[#e6e5eb]
                    pb-3
                  "
                >

                  <div
                    className="
                      flex h-7 w-7
                      items-center justify-center
                      rounded-md
                      bg-[#eeedf5]
                      text-[#25245f]
                    "
                  >
                    <Sparkles size={13} />
                  </div>

                  <span
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                      text-[#25245f]/55
                    "
                  >
                    Generated Response
                  </span>

                </div>


                <pre
                  className="
                    whitespace-pre-wrap
                    break-words
                    font-sans
                    text-[13px]
                    leading-7
                    text-slate-600
                  "
                >
                  {formatResponse()}
                </pre>

              </div>

            </div>


            {/* RESPONSE FOOTER */}
            <div
              className="
                flex items-center justify-between
                border-t border-[#e9e8ef]
                bg-[#fcfcfd]
                px-5 py-3
              "
            >

              <div className="flex items-center gap-2">

                <div className="h-1.5 w-1.5 rounded-full bg-[#25245f]" />

                <span className="text-[10px] text-slate-400">
                  Analysis generated successfully
                </span>

              </div>

              <span
                className="
                  rounded-md
                  bg-[#eeedf5]
                  px-2 py-1
                  text-[9px]
                  font-semibold
                  text-[#25245f]/70
                "
              >
                AI GENERATED
              </span>

            </div>

          </motion.section>

        </div>


        {/* PAGE FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="
            mt-5
            flex items-center justify-center
            gap-2
            text-[9px]
            text-slate-400
          "
        >

          <Activity size={11} className="text-[#25245f]/50" />

          <span>CGE Policy Simulation Workspace</span>

          <span className="h-1 w-1 rounded-full bg-slate-300" />

          <span>Session ID: {id}</span>

        </motion.div>

      </div>
    </div>
  );
}