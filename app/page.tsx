"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ArrowRight, TrendingUp, Users, DollarSign, Activity, Star, CheckCircle, Zap, Shield, BarChart2, Globe, ArrowUpRight, ChevronRight, Sparkles } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, APP_DESCRIPTION, BRAND_COLORS } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const revenueData = [
  { month: "Jan", revenue: 42000, users: 1200 },
  { month: "Feb", revenue: 51000, users: 1450 },
  { month: "Mar", revenue: 47000, users: 1380 },
  { month: "Apr", revenue: 63000, users: 1720 },
  { month: "May", revenue: 71000, users: 1950 },
  { month: "Jun", revenue: 68000, users: 1870 },
  { month: "Jul", revenue: 82000, users: 2210 },
  { month: "Aug", revenue: 91000, users: 2480 },
  { month: "Sep", revenue: 87000, users: 2350 },
  { month: "Oct", revenue: 104000, users: 2790 },
  { month: "Nov", revenue: 118000, users: 3120 },
  { month: "Dec", revenue: 132000, users: 3450 },
];

const channelData = [
  { name: "Organic", value: 38 },
  { name: "Paid", value: 27 },
  { name: "Referral", value: 19 },
  { name: "Direct", value: 16 },
];

const weeklyActivity = [
  { day: "Mon", sessions: 3200 },
  { day: "Tue", sessions: 4100 },
  { day: "Wed", sessions: 3800 },
  { day: "Thu", sessions: 5200 },
  { day: "Fri", sessions: 4700 },
  { day: "Sat", sessions: 2900 },
  { day: "Sun", sessions: 2400 },
];

const kpis = [
  {
    label: "Monthly Revenue",
    value: "$132,400",
    change: "+18.4%",
    positive: true,
    icon: DollarSign,
    color: "from-indigo-500 to-violet-600",
    glow: "shadow-indigo-500/25",
  },
  {
    label: "Active Users",
    value: "3,450",
    change: "+10.6%",
    positive: true,
    icon: Users,
    color: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/25",
  },
  {
    label: "Avg. Session",
    value: "4m 32s",
    change: "+2.1%",
    positive: true,
    icon: Activity,
    color: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-500/25",
  },
  {
    label: "Churn Rate",
    value: "1.8%",
    change: "-0.4%",
    positive: true,
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/25",
  },
];

