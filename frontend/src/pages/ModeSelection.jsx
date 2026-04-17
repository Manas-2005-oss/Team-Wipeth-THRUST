import { useNavigate } from "react-router-dom";
import { BarChart3, Users } from "lucide-react";
 

export default function ModeSelection() {

  const navigate = useNavigate();

  return ( 

    <div className="min-h-screen flex flex-col items-center justify-center 
    bg-gradient-to-b from-white to-gray-100 px-6 relative">

       <div
  className="absolute top-6 left-8 text-2xl font-bold tracking-widest text-black-600"
  style={{
    fontFamily: "Bebas Neue, Anton",
    letterSpacing: "0.18em",
    textShadow: "0 0 20px rgba(255,255,255,1)"
  }}
>
  THRUST
</div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4 tracking-tight">
        Select Simulation Mode
      </h1>

      {/* Subtitle */}
      <p className="text-gray-800 mb-14 text-center max-w-xl leading-relaxed">
        Choose how you want to interact with the CGE Policy Simulator.
        Economist mode provides advanced analytics, while user mode offers a simplified view.
      </p>

      <div className="flex gap-10 flex-wrap justify-center">

        {/* Economist Mode */}
        <div
          className="bg-white w-[340px] rounded-2xl shadow-sm 
          border border-gray-200 p-8 flex flex-col justify-between
          hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300 
          transition-all duration-300"
        >

          <div>

            {/* Icon + Title */}
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="text-blue-600" size={28} />
              <h2 className="text-2xl font-semibold text-gray-800">
                Economist Mode
              </h2>
            </div>

            {/* Badge */}
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-md">
              Advanced
            </span>

            <p className="text-sm text-gray-500 mt-4 mb-10 leading-relaxed">
              Advanced policy simulation with AI-driven economic modeling and detailed insights.
            </p>

          </div>

          {/* Button */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/economist")}
              className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 
              text-white px-6 py-2 rounded-lg
              hover:scale-105 active:scale-95
              transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Enter
            </button>
          </div>

        </div>

        {/* General User Mode */}
        <div
          className="bg-white w-[340px] rounded-2xl shadow-sm 
          border border-gray-200 p-8 flex flex-col justify-between
          hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300 
          transition-all duration-300"
        >

          <div>

            {/* Icon + Title */}
            <div className="flex items-center gap-3 mb-2">
              <Users className="text-blue-600" size={28} />
              <h2 className="text-2xl font-semibold text-gray-800">
                General User Mode
              </h2>
            </div>

            {/* Badge */}
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
              Beginner
            </span>

            <p className="text-sm text-gray-500 mt-4 mb-10 leading-relaxed">
              Simple and intuitive dashboard to explore economic policy impacts easily.
            </p>

          </div>

          {/* Button */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 
              text-white px-6 py-2 rounded-lg
              hover:scale-105 active:scale-95
              transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Enter
            </button>
          </div>

        </div>

      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-sm text-gray-400">
        © 2026 CGE Simulator • Economic Policy Analysis Tool
      </div>

    </div>
  );
}