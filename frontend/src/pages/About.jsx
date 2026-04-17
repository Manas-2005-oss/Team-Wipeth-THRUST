 import { motion, useScroll, useSpring } from "framer-motion";
import {
  BarChart3,
  Globe,
  TrendingUp,
  Brain,
  Factory,
  Zap,
  ArrowRight
} from "lucide-react";

import EconomistNavbar from "../components/EconomistNavbar";

export default function About() {

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
  
    stiffness: 100,
    damping: 30

  });

  return (

    <div className="relative min-h-screen  bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-all duration-500">

      <EconomistNavbar />

      {/* Scroll Progress */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
      />

      <div className="pt-32 px-6 max-w-6xl mx-auto space-y-24">

        {/* HERO */}
        <div className="text-center space-y-6">

          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            AI- Driven Economic Policy Simulator
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto">
            An AI powered policy simulation dashboard that interprets
            natural language economic policies using a Large Language Model
            and converts them into structured parameters for economic
            simulations and visual analytics.
          </p>

        </div>

        {/* SYSTEM PIPELINE */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">

          {[
            "Policy Input",
            "LLM Policy Interpreter",
            "Simulation Engine",
            "Dashboard Insights"
          ].map((step, i) => (

            <div key={i} className="flex items-center gap-4">

              <div className="bg-white p-6 rounded-xl shadow border">
                {step}
              </div>

              {i < 3 && <ArrowRight />}

            </div>

          ))}

        </div>

        {/* ABOUT PROJECT */}
        <section className="bg-white p-10 rounded-2xl shadow-lg border">

          <h2 className="text-2xl font-semibold mb-6">
            About the Project
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            THRUST is an AI-assisted economic policy dashboard designed to
            analyze the impact of macroeconomic policy changes. The system
            allows users to enter policy decisions in natural language such
            as tax reforms, tariff adjustments or government spending
            changes.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            A Large Language Model interprets the policy description and
            extracts structured economic parameters. These parameters are
            then processed by the simulation engine which evaluates how
            policy changes affect key economic indicators.
          </p>

          <p className="text-gray-600 leading-relaxed">
            The dashboard visualizes results such as GDP trends, sector
            performance, trade balance and fiscal indicators through
            interactive charts and analytics.
          </p>

          {/* PIPELINE CARDS */}
          <div className="grid md:grid-cols-4 gap-6 text-center mt-10">

            <Card
              icon={Brain}
              title="Policy Parsing"
              text="LLM interprets natural language policy"
            />

            <Card
              icon={BarChart3}
              title="Parameter Extraction"
              text="Policy is converted into structured variables"
            />

            <Card
              icon={Factory}
              title="Simulation Engine"
              text="Model calculates economic outcomes"
            />

            <Card
              icon={TrendingUp}
              title="Dashboard Analytics"
              text="Results visualized through interactive charts"
            />

          </div>

        </section>

        {/* LLM FORMULAS */}
      <section className="bg-white p-10 rounded-2xl shadow-lg border">

<h2 className="text-2xl font-semibold mb-6">
Economic Model Equations
</h2>

<p className="text-gray-600 mb-6">
The LLM interprets policy instructions and converts them into parameters
that are applied to the economic simulation model. The model uses the
following macroeconomic equations.
</p>

<div className="grid md:grid-cols-2 gap-6 font-mono text-sm">

<Formula>
GDP = C + I + G + (X − M)
</Formula>

<Formula>
Production: Y = A × K^α × L^(1−α)
</Formula>

<Formula>
Sector Output: Y_total = Y_agri + Y_mfg + Y_services
</Formula>

<Formula>
Exports = GDP × export_share
</Formula>

<Formula>
Imports = GDP × import_share × (1 − τ)
</Formula>

<Formula>
Trade Balance = Exports − Imports
</Formula>

<Formula>
Tax Revenue = tax_rate × GDP × labor_share
</Formula>

<Formula>
Fiscal Deficit = Government Spending − Tax Revenue
</Formula>

<Formula>
Unemployment ≈ f(Output Gap)
</Formula>

<Formula>
Wage = GDP / Labor Supply
</Formula>

</div>

</section>

        {/* VISUAL ANALYTICS */}
        <section className="bg-white p-10 rounded-2xl shadow-lg border">

          <h2 className="text-2xl font-semibold mb-6">
            Dashboard Visual Analytics
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <Feature title="GDP Forecast" icon={TrendingUp} />
            <Feature title="Sector Output Analysis" icon={Factory} />
            <Feature title="Trade Flow Visualization" icon={Globe} />
            <Feature title="Fiscal Balance Tracking" icon={BarChart3} />
            <Feature title="Labor Market Indicators" icon={Zap} />
            <Feature title="Policy Impact Charts" icon={Brain} />

          </div>

        </section>

      </div>

      {/* FOOTER */}
      {/* MODERN LIGHT FOOTER */}
<footer className="mt-24 border-t border-gray-200 bg-gradient-to-b from-gray-50 to-gray-100 py-14">

<motion.div
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-gray-700"
>

<div>
<h3 className="text-lg font-semibold mb-3 text-gray-900">
THRUST
</h3>

<p className="text-sm text-gray-600 leading-relaxed">
AI powered macroeconomic policy simulator designed to evaluate fiscal
and trade policies through interactive economic modeling.
</p>
</div>

<div>
<h3 className="text-lg font-semibold mb-3 text-gray-900">
Core Modules
</h3>

<ul className="space-y-2 text-sm text-gray-600">
<li>Production Engine</li>
<li>Fiscal Simulation</li>
<li>Labor Market Model</li>
<li>Trade Analysis</li>
</ul>
</div>

<div>
<h3 className="text-lg font-semibold mb-3 text-gray-900">
Technology
</h3>

<ul className="space-y-2 text-sm text-gray-600">
<li>React Dashboard</li>
<li>FastAPI Backend</li>
<li>Economic Simulation Engine</li>
<li>Interactive Data Visualization</li>
</ul>
</div>

</motion.div>

<div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
© 2026 Team Wipeth
</div>

</footer>

    </div>

  );
}

/* COMPONENTS */

function Card({ icon: Icon, title, text }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-50 p-6 rounded-xl border shadow-sm"
    >
      <Icon className="mx-auto text-blue-600 mb-3" size={26} />
      <h3 className="font-semibold">{title}</h3>
      <p className="text-xs text-gray-500 mt-1">{text}</p>
    </motion.div>
  );
}

function Formula({ children }) {
  return (
    <div className="p-4 bg-gray-50 rounded border">
      {children}
    </div>
  );
}

function Feature({ title, icon: Icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-4 bg-gray-50 p-5 rounded-lg border"
    >
      <Icon className="text-blue-600" />
      <span className="font-medium">{title}</span>
    </motion.div>
  );
}