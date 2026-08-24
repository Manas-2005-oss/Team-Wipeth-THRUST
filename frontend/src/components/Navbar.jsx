import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  LogOut,
  History,
  UserRound,
  LayoutDashboard,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";

import { useState, useRef, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef(null);

  const { user } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    setShowProfile(false);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    navigate("/", { replace: true });
  };

  const goToModeSelection = () => {
    setShowProfile(false);
    navigate("/mode-selection");
  };

  const goToHistory = () => {
    setShowProfile(false);
    navigate("/history");
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

  const userName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

  const userInitial =
    user?.user_metadata?.full_name?.[0] ||
    user?.email?.[0] ||
    "U";

  return (
    <nav className="fixed top-0 left-0 w-full h-[72px] bg-white/95 backdrop-blur-xl border-b border-slate-200 z-50">

      <div className="h-full w-full px-6 md:px-10 flex items-center justify-between relative">

        {/* ================= LOGO ================= */}

        <motion.button
          onClick={() => navigate("/")}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 shrink-0"
        >
          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-[#25245f]
              text-white
              flex
              items-center
              justify-center
              shadow-[0_8px_20px_rgba(37,36,95,0.22)]
            "
          >
            <Sparkles size={18} />
          </div>

          <div className="flex flex-col items-start">

            <span className="text-[17px] font-bold text-[#252a4d] leading-none">
              CGE Simulator
            </span>

            <span className="text-[10px] text-slate-400 mt-1">
              Economic intelligence
            </span>

          </div>

        </motion.button>


        {/* ================= CENTER NAVIGATION ================= */}

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            hidden
            md:flex
            absolute
            left-1/2
            -translate-x-1/2
            h-full
            items-center
          "
        >

          <div className="flex items-center gap-8 h-full">

            <NavItem to="/mode-selection">
              Mode
            </NavItem>

            <NavItem to="/economist">
              Economist Mode
            </NavItem>

            <NavItem to="/history">
              History
            </NavItem>

          </div>

        </motion.div>


        {/* ================= RIGHT SIDE ================= */}

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 relative shrink-0"
          ref={profileRef}
        >

          {/* MODE BUTTON */}

          <motion.button
            onClick={goToModeSelection}
            whileHover={{
              scale: 1.04,
              boxShadow:
                "0 10px 24px rgba(37,36,95,0.18)",
            }}
            whileTap={{ scale: 0.96 }}
            className="
              hidden
              sm:flex
              items-center
              gap-2
              px-4
              py-2.5
              rounded-lg
              bg-[#25245f]
              text-white
              text-[12px]
              font-semibold
              shadow-md
              hover:bg-[#1e1d52]
              transition-all
            "
          >
            <LayoutDashboard size={15} />

            Mode
          </motion.button>


          {/* PROFILE */}

          <motion.button
            onClick={() =>
              setShowProfile(!showProfile)
            }
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="
              flex
              items-center
              gap-2
              group
            "
          >

            <div
              className="
                relative
                w-11
                h-11
                rounded-full
                bg-[#25245f]
                text-white
                font-bold
                text-sm
                flex
                items-center
                justify-center
                shadow-[0_8px_20px_rgba(37,36,95,0.18)]
                transition-all
                group-hover:shadow-lg
              "
            >
              {userInitial.toUpperCase()}

              <span
                className="
                  absolute
                  right-0
                  bottom-0
                  w-3
                  h-3
                  rounded-full
                  bg-white
                  border-2
                  border-[#f8f9fc]
                "
              />
            </div>

            <ChevronDown
              size={16}
              className={`
                text-slate-400
                transition-transform
                duration-300
                hidden
                sm:block
                ${showProfile ? "rotate-180" : ""}
              `}
            />

          </motion.button>


          {/* ================= PROFILE DROPDOWN ================= */}

          <AnimatePresence>

            {showProfile && (

              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.18,
                }}
                className="
                  absolute
                  right-0
                  top-[58px]
                  w-[290px]
                  bg-white
                  rounded-2xl
                  border
                  border-slate-200
                  shadow-[0_20px_50px_rgba(15,23,42,0.16)]
                  overflow-hidden
                  z-[100]
                "
              >

                {/* PROFILE HEADER */}

                <div className="px-5 py-5 bg-slate-50 border-b border-slate-100">

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-11
                        h-11
                        rounded-full
                        bg-[#25245f]
                        text-white
                        flex
                        items-center
                        justify-center
                        font-bold
                      "
                    >
                      {userInitial.toUpperCase()}
                    </div>

                    <div className="min-w-0">

                      <h3 className="font-semibold text-slate-800 text-sm truncate">
                        {userName}
                      </h3>

                      <p className="text-xs text-slate-400 truncate mt-1">
                        {user?.email || "No email available"}
                      </p>

                    </div>

                  </div>

                </div>


                {/* MENU */}

                <div className="p-2">

                  <button
                    onClick={goToModeSelection}
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-xl
                      text-sm
                      font-medium
                      text-slate-600
                      hover:bg-[#f1f2f8]
                      hover:text-[#25245f]
                      transition
                    "
                  >
                    <LayoutDashboard size={17} />

                    Mode Selection
                  </button>


                  <button
                    onClick={goToHistory}
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-xl
                      text-sm
                      font-medium
                      text-slate-600
                      hover:bg-[#f1f2f8]
                      hover:text-[#25245f]
                      transition
                    "
                  >
                    <History size={17} />

                    Policy Workspace
                  </button>


                  <button
                    onClick={() => {
                      setShowProfile(false);
                      navigate("/profile");
                    }}
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-xl
                      text-sm
                      font-medium
                      text-slate-600
                      hover:bg-[#f1f2f8]
                      hover:text-[#25245f]
                      transition
                    "
                  >
                    <UserRound size={17} />

                    My Profile
                  </button>

                </div>


                {/* LOGOUT */}

                <div className="border-t border-slate-100 p-2">

                  <button
                    onClick={handleLogout}
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-xl
                      text-sm
                      font-semibold
                      text-red-600
                      hover:bg-red-50
                      transition
                    "
                  >
                    <LogOut size={17} />

                    Logout
                  </button>

                </div>

              </motion.div>

            )}

          </AnimatePresence>

        </motion.div>

      </div>

    </nav>
  );
}


/* =========================================================
   NAVIGATION ITEM
========================================================= */

function NavItem({ to, children }) {
  return (
    <NavLink to={to}>
      {({ isActive }) => (

        <motion.div
          whileHover={{
            color: "#25245f",
          }}
          className="
            relative
            h-[72px]
            flex
            items-center
            px-1
            text-[13px]
            font-medium
            transition-colors
          "
        >

          <span
            className={
              isActive
                ? "text-[#25245f] font-semibold"
                : "text-slate-500"
            }
          >
            {children}
          </span>


          {isActive && (

            <motion.div
              layoutId="navUnderline"
              className="
                absolute
                left-0
                right-0
                bottom-0
                h-[2px]
                rounded-full
                bg-[#25245f]
              "
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />

          )}

        </motion.div>

      )}
    </NavLink>
  );
}