import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-6xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 grid md:grid-cols-2">

        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950">

          <h1 className="text-5xl font-bold text-white mb-6">
            AI Policy Simulator
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed mb-10">
            Simulate economic policies, evaluate their impact, and
            explore AI-powered policy recommendations through an
            interactive macroeconomic simulation platform.
          </p>

          <div className="space-y-5">

            <div className="flex items-center gap-3">
              <span className="text-2xl">🌍</span>
              <span className="text-slate-200">
                Fiscal & Monetary Policy Simulation
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <span className="text-slate-200">
                AI Economist Assistant
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">📈</span>
              <span className="text-slate-200">
                Interactive Economic Analytics
              </span>
            </div>

          </div>

        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center p-10">

          <div className="w-full max-w-md">

            <h2 className="text-3xl font-bold text-white text-center">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>

            <p className="text-slate-400 text-center mt-2 mb-8">
              {isLogin
                ? "Login to continue your simulations."
                : "Create your account to get started."}
            </p>

            {isLogin ? <LoginForm /> : <SignupForm />}

            <div className="text-center mt-8">

              {isLogin ? (
                <p className="text-slate-400">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Sign Up
                  </button>
                </p>
              ) : (
                <p className="text-slate-400">
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Login
                  </button>
                </p>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}