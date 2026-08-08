import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ChatBot from "../components/ChatBot.jsx";
import { useState, useRef, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

  const [showChat, setShowChat] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef(null);

  const { user } = useAuth();

  const navigate = useNavigate(); // ✅ NEW

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
    <nav className="w-full top-8 left-0 z-50">

      <div className="max-w-9xl mx-auto flex items-center justify-between px-6 py-4">

        {/* 🔥 LOGO */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
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
              <NavItem to="/">Home</NavItem>
              <NavItem to="/dashboard">Dashboard</NavItem>
              <NavItem to="/labor-adjustment">Labor Adjustment</NavItem>
              <NavItem to="/about">About Project</NavItem>
              <NavItem to="/team">Team</NavItem>
            </ul>
          </div>
        </motion.div>

        <div
          ref={profileRef}
          className="flex items-center gap-4 relative"
        >

          {/* AI CHAT */}
          <motion.button
            onClick={() => setShowChat(true)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-black text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-md hover:bg-gray-800"
          >
            AI Policy Assistant
          </motion.button>

          {/* MODE */}
          <motion.button
            onClick={() => navigate("/mode-selection")}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="
      bg-gradient-to-r from-blue-600 to-cyan-500
      text-white px-4 py-2 rounded-full
      text-sm font-semibold
      shadow-md hover:shadow-xl
      transition-all duration-300
    "
          >
            Mode
          </motion.button>

          {/* PROFILE ICON */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowProfile(!showProfile)}
            className="
      w-11 h-11
      rounded-full
      bg-white
      text-slate-800
      font-bold
      shadow-lg
      flex
      items-center
      justify-center
    "
          >
            {(
              user?.user_metadata?.full_name?.[0] ||
              user?.email?.[0] ||
              "U"
            ).toUpperCase()}
          </motion.button>

          <AnimatePresence>

            {showProfile && (

              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="
          absolute
          right-0
          top-14
          w-72
          bg-white
          rounded-xl
          shadow-2xl
          overflow-hidden
        "
              >

                <div className="px-5 py-4 border-b">

                  <div className="font-semibold text-slate-800">
                    {user?.user_metadata?.full_name || "User"}
                  </div>

                  <div className="text-sm text-slate-500 break-all">
                    {user?.email}
                  </div>

                </div>

                <button
                  onClick={handleLogout}
                  className="
            w-full
            text-left
            px-5
            py-3
            hover:bg-red-50
            text-red-600
            font-medium
          "
                >
                  Logout
                </button>
                <button
                  onClick={() => navigate("/history")}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 transition"
                >
                  Policy Workspace
                </button>
              </motion.div>

            )}

          </AnimatePresence>

        </div>

        {/* 🤖 CHATBOT PANEL */}
        {showChat && (
          <div className="fixed top-24 right-5 w-[350px] h-[500px] bg-white rounded-xl shadow-xl z-50 flex flex-col">

            {/* Header */}
            <div className="flex justify-between items-center p-3 border-b">
              <span className="font-semibold">AI Policy Assistant</span>
              <button
                onClick={() => setShowChat(false)}
                className="text-red-500 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Chat */}
            <div className="flex-1 overflow-hidden">
              <ChatBot />
            </div>

          </div>
        )}

      </div>
    </nav>
  );
}

/* 🔥 NAV ITEM */
function NavItem({ to, children }) {
  return (
    <li>
      <NavLink to={to}>
        {({ isActive }) => (
          <motion.span
            whileHover={{
              scale: 1.15,
              textShadow: "0 0 12px rgba(37,99,235,0.9)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`relative cursor-pointer ${isActive ? "text-blue-600" : "text-slate-700"
              }`}
          >
            {children}

            {isActive && (
              <motion.div
                layoutId="navUnderline"
                className="absolute left-0 right-0 -bottom-2 h-[2px] bg-blue-600 rounded-full"
              />
            )}
          </motion.span>
        )}
      </NavLink>
    </li>
  );
}