const features = [
  {
    icon: BarChart2,
    title: "Real-Time Analytics",
    description:
      "Watch your metrics update live as events stream in. No more waiting for overnight batch jobs — see what's happening right now.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    icon: Zap,
    title: "Instant Alerts",
    description:
      "Set threshold-based alerts for any metric. Get notified via Slack, email, or webhook the moment something needs your attention.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: Globe,
    title: "Multi-Source Data",
    description:
      "Connect Stripe, Segment, Mixpanel, and 40+ integrations in minutes. All your data unified in one clean, queryable warehouse.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified. Role-based access control, SSO, audit logs, and end-to-end encryption keep your data safe.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Share dashboards, annotate charts, and leave comments directly on data points. Keep your whole team aligned on what matters.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description:
      "Our AI surfaces anomalies, forecasts trends, and writes plain-English summaries of your data — so you can act, not just observe.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Head of Growth",
    company: "Luma Cloud",
    avatar: "/images/sarah-chen-avatar.jpg",
    quote:
      "Pulse Analytics replaced four separate tools for us. Our team went from spending 3 hours a week on reporting to 15 minutes. The ROI was immediate.",
    stars: 5,
  },
  {
    name: "Marcus Webb",
    role: "CTO",
    company: "Stackify",
    avatar: "/images/marcus-webb-avatar.jpg",
    quote:
      "The real-time alerting alone is worth the subscription. We caught a payment processing bug within 90 seconds of it starting — before any customers noticed.",
    stars: 5,
  },
  {
    name: "Priya Nair",
    role: "VP Product",
    company: "Orbit SaaS",
    avatar: "/images/priya-nair-avatar.jpg",
    quote:
      "I've tried every analytics tool on the market. Pulse is the first one my non-technical stakeholders actually open themselves. The UI is just that good.",
    stars: 5,
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    description: "Perfect for early-stage startups tracking core metrics.",
    features: [
      "Up to 5 dashboards",
      "3 team members",
      "7-day data retention",
      "10 integrations",
      "Email alerts",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$149",
    period: "/mo",
    description: "For scaling teams that need depth and collaboration.",
    features: [
      "Unlimited dashboards",
      "15 team members",
      "90-day data retention",
      "40+ integrations",
      "Slack & webhook alerts",
      "AI-powered insights",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Dedicated infrastructure, SLAs, and white-glove onboarding.",
    features: [
      "Unlimited everything",
      "Unlimited team members",
      "Unlimited data retention",
      "Custom integrations",
      "SSO & SAML",
      "Dedicated CSM",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

const CHART_COLORS = BRAND_COLORS.chartColors;

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-semibold text-white">
          {p.name === "revenue"
            ? `$${(p.value ?? 0).toLocaleString()}`
            : (p.value ?? 0).toLocaleString()}
        </p>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeChart, setActiveChart] = useState<"revenue" | "users">("revenue");

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-sm font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Now with AI-powered anomaly detection
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6"
            >
              <span className="text-white">Business intelligence,</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                beautifully simplified.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10"
            >
              {APP_DESCRIPTION}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow duration-300 cursor-pointer"
                >
                  Open Dashboard
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
              <Link href="/analytics">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 font-semibold text-sm hover:bg-slate-800 hover:border-slate-600 transition-all duration-200 cursor-pointer"
                >
                  View Analytics
                  <ChevronRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </motion.div>

            {/* Social proof strip */}
            <motion.p variants={fadeInUp} className="mt-8 text-xs text-slate-500">
              Trusted by{" "}
              <span className="text-slate-300 font-semibold">2,400+</span> SaaS teams ·{" "}
              <span className="text-slate-300 font-semibold">4.9 ★</span> on G2 ·{" "}
              <span className="text-slate-300 font-semibold">SOC 2</span> certified
            </motion.p>
          </motion.div>

          {/* ── KPI Cards ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {kpis.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <motion.div
                  key={kpi.label}
                  variants={scaleIn}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`relative bg-slate-900/70 border border-slate-800/60 rounded-2xl p-5 shadow-xl ${kpi.glow} overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-transparent pointer-events-none" />
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center mb-3 shadow-lg`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-white tracking-tight">{kpi.value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{kpi.label}</p>
                  <span className={`inline-flex items-center gap-1 mt-2 text-xs font-medium ${kpi.positive ? "text-emerald-400" : "text-red-400"}`}>
                    <ArrowUpRight className="w-3 h-3" />
                    {kpi.change} vs last month
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Live Charts Preview ── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid lg:grid-cols-3 gap-6"
          >
            {/* Main area chart */}
            <motion.div
              variants={slideInLeft}
              className="lg:col-span-2 bg-slate-900/70 border border-slate-800/60 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-semibold text-white">Revenue & Users</h2>
                  <p className="text-xs text-slate-400 mt-0.5">12-month trend</p>
                </div>
                <div className="flex gap-2">
                  {(["revenue", "users"] as const).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveChart(key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        activeChart === key
                          ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                          : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/60"
                      }`}
                    >
                      {key === "revenue" ? "Revenue" : "Users"}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  {activeChart === "revenue" ? (
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#6366f1"
                      strokeWidth={2.5}
                      fill="url(#colorRevenue)"
                      dot={false}
                      activeDot={{ r: 5, fill: "#6366f1", stroke: "#1e1b4b", strokeWidth: 2 }}
                    />
                  ) : (
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#8b5cf6"
                      strokeWidth={2.5}
                      fill="url(#colorUsers)"
                      dot={false}
                      activeDot={{ r: 5, fill: "#8b5cf6", stroke: "#1e1b4b", strokeWidth: 2 }}
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Pie chart */}
            <motion.div
              variants={slideInRight}
              className="bg-slate-900/70 border border-slate-800/60 rounded-2xl p-6 shadow-xl"
            >
              <h2 className="text-base font-semibold text-white mb-1">Traffic Sources</h2>
              <p className="text-xs text-slate-400 mb-4">Last 30 days</p>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={72}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "12px", fontSize: "12px" }}
                    formatter={(value: number) => [`${value}%`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <ul className="mt-3 space-y-2">
                {channelData.map((item, i) => (
                  <li key={item.name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-slate-400">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                      {item.name}
                    </span>
                    <span className="font-semibold text-white">{item.value}%</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Bar chart */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-3 bg-slate-900/70 border border-slate-800/60 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-semibold text-white">Weekly Sessions</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Active sessions per day this week</p>
                </div>
                <span className="text-xs text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  ↑ 12% vs last week
                </span>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={weeklyActivity} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "12px", fontSize: "12px" }}
                    formatter={(value: number) => [(value ?? 0).toLocaleString(), "Sessions"]}
                  />
                  <Bar dataKey="sessions" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={52} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-violet-600/6 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Everything you need
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Built for teams that move fast
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
              From real-time streaming to AI-generated summaries, Pulse gives your team the tools to make confident, data-driven decisions every day.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.015 }}
                  className={`bg-slate-900/60 border ${feature.border} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}
                >
                  <div className={`w-10 h-10 rounded-xl ${feature.bg} border ${feature.border} flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Social proof
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Loved by growth teams worldwide
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                className="bg-slate-900/70 border border-slate-800/60 rounded-2xl p-6 shadow-xl flex flex-col"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-5 pt-5 border-t border-slate-800/60">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover bg-slate-800"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Pricing
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Simple, transparent pricing
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-slate-400 max-w-md mx-auto text-base">
              Start free for 14 days. No credit card required. Cancel anytime.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-3 gap-6 items-stretch"
          >
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className={`relative rounded-2xl p-7 flex flex-col shadow-xl transition-shadow duration-300 ${
                  plan.highlighted
                    ? "bg-gradient-to-b from-indigo-600/20 to-violet-600/10 border-2 border-indigo-500/50 shadow-indigo-500/20"
                    : "bg-slate-900/70 border border-slate-800/60"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs font-bold shadow-lg">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-1 mb-5">{plan.description}</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  {plan.period && <span className="text-slate-400 text-sm mb-1">{plan.period}</span>}
                </div>
                <ul className="space-y-3 flex-1 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`block text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
                        : "bg-slate-800/80 border border-slate-700/60 text-slate-200 hover:bg-slate-800 hover:border-slate-600"
                    }`}
                  >
                    {plan.cta}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-10 lg:p-16 text-center shadow-2xl shadow-indigo-500/30"
          >
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4">
                Ready to see your data come alive?
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-indigo-100 text-base max-w-xl mx-auto mb-8 leading-relaxed">
                Join 2,400+ SaaS teams already using {APP_NAME} to make faster, smarter decisions. Set up in under 5 minutes.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/dashboard">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-indigo-700 font-bold text-sm shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  >
                    Start free trial
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
                <Link href="/analytics">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all duration-200 cursor-pointer"
                  >
                    Explore analytics
                    <ChevronRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}