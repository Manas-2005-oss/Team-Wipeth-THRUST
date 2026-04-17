 import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function AboutUs() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-all duration-500">

      {/* Background Glow */}
      <div className="absolute -top-50 -right-50 w-125 h-125 bg-indigo-400/20 dark:bg-green-400/20 blur-[120px] rounded-full animate-pulse"></div>

      <Navbar />

      {/* HERO */}
      <section className="pt-36 pb-24 px-6 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-6 tracking-tight"
        >
          THRUST – CGE Economic Simulation Framework
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg max-w-4xl mx-auto text-slate-600 dark:text-slate-300 leading-relaxed"
        >
          THRUST is an AI-driven economic policy simulator designed to model how
          fiscal policies, sector productivity, labor mobility, and trade
          policies affect macroeconomic indicators like GDP, unemployment,
          inflation, and sectoral output.
        </motion.p>
      </section>

      {/* FEATURE CARDS */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-8">
        <Feature
          title="Macroeconomic Simulation"
          desc="Simulates sector interactions between agriculture, manufacturing, and services using a CGE-inspired framework."
        />

        <Feature
          title="Policy Shock Modeling"
          desc="Evaluate impacts of taxation, tariffs, subsidies, and government spending policies on economic outcomes."
        />

        <Feature
          title="Dynamic Equilibrium Engine"
          desc="Iterative solver stabilizes the economy by adjusting GDP, inflation, and labor markets until convergence."
        />
      </section>

      <div className="max-w-6xl mx-auto px-6 space-y-24 pb-24 relative z-10">

        <Section title="Project Objective">
          <p>
            THRUST simulates how macroeconomic policy shocks propagate across
            Agriculture, Manufacturing, and Services through production,
            fiscal flows, labor markets, and equilibrium adjustment.
          </p>
        </Section>

        <Section title="1. Production Block">
          <Formula>Yi = Yi_base × (1 + Productivity_i/100 + Subsidy_i/100)</Formula>
          <Formula>GDP_raw = YA + YM + YS</Formula>
          <Formula>RippleEffect = A_matrix × Sector_Output_Vector</Formula>
        </Section>

        <Section title="2. Fiscal & Government Block">
          <Formula>
            Revenue = IncomeTax × 0.4 × GDP + CorporateTax × 0.2 × GDP
          </Formula>
          <Formula>
            Deficit = GovSpending + Subsidies − Revenue
          </Formula>
          <Formula>
            GDP_adjusted = GDP_raw + FiscalMultiplier × GovSpending
          </Formula>
        </Section>

        <Section title="3. Labor Market & Wage Dynamics">
          <Formula>
            ΔGDP% = (GDP − BaselineGDP) / BaselineGDP × 100
          </Formula>
          <Formula>
            Unemployment = BaselineUnemployment − β × ΔGDP%
          </Formula>
          <Formula>
            Wage = BaselineWage × (1 + WagePressure + MinimumWageEffect)
          </Formula>
          <Formula>
            LaborShare_i = Yi / GDP
          </Formula>
        </Section>

        <Section title="4. Inflation Model">
          <Formula>
            Inflation = BaselineInflation + 0.6 × (Deficit/GDP) +
            0.3 × ΔGDP% + 0.2 × WageGrowth
          </Formula>
        </Section>

        <Section title="5. Iterative Equilibrium Solver">
          <Formula>
            GDP(t+1) = GDP(t) × (1 − Inflation / λ)
          </Formula>
          <Formula>
            |GDP(t+1) − GDP(t)| &lt; ε → Convergence Achieved
          </Formula>
        </Section>

        <Section title="6. Social Accounting Matrix (SAM)">
          <Formula>LaborIncome_i = 0.6 × Yi</Formula>
          <Formula>CapitalIncome_i = 0.4 × Yi</Formula>
        </Section>

        <Section title="7. AI-Based Policy Scoring">
          <Formula>
            Score = 50 + 0.5 × GDP_growth − 0.7 × Inflation − 1 ×
            Unemployment − 0.05 × |Deficit|
          </Formula>
        </Section>

        {/* WORKFLOW */}
        <Section title="System Workflow">
          <ul className="list-disc ml-6 space-y-2">
            <li>Policy input is provided through the dashboard.</li>
            <li>The system interprets policy parameters.</li>
            <li>Economic modules simulate production, fiscal effects, and labor adjustments.</li>
            <li>Trade and equilibrium solver stabilize the economy.</li>
            <li>Results are visualized through interactive charts.</li>
          </ul>
        </Section>

      </div>

      {/* MODERN FOOTER */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10 text-center md:text-left">

          <div>
            <h3 className="font-semibold text-lg mb-2">THRUST</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              AI powered macroeconomic policy simulator designed to evaluate
              fiscal and trade policies through interactive economic modeling.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Core Modules</h3>
            <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
              <li>Production Engine</li>
              <li>Fiscal Simulation</li>
              <li>Labor Market Model</li>
              <li>Trade Analysis</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Technology</h3>
            <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
              <li>React Dashboard</li>
              <li>FastAPI Backend</li>
              <li>Economic Simulation Engine</li>
              <li>Interactive Data Visualization</li>
            </ul>
          </div>

        </div>

        <div className="text-center text-sm py-4 text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
          © 2026 Team Wipeth
        </div>
      </footer>

    </div>
  );
}

/* SECTION */

const Section = ({ title, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="p-10 rounded-3xl backdrop-blur-lg bg-white/70 dark:bg-slate-800/70 shadow-2xl hover:shadow-indigo-200 dark:hover:shadow-green-500/20 transition-all duration-500"
  >
    <h2 className="text-3xl font-bold mb-6 relative inline-block">
      {title}
      <span className="block h-1 w-16 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-green-400 dark:to-blue-500 mt-2 rounded-full"></span>
    </h2>

    <div className="space-y-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
      {children}
    </div>
  </motion.section>
);

/* FORMULA */

const Formula = ({ children }) => (
  <div className="mt-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-100 to-indigo-50 dark:from-slate-900 dark:to-slate-800 border-l-4 border-indigo-600 dark:border-green-400 font-mono text-indigo-700 dark:text-green-400 shadow-inner hover:scale-[1.02] transition-transform duration-300">
    {children}
  </div>
);

/* FEATURE */

const Feature = ({ title, desc }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg"
  >
    
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-sm text-slate-600 dark:text-slate-300">{desc}</p>

  </motion.div>
);