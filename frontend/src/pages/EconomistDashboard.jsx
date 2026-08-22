import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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

import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Globe,
  Activity,
  PieChart,
  History,
  SlidersHorizontal,
  Play,
  Loader2,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Info,
  LineChart,
} from "lucide-react";


export default function EconomistDashboard() {

  const navigate = useNavigate();

  const { user } = useAuth();

  const [policy, setPolicy] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [closure, setClosure] = useState("savings");

  /* =========================================================
     PROFILE STATE
  ========================================================= */

  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef(null);


  /* =========================================================
     THEME
  ========================================================= */

  const COLORS = {
    navy: "#121358",
    cream: "#FFF7F3",
    white: "#FFFFFF",
    muted: "#6D708F",
    soft: "#F6F0EC",
    border: "rgba(18, 19, 88, 0.10)",
    baseline: "#A8AAC0",
    positive: "#121358",
    negative: "#7A4050",
  };


  /* =========================================================
     PROFILE CLICK OUTSIDE
  ========================================================= */

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {

        setShowProfile(false);

      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);


  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = async () => {

    setShowProfile(false);

    const { error } =
      await supabase.auth.signOut();

    if (error) {

      console.error(
        "Logout error:",
        error
      );

      return;

    }

    navigate("/", {
      replace: true,
    });

  };


  /* =========================================================
     RUN SIMULATION
  ========================================================= */

  const runSimulation = async () => {

    if (!policy.trim()) return;

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8000/simulate-policy",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            policy: policy,
            closure: closure,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      setResults(data);

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

      console.error(
        "Error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  /* =========================================================
     SESSION STORAGE
  ========================================================= */

  useEffect(() => {

    const prompt =
      sessionStorage.getItem("llmPrompt");

    const savedClosure =
      sessionStorage.getItem("llmClosure");

    if (prompt) {

      setPolicy(prompt);

      sessionStorage.removeItem("llmPrompt");

    }

    if (savedClosure) {

      setClosure(savedClosure);

      sessionStorage.removeItem("llmClosure");

    }

  }, []);


  /* =========================================================
     SIDEBAR
  ========================================================= */

  const sidebarItems = [

    {
      label: "Simulate",
      icon: SlidersHorizontal,
      active: true,
      action: () => {},
    },

    {
      label: "History",
      icon: History,
      active: false,
      action: () => navigate("/history"),
    },

  ];


  /* =========================================================
     USER INITIAL
  ========================================================= */

  const userInitial = (
    user?.user_metadata?.full_name?.[0] ||
    user?.email?.[0] ||
    "U"
  ).toUpperCase();


  return (

    <div
      className="
        min-h-screen
        bg-[#FFF7F3]
        text-[#121358]
      "
    >

      {/* =====================================================
          CHART THEME
      ====================================================== */}

      <style>{`

        .theme-chart {

          --chart-primary: #121358;
          --chart-secondary: #8C8EA8;
          --chart-grid: rgba(18,19,88,.08);
          --chart-text: #6D708F;
          --chart-background: #FFFFFF;

        }


        .theme-chart
        .recharts-cartesian-grid-horizontal
        line,

        .theme-chart
        .recharts-cartesian-grid-vertical
        line {

          stroke:
            rgba(18,19,88,.075) !important;

        }


        .theme-chart
        .recharts-cartesian-axis-line {

          stroke:
            rgba(18,19,88,.12) !important;

        }


        .theme-chart
        .recharts-cartesian-axis-tick-line {

          stroke:
            rgba(18,19,88,.10) !important;

        }


        .theme-chart
        .recharts-text {

          fill:
            #6D708F !important;

          font-size:
            10px !important;

        }


        .theme-chart
        .recharts-cartesian-axis-tick-value {

          fill:
            #6D708F !important;

        }


        .theme-chart
        .recharts-line-curve {

          stroke:
            #121358 !important;

          stroke-width:
            2.2 !important;

        }


        .theme-chart
        .recharts-line-dot {

          fill:
            #121358 !important;

          stroke:
            #FFF7F3 !important;

          stroke-width:
            2 !important;

        }


        .theme-chart
        .recharts-bar-rectangle {

          fill:
            #121358 !important;

          opacity:
            .88;

        }


        .theme-chart
        .recharts-bar-rectangle:hover {

          opacity:
            1;

        }


        .theme-chart
        .recharts-area-area {

          fill:
            rgba(18,19,88,.09) !important;

        }


        .theme-chart
        .recharts-area-curve {

          stroke:
            #121358 !important;

          stroke-width:
            2 !important;

        }


        .theme-chart
        .recharts-pie-sector {

          outline:
            none !important;

        }


        .theme-chart
        .recharts-pie-sector path {

          stroke:
            #FFF7F3 !important;

          stroke-width:
            2 !important;

        }


        .theme-chart
        .recharts-tooltip-wrapper {

          outline:
            none !important;

        }


        .theme-chart
        .recharts-default-tooltip {

          background:
            #121358 !important;

          border:
            1px solid
            rgba(255,247,243,.18) !important;

          border-radius:
            8px !important;

          box-shadow:
            0 10px 25px
            rgba(18,19,88,.15) !important;

          padding:
            8px 10px !important;

        }


        .theme-chart
        .recharts-tooltip-label {

          color:
            #FFF7F3 !important;

          font-size:
            10px !important;

        }


        .theme-chart
        .recharts-tooltip-item {

          color:
            #FFF7F3 !important;

          font-size:
            10px !important;

        }


        .theme-chart
        .recharts-legend-item-text {

          color:
            #6D708F !important;

          font-size:
            9px !important;

        }


        .result-section {

          animation:
            resultAppear
            .35s
            ease-out;

        }


        @keyframes resultAppear {

          from {

            opacity: 0;

            transform:
              translateY(8px);

          }

          to {

            opacity: 1;

            transform:
              translateY(0);

          }

        }


        .chart-canvas {

          width: 100%;

          min-height:
            285px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

        }


        @media (max-width: 768px) {

          .chart-canvas {

            min-height:
              240px;

          }

        }

      `}</style>


      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <header
        className="
          h-[62px]
          bg-white
          border-b
          border-[#121358]/10
          flex
          items-center
          px-5
          md:px-7
          sticky
          top-0
          z-50
        "
      >

        {/* BRAND */}

        <div
          className="
            flex
            items-center
            gap-2.5
            min-w-[180px]
          "
        >

          <motion.div
            whileHover={{
              rotate: -3,
              scale: 1.04,
            }}

            transition={{
              duration: 0.2,
            }}

            className="
              w-8
              h-8
              rounded-lg
              bg-[#121358]
              text-[#FFF7F3]
              flex
              items-center
              justify-center
              text-xs
              font-bold
              cursor-default
            "
          >
            C
          </motion.div>


          <div>

            <p
              className="
                text-[14px]
                font-bold
                leading-none
                tracking-tight
              "
            >
              CGE Simulator
            </p>


            <p
              className="
                text-[9px]
                text-[#121358]/40
                mt-1
              "
            >
              Economic intelligence
            </p>

          </div>

        </div>


        {/* ===================================================
            NAVIGATION
        ==================================================== */}

        <nav
          className="
            hidden
            md:flex
            flex-1
            justify-center
            items-center
            gap-8
          "
        >

          {/* MODE */}

          <TopNavItem
            label="Mode"
            onClick={() =>
              navigate("/mode-selection")
            }
          />


          {/* ECONOMIST MODE */}

          <TopNavItem
            label="Economist Mode"
            active
          />


          {/* HISTORY */}

          <TopNavItem
            label="History"
            onClick={() =>
              navigate("/history")
            }
          />

        </nav>


        {/* ===================================================
            PROFILE
        ==================================================== */}

        <div
          ref={profileRef}
          className="
            relative
            ml-auto
          "
        >

          {/* PROFILE BUTTON */}

          <motion.button
            whileHover={{
              scale: 1.05,
              y: -1,
            }}

            whileTap={{
              scale: 0.94,
            }}

            onClick={() =>
              setShowProfile(
                (previous) =>
                  !previous
              )
            }

            aria-label="Open profile menu"

            className="
              relative
              w-9
              h-9
              rounded-full
              bg-[#121358]
              text-[#FFF7F3]
              flex
              items-center
              justify-center
              text-[11px]
              font-bold
              border
              border-[#121358]/10
              shadow-[0_4px_12px_rgba(18,19,88,.12)]
              hover:shadow-[0_7px_18px_rgba(18,19,88,.18)]
              transition-shadow
              duration-200
              cursor-pointer
              outline-none
            "
          >

            {userInitial}


            {/* ONLINE INDICATOR */}

            <span
              className="
                absolute
                right-0
                bottom-0
                w-2.5
                h-2.5
                rounded-full
                bg-[#FFF7F3]
                border-2
                border-white
              "
            />

          </motion.button>


          {/* =================================================
              PROFILE DROPDOWN
          ================================================== */}

          <AnimatePresence>

            {showProfile && (

              <motion.div
                initial={{
                  opacity: 0,
                  y: -8,
                  scale: 0.97,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}

                exit={{
                  opacity: 0,
                  y: -6,
                  scale: 0.98,
                }}

                transition={{
                  duration: 0.18,
                  ease: "easeOut",
                }}

                className="
                  absolute
                  right-0
                  top-[46px]
                  w-[255px]
                  bg-white
                  rounded-2xl
                  border
                  border-[#121358]/10
                  shadow-[0_16px_40px_rgba(18,19,88,.14)]
                  overflow-hidden
                  z-[100]
                "
              >

                {/* USER INFORMATION */}

                <div
                  className="
                    px-4
                    py-4
                    bg-[#FFF7F3]
                    border-b
                    border-[#121358]/10
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className="
                        w-10
                        h-10
                        shrink-0
                        rounded-full
                        bg-[#121358]
                        text-[#FFF7F3]
                        flex
                        items-center
                        justify-center
                        text-[13px]
                        font-bold
                      "
                    >

                      {userInitial}

                    </div>


                    <div
                      className="
                        min-w-0
                      "
                    >

                      <p
                        className="
                          text-[12px]
                          font-bold
                          text-[#121358]
                          truncate
                        "
                      >
                        {user?.user_metadata?.full_name ||
                          "User"}
                      </p>


                      <p
                        className="
                          text-[9px]
                          text-[#121358]/45
                          mt-1
                          truncate
                        "
                      >
                        {user?.email ||
                          "No email available"}
                      </p>

                    </div>

                  </div>

                </div>


                {/* MENU */}

                <div
                  className="
                    p-2
                  "
                >

                  {/* CHANGE MODE */}

                  <motion.button
                    whileHover={{
                      x: 2,
                    }}

                    whileTap={{
                      scale: 0.98,
                    }}

                    onClick={() => {

                      setShowProfile(false);

                      navigate(
                        "/mode-selection"
                      );

                    }}

                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-3
                      py-2.5
                      rounded-xl
                      text-left
                      text-[10px]
                      font-medium
                      text-[#121358]/70
                      hover:bg-[#FFF7F3]
                      hover:text-[#121358]
                      transition-colors
                      duration-150
                      cursor-pointer
                    "
                  >

                    <div
                      className="
                        w-7
                        h-7
                        rounded-lg
                        bg-[#FFF7F3]
                        flex
                        items-center
                        justify-center
                        shrink-0
                      "
                    >

                      <SlidersHorizontal
                        size={13}
                      />

                    </div>


                    <div>

                      <p
                        className="
                          font-semibold
                          text-[#121358]
                        "
                      >
                        Change Mode
                      </p>

                      <p
                        className="
                          text-[8px]
                          text-[#121358]/35
                          mt-0.5
                        "
                      >
                        Return to mode selection
                      </p>

                    </div>

                  </motion.button>


                  {/* LOGOUT */}

                  <motion.button
                    whileHover={{
                      x: 2,
                    }}

                    whileTap={{
                      scale: 0.98,
                    }}

                    onClick={
                      handleLogout
                    }

                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-3
                      py-2.5
                      rounded-xl
                      text-left
                      text-[10px]
                      font-medium
                      text-[#7A4050]
                      hover:bg-[#FFF7F3]
                      transition-colors
                      duration-150
                      cursor-pointer
                    "
                  >

                    <div
                      className="
                        w-7
                        h-7
                        rounded-lg
                        bg-[#FFF7F3]
                        flex
                        items-center
                        justify-center
                        shrink-0
                      "
                    >

                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >

                        <path
                          d="
                            M9 21H5a2 2 0 0 1-2-2V5
                            a2 2 0 0 1 2-2h4
                          "
                        />

                        <polyline
                          points="16 17 21 12 16 7"
                        />

                        <line
                          x1="21"
                          y1="12"
                          x2="9"
                          y2="12"
                        />

                      </svg>

                    </div>


                    <div>

                      <p
                        className="
                          font-semibold
                        "
                      >
                        Logout
                      </p>

                      <p
                        className="
                          text-[8px]
                          text-[#7A4050]/55
                          mt-0.5
                        "
                      >
                        Sign out of your account
                      </p>

                    </div>

                  </motion.button>

                </div>

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      </header>


      {/* =====================================================
          BODY
      ====================================================== */}

      <div
        className="
          flex
          min-h-[calc(100vh-62px)]
        "
      >

        {/* ===================================================
            SIDEBAR
        ==================================================== */}

        <aside
          className="
            hidden
            md:flex
            w-[185px]
            shrink-0
            bg-white
            border-r
            border-[#121358]/10
            p-4
            flex-col
          "
        >

          <div>

            <p
              className="
                px-3
                mb-3
                text-[9px]
                uppercase
                tracking-[0.16em]
                font-semibold
                text-[#121358]/35
              "
            >
              Workspace
            </p>


            <div className="space-y-1">

              {sidebarItems.map(
                (item, index) => {

                  const Icon =
                    item.icon;

                  return (

                    <motion.button
                      key={item.label}

                      initial={{
                        opacity: 0,
                        x: -6,
                      }}

                      animate={{
                        opacity: 1,
                        x: 0,
                      }}

                      transition={{
                        duration: .25,
                        delay:
                          index * .05,
                      }}

                      onClick={
                        item.action
                      }

                      className={`
                        relative
                        w-full
                        flex
                        items-center
                        gap-3
                        px-3
                        py-2.5
                        rounded-lg
                        text-left
                        text-[11px]
                        font-medium
                        transition-all
                        duration-200

                        ${
                          item.active
                            ? `
                              bg-[#121358]
                              text-[#FFF7F3]
                              shadow-[0_4px_12px_rgba(18,19,88,.12)]
                            `
                            : `
                              text-[#121358]/55
                              hover:bg-[#FFF7F3]
                              hover:text-[#121358]
                            `
                        }
                      `}
                    >

                      <Icon
                        size={15}
                      />

                      <span>
                        {item.label}
                      </span>


                      {item.active && (

                        <motion.span
                          layoutId="sidebar-active"

                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 35,
                          }}

                          className="
                            absolute
                            left-0
                            top-1/2
                            -translate-y-1/2
                            w-[3px]
                            h-5
                            bg-[#FFF7F3]
                            rounded-r-full
                          "
                        />

                      )}

                    </motion.button>

                  );

                }
              )}

            </div>

          </div>


          {/* SIDEBAR FOOTER */}

          <div
            className="
              mt-auto
              pt-4
              border-t
              border-[#121358]/10
            "
          >

            <p
              className="
                px-3
                text-[9px]
                font-semibold
                text-[#121358]/45
              "
            >
              CGE ECONOMIST
            </p>

            <p
              className="
                px-3
                mt-1
                text-[9px]
                leading-4
                text-[#121358]/30
              "
            >
              Advanced policy analysis
              and economic modelling.
            </p>

          </div>

        </aside>


        {/* ===================================================
            MAIN
        ==================================================== */}

        <main
          className="
            flex-1
            min-w-0
          "
        >

          <div
            className="
              max-w-[1120px]
              mx-auto
              px-5
              md:px-8
              py-8
            "
          >

            {/* =================================================
                HERO
            ================================================== */}

            <motion.section
              initial={{
                opacity: 0,
                y: 8,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: .35,
              }}

              className="
                text-center
                mb-7
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  mb-2
                "
              >

                <Sparkles
                  size={11}
                />

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[.18em]
                    font-semibold
                    text-[#121358]/45
                  "
                >
                  AI-powered simulation engine
                </span>

              </div>


              <h1
                className="
                  text-[30px]
                  md:text-[38px]
                  leading-[1.08]
                  font-bold
                  tracking-[-.045em]
                "
              >
                AI-Driven Economic
                <br />
                Policy Simulator
              </h1>


              <p
                className="
                  max-w-[610px]
                  mx-auto
                  mt-3
                  text-[12px]
                  md:text-[13px]
                  leading-5
                  text-[#121358]/50
                "
              >
                Describe an economic policy in natural language
                and explore its projected impact across key
                macroeconomic indicators and sectors.
              </p>

            </motion.section>


            {/* =================================================
                CONFIGURATION
            ================================================== */}

            <motion.section
              initial={{
                opacity: 0,
                y: 10,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: .35,
                delay: .05,
              }}

              className="
                grid
                grid-cols-1
                lg:grid-cols-[1fr_255px]
                gap-4
              "
            >

              {/* POLICY */}

              <div
                className="
                  bg-white
                  border
                  border-[#121358]/10
                  rounded-[14px]
                  p-5
                  shadow-[0_6px_24px_rgba(18,19,88,.045)]
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    pb-4
                    border-b
                    border-[#121358]/10
                  "
                >

                  <div
                    className="
                      w-8
                      h-8
                      rounded-lg
                      bg-[#FFF7F3]
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <SlidersHorizontal
                      size={15}
                    />

                  </div>


                  <div>

                    <h2
                      className="
                        text-[14px]
                        font-bold
                      "
                    >
                      Policy Configuration
                    </h2>

                    <p
                      className="
                        text-[9px]
                        text-[#121358]/40
                        mt-0.5
                      "
                    >
                      Define the economic intervention
                      you want to simulate.
                    </p>

                  </div>

                </div>


                {/* TEXTAREA */}

                <div className="mt-5">

                  <label
                    className="
                      block
                      text-[10px]
                      font-semibold
                      text-[#121358]/65
                      mb-2
                    "
                  >
                    Economic policy
                  </label>


                  <textarea
                    value={policy}

                    onChange={(e) =>
                      setPolicy(
                        e.target.value
                      )
                    }

                    rows={4}

                    placeholder="
                      Example: Increase import tariffs by 10%
                      while introducing a targeted subsidy for
                      domestic manufacturers...
                    "

                    className="
                      w-full
                      resize-none
                      rounded-lg
                      border
                      border-[#121358]/12
                      bg-[#FFF7F3]/45
                      px-3
                      py-3
                      text-[11px]
                      leading-5
                      text-[#121358]
                      placeholder:text-[#121358]/25
                      outline-none
                      transition-all
                      duration-200
                      focus:bg-white
                      focus:border-[#121358]/35
                      focus:ring-2
                      focus:ring-[#121358]/[.05]
                    "
                  />

                </div>


                {/* CLOSURE */}

                <div className="mt-4">

                  <label
                    className="
                      block
                      text-[10px]
                      font-semibold
                      text-[#121358]/65
                      mb-2
                    "
                  >
                    Macroeconomic closure rule
                  </label>


                  <div className="relative">

                    <select
                      value={closure}

                      onChange={(e) =>
                        setClosure(
                          e.target.value
                        )
                      }

                      className="
                        appearance-none
                        w-full
                        h-10
                        rounded-lg
                        border
                        border-[#121358]/12
                        bg-white
                        px-3
                        pr-9
                        text-[11px]
                        text-[#121358]
                        outline-none
                        cursor-pointer
                        focus:border-[#121358]/35
                        focus:ring-2
                        focus:ring-[#121358]/[.05]
                      "
                    >

                      <option value="savings">
                        Savings-Investment Closure
                      </option>

                      <option value="government">
                        Government Budget Closure
                      </option>

                      <option value="external">
                        External Sector Closure
                      </option>

                    </select>


                    <ChevronDown
                      size={14}
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        pointer-events-none
                        text-[#121358]/40
                      "
                    />

                  </div>

                </div>


                {/* BUTTON */}

                <div
                  className="
                    flex
                    justify-end
                    mt-5
                  "
                >

                  <motion.button
                    whileHover={
                      !loading &&
                      policy.trim()
                        ? {
                            x: 2,
                          }
                        : {}
                    }

                    whileTap={
                      !loading &&
                      policy.trim()
                        ? {
                            scale: .97,
                          }
                        : {}
                    }

                    onClick={
                      runSimulation
                    }

                    disabled={
                      loading ||
                      !policy.trim()
                    }

                    className={`
                      h-10
                      px-5
                      rounded-lg
                      flex
                      items-center
                      gap-2
                      text-[11px]
                      font-semibold
                      transition-all
                      duration-200

                      ${
                        loading ||
                        !policy.trim()
                          ? `
                            bg-[#121358]/25
                            text-white
                            cursor-not-allowed
                          `
                          : `
                            bg-[#121358]
                            text-[#FFF7F3]
                            shadow-[0_5px_14px_rgba(18,19,88,.14)]
                            hover:shadow-[0_8px_20px_rgba(18,19,88,.18)]
                          `
                      }
                    `}
                  >

                    {loading ? (

                      <>
                        <Loader2
                          size={14}
                          className="animate-spin"
                        />

                        Running simulation
                      </>

                    ) : (

                      <>
                        <Play
                          size={13}
                          fill="currentColor"
                        />

                        Run Simulation

                        <ArrowRight
                          size={13}
                        />
                      </>

                    )}

                  </motion.button>

                </div>

              </div>


              {/* ANALYSIS */}

              <div
                className="
                  bg-[#121358]
                  text-[#FFF7F3]
                  rounded-[14px]
                  p-5
                  flex
                  flex-col
                  justify-between
                "
              >

                <div>

                  <div
                    className="
                      w-8
                      h-8
                      rounded-lg
                      bg-[#FFF7F3]/10
                      flex
                      items-center
                      justify-center
                      mb-4
                    "
                  >

                    <Activity
                      size={15}
                    />

                  </div>


                  <h3
                    className="
                      text-[14px]
                      font-bold
                    "
                  >
                    Analysis includes
                  </h3>


                  <p
                    className="
                      text-[9px]
                      leading-4
                      text-[#FFF7F3]/55
                      mt-1
                    "
                  >
                    Your policy is evaluated across
                    multiple economic dimensions.
                  </p>


                  <div
                    className="
                      mt-5
                      space-y-3
                    "
                  >

                    <InsightRow
                      number="01"
                      text="Macroeconomic indicators"
                    />

                    <InsightRow
                      number="02"
                      text="Sector-level effects"
                    />

                    <InsightRow
                      number="03"
                      text="Trade and fiscal impact"
                    />

                    <InsightRow
                      number="04"
                      text="GDP and labour projections"
                    />

                  </div>

                </div>


                <div
                  className="
                    pt-4
                    mt-5
                    border-t
                    border-[#FFF7F3]/10
                  "
                >

                  <p
                    className="
                      text-[9px]
                      text-[#FFF7F3]/40
                      leading-4
                    "
                  >
                    Results depend on the policy
                    and selected closure assumptions.
                  </p>

                </div>

              </div>

            </motion.section>


            {/* =================================================
                NO RESULTS
            ================================================== */}

            {!results && (

              <motion.div
                initial={{
                  opacity: 0,
                }}

                animate={{
                  opacity: 1,
                }}

                transition={{
                  delay: .25,
                }}

                className="
                  flex
                  justify-center
                  mt-8
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-[10px]
                    text-[#121358]/35
                  "
                >

                  <Info
                    size={12}
                  />

                  Enter a policy above to
                  generate your economic analysis.

                </div>

              </motion.div>

            )}


            {/* =================================================
                OUTPUT
            ================================================== */}

            <AnimatePresence>

              {results && (

                <motion.section
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    duration: .35,
                  }}

                  className="
                    result-section
                    mt-8
                  "
                >

                  {/* OUTPUT HEADER */}

                  <div
                    className="
                      flex
                      flex-col
                      sm:flex-row
                      sm:items-end
                      sm:justify-between
                      gap-3
                      mb-4
                    "
                  >

                    <div>

                      <p
                        className="
                          text-[9px]
                          uppercase
                          tracking-[.17em]
                          font-semibold
                          text-[#121358]/35
                        "
                      >
                        Simulation output
                      </p>


                      <h2
                        className="
                          text-[21px]
                          font-bold
                          tracking-[-.025em]
                          mt-1
                        "
                      >
                        Economic impact
                      </h2>


                      <p
                        className="
                          text-[10px]
                          text-[#121358]/40
                          mt-1
                        "
                      >
                        Key results from the selected
                        policy scenario.
                      </p>

                    </div>


                    <div
                      className="
                        inline-flex
                        items-center
                        gap-2
                        text-[9px]
                        text-[#121358]/45
                      "
                    >

                      <span
                        className="
                          w-1.5
                          h-1.5
                          rounded-full
                          bg-[#121358]
                        "
                      />

                      Simulation complete

                    </div>

                  </div>


                  {/* KPI */}

                  <KPISection
                    results={results}
                  />


                  {/* MODEL ASSUMPTIONS */}

                  {results?.closure_rules && (

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 7,
                      }}

                      animate={{
                        opacity: 1,
                        y: 0,
                      }}

                      transition={{
                        duration: .28,
                        delay: .08,
                      }}

                      className="
                        bg-white
                        border
                        border-[#121358]/10
                        rounded-[14px]
                        mt-4
                        p-5
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                          mb-4
                        "
                      >

                        <div
                          className="
                            w-8
                            h-8
                            rounded-lg
                            bg-[#FFF7F3]
                            flex
                            items-center
                            justify-center
                          "
                        >

                          <Globe
                            size={14}
                          />

                        </div>


                        <div>

                          <h3
                            className="
                              text-[13px]
                              font-bold
                            "
                          >
                            Model assumptions
                          </h3>

                          <p
                            className="
                              text-[9px]
                              text-[#121358]/40
                              mt-0.5
                            "
                          >
                            Closure rules used in this simulation.
                          </p>

                        </div>

                      </div>


                      <div
                        className="
                          grid
                          grid-cols-1
                          md:grid-cols-3
                          gap-3
                        "
                      >

                        <RuleCard
                          title="Fiscal"
                          value={
                            results
                              .closure_rules
                              .fiscal_closure
                          }
                        />

                        <RuleCard
                          title="Labor"
                          value={
                            results
                              .closure_rules
                              .labor_closure
                          }
                        />

                        <RuleCard
                          title="External"
                          value={
                            results
                              .closure_rules
                              .external_closure
                          }
                        />

                      </div>

                    </motion.div>

                  )}


                  {/* OUTPUT TABS */}

                  <div
                    className="
                      mt-8
                      border-b
                      border-[#121358]/10
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-7
                      "
                    >

                      {[
                        {
                          id: "overview",
                          label: "Overview",
                        },

                        {
                          id: "sector",
                          label: "Sectors",
                        },

                        {
                          id: "trade",
                          label: "Trade & Fiscal",
                        },

                      ].map(
                        (tab) => (

                          <button
                            key={tab.id}

                            onClick={() =>
                              setActiveTab(
                                tab.id
                              )
                            }

                            className={`
                              relative
                              pb-3
                              text-[10px]
                              font-semibold
                              transition-colors
                              duration-200

                              ${
                                activeTab ===
                                tab.id
                                  ? "text-[#121358]"
                                  : "text-[#121358]/35 hover:text-[#121358]/65"
                              }
                            `}
                          >

                            {tab.label}


                            {activeTab ===
                              tab.id && (

                              <motion.span
                                layoutId="result-tab"

                                transition={{
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 35,
                                }}

                                className="
                                  absolute
                                  left-0
                                  right-0
                                  bottom-[-1px]
                                  h-[2px]
                                  bg-[#121358]
                                  rounded-full
                                "
                              />

                            )}

                          </button>

                        )
                      )}

                    </div>

                  </div>


                  {/* OUTPUT CONTENT */}

                  <AnimatePresence
                    mode="wait"
                  >

                    <motion.div
                      key={activeTab}

                      initial={{
                        opacity: 0,
                        y: 6,
                      }}

                      animate={{
                        opacity: 1,
                        y: 0,
                      }}

                      exit={{
                        opacity: 0,
                        y: -4,
                      }}

                      transition={{
                        duration: .2,
                      }}

                      className="mt-6"
                    >

                      {/* OVERVIEW */}

                      {activeTab ===
                        "overview" && (

                        <div>

                          <OutputSectionHeader
                            icon={
                              <LineChart
                                size={14}
                              />
                            }

                            title="Macroeconomic overview"

                            description="
                              A high-level view of how the
                              simulated policy changes the
                              wider economy.
                            "
                          />


                          <div
                            className="
                              grid
                              grid-cols-1
                              xl:grid-cols-2
                              gap-4
                              mt-4
                            "
                          >

                            {results?.gdp_forecast && (

                              <OutputChart
                                title="GDP Forecast"

                                description="
                                  Projected GDP trajectory
                                  following the policy
                                  intervention.
                                "

                                icon={
                                  <TrendingUp
                                    size={14}
                                  />
                                }

                                wide
                              >

                                <ForecastChart
                                  data={
                                    results.gdp_forecast
                                  }
                                />

                              </OutputChart>

                            )}


                            {results?.gdp_forecast && (

                              <OutputChart
                                title="GDP Growth"

                                description="
                                  Expected changes in the
                                  economy's growth rate.
                                "

                                icon={
                                  <BarChart3
                                    size={14}
                                  />
                                }
                              >

                                <GDPGrowthChart
                                  data={
                                    results.gdp_forecast
                                  }
                                />

                              </OutputChart>

                            )}


                            {results?.simulation_results && (

                              <OutputChart
                                title="Policy Impact"

                                description="
                                  Baseline versus simulated
                                  policy outcomes across
                                  key indicators.
                                "

                                icon={
                                  <Activity
                                    size={14}
                                  />
                                }

                                wide
                              >

                                <PolicyImpactChart
                                  baseline={
                                    results
                                      .simulation_results
                                      .baseline
                                  }

                                  policy={
                                    results
                                      .simulation_results
                                      .policy
                                  }
                                />

                              </OutputChart>

                            )}


                            {results?.simulation_results && (

                              <OutputChart
                                title="Labor Market"

                                description="
                                  Projected labour-market
                                  effects under the selected
                                  scenario.
                                "

                                icon={
                                  <Activity
                                    size={14}
                                  />
                                }
                              >

                                <LaborMarketChart
                                  data={
                                    results
                                      .simulation_results
                                      .policy
                                  }
                                />

                              </OutputChart>

                            )}

                          </div>

                        </div>

                      )}


                      {/* SECTOR */}

                      {activeTab ===
                        "sector" && (

                        <div>

                          <OutputSectionHeader
                            icon={
                              <PieChart
                                size={14}
                              />
                            }

                            title="Sector-level impact"

                            description="
                              See where the simulated policy
                              has the strongest effect across
                              the economy.
                            "
                          />


                          <div
                            className="
                              grid
                              grid-cols-1
                              lg:grid-cols-2
                              gap-4
                              mt-4
                            "
                          >

                            {results?.sector_output && (

                              <OutputChart
                                title="Sector Distribution"

                                description="
                                  Relative distribution of
                                  simulated economic activity
                                  across sectors.
                                "

                                icon={
                                  <PieChart
                                    size={14}
                                  />
                                }
                              >

                                <SectorPieChart
                                  data={
                                    results
                                      ?.simulation_results
                                      ?.policy
                                      ?.sectorOutput
                                  }
                                />

                              </OutputChart>

                            )}


                            {results?.sector_output && (

                              <OutputChart
                                title="Sector Contribution"

                                description="
                                  Contribution of individual
                                  sectors to the simulated
                                  outcome.
                                "

                                icon={
                                  <BarChart3
                                    size={14}
                                  />
                                }
                              >

                                <SectorContributionChart
                                  data={
                                    results
                                      ?.simulation_results
                                      ?.policy
                                      ?.sectorOutput
                                  }
                                />

                              </OutputChart>

                            )}


                            {(results?.sam_matrix ||
                              results?.SAM) && (

                              <div
                                className="
                                  lg:col-span-2
                                "
                              >

                                <OutputChart
                                  title="Social Accounting Matrix"

                                  description="
                                    Relationships between
                                    economic sectors and
                                    institutional accounts.
                                  "

                                  icon={
                                    <Globe
                                      size={14}
                                    />
                                  }

                                  wide
                                >

                                  <SAMChart
                                    data={
                                      results.sam_matrix ||
                                      results.SAM
                                    }
                                  />

                                </OutputChart>

                              </div>

                            )}

                          </div>

                        </div>

                      )}


                      {/* TRADE */}

                      {activeTab ===
                        "trade" && (

                        <div>

                          <OutputSectionHeader
                            icon={
                              <Globe
                                size={14}
                              />
                            }

                            title="Trade & fiscal impact"

                            description="
                              Understand the policy's effect
                              on trade flows and government
                              finances.
                            "
                          />


                          <div
                            className="
                              grid
                              grid-cols-1
                              lg:grid-cols-2
                              gap-4
                              mt-4
                            "
                          >

                            <OutputChart
                              title="Trade Analysis"

                              description="
                                Changes in exports, imports
                                and overall trade activity.
                              "

                              icon={
                                <Globe
                                  size={14}
                                />
                              }
                            >

                              <TradeChart
                                data={
                                  results
                                    ?.simulation_results
                                    ?.policy
                                }
                              />

                            </OutputChart>


                            <OutputChart
                              title="Fiscal Balance"

                              description="
                                Projected fiscal position
                                under the simulated policy.
                              "

                              icon={
                                <BarChart3
                                  size={14}
                                />
                              }
                            >

                              <FiscalChart
                                data={
                                  results
                                    ?.simulation_results
                                    ?.policy
                                }
                              />

                            </OutputChart>

                          </div>

                        </div>

                      )}

                    </motion.div>

                  </AnimatePresence>

                </motion.section>

              )}

            </AnimatePresence>

          </div>

        </main>

      </div>


      {/* =====================================================
          MOBILE NAV
      ====================================================== */}

      <div
        className="
          md:hidden
          fixed
          bottom-4
          left-1/2
          -translate-x-1/2
          z-50
          bg-[#121358]
          rounded-full
          px-4
          py-2
          flex
          items-center
          gap-5
          shadow-[0_10px_25px_rgba(18,19,88,.18)]
        "
      >

        {/* MODE */}

        <motion.button
          whileTap={{
            scale: 0.9,
          }}

          onClick={() =>
            navigate(
              "/mode-selection"
            )
          }

          className="
            w-8
            h-8
            rounded-full
            flex
            items-center
            justify-center
            text-[#FFF7F3]/70
            hover:text-[#FFF7F3]
            transition-colors
          "
          aria-label="Change mode"
        >

          <SlidersHorizontal
            size={14}
          />

        </motion.button>


        {sidebarItems.map(
          (item) => {

            const Icon =
              item.icon;

            return (

              <motion.button
                key={item.label}

                whileTap={{
                  scale: 0.9,
                }}

                onClick={
                  item.action
                }

                className={`
                  w-8
                  h-8
                  rounded-full
                  flex
                  items-center
                  justify-center

                  ${
                    item.active
                      ? `
                        bg-[#FFF7F3]
                        text-[#121358]
                      `
                      : `
                        text-[#FFF7F3]/55
                      `
                  }
                `}
              >

                <Icon
                  size={14}
                />

              </motion.button>

            );

          }
        )}

      </div>

    </div>

  );

}


/* =============================================================
   KPI SECTION
============================================================= */

function KPISection({
  results,
}) {

  const items = [

    {
      title: "GDP",
      key: "GDP",
      type: "currency",
      description: "Economic output",
    },

    {
      title: "Unemployment",
      key: "unemployment",
      type: "percent",
      description: "Labour market",
    },

    {
      title: "Inflation",
      key: "inflation",
      type: "percent",
      description: "Price level",
    },

    {
      title: "Exports",
      key: "exports",
      type: "currency",
      description: "External demand",
    },

    {
      title: "Imports",
      key: "imports",
      type: "currency",
      description: "External supply",
    },

    {
      title: "Trade Balance",
      key: "tradeBalance",
      type: "currency",
      description: "Net trade",
    },

  ];


  const formatCurrency = (val) => {

    if (!val)
      return "$0.00";

    if (val >= 1e12)
      return `$${(
        val / 1e12
      ).toFixed(2)}T`;

    if (val >= 1e9)
      return `$${(
        val / 1e9
      ).toFixed(2)}B`;

    if (val >= 1e6)
      return `$${(
        val / 1e6
      ).toFixed(2)}M`;

    return `$${val.toFixed(2)}`;

  };


  return (

    <div
      className="
        grid
        grid-cols-2
        md:grid-cols-3
        lg:grid-cols-6
        gap-3
      "
    >

      {items.map(
        (item, index) => {

          const value =
            results
              ?.simulation_results
              ?.policy?.[
                item.key
              ] || 0;


          const baseline =
            results
              ?.simulation_results
              ?.baseline?.[
                item.key
              ] || 0;


          const change =
            value - baseline;


          const isPositive =
            change >= 0;


          return (

            <motion.div
              key={item.title}

              initial={{
                opacity: 0,
                y: 7,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: .25,
                delay:
                  index * .035,
              }}

              whileHover={{
                y: -2,
              }}

              className="
                bg-white
                border
                border-[#121358]/10
                rounded-xl
                p-3.5
                shadow-[0_4px_15px_rgba(18,19,88,.035)]
                hover:shadow-[0_8px_22px_rgba(18,19,88,.065)]
                transition-shadow
                duration-200
              "
            >

              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-2
                "
              >

                <div>

                  <p
                    className="
                      text-[9px]
                      font-semibold
                      text-[#121358]/40
                    "
                  >
                    {item.title}
                  </p>


                  <p
                    className="
                      text-[17px]
                      font-bold
                      mt-1
                      tracking-tight
                    "
                  >

                    {item.type ===
                    "currency"
                      ? formatCurrency(
                          value
                        )
                      : `${value.toFixed(
                          2
                        )}%`}

                  </p>


                  <p
                    className="
                      text-[8px]
                      text-[#121358]/30
                      mt-1
                    "
                  >
                    {item.description}
                  </p>

                </div>


                <div
                  className="
                    w-7
                    h-7
                    rounded-full
                    bg-[#FFF7F3]
                    flex
                    items-center
                    justify-center
                  "
                >

                  {isPositive ? (

                    <TrendingUp
                      size={13}
                      className="
                        text-[#121358]
                      "
                    />

                  ) : (

                    <TrendingDown
                      size={13}
                      className="
                        text-[#7A4050]
                      "
                    />

                  )}

                </div>

              </div>


              <div
                className="
                  mt-3
                  pt-2
                  border-t
                  border-[#121358]/[.06]
                "
              >

                <span
                  className={`
                    text-[8px]
                    font-semibold
                    ${
                      isPositive
                        ? "text-[#121358]"
                        : "text-[#7A4050]"
                    }
                  `}
                >

                  {isPositive
                    ? "+"
                    : ""}

                  {change.toFixed(
                    2
                  )}

                  {" "}

                  vs baseline

                </span>

              </div>

            </motion.div>

          );

        }
      )}

    </div>

  );

}


/* =============================================================
   TOP NAV
============================================================= */

function TopNavItem({
  label,
  active = false,
  onClick,
}) {

  return (

    <motion.button
      onClick={onClick}

      whileHover={{
        y: -1,
      }}

      whileTap={{
        scale: 0.96,
      }}

      className={`
        relative
        text-[10px]
        font-medium
        cursor-pointer
        transition-colors
        duration-200

        ${
          active
            ? `
              text-[#121358]
              font-semibold
            `
            : `
              text-[#121358]/45
              hover:text-[#121358]
            `
        }
      `}
    >

      {label}


      {active && (

        <motion.span
          layoutId="top-navigation"

          transition={{
            type: "spring",
            stiffness: 500,
            damping: 35,
          }}

          className="
            absolute
            left-0
            right-0
            -bottom-[21px]
            h-[2px]
            bg-[#121358]
            rounded-full
          "
        />

      )}

    </motion.button>

  );

}


/* =============================================================
   INSIGHT ROW
============================================================= */

function InsightRow({
  number,
  text,
}) {

  return (

    <motion.div
      whileHover={{
        x: 2,
      }}

      transition={{
        duration: 0.15,
      }}

      className="
        flex
        items-center
        gap-3
      "
    >

      <span
        className="
          w-4
          text-[8px]
          text-[#FFF7F3]/30
          font-semibold
        "
      >
        {number}
      </span>


      <span
        className="
          w-1
          h-1
          rounded-full
          bg-[#FFF7F3]/70
        "
      />


      <span
        className="
          text-[10px]
          text-[#FFF7F3]/70
        "
      >
        {text}
      </span>

    </motion.div>

  );

}


/* =============================================================
   RULE CARD
============================================================= */

function RuleCard({
  title,
  value,
}) {

  return (

    <motion.div
      whileHover={{
        y: -2,
      }}

      transition={{
        duration: 0.15,
      }}

      className="
        rounded-lg
        bg-[#FFF7F3]/60
        border
        border-[#121358]/[.06]
        px-4
        py-3
      "
    >

      <p
        className="
          text-[8px]
          uppercase
          tracking-[.14em]
          font-semibold
          text-[#121358]/35
        "
      >
        {title}
      </p>


      <p
        className="
          text-[10px]
          font-semibold
          mt-1
          leading-4
        "
      >
        {value || "Not specified"}
      </p>

    </motion.div>

  );

}


/* =============================================================
   OUTPUT SECTION HEADER
============================================================= */

function OutputSectionHeader({
  icon,
  title,
  description,
}) {

  return (

    <div
      className="
        flex
        items-start
        gap-3
      "
    >

      <div
        className="
          w-8
          h-8
          rounded-lg
          bg-[#121358]
          text-[#FFF7F3]
          flex
          items-center
          justify-center
          shrink-0
        "
      >

        {icon}

      </div>


      <div>

        <h3
          className="
            text-[15px]
            font-bold
            tracking-tight
          "
        >
          {title}
        </h3>


        <p
          className="
            text-[10px]
            text-[#121358]/40
            mt-1
            leading-4
          "
        >
          {description}
        </p>

      </div>

    </div>

  );

}


/* =============================================================
   OUTPUT CHART
============================================================= */

function OutputChart({
  title,
  description,
  icon,
  children,
  wide = false,
}) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 8,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: .28,
        ease: "easeOut",
      }}

      whileHover={{
        y: -2,
      }}

      className={`
        bg-white
        border
        border-[#121358]/10
        rounded-[14px]
        overflow-hidden
        shadow-[0_5px_20px_rgba(18,19,88,.035)]
        hover:shadow-[0_9px_26px_rgba(18,19,88,.065)]
        transition-shadow
        duration-200

        ${
          wide
            ? "xl:col-span-2"
            : ""
        }
      `}
    >

      {/* HEADER */}

      <div
        className="
          px-5
          pt-5
          pb-4
          border-b
          border-[#121358]/[.06]
        "
      >

        <div
          className="
            flex
            items-start
            gap-3
          "
        >

          <div
            className="
              w-8
              h-8
              rounded-lg
              bg-[#FFF7F3]
              text-[#121358]
              flex
              items-center
              justify-center
              shrink-0
            "
          >

            {icon}

          </div>


          <div>

            <h4
              className="
                text-[13px]
                font-bold
                tracking-tight
              "
            >
              {title}
            </h4>


            <p
              className="
                text-[9px]
                text-[#121358]/40
                mt-1
                leading-4
              "
            >
              {description}
            </p>

          </div>

        </div>

      </div>


      {/* CHART */}

      <div
        className="
          theme-chart
          chart-canvas
          px-3
          py-3
        "
      >

        <div
          className="
            w-full
            h-full
            min-w-0
          "
        >

          {children}

        </div>

      </div>

    </motion.div>

  );

}