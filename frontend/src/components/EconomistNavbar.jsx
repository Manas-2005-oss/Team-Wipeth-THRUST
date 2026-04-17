import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function EconomistNavbar() {

  const navigate = useNavigate();

  return (
    <nav className="w-full absolute top-8 left-0 z-50">

      <div className="max-w-9xl mx-auto flex items-center justify-between px-6 py-1">

        {/* 🔥 LOGO */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          <span
            className="text-2xl font-bold tracking-widest"
            style={{
              fontFamily: "Bebas Neue, Anton",
              letterSpacing: "0.18em",
              textShadow: "0 0 20px rgba(255,255,255,1.0)"
            }}
          >
            THRUST
          </span>
        </motion.div>

        {/* 🔥 CENTER MENU */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 -translate-x-1/2"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-full shadow-lg px-10 py-3 border border-white/40">
            <ul className="flex items-center gap-10 text-sm font-semibold text-slate-800">

              <li>
                <NavLink to="/" className="hover:text-blue-600 transition">
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/economist" className="hover:text-blue-600 transition">
                  LLM Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink to="/about-project" className="hover:text-blue-600 transition">
                  About Project
                </NavLink>
              </li>

              <li>
                <NavLink to="/squad" className="hover:text-blue-600 transition">
                  Team
                </NavLink>
              </li>

            </ul>
          </div>
        </motion.div>

        {/* 🔥 MODE SELECTION BUTTON (RIGHT SIDE) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button
            onClick={() => navigate("/mode-selection")}
            className="
              bg-gradient-to-r from-blue-600 to-cyan-500 
              text-white px-5 py-2 rounded-full text-sm font-semibold
              shadow-md
              hover:scale-105 hover:shadow-xl
              active:scale-95
              transition-all duration-300
            "
          >
            Mode
          </button>
        </motion.div>

      </div>

    </nav>
  );
}