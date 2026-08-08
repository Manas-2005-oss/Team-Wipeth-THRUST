import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";

export default function EconomistNavbar() {

  const navigate = useNavigate();
  const { user } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = async () => {
    setShowProfile(false);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    navigate("/", { replace: true });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);
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

        <div ref={profileRef} className="flex items-center gap-4 relative">

          {/* Mode Button */}
          <motion.button
            onClick={() => navigate("/mode-selection")}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="
      bg-gradient-to-r from-blue-600 to-cyan-500
      text-white px-5 py-2 rounded-full text-sm font-semibold
      shadow-md hover:shadow-xl
      transition-all duration-300
    "
          >
            Mode
          </motion.button>

          {/* Profile Icon */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowProfile(!showProfile)}
            className="w-11 h-11 rounded-full bg-white text-slate-800 font-bold shadow-lg flex items-center justify-center"
          >
            {user?.user_metadata?.full_name?.charAt(0).toUpperCase() ||
              user?.email?.charAt(0).toUpperCase()}
          </motion.button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="absolute right-0 top-14 w-72 rounded-xl bg-white shadow-2xl overflow-hidden"
              >

                <div className="px-5 py-4 border-b">

                  <div className="font-semibold text-slate-800">
                    {user?.user_metadata?.full_name}
                  </div>

                  <div className="text-sm text-slate-500 break-all">
                    {user?.email}
                  </div>

                </div>

                <button
                  onClick={handleLogout}
                  className="
            w-full text-left
            px-5 py-3
            hover:bg-red-50
            text-red-600
            font-medium
          "
                >
                  Logout
                </button>
                <button
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/llm-history");
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100"
                >
                  AI Sessions
                </button>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </nav>
  );
}