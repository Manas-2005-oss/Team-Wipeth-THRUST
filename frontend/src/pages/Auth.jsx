import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import { motion, AnimatePresence } from "framer-motion";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">

      <style>{`

        /* =====================================================
           BASE
        ====================================================== */

        .auth-page {
          width: 100%;
          height: 100vh;
          overflow: hidden;

          position: relative;

          display: flex;
          flex-direction: column;

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

          -webkit-font-smoothing: antialiased;
        }


        /* =====================================================
           BACKGROUND
        ====================================================== */

        .auth-bg-ring {
          position: absolute;

          width: 440px;
          height: 440px;

          border-radius: 50%;

          border: 1px solid #121358;

          opacity: 0.045;

          top: -275px;
          right: -165px;

          pointer-events: none;

          animation:
            slowBackgroundMove
            12s
            ease-in-out
            infinite;
        }


        .auth-bg-ring::after {
          content: "";

          position: absolute;

          width: 305px;
          height: 305px;

          border-radius: 50%;

          border: 1px solid #121358;

          top: 67px;
          left: 67px;
        }


        .auth-bg-circle {
          position: absolute;

          width: 210px;
          height: 210px;

          border-radius: 50%;

          border: 1px solid #121358;

          opacity: 0.035;

          bottom: -140px;
          left: -90px;

          pointer-events: none;

          animation:
            slowBackgroundMoveSmall
            11s
            ease-in-out
            infinite;
        }


        @keyframes slowBackgroundMove {

          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(-8px, 8px, 0);
          }

        }


        @keyframes slowBackgroundMoveSmall {

          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(7px, -7px, 0);
          }

        }


        /* =====================================================
           HEADER
        ====================================================== */

        .auth-header {
          height: 68px;

          flex-shrink: 0;

          position: relative;

          z-index: 20;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 42px;

          border-bottom:
            1px solid
            rgba(18, 19, 88, 0.10);

          background: #FFF7F3;
        }


        .brand {
          color: #121358;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 25px;

          font-weight: 600;

          letter-spacing: 0.20em;

          user-select: none;
        }


        /* =====================================================
           PROFILE
        ====================================================== */

        .auth-profile {
          position: relative;

          width: 45px;
          height: 45px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          border:
            1.5px solid
            #121358;

          background: #FFF7F3;

          color: #121358;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 14px;

          font-weight: 700;

          box-shadow:
            0 6px 18px
            rgba(18, 19, 88, 0.10);

          cursor: default;

          transition:
            transform .4s
              cubic-bezier(
                .22,
                1,
                .36,
                1
              ),
            background .35s ease,
            color .35s ease,
            box-shadow .4s ease;
        }


        .auth-profile::before {
          content: "";

          position: absolute;

          inset: -5px;

          border-radius: 50%;

          border:
            1px solid
            #121358;

          opacity: .10;

          transform: scale(.94);

          transition:
            transform .45s
              cubic-bezier(
                .22,
                1,
                .36,
                1
              ),
            opacity .4s ease;
        }


        .auth-profile::after {
          content: "";

          position: absolute;

          width: 4px;
          height: 4px;

          top: 7px;
          right: 8px;

          border-radius: 50%;

          background: #121358;

          opacity: .7;

          transition:
            background .35s ease,
            transform .35s ease;
        }


        .auth-profile:hover {
          transform: translateY(-2px);

          background: #121358;

          color: #FFF7F3;

          box-shadow:
            0 12px 26px
            rgba(18, 19, 88, .17);
        }


        .auth-profile:hover::before {
          transform: scale(1.07);

          opacity: .17;
        }


        .auth-profile:hover::after {
          background: #FFF7F3;

          transform: scale(1.25);
        }


        /* =====================================================
           MAIN
        ====================================================== */

        .auth-main {
          flex: 1;

          min-height: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 20px 24px;

          position: relative;

          z-index: 5;
        }


        .auth-wrapper {
          width: 100%;
          max-width: 960px;
        }


        /* =====================================================
           HEADING
        ====================================================== */

        .auth-heading {
          text-align: center;

          margin-bottom: 25px;
        }


        .auth-eyebrow {
          display: inline-flex;

          align-items: center;

          gap: 7px;

          margin-bottom: 10px;

          color: #121358;

          font-size: 9px;

          font-weight: 700;

          letter-spacing: .18em;

          text-transform: uppercase;
        }


        .auth-eyebrow-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: #121358;

          animation:
            tinyPulse
            2.8s
            ease-in-out
            infinite;
        }


        @keyframes tinyPulse {

          0%,
          100% {
            opacity: 1;
          }

          50% {
            opacity: .32;
          }

        }


        .auth-heading h2 {
          margin: 0;

          color: #121358;

          font-size:
            clamp(
              30px,
              4vw,
              40px
            );

          line-height: 1.08;

          font-weight: 750;

          letter-spacing: -.045em;
        }


        .auth-heading p {
          margin:
            9px auto 0;

          max-width: 590px;

          color: #121358;

          opacity: .60;

          font-size: 13px;

          line-height: 20px;
        }


        /* =====================================================
           MAIN CARD
        ====================================================== */

        .auth-card-container {
          display: grid;

          grid-template-columns:
            .88fr
            1.12fr;

          min-height: 405px;

          background: #FFF7F3;

          border:
            1px solid
            #121358;

          border-radius: 15px;

          overflow: hidden;

          box-shadow:
            0 15px 40px
            rgba(18, 19, 88, .09);
        }


        /* =====================================================
           POLICY PANEL
        ====================================================== */

        .policy-panel {
          position: relative;

          overflow: hidden;

          display: flex;
          flex-direction: column;

          justify-content: space-between;

          padding: 31px;

          background: #121358;

          color: #FFF7F3;
        }


        .policy-panel::before {
          content: "";

          position: absolute;

          top: 0;
          left: 0;

          width: 2px;
          height: 100%;

          background: #FFF7F3;

          opacity: .16;

          transform-origin: top;

          transition:
            transform .7s
              cubic-bezier(
                .22,
                1,
                .36,
                1
              );
        }


        .policy-panel:hover::before {
          transform: scaleY(.75);
        }


        .policy-panel::after {
          content: "";

          position: absolute;

          width: 240px;
          height: 240px;

          border-radius: 50%;

          border:
            1px solid
            #FFF7F3;

          opacity: .07;

          right: -135px;
          bottom: -125px;

          pointer-events: none;

          transition:
            transform .8s
              cubic-bezier(
                .22,
                1,
                .36,
                1
              ),
            opacity .6s ease;
        }


        .policy-panel:hover::after {
          transform: scale(1.10);

          opacity: .10;
        }


        .policy-content {
          position: relative;

          z-index: 3;
        }


        /* =====================================================
           POLICY LABEL
        ====================================================== */

        .policy-label {
          display: flex;

          align-items: center;

          gap: 7px;

          margin-bottom: 25px;
        }


        .policy-label-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: #FFF7F3;

          animation:
            policyPulse
            2.8s
            ease-in-out
            infinite;
        }


        @keyframes policyPulse {

          0%,
          100% {
            opacity: .9;
          }

          50% {
            opacity: .3;
          }

        }


        .policy-label span {
          color: #FFF7F3;

          opacity: .72;

          font-size: 9px;

          font-weight: 700;

          letter-spacing: .18em;

          text-transform: uppercase;
        }


        /* =====================================================
           POLICY TITLE
        ====================================================== */

        .policy-title {
          margin: 0;

          color: #FFF7F3;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 29px;

          line-height: 1.13;

          font-weight: 600;

          letter-spacing: -.025em;
        }


        .policy-title-accent {
          color: #FFF7F3;

          opacity: .55;
        }


        .policy-description {
          max-width: 365px;

          margin-top: 14px;

          color: #FFF7F3;

          opacity: .62;

          font-size: 12px;

          line-height: 21px;
        }


        /* =====================================================
           POLICY BOTTOM
        ====================================================== */

        .policy-bottom {
          position: relative;

          z-index: 3;
        }


        .policy-line {
          height: 1px;

          width: 100%;

          background: #FFF7F3;

          opacity: .12;

          margin-bottom: 15px;
        }


        .metrics {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);
        }


        .metric {
          padding-right: 12px;

          border-right:
            1px solid
            rgba(255,255,255,.12);

          transition:
            transform .35s
              cubic-bezier(
                .22,
                1,
                .36,
                1
              );
        }


        .metric + .metric {
          padding-left: 12px;
        }


        .metric:last-child {
          border-right: none;
        }


        .metric:hover {
          transform: translateY(-2px);
        }


        .metric-value {
          color: #FFF7F3;

          font-size: 14px;

          font-weight: 700;
        }


        .metric-label {
          margin-top: 3px;

          color: #FFF7F3;

          opacity: .45;

          font-size: 9px;
        }


        .engine-status {
          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-top: 20px;
        }


        .engine-left {
          display: flex;

          align-items: center;

          gap: 7px;
        }


        .engine-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: #FFF7F3;

          opacity: .8;

          animation:
            tinyPulse
            2.4s
            ease-in-out
            infinite;
        }


        .engine-text {
          color: #FFF7F3;

          opacity: .45;

          font-size: 9px;
        }


        .engine-code {
          color: #FFF7F3;

          opacity: .32;

          font-size: 9px;
        }


        /* =====================================================
           FORM PANEL
        ====================================================== */

        .form-panel {
          position: relative;

          display: flex;
          flex-direction: column;

          justify-content: center;

          padding:
            31px 38px;

          background: #FFF7F3;
        }


        /* =====================================================
           TABS
        ====================================================== */

        .auth-tabs {
          display: flex;

          align-items: center;

          gap: 28px;

          border-bottom:
            1px solid
            rgba(18,19,88,.12);

          margin-bottom: 22px;
        }


        .auth-tab {
          position: relative;

          padding:
            0 0 11px;

          border: none;

          background: transparent;

          color: #121358;

          opacity: .40;

          font-size: 12px;

          font-weight: 600;

          cursor: pointer;

          transition:
            opacity .3s ease,
            transform .3s
              cubic-bezier(
                .22,
                1,
                .36,
                1
              );
        }


        .auth-tab:hover {
          opacity: .75;

          transform: translateY(-1px);
        }


        .auth-tab.active {
          opacity: 1;
        }


        .auth-tab-line {
          position: absolute;

          left: 0;
          right: 0;

          bottom: -1px;

          height: 2px;

          border-radius: 4px;

          background: #121358;
        }


        /* =====================================================
           FORM TRANSITION
        ====================================================== */

        .form-transition {
          width: 100%;

          will-change:
            opacity,
            transform,
            filter;
        }


        .auth-form {
          width: 100%;
        }


        .auth-form form {
          width: 100%;

          display: flex !important;

          flex-direction: column !important;
        }


        .auth-form form > div {
          width: 100%;

          margin: 0 !important;

          padding: 0 !important;
        }


        .auth-form label {
          display: block !important;

          color: #121358 !important;

          opacity: .72;

          font-size: 11px !important;

          font-weight: 600 !important;

          margin-bottom: 5px !important;
        }


        /* =====================================================
           INPUTS
        ====================================================== */

        .auth-form input {
          width: 100% !important;

          height: 41px !important;

          box-sizing: border-box !important;

          padding:
            8px 12px !important;

          background: #FFF7F3 !important;

          color: #121358 !important;

          border:
            1px solid
            rgba(18,19,88,.18) !important;

          border-radius: 7px !important;

          font-size: 12px !important;

          transition:
            border-color .3s ease,
            box-shadow .3s ease,
            background .3s ease !important;
        }


        .auth-form input::placeholder {
          color: #121358 !important;

          opacity: .32;
        }


        .auth-form input:hover {
          border-color:
            rgba(18,19,88,.32) !important;
        }


        .auth-form input:focus {
          outline: none !important;

          border-color:
            #121358 !important;

          box-shadow:
            0 0 0 3px
            rgba(18,19,88,.065) !important;
        }


        /* =====================================================
           FORM SPACING
        ====================================================== */

        .login-form form {
          gap: 13px !important;
        }


        .signup-form form {
          gap: 9px !important;
        }


        .signup-form form > div {
          margin-bottom: 0 !important;
        }


        /* =====================================================
           PASSWORD
        ====================================================== */

        .auth-form form button:not([type="submit"]) {
          color: #121358 !important;

          opacity: .50;

          font-size: 11px !important;

          transition:
            opacity .25s ease,
            color .25s ease !important;
        }


        .auth-form form button:not([type="submit"]):hover {
          color: #121358 !important;

          opacity: 1;
        }


        /* =====================================================
           SUBMIT BUTTON
        ====================================================== */

        .auth-form button[type="submit"] {
          width: 100% !important;

          min-height: 41px !important;

          margin-top: 5px !important;

          border:
            1px solid
            #121358 !important;

          border-radius: 7px !important;

          background: #121358 !important;

          color: #FFF7F3 !important;

          font-size: 12px !important;

          font-weight: 700 !important;

          cursor: pointer;

          box-shadow:
            0 5px 14px
            rgba(18,19,88,.13) !important;

          transition:
            transform .35s
              cubic-bezier(
                .22,
                1,
                .36,
                1
              ),
            box-shadow .35s ease,
            background .3s ease,
            color .3s ease !important;
        }


        .auth-form button[type="submit"]:hover {
          transform:
            translateY(-2px) !important;

          background: #FFF7F3 !important;

          color: #121358 !important;

          box-shadow:
            0 9px 22px
            rgba(18,19,88,.17) !important;
        }


        .auth-form button[type="submit"]:active {
          transform:
            translateY(0)
            scale(.985) !important;

          box-shadow:
            0 3px 8px
            rgba(18,19,88,.12) !important;
        }


        /* =====================================================
           CHECKBOX
        ====================================================== */

        .auth-form input[type="checkbox"] {
          width: 13px !important;

          height: 13px !important;

          min-height: 13px !important;

          padding: 0 !important;

          accent-color: #121358;
        }


        /* =====================================================
           SECURITY
        ====================================================== */

        .security-note {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 6px;

          margin-top: 16px;

          color: #121358;

          opacity: .42;

          font-size: 9px;
        }


        /* =====================================================
           FOOTER
        ====================================================== */

        .auth-footer {
          height: 38px;

          flex-shrink: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          position: relative;

          z-index: 10;
        }


        .auth-footer p {
          color: #121358;

          opacity: .45;

          font-size: 9px;
        }


        /* =====================================================
           SHORT SCREEN
        ====================================================== */

        @media (max-height: 760px) {

          .auth-header {
            height: 60px;
          }


          .auth-main {
            padding-top: 10px;
            padding-bottom: 10px;
          }


          .auth-heading {
            margin-bottom: 16px;
          }


          .auth-heading h2 {
            font-size: 31px;
          }


          .auth-heading p {
            margin-top: 5px;

            font-size: 11px;
          }


          .auth-card-container {
            min-height: 370px;
          }


          .policy-panel,
          .form-panel {
            padding:
              25px 30px;
          }


          .policy-title {
            font-size: 27px;
          }


          .auth-form input {
            height: 38px !important;
          }


          .auth-form button[type="submit"] {
            min-height: 38px !important;
          }


          .login-form form {
            gap: 10px !important;
          }


          .signup-form form {
            gap: 7px !important;
          }


          .security-note {
            margin-top: 10px;
          }

        }


        /* =====================================================
           VERY SHORT SCREEN
        ====================================================== */

        @media (max-height: 680px) {

          .auth-header {
            height: 54px;
          }


          .auth-profile {
            width: 39px;
            height: 39px;
          }


          .auth-heading {
            margin-bottom: 9px;
          }


          .auth-heading h2 {
            font-size: 27px;
          }


          .auth-heading p {
            display: none;
          }


          .auth-card-container {
            min-height: 340px;
          }


          .policy-panel,
          .form-panel {
            padding:
              20px 25px;
          }


          .policy-title {
            font-size: 24px;
          }


          .policy-description {
            display: none;
          }


          .auth-form input {
            height: 35px !important;
          }


          .auth-form button[type="submit"] {
            min-height: 35px !important;
          }


          .signup-form form {
            gap: 5px !important;
          }


          .login-form form {
            gap: 8px !important;
          }


          .security-note {
            display: none;
          }


          .auth-footer {
            height: 28px;
          }

        }


        /* =====================================================
           MOBILE
        ====================================================== */

        @media (max-width: 767px) {

          .auth-page {
            height: auto;

            min-height: 100vh;

            overflow-y: auto;
          }


          .auth-header {
            padding:
              0 22px;
          }


          .auth-main {
            padding:
              30px 18px;
          }


          .auth-wrapper {
            max-width: 520px;
          }


          .auth-heading {
            margin-bottom: 22px;
          }


          .auth-heading h2 {
            font-size: 32px;
          }


          .auth-card-container {
            grid-template-columns: 1fr;

            min-height: auto;
          }


          .policy-panel {
            min-height: 270px;
          }


          .form-panel {
            padding:
              28px 23px;
          }


          .auth-footer {
            height: 40px;
          }

        }

      `}</style>


      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="auth-bg-ring" />

      <div className="auth-bg-circle" />


      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="auth-header">

        <motion.div
          className="brand"

          initial={{
            opacity: 0,
            x: -10,
          }}

          animate={{
            opacity: 1,
            x: 0,
          }}

          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          THRUST
        </motion.div>


        <motion.div
          className="auth-profile"

          initial={{
            opacity: 0,
            scale: 0.9,
          }}

          animate={{
            opacity: 1,
            scale: 1,
          }}

          transition={{
            duration: 0.45,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          V
        </motion.div>

      </header>


      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="auth-main">

        <section className="auth-wrapper">


          {/* =================================================
              HEADING
          ================================================== */}

          <motion.div
            className="auth-heading"

            initial={{
              opacity: 0,
              y: 10,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.55,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <div className="auth-eyebrow">

              <span className="auth-eyebrow-dot" />

              <span>
                CGE Policy Simulator
              </span>

            </div>


            {/* Smooth title transition */}

            <AnimatePresence
              mode="wait"
              initial={false}
            >

              <motion.h2
                key={
                  isLogin
                    ? "login-title"
                    : "signup-title"
                }

                initial={{
                  opacity: 0,
                  filter: "blur(3px)",
                  scale: 0.99,
                }}

                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                  scale: 1,
                }}

                exit={{
                  opacity: 0,
                  filter: "blur(3px)",
                  scale: 0.99,
                }}

                transition={{
                  duration: 0.28,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >

                {isLogin
                  ? "Welcome Back"
                  : "Create Your Account"}

              </motion.h2>

            </AnimatePresence>


            {/* Smooth description transition */}

            <AnimatePresence
              mode="wait"
              initial={false}
            >

              <motion.p
                key={
                  isLogin
                    ? "login-description"
                    : "signup-description"
                }

                initial={{
                  opacity: 0,
                  filter: "blur(2px)",
                }}

                animate={{
                  opacity: 0.6,
                  filter: "blur(0px)",
                }}

                exit={{
                  opacity: 0,
                  filter: "blur(2px)",
                }}

                transition={{
                  duration: 0.25,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >

                {isLogin
                  ? "Sign in to continue to the CGE Policy Simulator."
                  : "Create your account to start exploring economic policy simulations."}

              </motion.p>

            </AnimatePresence>

          </motion.div>


          {/* =================================================
              AUTH CARD
          ================================================== */}

          <motion.div
            className="auth-card-container"

            initial={{
              opacity: 0,
              y: 15,
              scale: 0.985,
            }}

            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}

            transition={{
              duration: 0.6,
              delay: 0.10,
              ease: [0.22, 1, 0.36, 1],
            }}
          >


            {/* ===============================================
                LEFT PANEL
            ================================================ */}

            <motion.div
              className="policy-panel"

              initial={{
                opacity: 0,
                x: -12,
              }}

              animate={{
                opacity: 1,
                x: 0,
              }}

              transition={{
                duration: 0.55,
                delay: 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              <div className="policy-content">

                <div className="policy-label">

                  <span className="policy-label-dot" />

                  <span>
                    Policy Simulator
                  </span>

                </div>


                <h3 className="policy-title">

                  Explore economic
                  <br />

                  policy decisions
                  <br />

                  <span className="policy-title-accent">
                    with confidence.
                  </span>

                </h3>


                <p className="policy-description">

                  Simulate policy changes, compare outcomes,
                  and understand their potential effects on
                  the wider economy.

                </p>

              </div>


              <div className="policy-bottom">

                <div className="policy-line" />


                <div className="metrics">

                  <Metric
                    value="CGE"
                    label="Model"
                  />

                  <Metric
                    value="AI"
                    label="Analysis"
                  />

                  <Metric
                    value="24/7"
                    label="Access"
                  />

                </div>


                <div className="engine-status">

                  <div className="engine-left">

                    <span className="engine-dot" />

                    <span className="engine-text">
                      Simulation engine ready
                    </span>

                  </div>


                  <span className="engine-code">
                    CGE / AI
                  </span>

                </div>

              </div>

            </motion.div>


            {/* ===============================================
                FORM PANEL
            ================================================ */}

            <motion.div
              className="form-panel"

              initial={{
                opacity: 0,
                x: 12,
              }}

              animate={{
                opacity: 1,
                x: 0,
              }}

              transition={{
                duration: 0.55,
                delay: 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
            >


              {/* =============================================
                  TABS
              ============================================== */}

              <div className="auth-tabs">

                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`auth-tab ${
                    isLogin
                      ? "active"
                      : ""
                  }`}
                >

                  Login

                  {isLogin && (

                    <motion.span
                      layoutId="auth-tab-line"
                      className="auth-tab-line"

                      transition={{
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    />

                  )}

                </button>


                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`auth-tab ${
                    !isLogin
                      ? "active"
                      : ""
                  }`}
                >

                  Sign Up

                  {!isLogin && (

                    <motion.span
                      layoutId="auth-tab-line"
                      className="auth-tab-line"

                      transition={{
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    />

                  )}

                </button>

              </div>


              {/* =============================================
                  FORM
                  
                  CROSSFADE + BLUR + VERY SMALL SCALE
              ============================================== */}

              <AnimatePresence
                mode="wait"
                initial={false}
              >

                <motion.div
                  key={
                    isLogin
                      ? "login"
                      : "signup"
                  }

                  className={`
                    form-transition
                    auth-form
                    ${
                      isLogin
                        ? "login-form"
                        : "signup-form"
                    }
                  `}

                  initial={{
                    opacity: 0,
                    filter: "blur(4px)",
                    scale: 0.985,
                  }}

                  animate={{
                    opacity: 1,
                    filter: "blur(0px)",
                    scale: 1,
                  }}

                  exit={{
                    opacity: 0,
                    filter: "blur(4px)",
                    scale: 0.985,
                  }}

                  transition={{
                    duration: 0.32,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >

                  {isLogin
                    ? <LoginForm />
                    : <SignupForm />
                  }

                </motion.div>

              </AnimatePresence>


              {/* =============================================
                  SECURITY
              ============================================== */}

              <div className="security-note">

                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#121358"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >

                  <rect
                    x="4"
                    y="10"
                    width="16"
                    height="11"
                    rx="2"
                  />

                  <path
                    d="M8 10V7a4 4 0 018 0v3"
                  />

                </svg>


                <span>
                  Secure authentication
                </span>

              </div>

            </motion.div>

          </motion.div>

        </section>

      </main>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="auth-footer">

        <motion.p
          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 0.45,
          }}

          transition={{
            duration: 0.5,
            delay: 0.45,
          }}
        >
          © 2026 Team Wipeth
        </motion.p>

      </footer>

    </div>
  );
}


/* =============================================================
   METRIC COMPONENT
============================================================= */

function Metric({ value, label }) {
  return (
    <div className="metric">

      <p className="metric-value">
        {value}
      </p>

      <p className="metric-label">
        {label}
      </p>

    </div>
  );
}