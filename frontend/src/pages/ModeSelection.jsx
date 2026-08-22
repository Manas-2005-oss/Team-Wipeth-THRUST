import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  ArrowRight,
  LogOut,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

export default function ModeSelection() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef(null);

  /* =========================================================
     CLOSE PROFILE WHEN CLICKING OUTSIDE
  ========================================================= */

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
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = async () => {
    setShowProfile(false);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    navigate("/", { replace: true });
  };

  /* =========================================================
     USER INITIAL
  ========================================================= */

  const userInitial = (
    user?.user_metadata?.full_name?.[0] ||
    user?.email?.[0] ||
    "U"
  ).toUpperCase();

  return (
    <div className="selection-page">

      <style>{`

        /* =====================================================
           PAGE
        ====================================================== */

        .selection-page {
          width: 100%;
          height: 100vh;
          overflow: hidden;

          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #FFF7F3;
          color: #121358;

          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }


        /* =====================================================
           BACKGROUND
        ====================================================== */

        .background-ring {
          position: absolute;

          width: 520px;
          height: 520px;

          border-radius: 50%;

          border: 1px solid #121358;

          opacity: 0.055;

          top: -320px;
          right: -180px;

          pointer-events: none;

          animation:
            backgroundFloat
            8s
            ease-in-out
            infinite;
        }

        .background-ring::after {
          content: "";

          position: absolute;

          width: 370px;
          height: 370px;

          border-radius: 50%;

          border: 1px solid #121358;

          top: 74px;
          left: 74px;
        }

        @keyframes backgroundFloat {
          0%,
          100% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(-8px, 8px);
          }
        }


        .background-dot {
          position: absolute;

          width: 180px;
          height: 180px;

          border-radius: 50%;

          border: 1px solid #121358;

          opacity: 0.035;

          bottom: -110px;
          left: -70px;

          pointer-events: none;

          animation:
            backgroundFloatSmall
            7s
            ease-in-out
            infinite;
        }

        @keyframes backgroundFloatSmall {
          0%,
          100% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(7px, -7px);
          }
        }


        /* =====================================================
           BRAND
        ====================================================== */

        .brand {
          position: absolute;

          top: 30px;
          left: 42px;

          z-index: 20;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 25px;

          font-weight: 600;

          letter-spacing: 0.20em;

          color: #121358;

          user-select: none;
        }


        /* =====================================================
           PROFILE
        ====================================================== */

        .profile-area {
          position: absolute;

          top: 24px;
          right: 34px;

          z-index: 50;
        }


        .profile-button {
          position: relative;

          width: 48px;
          height: 48px;

          border-radius: 50%;

          border: 1.5px solid #121358;

          background: #FFF7F3;

          color: #121358;

          display: flex;
          align-items: center;
          justify-content: center;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 16px;
          font-weight: 700;

          cursor: pointer;

          box-shadow:
            0 6px 18px rgba(18, 19, 88, 0.12);

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            background 0.3s ease,
            color 0.3s ease;
        }


        .profile-button::before {
          content: "";

          position: absolute;

          inset: -5px;

          border-radius: 50%;

          border: 1px solid #121358;

          opacity: 0.12;

          transform: scale(0.92);

          transition:
            transform 0.35s ease,
            opacity 0.35s ease;
        }


        .profile-button::after {
          content: "";

          position: absolute;

          width: 5px;
          height: 5px;

          top: 8px;
          right: 9px;

          border-radius: 50%;

          background: #121358;

          opacity: 0.75;

          transition:
            transform 0.3s ease,
            opacity 0.3s ease,
            background 0.3s ease;
        }


        .profile-button:hover {
          transform: translateY(-3px);

          background: #121358;

          color: #FFF7F3;

          box-shadow:
            0 11px 27px rgba(18, 19, 88, 0.23);
        }


        .profile-button:hover::before {
          transform: scale(1.08);

          opacity: 0.20;
        }


        .profile-button:hover::after {
          transform: scale(1.3);

          opacity: 1;

          background: #FFF7F3;
        }


        .profile-button:active {
          transform: translateY(-1px) scale(0.96);
        }


        /* =====================================================
           PROFILE MENU
        ====================================================== */

        .profile-menu {
          position: absolute;

          top: 64px;
          right: 0;

          width: 285px;

          background: #FFF7F3;

          border: 1px solid #121358;

          border-radius: 16px;

          overflow: hidden;

          box-shadow:
            0 20px 45px rgba(18, 19, 88, 0.16);
        }


        .profile-info {
          padding: 18px;
        }


        .profile-user {
          display: flex;
          align-items: center;

          gap: 12px;
        }


        .profile-avatar {
          width: 42px;
          height: 42px;

          flex-shrink: 0;

          border-radius: 50%;

          background: #121358;

          color: #FFF7F3;

          display: flex;
          align-items: center;
          justify-content: center;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 15px;

          font-weight: 700;
        }


        .profile-name {
          margin: 0;

          color: #121358;

          font-size: 14px;
          font-weight: 700;
        }


        .profile-email {
          margin: 4px 0 0;

          color: #121358;

          opacity: 0.58;

          font-size: 12px;

          max-width: 190px;

          overflow: hidden;

          text-overflow: ellipsis;

          white-space: nowrap;
        }


        .profile-divider {
          height: 1px;

          background: #121358;

          opacity: 0.12;
        }


        .logout-button {
          width: 100%;

          border: none;

          background: transparent;

          display: flex;
          align-items: center;

          gap: 9px;

          padding: 13px 18px;

          color: #121358;

          font-size: 13px;

          cursor: pointer;

          text-align: left;

          transition:
            background 0.2s ease,
            color 0.2s ease;
        }


        .logout-button:hover {
          background: #121358;

          color: #FFF7F3;
        }


        /* =====================================================
           MAIN CONTENT
        ====================================================== */

        .content {
          width: 100%;

          max-width: 920px;

          padding: 0 28px;

          position: relative;

          z-index: 5;
        }


        /* =====================================================
           HEADING ANIMATION
        ====================================================== */

        .heading {
          text-align: center;

          margin-bottom: 38px;
        }


        .eyebrow {
          display: inline-flex;

          align-items: center;

          gap: 7px;

          margin-bottom: 12px;

          color: #121358;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 0.17em;

          text-transform: uppercase;
        }


        .eyebrow-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: #121358;

          animation:
            gentlePulse
            2.4s
            ease-in-out
            infinite;
        }


        @keyframes gentlePulse {
          0%,
          100% {
            opacity: 1;
          }

          50% {
            opacity: 0.35;
          }
        }


        .heading h1 {
          margin: 0;

          color: #121358;

          font-size:
            clamp(
              32px,
              4vw,
              44px
            );

          line-height: 1.08;

          letter-spacing: -0.045em;

          font-weight: 750;
        }


        .heading p {
          max-width: 650px;

          margin: 13px auto 0;

          color: #121358;

          opacity: 0.65;

          font-size: 14px;

          line-height: 22px;
        }


        /* =====================================================
           CARDS
        ====================================================== */

        .cards {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(0, 1fr)
            );

          gap: 20px;
        }


        .mode-card {
          position: relative;

          min-height: 290px;

          padding: 28px;

          border-radius: 13px;

          overflow: hidden;

          display: flex;

          flex-direction: column;

          justify-content: space-between;

          border: 1px solid #121358;

          background: #FFF7F3;

          color: #121358;

          box-shadow:
            0 5px 18px
            rgba(18, 19, 88, 0.07);

          transition:
            transform 0.35s
              cubic-bezier(
                0.22,
                1,
                0.36,
                1
              ),
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }


        .mode-card:hover {
          transform: translateY(-6px);

          box-shadow:
            0 18px 38px
            rgba(18, 19, 88, 0.16);
        }


        /* =====================================================
           CARD DECORATION
        ====================================================== */

        .card-decoration {
          position: absolute;

          width: 210px;
          height: 210px;

          border-radius: 50%;

          border: 1px solid #121358;

          opacity: 0.08;

          right: -110px;
          bottom: -120px;

          pointer-events: none;

          transition:
            transform 0.65s
              cubic-bezier(
                0.22,
                1,
                0.36,
                1
              ),
            opacity 0.4s ease;
        }


        .mode-card:hover .card-decoration {
          transform: scale(1.18);

          opacity: 0.13;
        }


        /* =====================================================
           HOVER LINE
        ====================================================== */

        .hover-track {
          position: absolute;

          top: 0;
          left: 0;
          right: 0;

          height: 2px;

          background: #121358;

          opacity: 0.10;

          overflow: hidden;
        }


        .hover-line {
          position: absolute;

          top: 0;
          left: -100px;

          width: 100px;
          height: 2px;

          background: #121358;

          opacity: 0;
        }


        .mode-card:hover .hover-line {
          opacity: 1;

          animation:
            cardLine
            1.15s
            cubic-bezier(
              0.22,
              1,
              0.36,
              1
            );
        }


        @keyframes cardLine {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(1050%);
          }
        }


        /* =====================================================
           ICON
        ====================================================== */

        .icon {
          width: 50px;
          height: 50px;

          border-radius: 50%;

          background: #121358;

          color: #FFF7F3;

          display: flex;

          align-items: center;

          justify-content: center;

          margin-bottom: 23px;

          transition:
            transform 0.4s
              cubic-bezier(
                0.22,
                1,
                0.36,
                1
              ),
            box-shadow 0.35s ease;
        }


        .mode-card:hover .icon {
          transform:
            translateY(-3px)
            rotate(-3deg);

          box-shadow:
            0 7px 16px
            rgba(18, 19, 88, 0.15);
        }


        /* =====================================================
           CARD TEXT
        ====================================================== */

        .card-title {
          margin: 0;

          color: #121358;

          font-size: 23px;

          line-height: 1.15;

          font-weight: 700;

          letter-spacing: -0.025em;

          transition:
            transform 0.3s ease;
        }


        .mode-card:hover .card-title {
          transform: translateX(2px);
        }


        .card-description {
          max-width: 380px;

          margin: 12px 0 0;

          color: #121358;

          opacity: 0.65;

          font-size: 13px;

          line-height: 21px;
        }


        /* =====================================================
           BADGES
        ====================================================== */

        .badge {
          display: inline-flex;

          align-items: center;

          gap: 5px;

          margin-top: 17px;

          padding: 5px 9px;

          border-radius: 5px;

          font-size: 9px;

          font-weight: 700;

          letter-spacing: 0.02em;

          transition:
            transform 0.25s ease;
        }


        .mode-card:hover .badge {
          transform: translateY(-1px);
        }


        .badge-advanced {
          background: #FFF7F3;

          color: #121358;
        }


        .badge-beginner {
          background: #FFF7F3;

          border: 1px solid #121358;

          color: #121358;
        }


        /* =====================================================
           CTA BUTTON
        ====================================================== */

        .card-action {
          display: inline-flex;

          align-items: center;
          justify-content: center;

          gap: 9px;

          margin-top: 24px;

          width: fit-content;

          padding: 10px 16px;

          border: 1px solid #121358;

          border-radius: 8px;

          background: #121358;

          color: #FFF7F3;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 0.04em;

          text-transform: uppercase;

          cursor: pointer;

          box-shadow:
            0 5px 14px
            rgba(18, 19, 88, 0.14);

          transition:
            transform 0.25s ease,
            background 0.25s ease,
            color 0.25s ease,
            box-shadow 0.25s ease;
        }


        .card-action svg {
          transition:
            transform 0.3s
              cubic-bezier(
                0.22,
                1,
                0.36,
                1
              );
        }


        .card-action:hover {
          transform: translateY(-2px);

          background: #FFF7F3;

          color: #121358;

          box-shadow:
            0 8px 20px
            rgba(18, 19, 88, 0.18);
        }


        .card-action:hover svg {
          transform: translateX(5px);
        }


        .card-action:active {
          transform:
            translateY(0)
            scale(0.97);

          box-shadow:
            0 3px 8px
            rgba(18, 19, 88, 0.12);
        }


        /* =====================================================
           RECOMMENDED LABEL
        ====================================================== */

        .recommended {
          position: absolute;

          top: 0;
          right: 0;

          padding: 7px 12px;

          border-radius:
            0
            0
            0
            8px;

          background: #FFF7F3;

          color: #121358;

          font-size: 9px;

          font-weight: 700;

          letter-spacing: 0.03em;

          display: flex;

          align-items: center;

          gap: 4px;

          transition:
            padding 0.3s ease;
        }


        .economist-card:hover .recommended {
          padding-left: 14px;

          padding-right: 14px;
        }


        /* =====================================================
           ECONOMIST CARD
        ====================================================== */

        .economist-card {
          background: #121358;

          border-color: #121358;

          color: #FFF7F3;

          transition:
            transform 0.35s
              cubic-bezier(
                0.22,
                1,
                0.36,
                1
              ),
            box-shadow 0.35s ease;
        }


        .economist-card:hover {
          box-shadow:
            0 20px 42px
            rgba(18, 19, 88, 0.28);
        }


        .economist-card .card-title {
          color: #FFF7F3;
        }


        .economist-card .card-description {
          color: #FFF7F3;

          opacity: 0.80;
        }


        .economist-card .icon {
          background: #FFF7F3;

          color: #121358;
        }


        .economist-card .badge {
          background: #FFF7F3;

          color: #121358;
        }


        .economist-card .card-action {
          background: #FFF7F3;

          color: #121358;

          border-color: #FFF7F3;
        }


        .economist-card .card-action:hover {
          background: #121358;

          color: #FFF7F3;

          border-color: #FFF7F3;
        }


        .economist-card .hover-track {
          background: #FFF7F3;

          opacity: 0.18;
        }


        .economist-card .hover-line {
          background: #FFF7F3;
        }


        .economist-card .card-decoration {
          border-color: #FFF7F3;

          opacity: 0.10;
        }


        .economist-card:hover .card-decoration {
          opacity: 0.15;
        }


        /* =====================================================
           STATUS
        ====================================================== */

        .status {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 7px;

          margin-top: 24px;

          color: #121358;

          font-size: 10px;

          opacity: 0.75;
        }


        .status-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: #121358;

          animation:
            statusPulse
            2.2s
            ease-in-out
            infinite;
        }


        @keyframes statusPulse {
          0%,
          100% {
            opacity: 1;
          }

          50% {
            opacity: 0.35;
          }
        }


        /* =====================================================
           FOOTER
        ====================================================== */

        .footer {
          position: absolute;

          bottom: 18px;

          left: 0;
          right: 0;

          text-align: center;

          color: #121358;

          opacity: 0.55;

          font-size: 10px;
        }


        /* =====================================================
           RESPONSIVE
        ====================================================== */

        @media (max-height: 760px) {

          .content {
            transform: scale(0.91);
          }

        }


        @media (max-height: 650px) {

          .content {
            transform: scale(0.82);
          }

        }


        @media (max-width: 700px) {

          .selection-page {
            height: auto;

            min-height: 100vh;

            overflow-y: auto;

            padding:
              100px
              20px
              70px;
          }


          .brand {
            left: 24px;
          }


          .profile-area {
            right: 24px;
          }


          .content {
            transform: none;

            padding: 0;

            max-width: 560px;
          }


          .heading {
            margin-bottom: 28px;
          }


          .heading h1 {
            font-size: 34px;
          }


          .cards {
            grid-template-columns: 1fr;
          }


          .mode-card {
            min-height: 260px;
          }


          .footer {
            position: relative;

            bottom: auto;

            margin-top: 30px;
          }

        }

      `}</style>


      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="background-ring" />

      <div className="background-dot" />


      {/* =====================================================
          BRAND
      ====================================================== */}

      <div className="brand">
        THRUST
      </div>


      {/* =====================================================
          PROFILE
      ====================================================== */}

      <div
        ref={profileRef}
        className="profile-area"
      >

        <motion.button
          whileTap={{
            scale: 0.94,
          }}
          onClick={() =>
            setShowProfile(!showProfile)
          }
          className="profile-button"
          aria-label="Open profile"
        >
          {userInitial}
        </motion.button>


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
                y: -8,
                scale: 0.97,
              }}
              transition={{
                duration: 0.18,
              }}
              className="profile-menu"
            >

              <div className="profile-info">

                <div className="profile-user">

                  <div className="profile-avatar">
                    {userInitial}
                  </div>


                  <div>

                    <p className="profile-name">
                      {user?.user_metadata?.full_name ||
                        "User"}
                    </p>


                    <p className="profile-email">
                      {user?.email}
                    </p>

                  </div>

                </div>

              </div>


              <div className="profile-divider" />


              <button
                onClick={handleLogout}
                className="logout-button"
              >

                <LogOut
                  size={15}
                  strokeWidth={1.8}
                />

                <span>
                  Logout
                </span>

              </button>

            </motion.div>

          )}

        </AnimatePresence>

      </div>


      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="content">

        {/* =================================================
            HEADING
        ================================================== */}

        <motion.div
          className="heading"

          initial={{
            opacity: 0,
            y: 12,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        >

          <div className="eyebrow">

            <span className="eyebrow-dot" />

            <span>
              CGE Policy Simulator
            </span>

          </div>


          <h1>
            Choose Your Approach
          </h1>


          <p>
            Select how you want to interact with the
            Computable General Equilibrium model.
            Choose a guided simulation or use
            AI-assisted economic analysis.
          </p>

        </motion.div>


        {/* =================================================
            MODE CARDS
        ================================================== */}

        <div className="cards">


          {/* =================================================
              GENERAL USER
          ================================================== */}

          <motion.div
            className="mode-card"

            initial={{
              opacity: 0,
              x: -18,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            whileHover={{
              y: -6,
            }}

            transition={{
              opacity: {
                duration: 0.45,
                delay: 0.12,
              },

              x: {
                duration: 0.45,
                delay: 0.12,
                ease: "easeOut",
              },

              y: {
                duration: 0.25,
              },
            }}
          >

            <div className="hover-track">

              <div className="hover-line" />

            </div>


            <div className="card-decoration" />


            <div>

              <div className="icon">

                <SlidersHorizontal
                  size={22}
                  strokeWidth={1.8}
                />

              </div>


              <h2 className="card-title">
                General User Mode
              </h2>


              <span className="badge badge-beginner">
                Beginner
              </span>


              <p className="card-description">
                Explore economic policy impacts through
                a simple and intuitive simulation experience.
                Adjust scenarios and understand their possible
                outcomes without requiring advanced modelling.
              </p>

            </div>


            <button
              onClick={() =>
                navigate("/dashboard")
              }
              className="card-action"
            >

              <span>
                Explore Simulation
              </span>


              <ArrowRight
                size={15}
                strokeWidth={1.8}
              />

            </button>

          </motion.div>


          {/* =================================================
              ECONOMIST MODE
          ================================================== */}

          <motion.div
            className="mode-card economist-card"

            initial={{
              opacity: 0,
              x: 18,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            whileHover={{
              y: -6,
            }}

            transition={{
              opacity: {
                duration: 0.45,
                delay: 0.20,
              },

              x: {
                duration: 0.45,
                delay: 0.20,
                ease: "easeOut",
              },

              y: {
                duration: 0.25,
              },
            }}
          >

            <div className="hover-track">

              <div className="hover-line" />

            </div>


            <div className="recommended">

              <Sparkles
                size={10}
                strokeWidth={1.8}
              />

              <span>
                Recommended
              </span>

            </div>


            <div className="card-decoration" />


            <div>

              <div className="icon">

                <BarChart3
                  size={22}
                  strokeWidth={1.8}
                />

              </div>


              <h2 className="card-title">
                Economist Mode
              </h2>


              <span className="badge badge-advanced">
                Advanced
              </span>


              <p className="card-description">
                Run advanced policy simulations with economic
                modelling, scenario analysis, and AI-assisted
                interpretation of complex policy decisions.
              </p>

            </div>


            <button
              onClick={() =>
                navigate("/economist")
              }
              className="card-action"
            >

              <span>
                Start Economist Simulation
              </span>


              <ArrowRight
                size={15}
                strokeWidth={1.8}
              />

            </button>

          </motion.div>

        </div>


        {/* =================================================
            STATUS
        ================================================== */}

        <motion.div
          className="status"

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 0.75,
          }}

          transition={{
            duration: 0.5,
            delay: 0.55,
          }}
        >

          <span className="status-dot" />

          <span>
            Simulation environment ready
          </span>

        </motion.div>

      </main>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="footer">
        © 2026 Team Wipeth
      </footer>

    </div>
  );
}