"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, Mail, Lock, Eye, EyeOff, ArrowRight, Code2 as Github, Chrome, Sparkles } from 'lucide-react';
import { APP_NAME, BRAND_COLORS } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

const FEATURES = [
  { emoji: "📊", text: "Real-time analytics dashboard" },
  { emoji: "💰", text: "Revenue tracking & forecasting" },
  { emoji: "👥", text: "User growth & retention metrics" },
  { emoji: "🔔", text: "Smart alerts & notifications" },
];

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setError("Invalid email or password. Try demo@pulseanalytics.io / demo1234");
    }, 1400);
  };

  const handleDemoLogin = () => {
    setEmail("demo@pulseanalytics.io");
    setPassword("demo1234");
    setError("");
  };

  return (
    <main className="min-h-screen bg-slate-950 flex">
      {/* Left panel — branding */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative flex-col justify-between p-12 overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-violet-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.18)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.14)_0%,transparent_60%)]" />

        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Floating orbs */}
        <div className="absolute top-24 right-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-32 left-8 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">{APP_NAME}</span>
          </motion.div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center py-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-md"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-medium text-indigo-300">Trusted by 2,400+ SaaS teams</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
              Business intelligence,{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                beautifully simplified.
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-slate-400 text-lg leading-relaxed mb-10">
              Monitor revenue, track user growth, and surface actionable insights — all from a single, elegant dashboard.
            </motion.p>

            <motion.ul variants={staggerContainer} className="space-y-3">
              {FEATURES.map((f) => (
                <motion.li
                  key={f.text}
                  variants={fadeInUp}
                  className="flex items-center gap-3 text-slate-300 text-sm"
                >
                  <span className="text-base">{f.emoji}</span>
                  <span>{f.text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* Testimonial */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="relative z-10 p-5 rounded-2xl bg-slate-800/40 border border-slate-700/40 backdrop-blur-sm max-w-md"
        >
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            "Pulse Analytics transformed how our team makes decisions. We cut reporting time by 70% in the first month."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
              SL
            </div>
            <div>
              <p className="text-white text-xs font-semibold">Sarah Lin</p>
              <p className="text-slate-500 text-xs">Head of Growth, Vercel</p>
            </div>
            <div className="ml-auto flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className="text-amber-400 text-xs">★</span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06)_0%,transparent_70%)]" />

        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8 justify-center">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">{APP_NAME}</span>
          </div>

          {/* Card */}
          <div className="bg-slate-900/80 border border-slate-800/60 rounded-2xl p-8 shadow-2xl shadow-black/40 backdrop-blur-sm">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-white mb-1.5">Welcome back</h1>
              <p className="text-slate-400 text-sm">
                Sign in to your {APP_NAME} account to continue.
              </p>
            </div>

            {/* Social sign-in */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "rgba(51,65,85,0.8)" }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-300 text-sm font-medium hover:text-white transition-colors duration-200"
              >
                <Github className="w-4 h-4" />
                GitHub
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "rgba(51,65,85,0.8)" }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-300 text-sm font-medium hover:text-white transition-colors duration-200"
              >
                <Chrome className="w-4 h-4" />
                Google
              </motion.button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-xs text-slate-600 font-medium">or continue with email</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                    Password
                  </label>
                  <Link
                    href="#"
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors duration-200"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={rememberMe}
                  onClick={() => setRememberMe((v) => !v)}
                  className={`w-4.5 h-4.5 w-[18px] h-[18px] rounded flex items-center justify-center border transition-all duration-200 ${
                    rememberMe
                      ? "bg-indigo-500 border-indigo-500"
                      : "bg-slate-800 border-slate-700 hover:border-slate-500"
                  }`}
                >
                  {rememberMe && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                      <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <span className="text-sm text-slate-400 select-none cursor-pointer" onClick={() => setRememberMe((v) => !v)}>
                  Remember me for 30 days
                </span>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                >
                  <span className="mt-0.5 shrink-0">⚠</span>
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Demo shortcut */}
            <div className="mt-4">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2.5 px-4 rounded-xl border border-dashed border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-600 text-xs font-medium transition-all duration-200"
              >
                ✨ Fill demo credentials
              </button>
            </div>

            {/* Sign up link */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                href="#"
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200"
              >
                Start free trial
              </Link>
            </p>
          </div>

          {/* Trust badges */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-600"
          >
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-500">🔒</span> SOC 2 Type II
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span> GDPR Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-500">🛡</span> 256-bit SSL
            </span>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}