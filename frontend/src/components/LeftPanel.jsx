import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Wheat,
  Landmark,
  Building2,
  Factory,
  Users,
  Play,
  RotateCcw,
  SlidersHorizontal,
  Activity,
  TrendingUp,
} from "lucide-react";

const DEFAULT_INPUTS = {
  agriProd: 0,
  mfgProd: 0,
  svcProd: 0,

  incomeTax: 20,
  corporateTax: 25,

  govSpending: 180,
  infraShare: 10,

  agriSubsidy: 5,
  mfgSubsidy: 5,
  svcSubsidy: 3,

  laborShift: 0,
  minWage: 600,
};

export default function LeftPanel({ onRun }) {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);

  useEffect(() => {
    const savedInputs = sessionStorage.getItem("simulationInputs");

    if (savedInputs) {
      try {
        setInputs(JSON.parse(savedInputs));
      } catch (error) {
        console.error("Unable to load saved simulation inputs:", error);
      }

      sessionStorage.removeItem("simulationInputs");
    }
  }, []);

  const handleChange = (field, value) => {
    setInputs((previous) => ({
      ...previous,
      [field]: value === "" ? "" : Number(value),
    }));
  };

  const handleRun = () => {
    onRun(inputs);
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3] px-4 pb-5 pt-24 sm:px-5 lg:px-6">
      <div className="mx-auto w-full max-w-[1500px]">

        {/* PAGE HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-center"
        >
          <div className="mb-1 flex items-center justify-center gap-2">
            <Activity size={13} className="text-[#25245f]" />

            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
              AI-Powered Simulation Engine
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-[#25245f] sm:text-3xl">
            Hybrid Policy Simulator
          </h1>

          <p className="mx-auto mt-1 max-w-3xl text-xs leading-5 text-slate-500">
            Configure and combine multiple economic policy interventions to
            analyze their impact across macroeconomic indicators and sectors.
          </p>
        </motion.div>

        {/* MAIN LAYOUT */}
        <div className="grid items-stretch gap-4 xl:grid-cols-[minmax(0,1fr)_290px]">

          {/* POLICY CONFIGURATION */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="
              overflow-hidden
              rounded-[18px]
              border border-[#dedad3]
              bg-white/80
              shadow-[0_6px_20px_rgba(15,23,42,0.04)]
            "
          >
            {/* POLICY HEADER */}
            <div className="flex items-center gap-3 border-b border-[#e7e2db] px-5 py-3">
              <div
                className="
                  flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-xl
                  bg-[#f3f0eb]
                  text-[#25245f]
                "
              >
                <SlidersHorizontal size={18} />
              </div>

              <div>
                <h2 className="text-base font-bold text-[#252a4d]">
                  Policy Configuration
                </h2>

                <p className="mt-0.5 text-[10px] text-slate-400">
                  Define the economic interventions you want to simulate.
                </p>
              </div>
            </div>

            {/* POLICY CARDS */}
            <div className="p-3">
              <div className="grid gap-3 lg:grid-cols-2">

                <Section
                  title="Production"
                  subtitle="Sector productivity changes"
                  icon={<Wheat size={17} />}
                >
                  <Input
                    label="Agriculture Productivity"
                    suffix="%"
                    min={-10}
                    max={10}
                    value={inputs.agriProd}
                    onChange={(value) =>
                      handleChange("agriProd", value)
                    }
                  />

                  <Input
                    label="Manufacturing Productivity"
                    suffix="%"
                    min={-10}
                    max={10}
                    value={inputs.mfgProd}
                    onChange={(value) =>
                      handleChange("mfgProd", value)
                    }
                  />

                  <Input
                    label="Services Productivity"
                    suffix="%"
                    min={-10}
                    max={10}
                    value={inputs.svcProd}
                    onChange={(value) =>
                      handleChange("svcProd", value)
                    }
                  />
                </Section>

                <Section
                  title="Tax Policies"
                  subtitle="Revenue and taxation changes"
                  icon={<Landmark size={17} />}
                >
                  <Input
                    label="Income Tax"
                    suffix="%"
                    min={10}
                    max={35}
                    value={inputs.incomeTax}
                    onChange={(value) =>
                      handleChange("incomeTax", value)
                    }
                  />

                  <Input
                    label="Corporate Tax"
                    suffix="%"
                    min={15}
                    max={35}
                    value={inputs.corporateTax}
                    onChange={(value) =>
                      handleChange("corporateTax", value)
                    }
                  />
                </Section>

                <Section
                  title="Fiscal Policy"
                  subtitle="Government expenditure settings"
                  icon={<Building2 size={17} />}
                >
                  <Input
                    label="Government Spending"
                    prefix="₹"
                    min={120}
                    max={250}
                    value={inputs.govSpending}
                    onChange={(value) =>
                      handleChange("govSpending", value)
                    }
                  />

                  <Input
                    label="Infrastructure Share"
                    suffix="%"
                    min={5}
                    max={20}
                    value={inputs.infraShare}
                    onChange={(value) =>
                      handleChange("infraShare", value)
                    }
                  />
                </Section>

                <Section
                  title="Subsidies"
                  subtitle="Sector support allocation"
                  icon={<Factory size={17} />}
                >
                  <Input
                    label="Agriculture Subsidy"
                    suffix="%"
                    min={0}
                    max={20}
                    value={inputs.agriSubsidy}
                    onChange={(value) =>
                      handleChange("agriSubsidy", value)
                    }
                  />

                  <Input
                    label="Manufacturing Subsidy"
                    suffix="%"
                    min={0}
                    max={20}
                    value={inputs.mfgSubsidy}
                    onChange={(value) =>
                      handleChange("mfgSubsidy", value)
                    }
                  />

                  <Input
                    label="Services Subsidy"
                    suffix="%"
                    min={0}
                    max={10}
                    value={inputs.svcSubsidy}
                    onChange={(value) =>
                      handleChange("svcSubsidy", value)
                    }
                  />
                </Section>

                <Section
                  className="lg:col-span-2"
                  title="Labour Market"
                  subtitle="Employment and wage settings"
                  icon={<Users size={17} />}
                >
                  <div className="grid gap-3 md:grid-cols-2">
                    <Input
                      label="Labour Shift"
                      suffix="%"
                      min={-5}
                      max={5}
                      value={inputs.laborShift}
                      onChange={(value) =>
                        handleChange("laborShift", value)
                      }
                    />

                    <Input
                      label="Minimum Wage"
                      prefix="₹"
                      min={400}
                      max={1000}
                      value={inputs.minWage}
                      onChange={(value) =>
                        handleChange("minWage", value)
                      }
                    />
                  </div>
                </Section>

              </div>
            </div>

            {/* ACTION BAR */}
            <div className="flex items-center justify-between border-t border-[#e7e2db] px-5 py-3">
              <button
                onClick={handleReset}
                className="
                  flex items-center gap-2
                  rounded-lg px-3 py-2
                  text-xs font-semibold text-slate-500
                  transition hover:bg-[#f3f0eb]
                "
              >
                <RotateCcw size={14} />
                Reset
              </button>

              <motion.button
                onClick={handleRun}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="
                  flex min-w-[170px]
                  items-center justify-center gap-2
                  rounded-xl
                  bg-[#25245f]
                  px-5 py-2.5
                  text-xs font-semibold
                  text-white
                  shadow-[0_6px_18px_rgba(37,36,95,0.18)]
                  transition
                  hover:bg-[#1e1d52]
                "
              >
                <Play size={14} fill="currentColor" />
                Run Simulation
                <span>→</span>
              </motion.button>
            </div>
          </motion.section>

          {/* ANALYSIS PANEL */}
          <motion.aside
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="
              relative
              flex min-h-full
              flex-col
              overflow-hidden
              rounded-[18px]
              bg-[#25245f]
              p-5
              text-white
              shadow-[0_12px_30px_rgba(37,36,95,0.15)]
            "
          >
            <div className="relative z-10">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <Activity size={18} />
              </div>

              <h2 className="text-base font-bold">
                Analysis includes
              </h2>

              <p className="mt-2 text-[11px] leading-5 text-white/60">
                Your policy configuration is evaluated across multiple
                economic dimensions.
              </p>

              <div className="mt-7 space-y-4">
                <AnalysisItem
                  number="01"
                  text="Macroeconomic indicators"
                />

                <AnalysisItem
                  number="02"
                  text="Sector-level effects"
                />

                <AnalysisItem
                  number="03"
                  text="Trade and fiscal impact"
                />

                <AnalysisItem
                  number="04"
                  text="GDP and labour projections"
                />

                <AnalysisItem
                  number="05"
                  text="Policy interaction effects"
                />
              </div>
            </div>

            <div className="relative z-10 mt-auto border-t border-white/10 pt-4">
              <div className="flex items-start gap-2">
                <TrendingUp
                  size={15}
                  className="mt-0.5 shrink-0 text-white/60"
                />

                <p className="text-[10px] leading-5 text-white/50">
                  Results depend on selected policy values and model assumptions.
                </p>
              </div>
            </div>

            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/[0.04]" />
          </motion.aside>

        </div>
      </div>
    </div>
  );
}


/* =====================================================
   SECTION COMPONENT
===================================================== */

function Section({
  title,
  subtitle,
  icon,
  children,
  className = "",
}) {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
      className={`
        h-full
        min-h-[205px]
        rounded-[16px]
        border border-[#dedad3]
        bg-[#fcfbf9]
        p-4
        transition-shadow
        hover:shadow-[0_6px_18px_rgba(15,23,42,0.04)]
        ${className}
      `}
    >
      <div className="mb-3 flex items-center gap-3">
        <div
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-xl
            bg-[#f3f0eb]
            text-[#25245f]
          "
        >
          {icon}
        </div>

        <div className="min-w-0">
          <h2 className="text-sm font-bold text-[#252a4d]">
            {title}
          </h2>

          <p className="mt-0.5 truncate text-[10px] text-slate-400">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {children}
      </div>
    </motion.div>
  );
}


/* =====================================================
   INPUT COMPONENT
===================================================== */

function Input({
  label,
  value,
  onChange,
  min,
  max,
  prefix,
  suffix,
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2">
        <label className="truncate text-[11px] font-medium text-slate-600">
          {label}
        </label>

        {suffix && (
          <span className="shrink-0 text-[10px] text-slate-400">
            {suffix}
          </span>
        )}
      </div>

      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            {prefix}
          </span>
        )}

        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`
            h-10 w-full
            rounded-xl
            border border-[#ddd9d2]
            bg-white
            py-2
            text-sm font-semibold
            text-[#252a4d]
            outline-none
            transition-all
            focus:border-[#25245f]
            focus:ring-2
            focus:ring-[#25245f]/10
            ${prefix ? "pl-8 pr-3" : "px-3"}
          `}
        />
      </div>

      <div className="mt-1 flex justify-between text-[9px] text-slate-400">
        <span>Min {min}</span>
        <span>Max {max}</span>
      </div>
    </div>
  );
}


/* =====================================================
   ANALYSIS ITEM
===================================================== */

function AnalysisItem({ number, text }) {
  return (
    <div className="grid grid-cols-[24px_6px_1fr] items-center gap-2">
      <span className="text-[9px] font-semibold text-white/35">
        {number}
      </span>

      <span className="h-1 w-1 rounded-full bg-white/70" />

      <span className="text-xs text-white/75">
        {text}
      </span>
    </div>
  );
}