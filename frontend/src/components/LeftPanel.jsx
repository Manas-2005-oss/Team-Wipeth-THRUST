 import { useState } from "react";

export default function LeftPanel({ onRun }) {

  const [inputs, setInputs] = useState({
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
    minWage: 600
  });

  const handleChange = (field, value) => {
    setInputs({ ...inputs, [field]: Number(value) });
  };

  const handleRun = () => {
    onRun(inputs);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mx-8 mt-6">

      <h1 className="text-2xl text-center font-bold mb-8">
         Hybrid Policy Simulator
      </h1>

      <div className="grid gap-8 lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1">

        {/* PRODUCTION */}
        <Section title="🌾 Production">
          <Input label="Agriculture Productivity (%)" min={-10} max={10}
            value={inputs.agriProd}
            onChange={(v) => handleChange("agriProd", v)}
          />
          <Input label="Manufacturing Productivity (%)" min={-10} max={10}
            value={inputs.mfgProd}
            onChange={(v) => handleChange("mfgProd", v)}
          />
          <Input label="Services Productivity (%)" min={-10} max={10}
            value={inputs.svcProd}
            onChange={(v) => handleChange("svcProd", v)}
          />
        </Section>

        {/* TAX */}
        <Section title="💰 Tax Policies">
          <Input label="Income Tax (%)" min={10} max={35}
            value={inputs.incomeTax}
            onChange={(v) => handleChange("incomeTax", v)}
          />
          <Input label="Corporate Tax (%)" min={15} max={35}
            value={inputs.corporateTax}
            onChange={(v) => handleChange("corporateTax", v)}
          />
        </Section>

        {/* FISCAL */}
        <Section title="🏛 Fiscal Policy">
          <Input label="Government Spending" min={120} max={250}
            value={inputs.govSpending}
            onChange={(v) => handleChange("govSpending", v)}
          />
          <Input label="Infrastructure Share (%)" min={5} max={20}
            value={inputs.infraShare}
            onChange={(v) => handleChange("infraShare", v)}
          />
        </Section>

        {/* SUBSIDIES */}
        <Section title="🏭 Subsidies">
          <Input label="Agriculture Subsidy (%)" min={0} max={20}
            value={inputs.agriSubsidy}
            onChange={(v) => handleChange("agriSubsidy", v)}
          />
          <Input label="Manufacturing Subsidy (%)" min={0} max={20}
            value={inputs.mfgSubsidy}
            onChange={(v) => handleChange("mfgSubsidy", v)}
          />
          <Input label="Services Subsidy (%)" min={0} max={10}
            value={inputs.svcSubsidy}
            onChange={(v) => handleChange("svcSubsidy", v)}
          />
        </Section>

        {/* LABOUR */}
        <Section title="👥 Labour Market">
          <Input label="Labour Shift (%)" min={-5} max={5}
            value={inputs.laborShift}
            onChange={(v) => handleChange("laborShift", v)}
          />
          <Input label="Minimum Wage" min={400} max={1000}
            value={inputs.minWage}
            onChange={(v) => handleChange("minWage", v)}
          />
        </Section>

      </div>

      <div className="mt-10 text-right">
        <button
          onClick={handleRun}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
        >
          Run Simulation
        </button>
      </div>

    </div>
  );
}


/* ---------- COMPONENTS ---------- */

function Section({ title, children }) {
  return (
    <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function Input({ label, value, onChange, min, max }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
