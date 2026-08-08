import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function SignupForm() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!fullName.trim()) {
            setError("Full name is required.");
            return;
        }

        if (!email.trim()) {
            setError("Email is required.");
            return;
        }

        if (!password) {
            setError("Password is required.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            });

            if (error) {
                setError(error.message);
                return;
            }

            alert(
                "Account created successfully! Please check your email to verify your account."
            );

        } catch (err) {

            setError("Something went wrong. Please try again.");

        } finally {

            setLoading(false);

        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div>
                <label className="block text-sm text-slate-300 mb-2">
                    Full Name
                </label>

                <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm text-slate-300 mb-2">
                    Email
                </label>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Password */}
            <div>
                <label className="block text-sm text-slate-300 mb-2">
                    Password
                </label>

                <div className="relative">

                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                        placeholder="Create a password"
                        className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-400"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>

                </div>
            </div>

            {/* Confirm Password */}
            <div>
                <label className="block text-sm text-slate-300 mb-2">
                    Confirm Password
                </label>

                <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {error && (
                <p className="text-red-400 text-sm">
                    {error}
                </p>
            )}

            <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700 transition"
            >
                {loading ? "Creating Account..." : "Create Account"}
            </button>

        </form>
    );
}